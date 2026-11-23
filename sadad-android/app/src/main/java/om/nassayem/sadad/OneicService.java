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
import android.util.DisplayMetrics;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * ONEIC: Home → Electricity → Prepaid Recharge → adds every meter with "Add"
 * → sets the amount → stops before "Continue". Never pays.
 */
public class OneicService extends AccessibilityService {

    // ---------- job ----------
    static List<String> jobMeters = null;
    static String jobAmount = null;
    static long jobStart = 0;
    static final long BASE_TIMEOUT_MS = 30000;

    // ---------- labels (EN + AR) ----------
    static final String[] ELECTRICITY = {"Electricity", "الكهرباء", "كهرباء"};
    static final String[] WATER = {"Water", "المياه", "مياه", "الماء"};
    static final String[] QUICK_PAY = {"Quick Pay", "الدفع السريع", "دفع سريع"};
    static final String[] PREPAID = {"Prepaid Recharge", "إعادة الشحن", "اعادة الشحن", "الشحن المسبق", "شحن مسبق", "إعادة شحن", "اعادة شحن"};
    static final String[] ADD = {"Add", "إضافة", "اضافة", "أضف", "اضف"};
    static final String[] CONTINUE = {"Continue", "استمرار", "متابعة", "Proceed"};
    static final String[] ALREADY = {"already", "مضاف", "موجود", "تمت إضافة", "تمت اضافة", "مكرر", "exist"};
    static final String[] PAY_TITLE = {"الدفع", "Payment", "Pay"};

    static final int S_NAV = 0, S_ADD = 1, S_AMOUNT = 2, S_CONT = 3, S_WAIT = 4, S_SELECT = 5;
    int selTries = 0;
    int contTries = 0;
    int step = S_NAV;
    int idx = 0;
    int addTries = 0;
    int amountTries = 0;
    long lastAction = 0;
    final Handler h = new Handler(Looper.getMainLooper());

    // ---------- diagnostics ----------
    static final StringBuilder DIAG = new StringBuilder();
    static String lastDump = "";
    int lastStep = -1;
    long stepSince = 0;
    boolean dumped = false;

    static synchronized void log(String m) {
        String t = new java.text.SimpleDateFormat("HH:mm:ss", Locale.ROOT).format(new java.util.Date());
        DIAG.append(t).append("  ").append(m).append('\n');
        if (DIAG.length() > 8000) DIAG.delete(0, DIAG.length() - 8000);
    }

    public static synchronized String diag() { return DIAG.toString() + "\n--- آخر شاشة ---\n" + lastDump; }

    public static boolean isEnabled(Context c) {
        String on = Settings.Secure.getString(c.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        if (on == null) return false;
        String me = new ComponentName(c, OneicService.class).flattenToString();
        for (String s : on.split(":")) if (s.equalsIgnoreCase(me)) return true;
        return false;
    }

    public static void start(String metersCsv, String amount) {
        List<String> l = new ArrayList<>();
        for (String m : metersCsv.split("[,\\s]+")) if (!m.trim().isEmpty()) l.add(m.trim());
        log("بدء: " + l.size() + " عداد " + l + " مبلغ " + amount);
        jobMeters = l;
        jobAmount = amount;
        jobStart = System.currentTimeMillis();
        reset = true;
    }

    static boolean reset = false;

    @Override protected void onServiceConnected() { tick(); }
    static long alreadyAt = 0;
    @Override public void onAccessibilityEvent(AccessibilityEvent e) {
        if (e == null || e.getText() == null) return;
        String t = e.getText().toString().toLowerCase(Locale.ROOT);
        for (String k : ALREADY) if (t.contains(k.toLowerCase(Locale.ROOT))) { alreadyAt = System.currentTimeMillis(); log("رسالة: " + t); break; }
    }
    @Override public void onInterrupt() { }

    void tick() { h.removeCallbacksAndMessages(null); h.postDelayed(this::loop, 350); }

    void loop() {
        try { run(); } catch (Exception e) { log("خطأ: " + e); }
        tick();
    }

    void finish(String msg) {
        log("انتهى: " + msg);
        if (msg != null) Toast.makeText(this, msg, Toast.LENGTH_LONG).show();
        jobMeters = null;
        jobAmount = null;
        step = S_NAV;
    }

    void run() {
        if (reset) { reset = false; step = S_NAV; idx = 0; addTries = 0; amountTries = 0; contTries = 0; selTries = 0; lastStep = -1; alreadyAt = 0; }
        if (jobMeters == null) return;
        long timeout = BASE_TIMEOUT_MS + jobMeters.size() * 6000L;
        if (System.currentTimeMillis() - jobStart > timeout) {
            finish(step == S_NAV ? "سداد: ما قدرت أوصل لإعادة الشحن — كمّل يدوياً"
                    : "سداد: وقفت عند العداد " + (idx + 1) + " — كمّل يدوياً وراجع قبل الاستمرار");
            return;
        }
        AccessibilityNodeInfo root = getRootInActiveWindow();
        if (root == null || root.getPackageName() == null || !"com.oneic.om".contentEquals(root.getPackageName())) return;

        if (step != lastStep) { log("الخطوة " + lastStep + " → " + step); lastStep = step; stepSince = System.currentTimeMillis(); dumped = false; }
        if (!dumped && System.currentTimeMillis() - stepSince > 5000) { dump(root); dumped = true; log("علق في الخطوة " + step + " (تم حفظ الشاشة)"); }
        if (System.currentTimeMillis() - lastAction < 900) return;

        AccessibilityNodeInfo addBtn = find(root, ADD);
        AccessibilityNodeInfo meterField = meterField(root);
        boolean onRecharge = addBtn != null && meterField != null;

        if (step == S_NAV) {
            if (onRecharge) { step = S_ADD; return; }
            // Electricity sheet: Quick Pay + Prepaid Recharge (wide rows)
            AccessibilityNodeInfo pre = findWide(root, PREPAID);
            if (pre != null && findWide(root, QUICK_PAY) != null) {
                if (tap(pre) || click(pre)) acted();
                return;
            }
            AccessibilityNodeInfo el = find(root, ELECTRICITY);
            if (el != null && find(root, WATER) != null) {
                if (click(el)) acted();
            }
            return;
        }

        if (step == S_ADD) {
            if (!onRecharge) return;
            if (idx >= jobMeters.size()) { step = S_SELECT; selTries = 0; return; }
            String m = jobMeters.get(idx);
            if (chipExists(root, m, meterField)) {
                log("أُضيف " + m);
                idx++; addTries = 0;
                return;
            }
            if (addTries > 0 && (anyLabel(root, ALREADY) || System.currentTimeMillis() - alreadyAt < 4000)) {
                alreadyAt = 0;
                log("ONEIC يقول " + m + " مضاف من قبل — أعتبره مضاف");
                setText(meterField, "");
                idx++; addTries = 0;
                return;
            }
            if (addTries >= 3) {
                log("ما انضاف " + m + " بعد 3 محاولات — أتخطاه");
                idx++; addTries = 0;
                return;
            }
            addTries++;
            if (setText(meterField, m)) {
                h.postDelayed(() -> {
                    AccessibilityNodeInfo r2 = getRootInActiveWindow();
                    AccessibilityNodeInfo b2 = r2 == null ? null : find(r2, ADD);
                    if (b2 != null) { if (!click(b2)) tap(b2); }
                }, 400);
                lastAction = System.currentTimeMillis() + 600;
            }
            return;
        }


        if (step == S_SELECT) {
            if (!onRecharge) return;
            if (selTries == 0) { dump(root); log("حفظت شاشة العدادات"); }
            if (selTries++ > 12) { log("تحديد: وصلت الحد"); step = S_AMOUNT; return; }
            // 1) select every job meter chip that is not selected
            for (String m : jobMeters) {
                AccessibilityNodeInfo c = chip(root, m, meterField);
                if (c == null) { log("ما لقيت كرت " + m); continue; }
                if (!isOn(c)) {
                    log("أحدد " + m);
                    c.performAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_SHOW_ON_SCREEN.getId());
                    if (!click(c)) tap(c);
                    acted();
                    return;
                }
            }
            // 2) unselect chips that are not part of this job
            for (AccessibilityNodeInfo c : allChips(root, meterField)) {
                String v = meterOf(c);
                if (v != null && !jobMeters.contains(v) && isOn(c)) {
                    log("ألغي تحديد " + v);
                    c.performAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_SHOW_ON_SCREEN.getId());
                    if (!click(c)) tap(c);
                    acted();
                    return;
                }
            }
            log("التحديد جاهز");
            step = S_AMOUNT;
            return;
        }

        if (step == S_AMOUNT) {
            AccessibilityNodeInfo amt = amountField(root, meterField);
            if (amt != null) {
                if (TextUtils.isEmpty(jobAmount) || setText(amt, jobAmount)) {
                    List<String> extra = new ArrayList<>();
                    for (AccessibilityNodeInfo c : allChips(root, meterField)) {
                        String v = meterOf(c);
                        if (v != null && !jobMeters.contains(v) && isOn(c) && !extra.contains(v)) extra.add(v);
                    }
                    if (!extra.isEmpty()) {
                        finish("سداد: ⚠️ فيه عدادات زيادة في القائمة: " + extra + "\nشيلها ثم اضغط استمرار");
                        return;
                    }
                    step = S_CONT; acted();
                    return;
                }
            } else if (amountTries < 2) {
                AccessibilityNodeInfo t = amountTapTarget(root);
                if (t != null) { log("ألمس خانة المبلغ"); tap(t); }
                amountTries++;
                acted();
                return;
            }
            if (amountTries >= 2) finish("سداد: أضفت العدادات ✓ أدخل المبلغ يدوياً واضغط استمرار");
            return;
        }

        if (step == S_CONT) {
            AccessibilityNodeInfo c = find(root, CONTINUE);
            if (c == null) { if (++contTries > 6) finish("سداد: اضغط استمرار"); return; }
            if (click(c)) { step = S_WAIT; acted(); }
            return;
        }

        if (step == S_WAIT) {
            // left the recharge screen → summary page reached
            if (!onRecharge) { finish("سداد: جاهز ✓ راجع الملخص ثم اضغط استمرار للدفع"); return; }
            if (++contTries > 10) finish("سداد: اضغط استمرار");
        }
    }

    void acted() { lastAction = System.currentTimeMillis(); }

    /** Any node (toast/snackbar/dialog text) containing one of the keys. */
    static boolean anyLabel(AccessibilityNodeInfo root, String[] keys) {
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        for (AccessibilityNodeInfo n : l) {
            String t = label(n).toLowerCase(Locale.ROOT);
            if (t.isEmpty() || t.length() > 200) continue;
            for (String k : keys) if (t.contains(k.toLowerCase(Locale.ROOT))) return true;
        }
        return false;
    }

    // ---------- screen helpers ----------

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
            if (t.equals(kk) || t.startsWith(kk + " ") || (t.contains(kk) && t.length() < kk.length() + 25)) return true;
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

    int screenW() {
        DisplayMetrics dm = getResources().getDisplayMetrics();
        return dm.widthPixels;
    }

    /** Rows of the bottom sheet span almost the whole width (unlike the side drawer). */
    AccessibilityNodeInfo findWide(AccessibilityNodeInfo root, String[] keys) {
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        int w = screenW();
        for (AccessibilityNodeInfo n : l) {
            if (!n.isVisibleToUser() || !matches(label(n), keys)) continue;
            AccessibilityNodeInfo p = n;
            for (int i = 0; i < 4 && p != null; i++) {
                Rect r = new Rect(); p.getBoundsInScreen(r);
                if (r.width() > w * 0.8 && r.height() < w * 0.5) return p;
                p = p.getParent();
            }
        }
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

    /** The meter field is the top-most text field on the recharge screen. */
    static AccessibilityNodeInfo meterField(AccessibilityNodeInfo root) {
        List<AccessibilityNodeInfo> e = edits(root);
        AccessibilityNodeInfo best = null; int top = Integer.MAX_VALUE;
        for (AccessibilityNodeInfo n : e) {
            Rect r = new Rect(); n.getBoundsInScreen(r);
            if (r.top < top) { top = r.top; best = n; }
        }
        return best;
    }

    static AccessibilityNodeInfo amountField(AccessibilityNodeInfo root, AccessibilityNodeInfo meter) {
        Rect mr = new Rect(); if (meter != null) meter.getBoundsInScreen(mr);
        for (AccessibilityNodeInfo n : edits(root)) {
            Rect r = new Rect(); n.getBoundsInScreen(r);
            if (meter != null && r.equals(mr)) continue;
            return n;
        }
        return null;
    }

    /** A short number (the amount) in the middle of the screen, below the meter field. */
    static AccessibilityNodeInfo amountTapTarget(AccessibilityNodeInfo root) {
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        for (AccessibilityNodeInfo n : l) {
            String lb = label(n);
            if (n.isVisibleToUser() && lb.matches("\\d{1,4}(\\.\\d+)?")) return n;
        }
        return null;
    }

    static final Pattern METER = Pattern.compile("\\d{8,12}");

    static boolean chipExists(AccessibilityNodeInfo root, String m, AccessibilityNodeInfo field) {
        Rect fr = new Rect(); if (field != null) field.getBoundsInScreen(fr);
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        for (AccessibilityNodeInfo n : l) {
            if (n.isEditable()) continue;
            Rect r = new Rect(); n.getBoundsInScreen(r);
            if (field != null && Rect.intersects(r, fr) && r.height() < fr.height() * 2) continue;
            if (label(n).contains(m)) return true;
        }
        return false;
    }

    List<String> extraChips(AccessibilityNodeInfo root, AccessibilityNodeInfo field) {
        List<String> out = new ArrayList<>();
        List<AccessibilityNodeInfo> l = new ArrayList<>();
        all(root, l);
        for (AccessibilityNodeInfo n : l) {
            if (n.isEditable()) continue;
            Matcher mt = METER.matcher(label(n));
            while (mt.find()) {
                String v = mt.group();
                if (jobMeters != null && !jobMeters.contains(v) && !out.contains(v)) out.add(v);
            }
        }
        return out;
    }


    // ---------- chips ----------

    static String meterOf(AccessibilityNodeInfo n) {
        Matcher mt = METER.matcher(label(n));
        return mt.find() ? mt.group() : null;
    }

    /** Smallest non-editable node that shows the meter number (the chip), lifted to its clickable container. */
    static AccessibilityNodeInfo chip(AccessibilityNodeInfo root, String m, AccessibilityNodeInfo field) {
        for (AccessibilityNodeInfo c : allChips(root, field)) if (m.equals(meterOf(c))) return c;
        return null;
    }

    static List<AccessibilityNodeInfo> allChips(AccessibilityNodeInfo root, AccessibilityNodeInfo field) {
        Rect fr = new Rect(); if (field != null) field.getBoundsInScreen(fr);
        List<AccessibilityNodeInfo> l = new ArrayList<>(), out = new ArrayList<>();
        all(root, l);
        List<String> seen = new ArrayList<>();
        for (AccessibilityNodeInfo n : l) {
            if (n.isEditable()) continue;
            String lb = label(n);
            Matcher mt = METER.matcher(lb);
            if (!mt.find()) continue;
            if (lb.length() > 60) continue; // container listing many chips
            Rect r = new Rect(); n.getBoundsInScreen(r);
            if (field != null && Rect.intersects(r, fr) && r.height() < fr.height() * 2) continue;
            String v = mt.group();
            if (seen.contains(v)) continue;
            seen.add(v);
            AccessibilityNodeInfo p = n;
            for (int i = 0; i < 3 && p != null && !p.isClickable() && !p.isCheckable(); i++) p = p.getParent();
            out.add(p != null && (p.isClickable() || p.isCheckable()) ? p : n);
        }
        return out;
    }

    static boolean isOn(AccessibilityNodeInfo c) {
        if (c.isChecked() || c.isSelected()) return true;
        String lb = label(c).toLowerCase(Locale.ROOT);
        if (lb.contains("selected") && !lb.contains("not selected") && !lb.contains("unselected")) return true;
        if (lb.contains("محدد") && !lb.contains("غير محدد")) return true;
        for (int i = 0; i < c.getChildCount(); i++) {
            AccessibilityNodeInfo k = c.getChild(i);
            if (k != null && (k.isChecked() || k.isSelected())) return true;
        }
        return false;
    }

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
                    .append(n.isClickable() ? " [click]" : "").append(ed ? " [edit]" : "").append(n.isCheckable() ? " [checkable]" : "").append(n.isChecked() ? " [checked]" : "").append(n.isSelected() ? " [selected]" : "")
                    .append(n.isVisibleToUser() ? "" : " [hidden]")
                    .append(" \"").append(lb.length() > 60 ? lb.substring(0, 60) : lb).append("\" ")
                    .append(r.toShortString()).append('\n');
            if (++k > 90) break;
        }
        lastDump = b.toString();
    }

    // ---------- actions ----------

    boolean setText(AccessibilityNodeInfo n, String text) {
        n.performAction(AccessibilityNodeInfo.ACTION_FOCUS);
        n.performAction(AccessibilityNodeInfo.ACTION_CLICK);
        Bundle a = new Bundle();
        a.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, text);
        boolean ok = n.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, a);
        log("كتابة \"" + text + "\": " + (ok ? "نجح" : "فشل"));
        return ok;
    }

    boolean tap(AccessibilityNodeInfo n) {
        Rect r = new Rect();
        n.getBoundsInScreen(r);
        if (r.isEmpty()) return false;
        log("لمس \"" + label(n) + "\" عند " + r.centerX() + "," + r.centerY());
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
        return tap(n);
    }
}
