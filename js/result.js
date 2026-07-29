(() => {
  "use strict";

  const RESULT_KEY = "prn232QuizLastResult";
  const ACTIVE_KEY = "prn232QuizActive";
  const result = JSON.parse(localStorage.getItem(RESULT_KEY) || "null");

  if (!result || result.status !== "completed") {
    window.location.replace("index.html");
    return;
  }

  const $ = (selector) => document.querySelector(selector);
  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const getEvaluation = (percentage) => {
    if (percentage >= 90) return ["Xuất sắc!", "Kiến thức của bạn rất vững vàng. Tiếp tục phát huy nhé!"];
    if (percentage >= 75) return ["Tốt!", "Bạn đã nắm chắc phần lớn kiến thức PRN232."];
    if (percentage >= 60) return ["Khá!", "Kết quả ổn. Hãy xem lại các câu sai để tiến bộ nhanh hơn."];
    return ["Cần cố gắng!", "Đừng nản lòng. Mỗi lần xem lại là một bước tiến mới."];
  };

  const [evaluation, message] = getEvaluation(result.percentage);
  $("#evaluation").textContent = evaluation;
  $("#result-message").textContent = result.timedOut ? `Đã hết thời gian. ${message}` : message;
  $("#correct-score").textContent = result.correct;
  $("#total-score").textContent = result.questionCount;
  $("#percentage").textContent = `${result.percentage}%`;
  $("#correct-count").textContent = result.correct;
  $("#wrong-count").textContent = result.wrong;
  $("#skipped-count").textContent = result.unanswered;
  $("#time-spent").textContent = formatTime(result.elapsedSeconds);

  requestAnimationFrame(() => {
    $("#score-ring").style.setProperty("--score", result.percentage);
  });

  const shuffle = (items) => {
    const resultItems = [...items];
    for (let i = resultItems.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultItems[i], resultItems[j]] = [resultItems[j], resultItems[i]];
    }
    return resultItems;
  };

  $("#retry-btn").addEventListener("click", () => {
    const prepared = shuffle(questions).slice(0, result.questionCount).map((question) => {
      const correctText = question.options.find((item) => item.key === question.correctAnswer).text;
      const options = shuffle(question.options).map((option, index) => ({
        ...option, key: String.fromCharCode(65 + index)
      }));
      return { ...question, options, correctAnswer: options.find((item) => item.text === correctText).key };
    });
    const totalSeconds = result.durationMinutes * 60;
    localStorage.setItem(ACTIVE_KEY, JSON.stringify({
      version: 1,
      questionCount: result.questionCount,
      durationMinutes: result.durationMinutes,
      totalSeconds,
      remainingSeconds: totalSeconds,
      elapsedSeconds: 0,
      startedAt: Date.now(),
      lastTick: Date.now(),
      currentIndex: 0,
      answers: {},
      questions: prepared,
      status: "active"
    }));
    window.location.href = "quiz.html";
  });
})();
