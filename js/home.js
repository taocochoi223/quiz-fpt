(() => {
  "use strict";

  const STORAGE_KEY = "prn232QuizActive";
  const THEME_KEY = "prn232QuizTheme";
  const optionGrid = document.querySelector("#quiz-options");
  const modal = document.querySelector("#start-modal");
  const countOutput = document.querySelector("#modal-count");
  const timeOutput = document.querySelector("#modal-time");
  const messageOutput = document.querySelector("#start-message");
  const themeButton = document.querySelector(".theme-toggle");
  let selectedExam = null;

  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const prepareQuestions = (count) => shuffle(questions).slice(0, count).map((question) => {
    const correctOption = question.options.find((option) => option.key === question.correctAnswer);
    const shuffledOptions = shuffle(question.options).map((option, index) => ({
      ...option,
      key: String.fromCharCode(65 + index)
    }));
    const newCorrectOption = shuffledOptions.find((option) => option.text === correctOption.text);
    return { ...question, options: shuffledOptions, correctAnswer: newCorrectOption.key };
  });

  const openModal = (card) => {
    const timeInput = card.querySelector(".time-input");
    const requestedMinutes = Number.parseInt(timeInput.value, 10);
    const minutes = Math.min(180, Math.max(1, Number.isFinite(requestedMinutes) ? requestedMinutes : Number(card.dataset.minutes)));
    timeInput.value = minutes;
    selectedExam = {
      count: Number(card.dataset.count),
      minutes
    };
    countOutput.textContent = selectedExam.count;
    timeOutput.textContent = `${selectedExam.minutes} phút`;
    messageOutput.textContent = `Bạn có chắc muốn bắt đầu bài kiểm tra ${selectedExam.count} câu?`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  };

  const startExam = () => {
    if (!selectedExam) return;
    const totalSeconds = selectedExam.minutes * 60;
    const state = {
      version: 1,
      questionCount: selectedExam.count,
      durationMinutes: selectedExam.minutes,
      totalSeconds,
      remainingSeconds: totalSeconds,
      elapsedSeconds: 0,
      startedAt: Date.now(),
      lastTick: Date.now(),
      currentIndex: 0,
      answers: {},
      questions: prepareQuestions(selectedExam.count),
      status: "active"
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.location.href = "quiz.html";
  };

  optionGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".start-btn");
    if (button) openModal(button.closest(".exam-card"));
  });
  document.querySelector("#cancel-start").addEventListener("click", closeModal);
  document.querySelector("#confirm-start").addEventListener("click", startExam);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  themeButton.textContent = document.body.classList.contains("dark-mode") ? "☀" : "☾";
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    themeButton.textContent = dark ? "☀" : "☾";
  });
})();
