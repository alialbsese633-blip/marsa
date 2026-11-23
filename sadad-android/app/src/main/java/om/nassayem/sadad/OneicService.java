package om.nassayem.sadad;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.GestureDescription;
import android.content.ComponentName;
import android.content.Context;
import android.graphics.Path;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.text.TextUtils;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Drives ONEIC: Home → Electricity → Quick Pay → Account Number → Total Outstanding
 * → Enter Amount → fills amount. Stops before the Pay button; never pays.
 */
public class OneicService extends AccessibilityService {

    static String jobMeter = null;
    static String jobAmount = null;
    static long jobStart = 0;

    static final long TIMEOUT_MS = 30000;
    static final StringBuilder DIAG = new StringBuilder();
    static String lastDump = "";
    int lastStep = -1;
    long stepSince = 0;
    boolean dumped = false;

    static synchronized void log(String m) {
        String t = new java.text.SimpleDateFormat("HH:mm:ss", Locale.ROOT).format(new java.util.Date());
        DIAG.append(t).append("  ").append(m).append('\n');
        if (DIAG.length() > 6000) DIAG.delete(0, DIAG.length() - 6000);
    }
    public static synchronized String diag() { return DIAG.toString() + "\n--- آخر شاشة ---\n" + lastDump; }
    static final String[] ELECTRICITY = {"Electricity", "الكهرباء", "كهرباء"};
    static final String[] WATER = {"Water", "المياه", "مياه"};
    static final String[] QUICK_PAY = {"Quick Pay", "الدفع السريع", "دفع سريع"};
    static final String[] PREPAID_RECHARGE = {"Prepaid Recharge", "شحن مسبق الدفع", "إعادة الشحن المسبق"};
    static final String[] ACCOUNT_HINT = {"Account Number", "Account number", "رقم الحساب"};
    static final String[] TOTAL_OUT = {"Total Outstanding", "إجمالي المستحقات", "المبلغ المستحق"};
    static final String[] ENTER_AMOUNT = {"Enter Amount", "أدخل المبلغ", "إدخال المبلغ"};
    static final String[] PAYING_AMOUNT = {"Paying Amount", "المبلغ المدفوع", "مبلغ الدفع"};

    static final int S_HOME = 0, S_SHEET = 1, S_FILL = 2, S_TOTAL = 3, S_ENTER = 4, S_AMOUNT = 5;
    int step = S_HOME;
    long lastAction = 0;
    int idleTicks = 0;
    final Handler h = new Handler(Looper.getMainLooper());

    public static boolean isEnabled(Context c) {
        String on = Settings.Secure.getString(c.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        if (on == null) return false;
        String me = new ComponentName(c, OneicService.class).flattenToString();
        for (String s : on.split(":")) if (s.equalsIgnoreCase(me)) return true;
        return false;
    }

    public static void start(String meter, String amount) {
        log("بدء: عداد " + meter + " مبلغ " + amount);
        jobMeter = meter;
        jobAmount = amount;
        jobStart = System.currentTimeMillis();
    }

    @Override
    protected void onServiceConnected() { tick(); }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent e) { }

    @Override
    public void onInterrupt() { }

    void tick() {
        h.removeCallbacksAndMessages(null);
        h.postDelayed(this::loop, 350);
    }

    void loop() {
        try { run(); } catch (Exception ignored) { }
        tick();
    }

    void finish(String msg) {
        log("انتهى عند الخطوة " + step + ": " + msg);
        if (msg != null) Toast.makeText(this, msg, Toast.LENGTH_LONG).show();
        jobMeter = null;
        jobAmount = null;
        step = S_HOME;
    }

    void run() {
        if (jobMeter == null) { step = S_HOME; return; }
        if (System.currentTimeMillis() - jobStart > TIMEOUT_MS) {
            finish(step >= S_TOTAL ? "سداد: تم إدخال الرقم ✓ أدخل المبلغ يدوياً واضغط Pay" : "سداد: ما قدرت أكمل التعبئة — الرقم منسوخ، الصقه يدوياً");
            return;
        }
        AccessibilityNodeInfo root = getRootInActiveWindow();
        if (root == null || root.getPackageName() == null || !"com.oneic.om".contentEquals(root.getPackageName())) return;
        if (step != lastStep) { log("الخطوة " + lastStep + " → " + step); lastStep = step; stepSince = System.currentTimeMillis(); dumped = false; }
        if (!dumped && System.currentTimeMillis() - stepSince > 4000) { dump(root); dumped = true; log("علق في الخطوة " + step + " (تم حفظ الشاشة)"); }
        if (System.currentTimeMillis() - lastAction < 700) return;

        // Final stage: amount field after "Enter Amount"
        if (step >= S_ENTER) {
            AccessibilityNodeInfo amt = amountField(root);
            if (amt != null && step <= S_AMOUNT) {
                if (TextUtils.isEmpty(jobAmount)) { finish("سداد: أدخل المبلغ واضغط Pay"); return; }
                if (setText(amt, jobAmount)) { finish("سداد: تمت التعبئة ✓ راجع المبلغ واضغط Pay"); return; }
            }
            if (step == S_ENTER) {
                AccessibilityNodeInfo b = find(root, ENTER_AMOUNT);
                if (b != null && click(b)) { step = S_AMOUNT; acted(); }
            }
            return;
        }

        // "Details" sheet visible → Enter Amount
        AccessibilityNodeInfo enter = find(root, ENTER_AMOUNT);
        if (enter != null && step >= S_FILL) {
            if (click(enter)) { step = S_AMOUNT; acted(); }
            return;
        }

        // Quick Pay screen: account field present
        AccessibilityNodeInfo acc = accountField(root);
        if (acc != null) {
            if (step < S_TOTAL) {
                // make sure the Electricity tab is active
                if (step < S_FILL) {
                    AccessibilityNodeInfo tab = find(root, ELECTRICITY);
                    if (tab != null) click(tab);
                    step = S_FILL;
                    acted();
                    return;
                }
                if (setText(acc, jobMeter)) {
                    step = S_TOTAL;
                    lastAction = System.currentTimeMillis() + 500;
                }
                return;
            }
            if (step == S_TOTAL) {
                AccessibilityNodeInfo tot = find(root, TOTAL_OUT);
                if (tot == null) { log("ما لقيت Total Outstanding"); return; }
                boolean ok = tap(tot) || click(tot);
                if (ok) { step = S_ENTER; acted(); }
            }
            return;
        }

        // Electricity sheet: Quick Pay / Prepaid Recharge
        AccessibilityNodeInfo qp = find(root, QUICK_PAY);
        if (qp != null && find(root, PREPAID_RECHARGE) != null) {
            if (click(qp)) { step = S_SHEET; acted(); }
            return;
        }

        // Home grid: Electricity + Water
        AccessibilityNodeInfo el = find(root, ELECTRICITY);
        if (el != null && find(root, WATER) != null && step == S_HOME) {
            if (click(el)) acted();
        }
    }

    void acted() { lastAction = System.currentTimeMillis(); }

    static void dump(AccessibilityNodeInfo root) {
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        StringBuilder b = new StringBuilder();
        int k = 0;
        for (AccessibilityNodeInfo n : l) {
            String lb = label(n);
            CharSequence c = n.getClassName();
            boolean ed = n.isEditable();
            if (lb.isEmpty() && !ed && !n.isClickable()) continue;
            Rect r = new Rect(); n.getBoundsInScreen(r);
            b.append(c == null ? "?" : c.toString().replace("android.widget.", "").replace("android.view.", ""))
             .append(n.isClickable() ? " [click]" : "").append(ed ? " [edit]" : "")
             .append(n.isVisibleToUser() ? "" : " [hidden]")
             .append(" \"").append(lb.length() > 60 ? lb.substring(0, 60) : lb).append("\" ")
             .append(r.toShortString()).append('\n');
            if (++k > 80) break;
        }
        lastDump = b.toString();
    }

    // ---------- node helpers ----------

    static String label(AccessibilityNodeInfo n) {
        StringBuilder b = new StringBuilder();
        if (n.getText() != null) b.append(n.getText()).append(' ');
        if (n.getContentDescription() != null) b.append(n.getContentDescription()).append(' ');
        if (android.os.Build.VERSION.SDK_INT >= 26 && n.getHintText() != null) b.append(n.getHintText());
        return b.toString().replaceAll("\\s+", " ").trim();
    }

    static boolean matches(String txt, String[] keys) {
        if (txt.isEmpty()) return false;
        String t = txt.toLowerCase(Locale.ROOT);
        for (String k : keys) {
            String kk = k.toLowerCase(Locale.ROOT);
            if (t.equals(kk) || t.startsWith(kk + " ") || t.startsWith(kk + "\n") || t.contains(kk) && t.length() < kk.length() + 25) return true;
        }
        return false;
    }

    static void all(AccessibilityNodeInfo n, List<AccessibilityNodeInfo> out) {
        if (n == null) return;
        out.add(n);
        for (int i = 0; i < n.getChildCount(); i++) all(n.getChild(i), out);
    }

    static AccessibilityNodeInfo find(AccessibilityNodeInfo root, String[] keys) {
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        for (AccessibilityNodeInfo n : l) if (n.isVisibleToUser() && matches(label(n), keys)) return n;
        return null;
    }

    static List<AccessibilityNodeInfo> edits(AccessibilityNodeInfo root) {
        List<AccessibilityNodeInfo> l = new ArrayList<>(), out = new ArrayList<>();
        all(root, l);
        for (AccessibilityNodeInfo n : l) {
            CharSequence c = n.getClassName();
            if (n.isVisibleToUser() && (n.isEditable() || (c != null && c.toString().contains("EditText")))) out.add(n);
        }
        return out;
    }

    static AccessibilityNodeInfo accountField(AccessibilityNodeInfo root) {
        List<AccessibilityNodeInfo> e = edits(root);
        if (e.isEmpty()) return null;
        for (AccessibilityNodeInfo n : e) if (matches(label(n), ACCOUNT_HINT)) return n;
        // Quick Pay screen has "Account number" label above the single field
        if (find(root, ACCOUNT_HINT) != null && find(root, TOTAL_OUT) != null) return e.get(0);
        return null;
    }

    static AccessibilityNodeInfo amountField(AccessibilityNodeInfo root) {
        if (find(root, PAYING_AMOUNT) == null) return null;
        List<AccessibilityNodeInfo> e = edits(root);
        for (AccessibilityNodeInfo n : e) if (!matches(label(n), ACCOUNT_HINT) && !label(n).contains(jobMeter == null ? "~" : jobMeter)) return n;
        return e.isEmpty() ? null : e.get(e.size() - 1);
    }

    boolean setText(AccessibilityNodeInfo n, String text) {
        n.performAction(AccessibilityNodeInfo.ACTION_FOCUS);
        n.performAction(AccessibilityNodeInfo.ACTION_CLICK);
        Bundle a = new Bundle();
        a.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, text);
        boolean ok = n.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, a);
        log("كتابة \"" + text + "\": " + (ok ? "نجح" : "فشل"));
        if (!ok) {
            // fallback: select all + paste (meter is already on the clipboard)
            Bundle sel = new Bundle();
            sel.putInt(AccessibilityNodeInfo.ACTION_ARGUMENT_SELECTION_START_INT, 0);
            sel.putInt(AccessibilityNodeInfo.ACTION_ARGUMENT_SELECTION_END_INT, n.getText() == null ? 0 : n.getText().length());
            n.performAction(AccessibilityNodeInfo.ACTION_SET_SELECTION, sel);
            ok = n.performAction(AccessibilityNodeInfo.ACTION_PASTE);
        }
        return ok;
    }

    boolean tap(AccessibilityNodeInfo n) {
        Rect r = new Rect();
        n.getBoundsInScreen(r);
        if (r.isEmpty()) return false;
        log("لمس عند " + r.centerX() + "," + r.centerY());
        Path path = new Path();
        path.moveTo(r.centerX(), r.centerY());
        GestureDescription g = new GestureDescription.Builder()
                .addStroke(new GestureDescription.StrokeDescription(path, 0, 60)).build();
        return dispatchGesture(g, null, null);
    }

    boolean click(AccessibilityNodeInfo n) {
        log("ضغط: \"" + label(n) + "\"");
        AccessibilityNodeInfo p = n;
        for (int i = 0; i < 6 && p != null; i++) {
            if (p.isClickable() && p.performAction(AccessibilityNodeInfo.ACTION_CLICK)) return true;
            p = p.getParent();
        }
        Rect r = new Rect();
        n.getBoundsInScreen(r);
        if (r.isEmpty()) return false;
        Path path = new Path();
        path.moveTo(r.centerX(), r.centerY());
        GestureDescription g = new GestureDescription.Builder()
                .addStroke(new GestureDescription.StrokeDescription(path, 0, 60)).build();
        return dispatchGesture(g, null, null);
    }
}
