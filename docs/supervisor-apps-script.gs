/**
 * قاعدة بيانات صفحة الإشراف العام – نسائم صلالة
 * تُلصق في: Google Sheet ← الإضافات (Extensions) ← Apps Script
 * غيّر أرقام الدخول أدناه قبل النشر. لا تشارك هذا الملف بعد وضع الأرقام.
 */
const PINS = {
  '0000': { role: 'admin',      name: 'علي البسيسي' },     // ← غيّر الرقم
  '1111': { role: 'supervisor', name: 'عبدالسلام حامد' },  // ← غيّر الرقم
  '2222': { role: 'manager',    name: 'وضاح عبدالرقيب' },  // ← غيّر الرقم (أو احذف السطر)
  '3333': { role: 'marketing',  name: 'عبدالسلام البسيسي' } // ← غيّر الرقم – التسويق
};

function doGet() { return out({ ok: true, app: 'Nassayem Supervisor API' }); }

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const user = PINS[String(req.pin || '')];
    if (!user) return out({ ok: false, error: 'pin' });
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (req.action === 'load') {
      const cur = readData(ss);
      return out({ ok: true, user: user, rev: cur.rev, data: cur.data });
    }
    if (req.action === 'save') {
      const cur = readData(ss);
      if (cur.rev && req.rev !== cur.rev) {
        return out({ ok: false, error: 'conflict', user: user, rev: cur.rev, data: cur.data });
      }
      try { queueChanges(cur.data, req.data, user); } catch (e) {}
      const rev = Utilities.getUuid();
      writeData(ss, req.data, rev);
      writeTasks(ss, req.data);
      log(ss, user, req.note || 'حفظ');
      return out({ ok: true, rev: rev });
    }
    return out({ ok: false, error: 'action' });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function sheet(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }

/* البيانات الكاملة تُحفظ مشفّرة Base64 مقسّمة على صفوف (حد الخلية 50 ألف حرف) */
function readData(ss) {
  const s = sheet(ss, 'data');
  const last = s.getLastRow();
  if (last < 2) return { rev: '', data: null };
  const rev = String(s.getRange(1, 2).getValue() || '');
  const b64 = s.getRange(2, 1, last - 1, 1).getValues().map(function (r) { return r[0]; }).join('');
  if (!b64) return { rev: rev, data: null };
  const json = Utilities.newBlob(Utilities.base64Decode(b64)).getDataAsString('UTF-8');
  return { rev: rev, data: JSON.parse(json) };
}
function writeData(ss, data, rev) {
  const s = sheet(ss, 'data');
  const b64 = Utilities.base64Encode(JSON.stringify(data), Utilities.Charset.UTF_8);
  const parts = [];
  for (let i = 0; i < b64.length; i += 40000) parts.push([b64.slice(i, i + 40000)]);
  s.clear();
  s.getRange('A:B').setNumberFormat('@');
  s.getRange(1, 1, 1, 2).setValues([['rev', rev]]);
  if (parts.length) s.getRange(2, 1, parts.length, 1).setValues(parts);
}

/* نسخة مقروءة من المهام لعرضها في الشيت */
function writeTasks(ss, data) {
  const s = sheet(ss, 'المهام');
  const rows = [['يوم التنفيذ', 'البناية', 'المهمة', 'التفاصيل', 'المنفّذ', 'النوع', 'الحالة']];
  ((data && data.actions) || []).slice().sort(function (a, b) { return String(a.date || '9').localeCompare(String(b.date || '9')); })
    .forEach(function (a) {
      rows.push([a.date || '', a.b || '', a.t || '', a.d || '', (a.exec || []).join('، '), a.kind || '', a.s || '']);
    });
  s.clear();
  s.getRange(1, 1, rows.length, rows[0].length).setNumberFormat('@').setValues(rows);
  s.getRange(1, 1, 1, rows[0].length).setFontWeight('bold').setBackground('#e6f3f2');
  s.setFrozenRows(1);
  s.setRightToLeft(true);
}
function log(ss, user, note) {
  const s = sheet(ss, 'السجل');
  if (s.getLastRow() === 0) s.appendRow(['التاريخ', 'المستخدم', 'العملية']);
  s.appendRow([new Date(), user.name, note]);
  if (s.getLastRow() > 3000) s.deleteRows(2, 1000);
}
