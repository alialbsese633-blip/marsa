/* تطوير علي — محتوى البرنامج (إنجليزي + ذكاء اصطناعي + استثمار)
   من إعداد Claude. كل أسبوع: 5 دروس (السبت–الأربعاء) + اختبار شامل يوم الخميس.
   لإضافة أسبوع جديد: أضف عنصراً في WEEKS بنفس الشكل. */
window.ALIDEV = {
  title: "تطوير علي",
  student: { ar: "علي البسيسي", en: "Ali Al Busaisi" },
  pass: 70,            // نسبة النجاح في كل اختبار
  split: [            // تقسيم الـ 90 دقيقة
    { k: "en", ar: "الإنجليزي", min: 40, c: "#3B5B8C", ic: "🇬🇧" },
    { k: "ai", ar: "الذكاء الاصطناعي", min: 30, c: "#287070", ic: "🤖" },
    { k: "inv", ar: "الاستثمار", min: 20, c: "#8A6A1E", ic: "📈" }
  ],
  phases: [
    { n: 1, ar: "المرحلة الأولى: الأساسيات", weeks: [1, 2, 3, 4] },
    { n: 2, ar: "المرحلة الثانية: التطبيق في العمل", weeks: [5, 6, 7, 8] },
    { n: 3, ar: "المرحلة الثالثة: المشروع والمحفظة", weeks: [9, 10, 11, 12] }
  ],
  outline: [
    { w: 1, en: "الأزمنة الأساسية + مفردات AI والمال", ai: "ما هو الذكاء الاصطناعي وكتابة الأوامر", inv: "الدخل والميزانية والفائدة المركبة" },
    { w: 2, en: "المقارنة، الشرط، المبني للمجهول، الإيميل", ai: "كيف تتدرب النماذج وتقنيات الأوامر", inv: "الأهداف، البنوك، الديون، الأسهم" },
    { w: 3, en: "مفردات الاجتماعات والتقارير", ai: "الذكاء الاصطناعي في Excel وتحليل الجداول", inv: "قراءة القوائم المالية للشركات" },
    { w: 4, en: "مراجعة + محادثة قصيرة", ai: "مشروع صغير: مكتبة أوامر لعملك", inv: "الصناديق والصكوك والذهب" },
    { w: 5, en: "إيميلات العمل المتقدمة", ai: "أتمتة المهام: Apps Script بمساعدة AI", inv: "سوق مسقط: كيف تفتح حساباً وتشتري" },
    { w: 6, en: "التفاوض والطلبات الرسمية", ai: "تحليل البيانات بالذكاء الاصطناعي", inv: "التحليل الأساسي: الربحية والتوزيعات" },
    { w: 7, en: "كتابة التقارير", ai: "بناء أدوات صغيرة (صفحات ويب) بالـ AI", inv: "إدارة المخاطر والتنويع" },
    { w: 8, en: "مراجعة المرحلة الثانية", ai: "وكلاء الذكاء الاصطناعي (Agents)", inv: "بناء خطة ادخار واستثمار شهرية" },
    { w: 9, en: "العروض التقديمية", ai: "اختيار فكرة مشروع التخرج", inv: "محفظة تجريبية: الاختيار" },
    { w: 10, en: "المقابلات الوظيفية", ai: "تنفيذ المشروع (1)", inv: "محفظة تجريبية: المتابعة" },
    { w: 11, en: "النقاش وإبداء الرأي", ai: "تنفيذ المشروع (2)", inv: "تقييم الأداء والقرارات" },
    { w: 12, en: "العرض النهائي بالإنجليزي", ai: "تسليم مشروع التخرج", inv: "تقرير المحفظة النهائي" }
  ],
  WEEKS: []
};

/* ===================== الأسبوع 1 ===================== */
ALIDEV.WEEKS.push({
  w: 1, title: "الأساسيات (1)",
  days: [
  /* ---------- اليوم 1 ---------- */
  { d: 1, title: "البداية: الحاضر البسيط والمستمر + ما هو الذكاء الاصطناعي + أساس المال",
    en: {
      topic: "Present Simple vs Present Continuous",
      body: `<p><b>الحاضر البسيط</b> للعادات والحقائق الثابتة. <b>الحاضر المستمر</b> لشيء يحدث الآن أو في هذه الفترة.</p>
<table><tr><th>الزمن</th><th>الشكل</th><th>مثال</th></tr>
<tr><td>Present Simple</td><td>I work / He works</td><td>I <b>work</b> in accounting.</td></tr>
<tr><td>Present Continuous</td><td>am/is/are + ing</td><td>I <b>am learning</b> AI this month.</td></tr></table>
<p><b>كلمات تدلك:</b> always, usually, every day ← بسيط. &nbsp; now, at the moment, this week ← مستمر.</p>
<p class="tip">⚠️ لا تقل: I am knowing. أفعال الحالة (know, like, want, need, understand) لا تأتي غالباً مع ing.</p>`,
      vocab: [
        ["algorithm", "خوارزمية (خطوات لحل مشكلة)", "The app uses an algorithm to sort tasks."],
        ["data", "بيانات", "AI learns from data."],
        ["model", "نموذج", "ChatGPT is a language model."],
        ["train", "يدرّب", "Companies train models on huge texts."],
        ["predict", "يتوقع", "The model predicts the next word."],
        ["accuracy", "دقة", "Check the accuracy of every answer."],
        ["prompt", "أمر/طلب تكتبه للذكاء الاصطناعي", "Write a clear prompt."],
        ["output", "المخرجات/النتيجة", "The output was a table."]
      ],
      reading: `Ali works as an accounting and administration coordinator. Every morning he checks the daily reports. This month he is learning English, artificial intelligence and investing. He uses AI tools to write emails and to build simple systems. At the moment, he is studying for one and a half hours a day.`,
      readingQ: "اكتب 3 جمل عن نفسك: جملة بالحاضر البسيط عن عملك اليومي، وجملتين بالحاضر المستمر عن شيء تتعلمه هذه الفترة.",
      writing: "Write 5 sentences about your daily work. Use Present Simple in 3 sentences and Present Continuous in 2."
    },
    ai: {
      topic: "ما هو الذكاء الاصطناعي؟",
      body: `<p><b>الذكاء الاصطناعي (AI):</b> برامج تتعلم من الأمثلة بدل أن نكتب لها كل قاعدة بأيدينا.</p>
<ul><li><b>تعلّم الآلة (Machine Learning):</b> نعطي البرنامج آلاف الأمثلة فيستنتج النمط. مثال: آلاف الفواتير المصنفة، فيتعلم تصنيف أي فاتورة جديدة.</li>
<li><b>التعلم العميق (Deep Learning):</b> نوع من تعلم الآلة يستخدم "شبكات عصبية" بطبقات كثيرة، وهو سر قوة الأدوات الحالية.</li>
<li><b>النماذج اللغوية الكبيرة (LLM):</b> مثل Claude وChatGPT وGemini. تدربت على نصوص ضخمة، وفكرتها الأساسية: <b>توقع الكلمة التالية</b> بذكاء شديد.</li></ul>
<p class="tip">💡 لأن النموذج "يتوقع" ولا "يتذكر من قاعدة بيانات"، قد يخطئ بثقة. لهذا دائماً راجع الأرقام والحقائق المهمة.</p>`,
      task: `<b>تطبيق (15 دقيقة):</b> افتح Claude واسأله نفس السؤال بطريقتين:<br>1) "اكتب إيميل"<br>2) "اكتب إيميل رسمي قصير لرئيس الحسابات أطلب فيه اعتماد مطابقة بنك شهر أكتوبر، بأسلوب مهني، 5 أسطر"<br>قارن النتيجتين واكتب في الملاحظات: لماذا الثانية أفضل؟`
    },
    inv: {
      topic: "الدخل والمصروف والادخار",
      body: `<p>قبل أي استثمار: لازم يكون عندك <b>فائض</b>. الفائض = الدخل − المصروفات.</p>
<p><b>قاعدة 50/30/20</b> (نقطة بداية مشهورة):</p>
<table><tr><th>البند</th><th>النسبة</th><th>مثال على راتب 300 ر.ع</th></tr>
<tr><td>ضروريات (سكن، أكل، مواصلات)</td><td>50%</td><td>150 ر.ع</td></tr>
<tr><td>رغبات (مطاعم، ترفيه)</td><td>30%</td><td>90 ر.ع</td></tr>
<tr><td>ادخار واستثمار</td><td>20%</td><td>60 ر.ع</td></tr></table>
<p>معادلة Excel: إذا الراتب في B1 ← الادخار <code>=B1*20%</code></p>
<p class="tip">💡 القاعدة الذهبية: "ادفع لنفسك أولاً" — حوّل مبلغ الادخار أول ما ينزل الراتب، لا من الباقي آخر الشهر.</p>`,
      task: "احسب دخلك الشهري ومصروفاتك التقريبية، وما النسبة التي تقدر تدخرها؟ اكتبها في الملاحظات."
    },
    video: [
      ["Present Simple vs Continuous — BBC Learning English", "BBC Learning English present simple present continuous"],
      ["What is AI? شرح مبسط بالعربي", "ما هو الذكاء الاصطناعي شرح مبسط"],
      ["قاعدة 50/30/20 للميزانية", "قاعدة 50 30 20 الميزانية الشخصية"]
    ],
    quiz: [
      { q: "اختر الصحيح: I ___ English these days.", o: ["learn", "am learning", "learns", "learning"], a: 1, x: "these days تدل على فترة حالية ← Present Continuous." },
      { q: "She ___ in a bank. (عملها الدائم)", o: ["work", "is work", "works", "working"], a: 2, x: "حقيقة ثابتة مع He/She ← نضيف s." },
      { q: "ما معنى كلمة predict؟", o: ["يدرّب", "يتوقع", "يحذف", "يرسل"], a: 1, x: "predict = يتوقع." },
      { q: "الفكرة الأساسية لعمل النماذج اللغوية مثل Claude هي:", o: ["البحث في قاعدة بيانات ثابتة", "توقع الكلمة التالية", "نسخ الإجابات من الإنترنت مباشرة", "الحساب فقط"], a: 1, x: "النموذج يتوقع الكلمة التالية بناءً على ما تعلمه." },
      { q: "راتب 400 ر.ع حسب قاعدة 50/30/20، كم الادخار؟", o: ["40", "80", "120", "200"], a: 1, x: "400 × 20% = 80 ر.ع." }
    ]
  },
  /* ---------- اليوم 2 ---------- */
  { d: 2, title: "الماضي البسيط + هيكل الأمر الممتاز + الميزانية",
    en: {
      topic: "Past Simple",
      body: `<p>للحديث عن شيء حدث وانتهى في الماضي.</p>
<table><tr><th>النوع</th><th>القاعدة</th><th>مثال</th></tr>
<tr><td>منتظم</td><td>+ ed</td><td>I <b>checked</b> the invoices yesterday.</td></tr>
<tr><td>شاذ</td><td>يُحفظ</td><td>go→went, send→sent, buy→bought, pay→paid, make→made</td></tr>
<tr><td>نفي</td><td>didn't + الفعل الأصلي</td><td>I <b>didn't send</b> the report.</td></tr>
<tr><td>سؤال</td><td>Did + الفعل الأصلي</td><td><b>Did</b> you <b>pay</b> the bill?</td></tr></table>
<p class="tip">⚠️ خطأ شائع: I didn't sent. ✗ — الصحيح: I didn't send. ✓</p>`,
      vocab: [
        ["income", "دخل", "My monthly income is fixed."],
        ["expense", "مصروف", "Rent is my biggest expense."],
        ["budget", "ميزانية", "I made a budget for November."],
        ["savings", "مدخرات", "I keep my savings in a separate account."],
        ["debt", "دَين", "Pay your debt first."],
        ["interest", "فائدة/عائد", "The bank pays interest on deposits."],
        ["inflation", "تضخم", "Inflation makes prices go up."],
        ["asset", "أصل (شيء له قيمة)", "Gold is an asset."]
      ],
      reading: `Last month, Ali made his first personal budget. He wrote down his income and every expense. He found that he spent too much on food delivery. He decided to save 20% of his salary. At the end of the month, he moved the money to a savings account.`,
      readingQ: "استخرج من القطعة كل الأفعال الماضية، واكتب أصل كل فعل (مثال: made ← make).",
      writing: "Write 5 sentences about what you did yesterday at work. Use at least 3 irregular verbs."
    },
    ai: {
      topic: "هيكل الأمر الممتاز (Prompt)",
      body: `<p>الأمر الجيد = نتيجة جيدة. استخدم هيكل <b>د.م.س.ش</b>:</p>
<table><tr><th>الحرف</th><th>المعنى</th><th>مثال</th></tr>
<tr><td><b>د</b>ور</td><td>من يكون الذكاء الاصطناعي</td><td>"أنت محاسب خبير"</td></tr>
<tr><td><b>م</b>همة</td><td>ماذا تريد بالضبط</td><td>"صنف هذه المصروفات"</td></tr>
<tr><td><b>س</b>ياق</td><td>معلومات خلفية</td><td>"هذه مصروفات عهدة لبنايات شقق مفروشة"</td></tr>
<tr><td><b>ش</b>كل</td><td>شكل النتيجة</td><td>"في جدول: التاريخ، البيان، المبلغ، البناية"</td></tr></table>
<p class="tip">💡 أضف مثالاً واحداً للنتيجة التي تريدها، تتحسن الإجابة كثيراً.</p>`,
      task: `<b>تطبيق:</b> اكتب أمراً كاملاً بهيكل د.م.س.ش لطلب تصفية عهدة من 5 فواتير (اخترع الفواتير). جربه في Claude، ثم الصق الأمر هنا في الملاحظات.`
    },
    inv: {
      topic: "الميزانية وصندوق الطوارئ",
      body: `<p><b>صندوق الطوارئ</b> أول خطوة قبل الاستثمار: مبلغ يغطي <b>3 إلى 6 أشهر</b> من مصروفاتك الضرورية، في حساب سهل السحب.</p>
<p>مثال: مصروفاتك الضرورية 150 ر.ع شهرياً ← صندوق الطوارئ بين 450 و900 ر.ع.</p>
<p><b>ميزانية في Excel:</b></p>
<table><tr><th>العمود</th><th>المحتوى</th></tr><tr><td>A</td><td>البند</td></tr><tr><td>B</td><td>المخطط</td></tr><tr><td>C</td><td>الفعلي</td></tr><tr><td>D</td><td>الفرق <code>=B2-C2</code></td></tr></table>
<p>الإجمالي: <code>=SUM(C2:C10)</code> &nbsp; نسبة البند من الإجمالي: <code>=C2/C$11</code></p>
<p class="tip">💡 لماذا الطوارئ قبل الاستثمار؟ حتى لا تضطر لبيع استثمارك بخسارة عند أي ظرف.</p>`,
      task: "صمم جدول ميزانية لشهر نوفمبر بالأعمدة الأربعة أعلاه (في Excel أو الجوال)، واحسب كم تحتاج لصندوق الطوارئ."
    },
    video: [
      ["Past Simple irregular verbs", "past simple irregular verbs lesson"],
      ["Prompt Engineering شرح عربي", "هندسة الأوامر prompt engineering شرح عربي"],
      ["Emergency Fund explained", "emergency fund explained"]
    ],
    quiz: [
      { q: "Yesterday I ___ the report to the manager.", o: ["send", "sent", "sended", "sending"], a: 1, x: "send فعل شاذ ← sent." },
      { q: "النفي الصحيح:", o: ["He didn't paid", "He not paid", "He didn't pay", "He don't paid"], a: 2, x: "بعد didn't يرجع الفعل لأصله." },
      { q: "في هيكل د.م.س.ش، حرف (ش) يعني:", o: ["شرط", "شكل النتيجة", "شرح", "شخص"], a: 1, x: "ش = شكل النتيجة (جدول، نقاط، إيميل...)." },
      { q: "مصروفاتك الضرورية 200 ر.ع، أقل صندوق طوارئ مناسب:", o: ["200", "400", "600", "2000"], a: 2, x: "3 أشهر × 200 = 600." },
      { q: "معنى expense:", o: ["دخل", "مصروف", "أصل", "فائدة"], a: 1, x: "expense = مصروف." }
    ]
  },
  /* ---------- اليوم 3 ---------- */
  { d: 3, title: "المستقبل + أنواع أدوات الذكاء الاصطناعي + التضخم",
    en: {
      topic: "Future: will vs going to",
      body: `<table><tr><th>الصيغة</th><th>متى</th><th>مثال</th></tr>
<tr><td>will</td><td>قرار لحظي، وعد، توقع عام</td><td>I'<b>ll call</b> him now. / AI <b>will change</b> many jobs.</td></tr>
<tr><td>going to</td><td>خطة مقررة مسبقاً، أو دليل واضح</td><td>I'<b>m going to study</b> accounting next year.</td></tr>
<tr><td>Present Continuous</td><td>موعد مرتب</td><td>I'<b>m meeting</b> the GM tomorrow at 10.</td></tr></table>
<p class="tip">💡 في الإيميلات: "I will send it by Sunday" = وعد واضح ومهني.</p>`,
      vocab: [
        ["deadline", "موعد نهائي", "The deadline is Thursday."],
        ["schedule", "جدول/يجدول", "Let's schedule a meeting."],
        ["follow up", "يتابع", "I will follow up next week."],
        ["attach", "يرفق", "Please find the file attached."],
        ["approve", "يعتمد", "The GM approved the request."],
        ["request", "طلب", "I sent a purchase request."],
        ["urgent", "عاجل", "This is urgent."],
        ["reminder", "تذكير", "Just a reminder about the invoice."]
      ],
      reading: `Next year, Ali is going to start university. He hasn't decided the major yet, but he thinks AI will be useful in any field. Tomorrow he is meeting the general manager to present a new system. He will send the presentation before the meeting.`,
      readingQ: "حدد في القطعة: جملة فيها خطة (going to)، جملة فيها توقع (will)، وجملة فيها موعد مرتب.",
      writing: "Write about your plans for the next 3 months: 2 sentences with going to, 2 with will, 1 with Present Continuous for a fixed appointment."
    },
    ai: {
      topic: "خريطة أدوات الذكاء الاصطناعي",
      body: `<table><tr><th>النوع</th><th>أمثلة</th><th>استخدامه لك</th></tr>
<tr><td>محادثة ونصوص</td><td>Claude, ChatGPT, Gemini</td><td>إيميلات، خطابات، تحليل، شرح</td></tr>
<tr><td>برمجة</td><td>Claude Code</td><td>بناء أنظمة مثل مرسى</td></tr>
<tr><td>صور وتصميم</td><td>أدوات توليد الصور</td><td>إعلانات، صور منتجات</td></tr>
<tr><td>صوت وفيديو</td><td>تفريغ صوت، مونتاج</td><td>محاضر اجتماعات، فيديوهات ترويجية</td></tr>
<tr><td>أتمتة</td><td>Apps Script، أدوات الربط</td><td>إرسال تقارير تلقائياً</td></tr></table>
<p class="tip">💡 القاعدة: اختر الأداة حسب <b>نوع المخرجات</b> المطلوبة، لا حسب الاسم المشهور.</p>`,
      task: "اكتب 5 مهام تكررها في عملك أسبوعياً، وأمام كل مهمة: أي نوع أداة AI يمكن أن يختصرها؟"
    },
    inv: {
      topic: "التضخم: لماذا الادخار وحده لا يكفي",
      body: `<p><b>التضخم</b> = ارتفاع الأسعار مع الوقت، فتقل قيمة نفس المبلغ.</p>
<p>مثال توضيحي: إذا كان التضخم 3% سنوياً، فإن 100 ر.ع اليوم تشتري بعد سنة ما يعادل تقريباً <b>97.09 ر.ع</b> فقط.</p>
<p>المعادلة: القيمة الحقيقية = المبلغ ÷ (1 + التضخم)<sup>عدد السنوات</sup></p>
<p>Excel: <code>=100/(1+3%)^1</code></p>
<p><b>العائد الحقيقي</b> = العائد − التضخم (تقريباً). وديعة تعطي 4% مع تضخم 3% ← عائد حقيقي ≈ 1% فقط.</p>
<p class="tip">💡 هدف الاستثمار الأول: أن يكون عائدك أعلى من التضخم.</p>`,
      task: "احسب في Excel: كم تساوي 1000 ر.ع بعد 10 سنوات بتضخم 3%؟ (الجواب التقريبي في اختبار اليوم)"
    },
    video: [
      ["will vs going to", "will vs going to English grammar"],
      ["أدوات الذكاء الاصطناعي للعمل", "أفضل أدوات الذكاء الاصطناعي للعمل شرح"],
      ["ما هو التضخم؟", "ما هو التضخم شرح مبسط"]
    ],
    quiz: [
      { q: "الهاتف يرن: \"OK, I ___ answer it.\"", o: ["am going to", "will", "answer", "am answering"], a: 1, x: "قرار لحظي ← will." },
      { q: "I bought the books. I ___ study tonight.", o: ["will", "am going to", "study", "studied"], a: 1, x: "خطة مقررة مع دليل ← going to." },
      { q: "معنى deadline:", o: ["موعد نهائي", "خط أحمر", "تذكير", "اجتماع"], a: 0, x: "deadline = موعد نهائي." },
      { q: "لعمل نظام مثل مرسى، أنسب أداة:", o: ["أداة صور", "أداة برمجة مثل Claude Code", "تفريغ صوت", "لا شيء"], a: 1, x: "بناء الأنظمة يحتاج أداة برمجة." },
      { q: "1000 ر.ع بعد 10 سنوات بتضخم 3% تساوي تقريباً:", o: ["1344", "970", "744", "700"], a: 2, x: "1000 ÷ 1.03^10 ≈ 744 ر.ع." }
    ]
  },
  /* ---------- اليوم 4 ---------- */
  { d: 4, title: "المضارع التام + حدود الذكاء الاصطناعي + الفائدة المركبة",
    en: {
      topic: "Present Perfect",
      body: `<p><b>have/has + التصريف الثالث</b> — لشيء حدث في الماضي وأثره مستمر، أو تجربة بدون وقت محدد.</p>
<table><tr><th>الاستخدام</th><th>مثال</th></tr>
<tr><td>تم للتو</td><td>I <b>have just finished</b> the reconciliation.</td></tr>
<tr><td>تجربة</td><td><b>Have</b> you ever <b>used</b> Claude Code?</td></tr>
<tr><td>لم يحدث بعد</td><td>He <b>hasn't approved</b> it <b>yet</b>.</td></tr>
<tr><td>مدة مستمرة</td><td>I <b>have worked</b> here <b>since</b> 2024.</td></tr></table>
<p class="tip">⚠️ مع وقت محدد بالماضي (yesterday, last week) استخدم Past Simple لا Present Perfect.</p>`,
      vocab: [
        ["already", "بالفعل", "I have already sent it."],
        ["yet", "بعد (في النفي والسؤال)", "Has he replied yet?"],
        ["since", "منذ (نقطة زمنية)", "since October"],
        ["for", "لمدة", "for two years"],
        ["accurate", "دقيق", "Make sure the numbers are accurate."],
        ["verify", "يتحقق", "Always verify AI answers."],
        ["sensitive", "حساس", "Don't share sensitive data."],
        ["reliable", "موثوق", "Use reliable sources."]
      ],
      reading: `AI tools have changed the way many people work. Ali has used AI to build several systems since 2024. However, he has learned an important lesson: AI is not always accurate. He has seen AI give wrong numbers with full confidence, so he always verifies the important results.`,
      readingQ: "ما الدرس المهم الذي تعلمه علي في القطعة؟ أجب بجملة إنجليزية واحدة بالمضارع التام.",
      writing: "Write 5 sentences about things you have done / haven't done yet this year. Use already, yet, since, for."
    },
    ai: {
      topic: "حدود الذكاء الاصطناعي واستخدامه بأمان",
      body: `<ul><li><b>الهلوسة (Hallucination):</b> يخترع معلومة أو رقماً أو مرجعاً بثقة. ← راجع كل رقم مهم.</li>
<li><b>الحساب:</b> النموذج اللغوي قد يخطئ في عمليات حسابية طويلة. ← اطلب منه معادلة Excel بدل الناتج، أو اطلب أن يحسب بالكود.</li>
<li><b>المعلومات الحديثة:</b> معرفته تقف عند تاريخ معين إلا إذا بحث في الإنترنت.</li>
<li><b>الخصوصية:</b> لا تلصق أرقام بطاقات، كلمات مرور، أو أرقام حسابات بنكية كاملة.</li>
<li><b>المسؤولية:</b> أنت المسؤول عن النتيجة النهائية، لا الأداة.</li></ul>
<p class="tip">💡 جملة سحرية: "إذا لم تكن متأكداً، قل لا أعرف" — أضفها لأوامرك المهمة.</p>`,
      task: "اسأل Claude سؤالاً حسابياً طويلاً (مثلاً: مجموع 12 مبلغاً مختلفاً) ثم تحقق منه في Excel. هل كان صحيحاً؟ ثم اطلب منه المعادلة بدل الناتج."
    },
    inv: {
      topic: "الفائدة البسيطة والمركبة — أقوى قوة في الاستثمار",
      body: `<p><b>البسيطة:</b> العائد على المبلغ الأصلي فقط. <b>المركبة:</b> العائد على المبلغ + العوائد السابقة.</p>
<table><tr><th>1000 ر.ع بعائد 5% سنوياً</th><th>بعد 10 سنوات</th></tr>
<tr><td>بسيطة</td><td>1000 + (50×10) = <b>1500</b></td></tr>
<tr><td>مركبة</td><td>1000 × 1.05<sup>10</sup> = <b>1628.89</b></td></tr></table>
<p>Excel: <code>=1000*(1+5%)^10</code> &nbsp; أو &nbsp; <code>=FV(5%,10,0,-1000)</code></p>
<p><b>قاعدة 72:</b> عدد سنوات تضاعف المال ≈ 72 ÷ نسبة العائد. بعائد 6% ← يتضاعف تقريباً في 12 سنة.</p>
<p class="tip">💡 السر هو <b>الوقت</b>. البدء مبكراً بمبلغ صغير أقوى من البدء متأخراً بمبلغ كبير.</p>`,
      task: "في Excel: اعمل جدولاً لـ 20 سنة يوضح نمو 1000 ر.ع بعائد 6% مركب. في أي سنة تقريباً تضاعف المبلغ؟"
    },
    video: [
      ["Present Perfect explained", "present perfect explained BBC learning english"],
      ["AI hallucination explained", "AI hallucination explained"],
      ["الفائدة المركبة شرح", "الفائدة المركبة شرح مبسط"]
    ],
    quiz: [
      { q: "I ___ the invoice yet.", o: ["didn't send", "haven't sent", "don't send", "not sent"], a: 1, x: "yet مع النفي ← Present Perfect." },
      { q: "I have worked here ___ two years.", o: ["since", "for", "from", "at"], a: 1, x: "for مع المدة، since مع نقطة البداية." },
      { q: "أفضل طريقة لتجنب أخطاء الحساب من الذكاء الاصطناعي:", o: ["أثق به دائماً", "أطلب معادلة Excel أو أن يحسب بالكود وأراجع", "أسأله مرتين فقط", "لا أستخدمه أبداً"], a: 1, x: "المعادلة قابلة للتحقق، والمراجعة مسؤوليتك." },
      { q: "1000 ر.ع بفائدة مركبة 5% بعد 10 سنوات ≈", o: ["1500", "1628.89", "1050", "2000"], a: 1, x: "1000 × 1.05^10 = 1628.89." },
      { q: "بقاعدة 72: عائد 8% يضاعف المال في حوالي:", o: ["8 سنوات", "9 سنوات", "12 سنة", "72 سنة"], a: 1, x: "72 ÷ 8 = 9 سنوات." }
    ]
  },
  /* ---------- اليوم 5 ---------- */
  { d: 5, title: "الأفعال الناقصة + سلسلة الأوامر + المخاطرة والعائد",
    en: {
      topic: "Modal verbs: should, must, could, might",
      body: `<table><tr><th>الفعل</th><th>المعنى</th><th>مثال</th></tr>
<tr><td>must</td><td>إلزام قوي</td><td>All invoices <b>must</b> be approved.</td></tr>
<tr><td>should</td><td>نصيحة</td><td>You <b>should</b> save 20% of your salary.</td></tr>
<tr><td>could</td><td>طلب مهذب / احتمال</td><td><b>Could</b> you send me the file?</td></tr>
<tr><td>might</td><td>احتمال ضعيف</td><td>The price <b>might</b> go down.</td></tr></table>
<p>بعد الفعل الناقص يأتي الفعل <b>بدون to وبدون s</b>: He should <b>go</b> ✓ (لا: He should goes ✗)</p>
<p><b>جمل جاهزة للإيميلات:</b> Could you please... / I would appreciate it if... / Please let me know if...</p>`,
      vocab: [
        ["risk", "مخاطرة", "Stocks have higher risk."],
        ["return", "عائد", "Higher risk, higher return."],
        ["diversify", "ينوّع", "Diversify your investments."],
        ["portfolio", "محفظة استثمارية", "My portfolio has 3 assets."],
        ["stock / share", "سهم", "He bought 100 shares."],
        ["bond / sukuk", "سند / صك", "Sukuk are Islamic bonds."],
        ["appreciate", "يقدّر", "I appreciate your help."],
        ["regards", "تحياتي (خاتمة الإيميل)", "Best regards, Ali"]
      ],
      reading: `Dear Mr. Srour,\nCould you please review the bank reconciliation for October? I have attached the file. I would appreciate it if you could approve it before Thursday. Please let me know if you need any changes.\nBest regards,\nAli`,
      readingQ: "استخرج من الإيميل 3 عبارات مهذبة يمكنك استخدامها في أي إيميل عمل.",
      writing: "Write a short professional email (5–6 lines) asking your manager for one day off next week. Use could, would appreciate, and please let me know."
    },
    ai: {
      topic: "سلسلة الأوامر: قسّم المهمة الكبيرة",
      body: `<p>بدل أمر واحد ضخم، قسّم العمل إلى خطوات، وكل خطوة تبني على السابقة:</p>
<ol><li>"لخص هذا المستند في 10 نقاط"</li>
<li>"من الملخص، استخرج كل المبالغ والتواريخ في جدول"</li>
<li>"اكتب إيميلاً للمدير بأهم 3 ملاحظات من الجدول"</li></ol>
<p><b>لماذا؟</b> تراجع كل خطوة قبل التالية، فتكتشف الخطأ مبكراً، والنتيجة أدق.</p>
<p class="tip">💡 اطلب منه: "قبل أن تبدأ، اسألني الأسئلة التي تحتاجها" — يقلل التخمين.</p>`,
      task: "خذ أي مستند عمل طويل (سياسة أو تعميم) وطبق السلسلة الثلاثية عليه في Claude. اكتب أي خطوة كانت الأصعب."
    },
    inv: {
      topic: "المخاطرة والعائد وأنواع الأصول",
      body: `<table><tr><th>الأصل</th><th>المخاطرة</th><th>العائد المتوقع</th></tr>
<tr><td>كاش / حساب توفير</td><td>منخفضة جداً</td><td>منخفض (قد يقل عن التضخم)</td></tr>
<tr><td>ودائع ثابتة</td><td>منخفضة</td><td>منخفض إلى متوسط</td></tr>
<tr><td>سندات / صكوك</td><td>منخفضة إلى متوسطة</td><td>متوسط</td></tr>
<tr><td>أسهم</td><td>عالية</td><td>أعلى على المدى الطويل</td></tr>
<tr><td>عقار</td><td>متوسطة</td><td>إيجار + ارتفاع القيمة</td></tr>
<tr><td>ذهب</td><td>متوسطة</td><td>حماية من التضخم غالباً</td></tr></table>
<p><b>التنويع:</b> "لا تضع كل البيض في سلة واحدة". توزيع المال على أصول مختلفة يقلل أثر خسارة أي واحد منها.</p>
<p class="tip">⚠️ هذا تعليم عام، وليس نصيحة استثمارية شخصية. قبل أي قرار حقيقي: افهم الأصل جيداً، ولا تستثمر مالاً تحتاجه قريباً.</p>`,
      task: "رتّب الأصول الستة من الأقل مخاطرة للأعلى حسب فهمك، واكتب أي منها يناسب هدفاً بعد سنة، وأيها لهدف بعد 10 سنوات."
    },
    video: [
      ["Modal verbs must should could might", "modal verbs must should could might lesson"],
      ["Prompt chaining", "prompt chaining tutorial"],
      ["المخاطرة والعائد والتنويع", "المخاطرة والعائد التنويع في الاستثمار شرح"]
    ],
    quiz: [
      { q: "He should ___ earlier.", o: ["comes", "to come", "come", "came"], a: 2, x: "بعد should الفعل في أصله بدون to." },
      { q: "الطلب الأكثر تهذيباً:", o: ["Send me the file.", "Could you please send me the file?", "You must send the file.", "Send file now."], a: 1, x: "Could you please... أسلوب مهذب للعمل." },
      { q: "تقسيم مهمة كبيرة لأوامر متتالية يسمى:", o: ["سلسلة الأوامر", "الهلوسة", "التدريب", "التضخم"], a: 0, x: "Prompt chaining = سلسلة الأوامر." },
      { q: "الأصل الأعلى مخاطرة وعائداً على المدى الطويل غالباً:", o: ["حساب التوفير", "الودائع", "الأسهم", "الكاش"], a: 2, x: "الأسهم أعلى مخاطرة وأعلى عائداً متوقعاً على المدى الطويل." },
      { q: "معنى diversify:", o: ["يبيع", "ينوّع", "يقترض", "يدخر"], a: 1, x: "diversify = ينوّع." }
    ]
  }],
  exam: [
    { q: "Every morning Ali ___ the daily reports.", o: ["check", "checks", "is checking", "checked"], a: 1, x: "عادة يومية مع He ← checks." },
    { q: "Look! It ___ outside.", o: ["rains", "is raining", "rained", "rain"], a: 1, x: "Look! = يحدث الآن ← مستمر." },
    { q: "We ___ the contract last Sunday.", o: ["have signed", "signed", "sign", "are signing"], a: 1, x: "last Sunday وقت محدد ← Past Simple." },
    { q: "I ___ never ___ to London.", o: ["have / been", "did / go", "am / going", "was / be"], a: 0, x: "تجربة بلا وقت ← Present Perfect." },
    { q: "Next year I ___ study accounting. (خطة)", o: ["will", "am going to", "study", "studied"], a: 1, x: "خطة مقررة ← going to." },
    { q: "You ___ wear a helmet on the site. It's the law.", o: ["might", "could", "must", "should to"], a: 2, x: "إلزام قانوني ← must." },
    { q: "معنى inflation:", o: ["عائد", "تضخم", "دين", "ميزانية"], a: 1, x: "inflation = تضخم." },
    { q: "LLM اختصار لـ:", o: ["Large Language Model", "Long Learning Machine", "Low Level Math", "Logic Language Method"], a: 0, x: "نموذج لغوي كبير." },
    { q: "عندما يخترع الذكاء الاصطناعي معلومة غير صحيحة بثقة نسميها:", o: ["تدريب", "هلوسة", "تنبؤ", "تشفير"], a: 1, x: "Hallucination." },
    { q: "أي من هذه لا يجب لصقه في أداة ذكاء اصطناعي؟", o: ["نص تعميم", "رقم بطاقة بنكية كاملة", "جدول مصروفات بدون بيانات حساسة", "سؤال قواعد"], a: 1, x: "البيانات المالية الحساسة لا تُشارك." },
    { q: "عناصر الأمر الممتاز (د.م.س.ش):", o: ["دقة، مال، سرعة، شكل", "دور، مهمة، سياق، شكل", "دليل، مثال، سؤال، شرح", "درس، معلومة، سؤال، شهادة"], a: 1, x: "دور، مهمة، سياق، شكل." },
    { q: "راتب 500 ر.ع بقاعدة 50/30/20: الضروريات =", o: ["100", "150", "250", "300"], a: 2, x: "500 × 50% = 250." },
    { q: "معادلة Excel الصحيحة لنمو 2000 بعائد 4% لمدة 5 سنوات:", o: ["=2000*4%*5", "=2000*(1+4%)^5", "=2000+4%+5", "=SUM(2000,4,5)"], a: 1, x: "الفائدة المركبة: المبلغ × (1+العائد)^السنوات." },
    { q: "صندوق الطوارئ يغطي عادة:", o: ["أسبوعاً", "شهراً واحداً", "3 إلى 6 أشهر", "10 سنوات"], a: 2, x: "3–6 أشهر من المصروفات الضرورية." },
    { q: "وديعة بعائد 5% وتضخم 3%، العائد الحقيقي التقريبي:", o: ["8%", "5%", "3%", "2%"], a: 3, x: "5% − 3% ≈ 2%." }
  ]
});

/* ===================== الأسبوع 2 ===================== */
ALIDEV.WEEKS.push({
  w: 2, title: "الأساسيات (2)",
  days: [
  { d: 1, title: "المقارنة + كيف تتدرب النماذج + الأهداف المالية",
    en: {
      topic: "Comparatives & Superlatives",
      body: `<table><tr><th>الصفة</th><th>مقارنة</th><th>تفضيل</th></tr>
<tr><td>cheap</td><td>cheap<b>er</b> than</td><td>the cheap<b>est</b></td></tr>
<tr><td>big</td><td>bigg<b>er</b></td><td>the bigg<b>est</b></td></tr>
<tr><td>expensive</td><td><b>more</b> expensive</td><td>the <b>most</b> expensive</td></tr>
<tr><td>good / bad</td><td>better / worse</td><td>the best / the worst</td></tr></table>
<p>المساواة: Stocks are <b>not as safe as</b> deposits.</p>
<p class="tip">💡 صفة من مقطع واحد ← er/est. صفة طويلة ← more/most.</p>`,
      vocab: [
        ["goal", "هدف", "My goal is to save 1,000 OMR."],
        ["long-term", "طويل المدى", "Stocks are a long-term investment."],
        ["short-term", "قصير المدى", "A short-term goal: a new phone."],
        ["token", "وحدة نص صغيرة يقرؤها النموذج", "The model reads text as tokens."],
        ["dataset", "مجموعة بيانات", "They trained it on a large dataset."],
        ["improve", "يحسّن", "Feedback improves the model."],
        ["afford", "يقدر على تكلفة", "I can't afford it now."],
        ["compare", "يقارن", "Compare the two offers."]
      ],
      reading: `Claude is newer than many older chatbots, and it is better at long documents. However, the most important skill is not choosing the best tool; it is writing clearer prompts. A simple tool with a clear prompt is often more useful than a powerful tool with a bad prompt.`,
      readingQ: "استخرج كل صيغ المقارنة والتفضيل من القطعة.",
      writing: "Compare two places you have lived (Yemen/Oman or two cities). Write 5 sentences using comparatives and one superlative."
    },
    ai: {
      topic: "كيف تتدرب النماذج اللغوية؟",
      body: `<ol><li><b>التدريب المسبق (Pre-training):</b> يقرأ النموذج كمية هائلة من النصوص ويتعلم توقع الكلمة التالية. هنا يكتسب اللغة والمعرفة العامة.</li>
<li><b>الضبط (Fine-tuning):</b> يتدرب على أمثلة محادثات جيدة ليصبح مساعداً مفيداً.</li>
<li><b>التعلم من التقييم البشري:</b> بشر يقيّمون الإجابات، فيتعلم ما هو أفضل وأكثر أماناً.</li></ol>
<p><b>مصطلحات مهمة:</b></p>
<ul><li><b>Token:</b> قطعة من النص (كلمة أو جزء كلمة). الأسعار والحدود تُحسب بالتوكنات.</li>
<li><b>Context window (نافذة السياق):</b> كم نصاً يقدر النموذج يقرؤه في المحادثة مرة واحدة.</li></ul>
<p class="tip">💡 لذلك في محادثة طويلة جداً قد "ينسى" تفاصيل البداية — لخّص له النقاط المهمة من جديد.</p>`,
      task: "اشرح لشخص لا يعرف التقنية (بالعربي، 5 أسطر) كيف يتعلم Claude. ثم اطلب من Claude تقييم شرحك."
    },
    inv: {
      topic: "الأهداف المالية الذكية",
      body: `<p>الهدف الذكي (SMART): <b>محدد، قابل للقياس، ممكن، مهم، له وقت.</b></p>
<table><tr><th>ضعيف</th><th>ذكي</th></tr>
<tr><td>"أبغى أدخر"</td><td>"أدخر 600 ر.ع خلال 12 شهراً = 50 ر.ع شهرياً لصندوق الطوارئ"</td></tr></table>
<p><b>الأفق الزمني يحدد نوع الاستثمار:</b></p>
<ul><li>أقل من سنتين ← آمن (توفير، ودائع)</li><li>2–5 سنوات ← متوازن</li><li>أكثر من 5 سنوات ← يمكن تحمل مخاطرة أعلى (أسهم)</li></ul>
<p>Excel للمبلغ الشهري المطلوب: <code>=الهدف/عدد_الأشهر</code></p>`,
      task: "اكتب 3 أهداف مالية ذكية: قصير (أقل من سنة)، متوسط (2–3 سنوات، مثل رسوم الجامعة)، طويل (10 سنوات). واحسب المبلغ الشهري لكل واحد."
    },
    video: [
      ["Comparatives and superlatives", "comparatives and superlatives lesson"],
      ["How LLMs are trained", "how large language models are trained explained simply"],
      ["SMART financial goals", "SMART financial goals"]
    ],
    quiz: [
      { q: "Gold is ___ than silver.", o: ["expensiver", "more expensive", "most expensive", "expensive"], a: 1, x: "صفة طويلة ← more." },
      { q: "This is the ___ report I have ever read.", o: ["good", "better", "best", "goodest"], a: 2, x: "good ← the best." },
      { q: "نافذة السياق (Context window) تعني:", o: ["شاشة البرنامج", "كم نصاً يقرؤه النموذج في المحادثة", "سرعة الإنترنت", "عدد المستخدمين"], a: 1, x: "حد النص الذي يستوعبه النموذج دفعة واحدة." },
      { q: "هدف بعد سنة واحدة، الأنسب له:", o: ["أسهم عالية المخاطرة", "حساب توفير أو وديعة", "عملات رقمية", "لا شيء"], a: 1, x: "الأفق القصير يحتاج أماناً." },
      { q: "تريد 900 ر.ع خلال 18 شهراً، كم شهرياً؟", o: ["40", "50", "60", "90"], a: 1, x: "900 ÷ 18 = 50." }
    ]
  },
  { d: 2, title: "الجمل الشرطية + تقنيات أوامر متقدمة + المنتجات البنكية",
    en: {
      topic: "Conditionals (Zero & First)",
      body: `<table><tr><th>النوع</th><th>الشكل</th><th>مثال</th></tr>
<tr><td>Zero (حقيقة)</td><td>If + present, present</td><td>If prices <b>rise</b>, money <b>loses</b> value.</td></tr>
<tr><td>First (احتمال حقيقي)</td><td>If + present, will + verb</td><td>If you <b>save</b> 50 a month, you <b>will have</b> 600 in a year.</td></tr></table>
<p class="tip">⚠️ لا تضع will بعد if مباشرة: If it will rain ✗ — If it rains ✓</p>
<p>unless = إلا إذا: You won't pass <b>unless</b> you practice.</p>`,
      vocab: [
        ["account", "حساب", "I opened a savings account."],
        ["deposit", "إيداع / وديعة", "a fixed deposit"],
        ["withdraw", "يسحب", "You can't withdraw before 12 months."],
        ["profit", "ربح", "The bank shares the profit."],
        ["fee", "رسوم", "There is a monthly fee."],
        ["example", "مثال", "Give me an example."],
        ["step by step", "خطوة بخطوة", "Explain it step by step."],
        ["unless", "إلا إذا", "Unless you ask, AI will guess."]
      ],
      reading: `If you give AI a few examples, it will copy your style. If you ask it to think step by step, it usually makes fewer mistakes. And if your request is not clear, the model will guess — unless you ask it to ask you questions first.`,
      readingQ: "اكتب 3 قواعد للأوامر الجيدة مستخدماً جملة شرطية (If...) لكل قاعدة.",
      writing: "Write 5 First Conditional sentences about your money or study plans. Example: If I save 60 OMR a month, I will..."
    },
    ai: {
      topic: "تقنيات الأوامر المتقدمة",
      body: `<table><tr><th>التقنية</th><th>الفكرة</th><th>مثال</th></tr>
<tr><td>الأمثلة (Few-shot)</td><td>تعطيه 2–3 أمثلة للشكل المطلوب</td><td>"صغ البيان مثل هذا: مقابل شراء ... بتاريخ ... فاتورة ..."</td></tr>
<tr><td>خطوة بخطوة</td><td>تطلب منه التفكير المتسلسل</td><td>"احسبها خطوة بخطوة ثم أعطني الناتج"</td></tr>
<tr><td>اسألني أولاً</td><td>يسأل قبل أن يخمّن</td><td>"قبل الكتابة، اسألني 3 أسئلة"</td></tr>
<tr><td>القيود</td><td>تحدد ما لا تريده</td><td>"بدون مقدمات، أقل من 100 كلمة"</td></tr>
<tr><td>المراجعة الذاتية</td><td>يراجع نفسه</td><td>"راجع إجابتك وصحح أي خطأ"</td></tr></table>`,
      task: "خذ أمرك من الأسبوع الماضي (تصفية العهدة) وطوّره بإضافة: مثالين للبيان + قيد + مراجعة ذاتية. قارن النتيجة بالقديمة."
    },
    inv: {
      topic: "المنتجات البنكية الأساسية",
      body: `<ul><li><b>الحساب الجاري:</b> للاستخدام اليومي، عادة بدون عائد.</li>
<li><b>حساب التوفير:</b> سحب مرن وعائد بسيط.</li>
<li><b>الوديعة الثابتة / لأجل:</b> تقفل المبلغ مدة محددة مقابل عائد أعلى، والسحب المبكر قد يقلل العائد.</li>
<li><b>البدائل الإسلامية:</b> في البنوك والنوافذ الإسلامية تُستخدم صيغ مثل <b>الوكالة</b> و<b>المضاربة</b>، والعائد فيها ربح متوقع لا فائدة مضمونة.</li></ul>
<p><b>أسئلة اسألها للبنك قبل أي منتج:</b> كم العائد السنوي؟ هل هو مضمون أم متوقع؟ هل توجد رسوم؟ ما شرط السحب المبكر؟ ما الحد الأدنى؟</p>
<p class="tip">💡 العروض تتغير باستمرار — قارن بين بنكين على الأقل من مواقعهم الرسمية.</p>`,
      task: "ادخل موقع بنكك الحالي وابحث عن حساب توفير أو وديعة، واكتب الإجابات للأسئلة الخمسة أعلاه."
    },
    video: [
      ["Zero and first conditional", "zero and first conditional lesson"],
      ["Few-shot prompting", "few shot prompting explained"],
      ["الوديعة الثابتة وحساب التوفير", "الفرق بين حساب التوفير والوديعة الثابتة"]
    ],
    quiz: [
      { q: "If you ___ hard, you will pass.", o: ["will study", "study", "studied", "studying"], a: 1, x: "بعد if نستخدم المضارع." },
      { q: "If water reaches 100°C, it ___.", o: ["boils", "will boiled", "boiling", "boiled"], a: 0, x: "حقيقة علمية ← Zero conditional." },
      { q: "إعطاء النموذج 2–3 أمثلة للشكل المطلوب يسمى:", o: ["Few-shot", "Fine-tuning", "Token", "Chaining"], a: 0, x: "Few-shot prompting." },
      { q: "الوديعة الثابتة عادة:", o: ["سحب حر بدون شروط", "عائد أعلى مقابل قفل المبلغ مدة محددة", "بدون أي عائد", "أعلى مخاطرة من الأسهم"], a: 1, x: "تقفل المبلغ مقابل عائد أعلى." },
      { q: "معنى withdraw:", o: ["يودع", "يسحب", "يحوّل", "يقترض"], a: 1, x: "withdraw = يسحب." }
    ]
  },
  { d: 3, title: "المبني للمجهول + الذكاء الاصطناعي في Excel + الديون",
    en: {
      topic: "Passive Voice (لغة التقارير)",
      body: `<p><b>be + التصريف الثالث</b> — نستخدمه عندما يكون الفعل أهم من الفاعل، وهو شائع جداً في التقارير الرسمية.</p>
<table><tr><th>معلوم</th><th>مجهول</th></tr>
<tr><td>The GM approved the request.</td><td>The request <b>was approved</b>.</td></tr>
<tr><td>We pay salaries monthly.</td><td>Salaries <b>are paid</b> monthly.</td></tr>
<tr><td>They will install the system.</td><td>The system <b>will be installed</b>.</td></tr></table>
<p>لذكر الفاعل: ... <b>by</b> the GM.</p>`,
      vocab: [
        ["loan", "قرض", "He took a car loan."],
        ["installment", "قسط", "The monthly installment is 120 OMR."],
        ["credit card", "بطاقة ائتمان", "Pay the full credit card balance."],
        ["balance", "رصيد", "Check your account balance."],
        ["formula", "معادلة", "Use a formula, not manual numbers."],
        ["column", "عمود", "Column C has the amounts."],
        ["row", "صف", "Delete the empty rows."],
        ["report", "تقرير", "The report was sent on time."]
      ],
      reading: `The monthly report was prepared by the accounts team. All invoices were checked and the custody was settled. Two errors were found and corrected. The final report will be sent to the general manager on Sunday.`,
      readingQ: "حوّل 3 جمل من القطعة إلى المبني للمعلوم (اخترع الفاعل).",
      writing: "Write a short work report (5 sentences) about last week using the passive voice. Example: Ten requests were received..."
    },
    ai: {
      topic: "الذكاء الاصطناعي في Excel",
      body: `<p>أقوى استخدام لك: اطلب <b>المعادلة</b> وليس الناتج.</p>
<table><tr><th>تريد</th><th>اطلب هكذا</th></tr>
<tr><td>جلب بيانات من جدول آخر</td><td>"أعطني معادلة XLOOKUP تجلب اسم البناية من الورقة 2 حسب رقم الشقة في A2"</td></tr>
<tr><td>جمع بشرط</td><td>"معادلة SUMIFS لجمع مصروفات بناية الوادي في شهر أكتوبر"</td></tr>
<tr><td>تنظيف بيانات</td><td>"معادلة تحذف المسافات الزائدة وتوحد الأرقام"</td></tr>
<tr><td>فهم معادلة</td><td>"اشرح هذه المعادلة سطراً سطراً"</td></tr></table>
<p><b>أمثلة جاهزة:</b><br><code>=SUMIFS(C:C,B:B,"الوادي",D:D,"&gt;="&amp;DATE(2026,10,1))</code><br><code>=XLOOKUP(A2,Sheet2!A:A,Sheet2!B:B,"غير موجود")</code></p>
<p class="tip">💡 صف له أسماء الأعمدة بالضبط (A=التاريخ، B=البناية...) تأتيك معادلة تعمل من أول مرة.</p>`,
      task: "خذ جدولاً حقيقياً من عملك (بدون بيانات حساسة)، واطلب من Claude 3 معادلات مفيدة له. جربها واكتب أي واحدة عملت وأيها احتاجت تعديل."
    },
    inv: {
      topic: "الديون: الجيدة والسيئة",
      body: `<p><b>دين جيد غالباً:</b> يبني قيمة أو دخلاً (تعليم يرفع دخلك، أصل يدر إيراداً) بتكلفة معقولة.<br><b>دين سيئ:</b> لشراء أشياء تفقد قيمتها، بتكلفة عالية (مثل رصيد بطاقة ائتمان متراكم).</p>
<p><b>طريقتان لسداد الديون:</b></p>
<table><tr><th>الطريقة</th><th>الفكرة</th><th>الميزة</th></tr>
<tr><td>الانهيار الجليدي (Avalanche)</td><td>سدد الدين الأعلى تكلفة أولاً</td><td>توفر مالاً أكثر</td></tr>
<tr><td>كرة الثلج (Snowball)</td><td>سدد الأصغر مبلغاً أولاً</td><td>حماس وإنجاز سريع</td></tr></table>
<p class="tip">💡 قاعدة: لا تستثمر وعليك دين بتكلفة أعلى من العائد المتوقع للاستثمار — سداده أولاً هو "استثمار مضمون".</p>`,
      task: "إذا عندك ديون أو أمانات مع أشخاص، رتبها في جدول: الدائن، المبلغ، القسط، الموعد. واختر طريقة السداد التي تناسبك."
    },
    video: [
      ["Passive voice", "passive voice english lesson"],
      ["ChatGPT Claude Excel formulas", "use AI to write Excel formulas"],
      ["Debt avalanche vs snowball", "debt avalanche vs snowball"]
    ],
    quiz: [
      { q: "The invoices ___ yesterday.", o: ["checked", "were checked", "are check", "was check"], a: 1, x: "ماضٍ مجهول مع جمع ← were + checked." },
      { q: "The system ___ next week.", o: ["will install", "will be installed", "is install", "installed"], a: 1, x: "مستقبل مجهول ← will be + V3." },
      { q: "لجمع مصروفات بناية معينة في شهر معين نستخدم:", o: ["SUMIFS", "VLOOKUP فقط", "COUNT", "LEN"], a: 0, x: "SUMIFS للجمع بأكثر من شرط." },
      { q: "طريقة سداد الدين الأعلى تكلفة أولاً:", o: ["Snowball", "Avalanche", "Few-shot", "Budget"], a: 1, x: "Avalanche = الأعلى تكلفة أولاً." },
      { q: "معنى installment:", o: ["رصيد", "قسط", "عمود", "رسوم"], a: 1, x: "installment = قسط." }
    ]
  },
  { d: 4, title: "أدوات الربط + مفهوم الأتمتة + ما هو السهم",
    en: {
      topic: "Linking words",
      body: `<table><tr><th>الوظيفة</th><th>الكلمات</th><th>مثال</th></tr>
<tr><td>إضافة</td><td>moreover, in addition, also</td><td><b>In addition</b>, the app sends reminders.</td></tr>
<tr><td>تناقض</td><td>however, although, but</td><td>The plan is good. <b>However</b>, it is expensive.</td></tr>
<tr><td>نتيجة</td><td>therefore, so, as a result</td><td>Sales dropped; <b>therefore</b>, we cut costs.</td></tr>
<tr><td>سبب</td><td>because, because of, due to</td><td>The delay was <b>due to</b> the holiday.</td></tr></table>
<p class="tip">💡 because + جملة (because it rained) — because of / due to + اسم (due to the rain).</p>`,
      vocab: [
        ["share", "سهم", "Each share costs 0.200 OMR."],
        ["shareholder", "مساهم", "Shareholders own the company."],
        ["dividend", "توزيعات أرباح", "The company paid a dividend."],
        ["market value", "القيمة السوقية", "The market value went up."],
        ["exchange", "بورصة/سوق", "Muscat Stock Exchange"],
        ["workflow", "سير عمل", "Automate the workflow."],
        ["trigger", "محفّز/حدث يبدأ العملية", "A new form is the trigger."],
        ["automate", "يؤتمت", "We automated the daily report."]
      ],
      reading: `Many companies want to automate repetitive tasks. For example, when a guest checks out, a rating link is sent automatically. As a result, the team saves time. However, automation needs clear rules; therefore, someone must design the workflow first.`,
      readingQ: "حدد في القطعة 4 أدوات ربط ووظيفة كل واحدة.",
      writing: "Write a paragraph (5–6 sentences) about one task at work that should be automated. Use however, therefore, in addition and because."
    },
    ai: {
      topic: "مفهوم الأتمتة (Automation)",
      body: `<p>كل أتمتة تتكون من:</p>
<ol><li><b>محفّز (Trigger):</b> حدث يبدأ العملية — "وصل طلب جديد"، "الساعة 8 صباحاً".</li>
<li><b>إجراءات (Actions):</b> ما يحدث بعده — "أرسل إشعاراً"، "أضف صفاً في الجدول".</li>
<li><b>شروط (Conditions):</b> متى نفعل ومتى لا — "إذا المبلغ أكبر من 100 أرسله للمدير".</li></ol>
<p><b>من عالمك:</b> مرسى يعمل على Google Sheets عبر Apps Script — هذه أتمتة: الموظف يرسل طلباً (محفز) ← يُحفظ في الجدول ويظهر للمعتمد (إجراء) ← حسب الصلاحية (شرط).</p>
<p class="tip">💡 قبل أي أتمتة، اكتب العملية على ورق كخطوات "إذا... فإن..." — نصف العمل يكون انتهى.</p>`,
      task: "اختر مهمة متكررة في عملك واكتبها كأتمتة: المحفز، 3 إجراءات، وشرط واحد. ثم اطلب من Claude: \"كيف أنفذ هذا بـ Google Apps Script؟\" (للفهم فقط، لا تطبقه الآن)."
    },
    inv: {
      topic: "ما هو السهم؟",
      body: `<p><b>السهم</b> = حصة صغيرة من ملكية شركة. عندما تشتري سهماً تصبح <b>مساهماً</b>.</p>
<p><b>كيف تربح من السهم؟</b></p>
<ul><li><b>ارتفاع السعر:</b> تشتري بسعر وتبيع بسعر أعلى.</li>
<li><b>التوزيعات:</b> جزء من أرباح الشركة يوزع على المساهمين.</li></ul>
<p><b>عائد التوزيعات</b> = التوزيع السنوي للسهم ÷ سعر السهم. مثال: سهم بسعر 0.500 ر.ع يوزع 0.030 ← عائد 6%.</p>
<p>في عمان: الأسهم تُتداول في <b>بورصة مسقط (Muscat Stock Exchange)</b>.</p>
<p class="tip">⚠️ سعر السهم قد ينخفض كثيراً. السهم استثمار طويل المدى، ولا يُشترى بمال تحتاجه قريباً.</p>`,
      task: "احسب عائد التوزيعات: سهم سعره 0.250 ر.ع ويوزع 0.015 ر.ع سنوياً. ثم ابحث عن اسم 3 شركات مدرجة في بورصة مسقط تعرفها."
    },
    video: [
      ["Linking words however therefore", "linking words however therefore moreover"],
      ["What is automation workflow", "what is workflow automation trigger action"],
      ["ما هو السهم", "ما هو السهم وكيف تربح منه شرح مبسط"]
    ],
    quiz: [
      { q: "The delay was ___ the holiday.", o: ["because", "due to", "however", "therefore"], a: 1, x: "due to + اسم." },
      { q: "Sales dropped. ___, we reduced costs.", o: ["Although", "Because", "Therefore", "Moreover of"], a: 2, x: "نتيجة ← Therefore." },
      { q: "في الأتمتة، الحدث الذي يبدأ العملية يسمى:", o: ["Action", "Trigger", "Token", "Output"], a: 1, x: "Trigger = المحفز." },
      { q: "سهم سعره 0.500 ويوزع 0.025 سنوياً، عائد التوزيعات:", o: ["2.5%", "5%", "10%", "25%"], a: 1, x: "0.025 ÷ 0.500 = 5%." },
      { q: "صاحب السهم يسمى:", o: ["مقرض", "مساهم", "عميل", "وسيط"], a: 1, x: "Shareholder = مساهم." }
    ]
  },
  { d: 5, title: "الإيميل الاحترافي + مكتبة أوامرك + الادخار الشهري المركب",
    en: {
      topic: "Writing a professional email",
      body: `<table><tr><th>الجزء</th><th>عبارات جاهزة</th></tr>
<tr><td>التحية</td><td>Dear Mr. Wadah, / Dear Team,</td></tr>
<tr><td>الغرض</td><td>I am writing to... / I would like to request...</td></tr>
<tr><td>التفاصيل</td><td>Please find attached... / As discussed...</td></tr>
<tr><td>الطلب</td><td>Could you please... by [date]?</td></tr>
<tr><td>الختام</td><td>Please let me know if you have any questions. / Thank you for your support.</td></tr>
<tr><td>التوقيع</td><td>Best regards, Ali Al Busaisi</td></tr></table>
<p class="tip">💡 سطر الموضوع (Subject) قصير وواضح: "Approval Request – October Bank Reconciliation"</p>`,
      vocab: [
        ["regarding", "بخصوص", "I'm writing regarding the invoice."],
        ["as discussed", "كما تم النقاش", "As discussed, here is the plan."],
        ["kindly", "يرجى (مهذب)", "Kindly review the file."],
        ["confirm", "يؤكد", "Please confirm receipt."],
        ["receipt", "استلام / إيصال", "Please confirm receipt of the email."],
        ["clarify", "يوضح", "Could you clarify this point?"],
        ["template", "قالب", "Save this prompt as a template."],
        ["monthly", "شهرياً", "I save 50 OMR monthly."]
      ],
      reading: `Subject: Request – Training Plan Approval\n\nDear Mr. Wadah,\nI am writing to request your approval for a 12-week self-development plan. As discussed, it will not affect my working hours. Please find the plan attached. Could you please confirm by Sunday?\nThank you for your support.\nBest regards,\nAli Al Busaisi`,
      readingQ: "حدد أجزاء الإيميل الستة في القطعة (التحية، الغرض...).",
      writing: "Write a full professional email (with subject) to the accounts manager asking him to clarify a difference of 35 OMR in the October custody statement."
    },
    ai: {
      topic: "ابنِ مكتبة أوامرك الشخصية",
      body: `<p>الأوامر التي تكررها احفظها كقوالب، وغيّر فقط الأجزاء بين [ ].</p>
<p><b>قالب 1 — إيميل رسمي:</b><br><code>أنت مساعد إداري محترف. اكتب إيميلاً [بالعربي/بالإنجليزي] إلى [الشخص/منصبه] بخصوص [الموضوع]. الهدف: [ماذا أريد]. الأسلوب: مهني ومختصر، 6 أسطر كحد أقصى، مع سطر موضوع.</code></p>
<p><b>قالب 2 — معادلة Excel:</b><br><code>الأعمدة: A=[..] B=[..] C=[..]. أريد معادلة [تفعل ماذا]. أعطني المعادلة فقط ثم شرحاً من سطرين.</code></p>
<p><b>قالب 3 — تلخيص:</b><br><code>لخص النص التالي في [5] نقاط، ثم استخرج المبالغ والتواريخ في جدول، ثم اذكر أي شيء يحتاج قراراً مني.</code></p>
<p class="tip">💡 احفظ المكتبة في ملاحظات الجوال أو في ملف — ستوفر عليك ساعات كل شهر.</p>`,
      task: "اكتب 5 قوالب أوامر خاصة بعملك (خطاب بنك، تصفية عهدة، مطابقة، رد على موظف، تقرير). الصقها هنا في الملاحظات — ستكون نواة مشروع الأسبوع 4."
    },
    inv: {
      topic: "قوة الادخار الشهري المنتظم",
      body: `<p>ليس شرطاً مبلغ كبير. المهم <b>الانتظام + الوقت + العائد المركب</b>.</p>
<p>مثال توضيحي: ادخار <b>50 ر.ع شهرياً</b> بعائد افتراضي 6% سنوياً:</p>
<table><tr><th>المدة</th><th>ما دفعته</th><th>القيمة التقريبية</th></tr>
<tr><td>10 سنوات</td><td>6,000</td><td>≈ 8,194</td></tr></table>
<p>معادلة Excel: <code>=FV(6%/12,10*12,-50)</code></p>
<ul><li>6%/12 = العائد الشهري</li><li>10*12 = عدد الأشهر</li><li>-50 = الدفعة الشهرية (بالسالب لأنها تخرج منك)</li></ul>
<p class="tip">⚠️ العوائد الحقيقية غير مضمونة وتتغير؛ الأرقام هنا للتعلم فقط.</p>`,
      task: "باستخدام FV: احسب قيمة ادخار 60 ر.ع شهرياً لمدة 15 سنة بعائد 5%. ثم جرب 20 سنة. لاحظ الفرق."
    },
    video: [
      ["How to write a professional email", "how to write a professional email in English"],
      ["Prompt templates library", "prompt templates for work productivity"],
      ["دالة FV في Excel", "دالة FV في الاكسل شرح"]
    ],
    quiz: [
      { q: "أفضل بداية لغرض الإيميل:", o: ["Hey, I want...", "I am writing to request...", "Give me...", "Listen..."], a: 1, x: "I am writing to... بداية رسمية." },
      { q: "معنى Please confirm receipt:", o: ["أرسل الإيصال", "يرجى تأكيد الاستلام", "ادفع الفاتورة", "أكد الموعد"], a: 1, x: "receipt هنا = استلام." },
      { q: "فائدة مكتبة الأوامر:", o: ["تحذف الأخطاء تلقائياً", "توفر وقتاً وتوحد جودة النتائج", "تغني عن المراجعة", "لا فائدة"], a: 1, x: "قوالب جاهزة = سرعة + جودة ثابتة." },
      { q: "في =FV(6%/12,120,-50) الرقم 120 يمثل:", o: ["المبلغ", "عدد الأشهر", "العائد", "الضريبة"], a: 1, x: "10 سنوات × 12 شهراً = 120." },
      { q: "لماذا الدفعة في FV بالسالب؟", o: ["خطأ", "لأنها مال يخرج منك", "للتقريب", "لأنها خسارة"], a: 1, x: "اتفاقية Excel: الخارج سالب." }
    ]
  }],
  exam: [
    { q: "Muscat is ___ than Salalah.", o: ["big", "bigger", "biggest", "more big"], a: 1, x: "صفة قصيرة ← bigger." },
    { q: "If you ___ me, I will help you.", o: ["will call", "call", "called", "calling"], a: 1, x: "بعد if مضارع." },
    { q: "The report ___ by Ali last week.", o: ["prepared", "was prepared", "is prepare", "has prepare"], a: 1, x: "ماضٍ مجهول." },
    { q: "It was expensive. ___, we bought it.", o: ["Therefore", "However", "Because", "Due to"], a: 1, x: "تناقض ← However." },
    { q: "Kindly ___ the attached file.", o: ["reviews", "review", "to review", "reviewing"], a: 1, x: "بعد kindly فعل أصلي (أمر)." },
    { q: "Token في النماذج اللغوية:", o: ["كلمة مرور", "قطعة صغيرة من النص", "عملة رقمية", "خطأ"], a: 1, x: "وحدة نص." },
    { q: "مرحلة يتعلم فيها النموذج اللغة من نصوص ضخمة:", o: ["Pre-training", "Prompting", "Deposit", "Trigger"], a: 0, x: "التدريب المسبق." },
    { q: "\"قبل الكتابة اسألني 3 أسئلة\" هدفها:", o: ["إطالة الوقت", "تقليل التخمين", "زيادة التوكنات", "الهلوسة"], a: 1, x: "يسأل بدل أن يخمن." },
    { q: "المعادلة المناسبة لجلب قيمة من جدول آخر حسب رقم:", o: ["XLOOKUP", "SUM", "FV", "LEN"], a: 0, x: "XLOOKUP للبحث والجلب." },
    { q: "في الأتمتة: \"إذا المبلغ > 100 أرسله للمدير\" هذا:", o: ["محفز", "شرط", "مخرجات", "توكن"], a: 1, x: "Condition = شرط." },
    { q: "هدف \"أدخر\" بدون مبلغ ولا مدة هو:", o: ["هدف ذكي", "هدف ضعيف غير محدد", "استثمار", "دين"], a: 1, x: "ينقصه التحديد والقياس والوقت." },
    { q: "عند وجود دين مكلف، الأفضل عادة:", o: ["الاستثمار في الأسهم أولاً", "سداد الدين المكلف أولاً", "أخذ قرض جديد", "تجاهله"], a: 1, x: "سداده عائد مضمون." },
    { q: "سهم بسعر 1.000 ر.ع يوزع 0.040، عائد التوزيعات:", o: ["0.4%", "4%", "40%", "1%"], a: 1, x: "0.040 ÷ 1.000 = 4%." },
    { q: "صيغ الودائع في البنوك الإسلامية تعطي:", o: ["فائدة مضمونة ثابتة", "ربحاً متوقعاً حسب الصيغة", "لا شيء", "خسارة مضمونة"], a: 1, x: "ربح متوقع (وكالة/مضاربة)." },
    { q: "=FV(5%/12,15*12,-60) تحسب:", o: ["القسط الشهري لقرض", "قيمة ادخار 60 شهرياً لـ15 سنة بعائد 5%", "التضخم", "عائد التوزيعات"], a: 1, x: "القيمة المستقبلية لدفعات شهرية." }
  ]
});
