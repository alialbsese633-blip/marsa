/* Service Worker — يجعل التطبيق يفتح بسرعة وحتى بدون إنترنت.
   الصفحة نفسها: الشبكة أولاً (لتصلك آخر نسخة دائماً) ثم النسخة المحفوظة عند انقطاع الاتصال.
   طلبات قاعدة البيانات (Google) لا تمرّ من هنا أبداً. */
const V = "ns-v71";
const FONTS = 'td-fonts-v1';
/* نحفظ مسبقاً الواجهة الأساسية فقط؛ بقية الصفحات والمكتبات تُحفظ عند أول استخدام (حتى لا يُعاد تنزيل ميغابايتات مع كل تحديث) */
const SHELL = ['./', 'index.html', 'hr.html', 'hr-config.js', 'config.js', 'manifest.webmanifest',
  'icons/marsa-mark-white.png', 'icons/marsa-lockup.png', 'icons/marsa-lockup-white.png',
  'icons/m3-192.png', 'icons/m3-512.png', 'icons/m3-apple-180.png', 'icons/logo-full.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTS).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  if (url.origin !== location.origin) return;   // الخادم، يوتيوب…: مباشرة من الشبكة

  const isDoc = req.mode === 'navigate' || /\.html?$|\/$|config\.js$|\.webmanifest$/.test(url.pathname);
  if (isDoc) {
    /* الصفحات: الشبكة أولاً لتصلك آخر نسخة، لكن إن تأخرت الشبكة أكثر من 3 ثوانٍ تُفتح النسخة المحفوظة فوراً */
    e.respondWith(new Promise((resolve) => {
      let done = false;
      const fromCache = () => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('hr.html') : r));
      const net = fetch(req, { cache: 'no-cache' }).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(V).then((c) => c.put(req, copy)); }
        if (!done) { done = true; resolve(res); }
      }).catch(() => { if (!done) { fromCache().then((r) => { done = true; resolve(r || Response.error()); }); } });
      setTimeout(() => { if (done) return; fromCache().then((r) => { if (r && !done) { done = true; resolve(r); } }); }, 3000);
      e.waitUntil(net);
    }));
    return;
  }
  /* الصور والمكتبات: من الذاكرة فوراً، وتُحدَّث في الخلفية */
  e.respondWith(caches.open(V).then((c) => c.match(req, { ignoreSearch: true }).then((hit) => {
    const net = fetch(req).then((res) => { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
    if (hit) { e.waitUntil(net); return hit; }
    return net;
  })));
});

// النقر على إشعار الجهاز يفتح قسم التدريب (أو يعيد التطبيق للواجهة إن كان مفتوحاً)
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('training.html');
    })
  );
});
