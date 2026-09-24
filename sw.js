/* Service Worker — يجعل التطبيق يفتح بسرعة وحتى بدون إنترنت.
   الصفحة نفسها: الشبكة أولاً (لتصلك آخر نسخة دائماً) ثم النسخة المحفوظة عند انقطاع الاتصال.
   طلبات قاعدة البيانات (Google) لا تمرّ من هنا أبداً. */
const V = "ns-v17";
const FONTS = 'td-fonts-v1';
const SHELL = ['./', 'index.html', 'training.html', 'hr.html', 'ess.html', 'hr-config.js', 'config.js', 'manifest.webmanifest',
  'icons/marsa-mark-white.png', 'icons/marsa-lockup.png', 'icons/marsa-lockup-white.png', 'marsa-training.css',
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

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(V).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
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
