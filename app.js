function startLearning() {
  document.getElementById("subjects").scrollIntoView({
    behavior: "smooth"
  });
}

function openSubject(subject) {
  alert("📚 اخترتِ مادة: " + subject + "\n\nسيتم فتح دروس المادة قريبًا 🚀");
}

function startQuiz() {
  alert(
    "🎯 الكويز قادم!\n\n" +
    "راح يحتوي على أسئلة من المنهج العراقي، " +
    "وكل إجابة صحيحة تضيف نقاط إلى رصيد الطالب."
  );
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎓 Iraqi Educational Platform loaded successfully!");
});
