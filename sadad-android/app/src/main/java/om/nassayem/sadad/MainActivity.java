package om.nassayem.sadad;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends Activity {
    static final String ONEIC = "com.oneic.om";
    WebView web;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        web.addJavascriptInterface(new Bridge(), "Android");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                return handle(r.getUrl().toString());
            }
        });
        setContentView(web);
        if (b != null) web.restoreState(b);
        else web.loadUrl("file:///android_asset/index.html");
    }

    boolean handle(String url) {
        if (url.startsWith("file:")) return false;
        if (url.startsWith("intent:") || url.startsWith("market:") || url.contains("com.oneic.om")) {
            openOneic();
            return true;
        }
        try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); } catch (Exception e) { }
        return true;
    }

    void openOneic() {
        Intent i = getPackageManager().getLaunchIntentForPackage(ONEIC);
        if (i != null) {
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(i);
        } else {
            Toast.makeText(this, "تطبيق ONEIC غير مثبت", Toast.LENGTH_LONG).show();
            try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + ONEIC))); }
            catch (Exception e) { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + ONEIC))); }
        }
    }

    class Bridge {
        @JavascriptInterface
        public void copy(String text) {
            runOnUiThread(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                cm.setPrimaryClip(ClipData.newPlainText("meter", text));
            });
        }
        @JavascriptInterface
        public String diag() { return OneicService.diag(); }
        @JavascriptInterface
        public boolean autoReady() { return OneicService.isEnabled(MainActivity.this); }
        @JavascriptInterface
        public void startPay(String meter, String amount) {
            runOnUiThread(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                cm.setPrimaryClip(ClipData.newPlainText("meter", meter));
                if (OneicService.isEnabled(MainActivity.this)) OneicService.start(meter, amount);
                openOneic();
            });
        }
        @JavascriptInterface
        public void startBatch(String metersCsv, String amount) {
            runOnUiThread(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                cm.setPrimaryClip(ClipData.newPlainText("meters", metersCsv.replace(",", "\n")));
                if (OneicService.isEnabled(MainActivity.this)) OneicService.start(metersCsv, amount);
                openOneic();
            });
        }
        @JavascriptInterface
        public void openAccessibility() {
            runOnUiThread(() -> {
                try { startActivity(new Intent(android.provider.Settings.ACTION_ACCESSIBILITY_SETTINGS)); } catch (Exception e) { }
            });
        }
        @JavascriptInterface
        public void openAppInfo() {
            runOnUiThread(() -> {
                try { startActivity(new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + getPackageName()))); } catch (Exception e) { }
            });
        }
        @JavascriptInterface
        public void open() { runOnUiThread(() -> openOneic()); }
        @JavascriptInterface
        public void copyAndOpen(String text) {
            runOnUiThread(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                cm.setPrimaryClip(ClipData.newPlainText("meter", text));
                openOneic();
            });
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.evaluateJavascript("window.onNativeResume&&onNativeResume()", null);
    }

    @Override
    protected void onSaveInstanceState(Bundle o) { super.onSaveInstanceState(o); web.saveState(o); }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(function(){var b=document.getElementById('back');if(b&&b.style.display!=='none'){b.click();return 1}return 0})()",
            r -> { if (!"1".equals(r)) MainActivity.super.onBackPressed(); });
    }
}
