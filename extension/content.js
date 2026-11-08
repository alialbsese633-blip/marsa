/* يعمل داخل واتساب ويب: يقرأ رقم واسم المحادثة المفتوحة، ويُدخل النص في خانة الكتابة (بدون إرسال) */
(function () {
  let key = '';
  function current() {
    const main = document.querySelector('#main');
    if (!main) return null;
    let phone = '';
    const rows = main.querySelectorAll('[data-id]');
    for (const r of rows) {
      const m = /(\d{7,15})@c\.us/.exec(r.getAttribute('data-id') || '');
      if (m) { phone = m[1]; break; }
    }
    const h = main.querySelector('header span[title]');
    let name = h ? (h.getAttribute('title') || h.textContent || '').trim() : '';
    if (!phone && /^[+\d\s()-]{7,}$/.test(name)) phone = name.replace(/\D/g, '');
    return { phone, name: phone && name.replace(/\D/g, '') === phone ? '' : name };
  }
  setInterval(() => {
    const c = current();
    const k = c ? c.phone + '|' + c.name : '';
    if (k === key) return;
    key = k;
    if (c) { try { chrome.runtime.sendMessage({ type: 'chat', phone: c.phone, name: c.name }, () => void chrome.runtime.lastError); } catch (e) {} }
  }, 1000);

  chrome.runtime.onMessage.addListener((m, s, reply) => {
    if (!m || typeof m.insert !== 'string') return;
    const box = document.querySelector('#main footer [contenteditable="true"]') || document.querySelector('footer [contenteditable="true"]');
    if (!box) { reply({ ok: false }); return; }
    box.focus();
    const dt = new DataTransfer();
    dt.setData('text/plain', m.insert);
    const ok = box.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
    if (ok) document.execCommand('insertText', false, m.insert);
    reply({ ok: true });
  });
})();
