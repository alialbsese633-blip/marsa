/**
 * إشعارات صفحة الإشراف العام عبر Gmail – نسائم صلالة
 * ملف إضافي في نفس مشروع Apps Script (اسمه: Notify)
 *
 * ما يرسله:
 *  1) تحديثات المهام (إضافة / إنجاز / نقل يوم / تغيير منفّذ / حذف) مجمّعة في رسالة واحدة كل ~5 دقائق
 *  2) تنبيه صباحي 8:00: مهام اليوم والمتأخرة
 *  3) تنبيه ظهراً 2:00: ما لم يُنجز من مهام اليوم والمتأخرة
 *  (لا شيء يُرسل يوم الجمعة)
 */
const NOTIFY = {
  PAGE_URL: 'https://alialbsese633-blip.github.io/marsa/supervisor.html',
  TZ: 'Asia/Muscat',
  /* ضع البريد بين علامتي التنصيص لتفعيل الإشعارات لذلك الشخص. اتركه فارغاً '' لإيقافها. */
  EMAILS: {
    supervisor: 'bdalslamhfzaldyn@gmail.com',  // عبدالسلام حامد (مفعّل للتجربة)
    admin: '',                                   // علي البسيسي (اكتب بريدك لاحقاً)
    manager: 'nssayemsalalah@gmail.com'            // وضاح عبدالرقيب (البريد المشترك مؤقتاً، يُغيَّر لاحقاً)
  }
};

/* من يصله إشعار عندما يعدّل شخص معيّن */
function recipientsFor(actorRole) {
  if (actorRole === 'supervisor') return ['admin', 'manager'];
  if (actorRole === 'manager') return ['admin', 'supervisor'];
  if (actorRole === 'admin') return ['supervisor'];
  return [];
}

/* ===== 1) رصد التغييرات عند الحفظ (يُستدعى من doPost) ===== */
function queueChanges(oldData, newData, user) {
  const recips = recipientsFor(user.role).filter(function (r) { return NOTIFY.EMAILS[r]; });
  if (!recips.length) return;
  const oldA = {};
  ((oldData && oldData.actions) || []).forEach(function (a) { oldA[a.id] = a; });
  const newA = (newData && newData.actions) || [];
  const now = new Date(), rows = [], seen = {};
  function row(id, type, extra) { rows.push([now, user.role, user.name, id, type, extra || '', '']); }
  newA.forEach(function (a) {
    seen[a.id] = 1;
    const o = oldA[a.id];
    if (!o) { row(a.id, 'new'); return; }
    if ((o.s || '') !== (a.s || '')) row(a.id, 'status', o.s || '');
    if ((o.date || '') !== (a.date || '')) row(a.id, 'date', o.date || '');
    if (JSON.stringify(o.exec || []) !== JSON.stringify(a.exec || [])) row(a.id, 'exec');
    const ol = (o.log || []).length, nl = (a.log || []).length;
    if (nl > ol) a.log.slice(ol).forEach(function (L) { row(a.id, 'log', (L.by || '') + ': ' + (L.t || '')); });
    if ((o.note || '') !== (a.note || '') && a.note) row(a.id, 'note');
  });
  Object.keys(oldA).forEach(function (id) { if (!seen[id]) row(id, 'deleted', oldA[id].t || ''); });
  if (!rows.length) return;
  const s = queueSheet();
  s.getRange(s.getLastRow() + 1, 1, rows.length, 7).setValues(rows);
}
function queueSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const s = ss.getSheetByName('الإشعارات') || ss.insertSheet('الإشعارات');
  if (s.getLastRow() === 0) s.appendRow(['الوقت', 'الدور', 'من', 'رقم المهمة', 'النوع', 'تفصيل', 'أُرسل']);
  return s;
}

/* ===== إرسال التحديثات المجمّعة (كل 5 دقائق) ===== */
function processQueue() {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const s = queueSheet();
    const last = s.getLastRow();
    if (last < 2) return;
    const vals = s.getRange(2, 1, last - 1, 7).getValues();
    const now = new Date().getTime();
    const ready = [];
    vals.forEach(function (r, i) {
      if (r[6]) return;
      if (now - new Date(r[0]).getTime() < 90000) return;   // انتظر 90 ثانية حتى ينتهي من الكتابة
      ready.push({ row: i + 2, role: r[1], name: r[2], id: r[3], type: r[4], extra: r[5] });
    });
    if (!ready.length) return;
    const cur = byId((readData(SpreadsheetApp.getActiveSpreadsheet()).data || {}).actions || []);
    const per = {};
    ready.forEach(function (ev) {
      recipientsFor(ev.role).forEach(function (rc) {
        if (NOTIFY.EMAILS[rc]) (per[rc] = per[rc] || []).push(ev);
      });
    });
    Object.keys(per).forEach(function (rc) {
      const items = digestItems(per[rc], cur);
      if (!items.length) return;
      const html = items.map(function (it) {
        return '<div style="border:1px solid #dfe9e8;border-radius:10px;padding:10px 12px;margin:8px 0">' +
          '<div style="font-size:15px;font-weight:bold;color:#1a5d5b">' + it.icon + ' ' + esc(it.title) + '</div>' +
          (it.meta ? '<div style="font-size:13px;color:#444;margin-top:4px">' + esc(it.meta) + '</div>' : '') +
          '<div style="font-size:12px;color:#888;margin-top:4px">بواسطة: ' + esc(it.by) + '</div></div>';
      }).join('');
      sendMail(rc, 'نسائم صلالة | تحديثات المهام (' + items.length + ')', wrap('تحديثات على المهام', html));
    });
    ready.forEach(function (ev) { s.getRange(ev.row, 7).setValue('✓'); });
    // تنظيف: إذا أُرسل الكل نحذف الصفوف القديمة
    const after = s.getRange(2, 7, s.getLastRow() - 1, 1).getValues();
    if (after.every(function (r) { return r[0]; }) && s.getLastRow() > 200) s.deleteRows(2, s.getLastRow() - 1);
  } finally { lock.releaseLock(); }
}

function digestItems(events, cur) {
  const group = {}, order = [];
  events.forEach(function (e) { if (!group[e.id]) { group[e.id] = []; order.push(e.id); } group[e.id].push(e); });
  const out = [];
  order.forEach(function (id) {
    const evs = group[id], a = cur[id];
    const types = evs.map(function (e) { return e.type; });
    const by = uniq(evs.map(function (e) { return e.name; })).join('، ');
    if (!a) {                                         // محذوفة
      if (types.indexOf('new') >= 0) return;          // أُضيفت ثم حُذفت
      const d = evs.filter(function (e) { return e.type === 'deleted'; })[0];
      if (d) out.push({ icon: '🗑', title: 'حُذفت المهمة: ' + (d.extra || '—'), meta: '', by: by });
      return;
    }
    if (!String(a.t || '').trim()) return;            // لم يكتب عنوانها بعد
    if (types.indexOf('new') >= 0) {
      out.push({ icon: '➕', title: 'مهمة جديدة: ' + a.t, meta: metaOf(a), by: by });
      return;
    }
    const parts = [];
    if (types.indexOf('status') >= 0) parts.push(a.s === 'تم' ? '✅ أُنجزت' : '🔄 الحالة: ' + a.s);
    if (types.indexOf('date') >= 0) parts.push('📅 يوم التنفيذ: ' + dlabel(a.date));
    if (types.indexOf('exec') >= 0) parts.push('👷 المنفّذ: ' + ((a.exec || []).join('، ') || '—'));
    if (types.indexOf('note') >= 0) parts.push('📝 ملاحظة: ' + a.note);
    evs.filter(function (e) { return e.type === 'log'; }).forEach(function (e) { parts.push('💬 ' + e.extra); });
    if (parts.length) out.push({ icon: '•', title: a.t, meta: parts.join('  ·  '), by: by });
  });
  return out;
}

/* ===== التنبيهات المجدولة ===== */
function morning() { alertRun(true); }      // 8:00
function afternoon() { alertRun(false); }   // 14:00
function alertRun(isMorning) {
  const ymd = Utilities.formatDate(new Date(), NOTIFY.TZ, 'yyyy-MM-dd');
  if (Utilities.formatDate(new Date(), NOTIFY.TZ, 'u') === '5') return;   // الجمعة إجازة
  const data = readData(SpreadsheetApp.getActiveSpreadsheet()).data || {};
  const open = (data.actions || []).filter(function (a) { return a.s !== 'تم' && String(a.t || '').trim(); });
  const late = open.filter(function (a) { return a.date && a.date < ymd; });
  const today = open.filter(function (a) { return a.date === ymd; });
  function list(arr) { return arr.map(function (a) {
    return '<div style="border:1px solid #dfe9e8;border-radius:10px;padding:8px 12px;margin:6px 0"><b style="color:#1a5d5b">' + esc(a.t) + '</b>' +
      '<div style="font-size:13px;color:#444;margin-top:3px">' + esc(metaOf(a)) + '</div></div>'; }).join(''); }
  const lateHtml = late.length ? '<h3 style="color:#b3261e;margin:16px 0 4px">⚠ مهام متأخرة (' + late.length + ')</h3>' + list(late) : '';
  const todayHtml = today.length ? '<h3 style="color:#1a5d5b;margin:16px 0 4px">📋 مهام اليوم (' + today.length + ')</h3>' + list(today) : '';
  const dayName = dlabel(ymd);

  if (NOTIFY.EMAILS.supervisor && (late.length || today.length)) {
    sendMail('supervisor',
      (isMorning ? '☀ مهامك اليوم – ' : '🔔 تذكير – ') + dayName + (late.length ? ' (متأخر: ' + late.length + ')' : ''),
      wrap(isMorning ? 'صباح الخير، هذه مهامك لليوم' : 'ما زالت هذه المهام لم تُنجز', todayHtml + lateHtml));
  }
  if (late.length) {
    ['admin', 'manager'].forEach(function (rc) {
      if (rc === 'manager' && isMorning === false) return;   // المدير: إنذار صباحي فقط
      if (NOTIFY.EMAILS[rc]) sendMail(rc, '⚠ إنذار: ' + late.length + ' مهام متأخرة – الإشراف العام', wrap('إنذار المهام المتأخرة', lateHtml));
    });
  }
}

/* ===== التشغيل لمرة واحدة: شغّل setup من القائمة ===== */
function setup() {
  const mine = ['processQueue', 'morning', 'afternoon'];
  ScriptApp.getProjectTriggers().forEach(function (t) { if (mine.indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('processQueue').timeBased().everyMinutes(5).create();
  ScriptApp.newTrigger('morning').timeBased().atHour(8).nearMinute(0).everyDays(1).inTimezone(NOTIFY.TZ).create();
  ScriptApp.newTrigger('afternoon').timeBased().atHour(14).nearMinute(0).everyDays(1).inTimezone(NOTIFY.TZ).create();
  queueSheet();
}

/* رسالة تجريبية لكل من فُعّل بريده */
function testEmail() {
  const body = '<p style="font-size:15px">هذه رسالة تجريبية من صفحة الإشراف العام. إذا وصلتك فالإشعارات تعمل.</p>' +
    '<div style="border:1px solid #dfe9e8;border-radius:10px;padding:10px 12px"><b style="color:#1a5d5b">➕ مهمة جديدة: مثال تجريبي</b>' +
    '<div style="font-size:13px;color:#444;margin-top:4px">الحي التجاري · الاثنين 16/11 · المنفّذ: أبو رياض</div></div>';
  ['supervisor', 'admin', 'manager'].forEach(function (rc) {
    if (NOTIFY.EMAILS[rc]) sendMail(rc, 'نسائم صلالة | رسالة تجريبية', wrap('تجربة الإشعارات', body));
  });
}

/* ===== أدوات ===== */
function sendMail(role, subject, html) {
  const to = NOTIFY.EMAILS[role];
  if (!to) return;
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: html, name: 'نسائم صلالة – الإشراف العام' });
}
function wrap(title, inner) {
  return '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;max-width:560px;margin:auto;background:#f2f6f6;padding:14px">' +
    '<div style="background:linear-gradient(135deg,#123f3e,#2b8c89);color:#fff;border-radius:12px 12px 0 0;padding:16px 18px">' +
    '<div style="font-size:17px;font-weight:bold">' + esc(title) + '</div>' +
    '<div style="font-size:12px;color:#c9a96e;margin-top:3px">نسائم صلالة · حيث تسكن الراحة</div></div>' +
    '<div style="background:#fff;padding:14px 16px;border-radius:0 0 12px 12px">' + inner +
    '<div style="text-align:center;margin-top:18px"><a href="' + NOTIFY.PAGE_URL + '" style="background:#1a5d5b;color:#fff;text-decoration:none;padding:10px 22px;border-radius:10px;font-size:14px">فتح صفحة الإشراف العام</a></div></div></div>';
}
function metaOf(a) {
  const p = [shortB(a.b), dlabel(a.date)];
  if ((a.exec || []).length) p.push('المنفّذ: ' + a.exec.join('، '));
  return p.filter(Boolean).join(' · ');
}
function shortB(b) { return String(b || '').replace('صلالة الوسطى / ', '').replace(' الشمالية', ''); }
function dlabel(s) {
  if (!s) return 'بدون موعد';
  const p = String(s).split('-'); if (p.length < 3) return s;
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  return days[new Date(+p[0], +p[1] - 1, +p[2]).getDay()] + ' ' + (+p[2]) + '/' + (+p[1]);
}
function byId(arr) { const o = {}; arr.forEach(function (a) { o[a.id] = a; }); return o; }
function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
