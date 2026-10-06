const app=document.getElementById("app");

const subjects=[
 {id:"math",name:"الرياضيات",icon:"➗",desc:"الأعداد والعمليات والهندسة والمسائل"},
 {id:"arabic",name:"اللغة العربية",icon:"ع",desc:"القراءة والقواعد والإملاء والتعبير"},
 {id:"science",name:"العلوم",icon:"🔬",desc:"الكائنات والطبيعة والتجارب"},
 {id:"english",name:"اللغة الإنجليزية",icon:"A",desc:"الكلمات والقراءة والمحادثة"},
 {id:"social",name:"الاجتماعيات",icon:"🗺️",desc:"العراق والمجتمع والجغرافيا"},
 {id:"islamic",name:"التربية الإسلامية",icon:"☪",desc:"الدروس والقيم والسيرة"}
];
const students=[
 ["سارة أحمد",980],["محمد علي",940],["نور حسين",915],["زينب عمر",870],["علي حسن",825]
];

function top(active="home"){
 return `<header class="topbar"><a class="brand" href="#/">Iraqi<span>Edu</span></a>
 <nav class="nav">
 <button onclick="go('#/student')">الطلاب</button><button onclick="go('#/teacher')">المعلمون</button>
 <button onclick="go('#/admin')">الإدارة</button><button onclick="go('#/parent')">ولي الأمر</button>
 </nav><button class="primary" onclick="go('#/login')">تسجيل الدخول</button></header>`;
}
function go(path){location.hash=path}
function home(){
 return top()+`<main>
 <section class="hero"><div class="container hero-grid"><div>
 <div class="eyebrow">منصة تعليمية عراقية حديثة</div><h1>تعلّم، اختبر، تقدّم، وتصدّر.</h1>
 <p>منصة تعليمية متكاملة للمرحلة الابتدائية، تجمع المنهج، الكتب، الشرح، الكوزات، السبورة التفاعلية والمنافسة التعليمية في مكان واحد.</p>
 <div class="hero-actions"><button class="primary" onclick="go('#/student')">ابدأ التعلم</button><button class="ghost" onclick="go('#/books')">تصفح الكتب</button></div>
 </div><div class="hero-card"><h3>🏆 المتصدر الحالي</h3><h2>سارة أحمد</h2><p class="muted">980 نقطة تنافسية</p><div class="progress"><i style="width:92%"></i></div><p>المركز الأول — الصف الثالث</p></div></div></section>
 <section class="section"><div class="container"><div class="section-title"><h2>اختر مساحتك</h2></div>
 <div class="roles">
 <div class="card"><div class="icon">👨‍🎓</div><h3>الطلاب</h3><p class="muted">الدروس والكتب والكوزات والنقاط والإنجازات.</p><button class="primary" onclick="go('#/student')">دخول الطلاب</button></div>
 <div class="card"><div class="icon">👩‍🏫</div><h3>المعلمون</h3><p class="muted">إدارة الصفوف والواجبات والاختبارات والتقارير.</p><button class="primary" onclick="go('#/teacher')">دخول المعلمين</button></div>
 <div class="card"><div class="icon">🏫</div><h3>الإدارة</h3><p class="muted">إدارة المحتوى والمستخدمين والصلاحيات وسجل العمليات.</p><button class="primary" onclick="go('#/admin')">لوحة الإدارة</button></div>
 </div></div></section>
 <section class="section"><div class="container"><div class="section-title"><h2>المواد</h2><button class="ghost" onclick="go('#/books')">كل الكتب ←</button></div>
 <div class="subjects">${subjects.map(s=>`<div class="card subject-card" onclick="go('#/subject/${s.id}')"><div class="icon">${s.icon}</div><div><h3>${s.name}</h3><p class="muted">${s.desc}</p></div></div>`).join("")}</div></div></section>
 </main><footer class="footer"><div class="container">IraqiEdu © 2026 — منصة تعليمية قابلة للتوسع.</div></footer>`;
}
function student(){
 return top()+`<div class="dashboard"><aside class="sidebar"><h3>مساحة الطالب</h3>${["الرئيسية","المواد","الكتب","الكوزات","السبورة","الإنجازات","المتصدرون"].map((x,i)=>`<button class="${i==0?"active":""}">${x}</button>`).join("")}</aside>
 <main class="main"><h1>أهلاً سارة 👋</h1><p class="muted">لنواصل رحلة التعلم اليوم.</p>
 <div class="stats"><div class="card stat"><span>النقاط</span><strong>980</strong></div><div class="card stat"><span>الإنجاز</span><strong>72%</strong></div><div class="card stat"><span>الكوزات</span><strong>38</strong></div></div>
 <section class="section"><div class="section-title"><h2>موادك</h2></div><div class="subjects">${subjects.map(s=>`<div class="card subject-card"><span class="tag">الصف الثالث</span><div class="icon">${s.icon}</div><h3>${s.name}</h3><button class="primary" onclick="go('#/subject/${s.id}')">فتح المادة</button></div>`).join("")}</div></section>
 <div class="card"><h3>👑 المتصدر</h3><div class="rank"><div class="rank-num">1</div><div><b>سارة أحمد</b><div class="muted">980 نقطة</div></div></div></div>
 </main></div>`;
}
function subject(id){
 const s=subjects.find(x=>x.id===id)||subjects[0];
 return top()+`<main class="container section"><button class="ghost" onclick="go('#/student')">← العودة</button><div class="card" style="margin-top:15px"><div class="icon">${s.icon}</div><h1>${s.name} — الصف الثالث الابتدائي</h1><p class="muted">${s.desc}</p>
 <div class="cards"><div class="card"><h3>📖 الكتاب</h3><p>تصفح الكتاب داخل المنصة.</p><button class="primary" onclick="go('#/reader')">فتح الكتاب</button></div>
 <div class="card"><h3>📝 كوزات الدرس</h3><p>اختبارات مرتبطة بالمنهج.</p><button class="primary" onclick="go('#/quiz')">ابدأ الكوز</button></div>
 <div class="card"><h3>🖊️ السبورة التفاعلية</h3><p>حل واكتب وارسم مباشرة.</p><button class="primary" onclick="go('#/board')">فتح السبورة</button></div></div></div></main>`;
}
function reader(){
 return top()+`<main class="container section"><div class="section-title"><h1>📖 كتاب الرياضيات — الصف الثالث</h1><div><button class="ghost">−</button><button class="ghost">100%</button><button class="ghost">+</button></div></div><div class="reader"><div class="book-page"><h2>الوحدة الأولى: الأعداد</h2><h3>الدرس الأول: قراءة الأعداد وكتابتها</h3><p>يتعلم الطالب قراءة الأعداد وكتابتها وترتيبها ومقارنتها. هذا المحتوى يمثل واجهة قارئ الكتاب؛ عند ربط المحتوى الرسمي سيتم عرض صفحات الكتاب هنا.</p><hr><p><b>صفحة 1</b></p></div><div style="display:flex;justify-content:space-between"><button class="ghost">← الصفحة السابقة</button><span>1 / 100</span><button class="primary">الصفحة التالية →</button></div></div></main>`;
}
function quiz(){
 return top()+`<main class="container section"><div class="card"><div class="eyebrow">كوز الرياضيات</div><h1>الأعداد والقيمة المكانية</h1><p class="muted">10 أسئلة · درجة الصعوبة: مناسب للصف الثالث</p>
 <hr><div class="quiz-q"><h3>1. ما العدد الذي يمثل 3 مئات و4 عشرات و5 آحاد؟</h3>${["345","354","435","543"].map(x=>`<button class="option">${x}</button>`).join("")}</div>
 <div class="quiz-q"><h3>2. أي عدد أكبر؟</h3>${["245","254","205","240"].map(x=>`<button class="option">${x}</button>`).join("")}</div>
 <button class="primary">إنهاء الكوز</button></div></main>`;
}
function board(){
 return top()+`<main class="container section"><div class="section-title"><h1>🖊️ السبورة التفاعلية</h1><button class="ghost" onclick="clearBoard()">مسح</button></div><canvas id="board" class="board"></canvas><p class="muted">اكتبي بإصبعك أو بالماوس. هذه اللوحة واجهة أولية ويمكن ربطها لاحقاً بحفظ آمن للواجبات.</p></main>`;
}
function leaderboard(){
 return top()+`<main class="container section"><div class="card"><h1>🏆 المتصدرون</h1><p class="muted">يتغير المتصدر فقط عند تحقيق نقاط معتمدة من النظام.</p><table class="table"><thead><tr><th>#</th><th>الطالب</th><th>النقاط</th></tr></thead><tbody>${students.map((s,i)=>`<tr><td>${i+1}</td><td>${s[0]}</td><td><b>${s[1]}</b></td></tr>`).join("")}</tbody></table></div></main>`;
}
function panel(role){
 const labels={teacher:["👩‍🏫 لوحة المعلم","الصفوف","الطلاب","الاختبارات","الواجبات","بنك الأسئلة","التقارير"],admin:["🏫 لوحة الإدارة","المستخدمون","المدارس","المناهج","الأسئلة","الصلاحيات","سجل العمليات"],parent:["👨‍👩‍👧 لوحة ولي الأمر","أبنائي","الدرجات","التقدم","الواجبات","الإشعارات"]}[role];
 return top()+`<div class="dashboard"><aside class="sidebar"><h3>${labels[0]}</h3>${labels.slice(1).map((x,i)=>`<button class="${i===0?"active":""}">${x}</button>`).join("")}</aside><main class="main"><h1>${labels[0]}</h1><div class="stats"><div class="card stat"><span>الطلاب</span><strong>1,240</strong></div><div class="card stat"><span>الاختبارات</span><strong>386</strong></div><div class="card stat"><span>متوسط الأداء</span><strong>84%</strong></div></div><section class="section"><div class="card"><h3>النشاط الأخير</h3><p>تم إكمال كوز الرياضيات — الصف الثالث.</p><p>تم تحديث محتوى درس جديد.</p><p>تم تسجيل إنجاز لطالب.</p></div></section></main></div>`;
}
function login(){return top()+`<main class="container"><div class="form card"><h1>تسجيل الدخول</h1><div class="field"><label>البريد الإلكتروني / اسم المستخدم</label><input placeholder="example@iraqiedu.iq"></div><div class="field"><label>كلمة المرور</label><input type="password" placeholder="••••••••"></div><button class="primary" style="width:100%" onclick="go('#/student')">دخول تجريبي</button><p class="muted">في النسخة الإنتاجية سيتم ربط الدخول بخادم آمن وصلاحيات حقيقية.</p></div></main>`}

function render(){
 const p=location.hash||"#/";
 if(p==="#/"||p==="#") app.innerHTML=home();
 else if(p==="#/student") app.innerHTML=student();
 else if(p==="#/teacher") app.innerHTML=panel("teacher");
 else if(p==="#/admin") app.innerHTML=panel("admin");
 else if(p==="#/parent") app.innerHTML=panel("parent");
 else if(p==="#/books") app.innerHTML=reader();
 else if(p==="#/reader") app.innerHTML=reader();
 else if(p==="#/quiz") app.innerHTML=quiz();
 else if(p==="#/board"){app.innerHTML=board(); setTimeout(initBoard,50)}
 else if(p==="#/leaderboard") app.innerHTML=leaderboard();
 else if(p==="#/login") app.innerHTML=login();
 else if(p.startsWith("#/subject/")) app.innerHTML=subject(p.split("/")[2]);
 else app.innerHTML=home();
}
function initBoard(){
 const c=document.getElementById("board"); if(!c)return;
 c.width=c.clientWidth; c.height=c.clientHeight; const ctx=c.getContext("2d"); let drawing=false;
 const pos=e=>{const r=c.getBoundingClientRect();return{x:(e.touches?e.touches[0].clientX:e.clientX)-r.left,y:(e.touches?e.touches[0].clientY:e.clientY)-r.top}};
 const start=e=>{drawing=true;ctx.beginPath();let p=pos(e);ctx.moveTo(p.x,p.y);e.preventDefault()};
 const move=e=>{if(!drawing)return;let p=pos(e);ctx.lineTo(p.x,p.y);ctx.stroke();e.preventDefault()};
 const end=()=>drawing=false;
 c.addEventListener("mousedown",start);c.addEventListener("mousemove",move);c.addEventListener("mouseup",end);
 c.addEventListener("touchstart",start,{passive:false});c.addEventListener("touchmove",move,{passive:false});c.addEventListener("touchend",end);
 window.clearBoard=()=>ctx.clearRect(0,0,c.width,c.height);
}
window.addEventListener("hashchange",render);render();
