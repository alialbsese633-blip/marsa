const MARSA = 'https://alialbsese633-blip.github.io/marsa/cs.html?embed=1';
const f = document.getElementById('f');
let last = null;
f.src = MARSA;
const push = () => { if (last && f.contentWindow) f.contentWindow.postMessage({ marsa: 'chat', phone: last.phone, name: last.name }, '*'); };
f.addEventListener('load', push);

/* رقم المحادثة المفتوحة في واتساب → مرسى */
chrome.runtime.onMessage.addListener((m) => { if (m && m.type === 'chat') { last = m; push(); } });

async function waTab() {
  const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });
  return tabs.find(t => t.active) || tabs[0] || null;
}
/* أوامر مرسى → واتساب */
window.addEventListener('message', async (e) => {
  const d = e.data || {};
  if (e.source !== f.contentWindow) return;
  if (d.marsa === 'insert') {
    const t = await waTab();
    if (!t) { alert('افتح واتساب ويب في تبويب أولاً (web.whatsapp.com)'); return; }
    chrome.tabs.sendMessage(t.id, { insert: d.text }, (r) => {
      if (chrome.runtime.lastError || !r || !r.ok) alert('افتح محادثة في واتساب أولاً ثم أعد المحاولة');
    });
  } else if (d.marsa === 'openchat') {
    const t = await waTab();
    const url = 'https://web.whatsapp.com/send?phone=' + encodeURIComponent(d.phone);
    if (t) chrome.tabs.update(t.id, { url, active: true }); else chrome.tabs.create({ url });
  } else if (d.marsa === 'call') {
    const a = document.createElement('a'); a.href = 'tel:+' + d.phone; document.body.appendChild(a); a.click(); a.remove();
  }
});
