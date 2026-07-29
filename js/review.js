(() => {
  "use strict";

  const RESULT_KEY = "prn232QuizLastResult";
  const result = JSON.parse(localStorage.getItem(RESULT_KEY) || "null");
  if (!result || result.status !== "completed") {
    window.location.replace("index.html");
    return;
  }

  const escapeHtml = (value) => {
    const node = document.createElement("div");
    node.textContent = value;
    return node.innerHTML;
  };

  document.querySelector("#review-summary").innerHTML = `
    <span>✓ ${result.correct} đúng</span>
    <span>× ${result.wrong} sai</span>
    <span>– ${result.unanswered} chưa làm</span>`;

  document.querySelector("#review-list").innerHTML = result.questions.map((question, index) => {
    const userAnswer = result.answers[index];
    const options = question.options.map((option) => {
      const isCorrect = option.key === question.correctAnswer;
      const isSelected = option.key === userAnswer;
      const className = isCorrect ? "correct" : (isSelected ? "incorrect-selected" : "");
      const suffix = isCorrect ? " ✓" : (isSelected ? " — Bạn chọn" : "");
      return `
        <div class="review-option ${className}">
          <div class="review-option-row">
            <span class="review-option-key">${option.key}</span>
            <span>${escapeHtml(option.text)}${suffix}</span>
          </div>
          <p class="explanation">${escapeHtml(option.explanation)}</p>
        </div>`;
    }).join("");
    const userClass = !userAnswer ? "" : (userAnswer === question.correctAnswer ? "right" : "wrong");
    return `
      <article class="review-item">
        <div class="review-question-top">
          <span class="review-index">Câu ${index + 1}</span>
          <h2>${escapeHtml(question.question)}</h2>
        </div>
        <div class="review-options">${options}</div>
        <div class="answer-recap">
          <span>Bạn chọn: <strong class="${userClass}">${userAnswer || "Chưa trả lời"}</strong></span>
          <span>Đáp án đúng: <strong class="right">${question.correctAnswer}</strong></span>
        </div>
      </article>`;
  }).join("");
})();
