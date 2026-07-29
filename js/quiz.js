(() => {
  "use strict";

  const STORAGE_KEY = "prn232QuizActive";
  const RESULT_KEY = "prn232QuizLastResult";
  const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

  if (!state || state.status !== "active" || !Array.isArray(state.questions)) {
    window.location.replace("index.html");
    return;
  }

  const elements = {
    card: document.querySelector("#question-card"),
    counter: document.querySelector("#question-counter"),
    answeredCounter: document.querySelector("#answered-counter"),
    progress: document.querySelector("#quiz-progress"),
    number: document.querySelector("#question-number"),
    text: document.querySelector("#question-text"),
    answers: document.querySelector("#answers"),
    prev: document.querySelector("#prev-btn"),
    next: document.querySelector("#next-btn"),
    timer: document.querySelector("#timer"),
    timerText: document.querySelector("#timer strong"),
    drawer: document.querySelector("#question-drawer"),
    drawerBackdrop: document.querySelector("#drawer-backdrop"),
    grid: document.querySelector("#question-grid"),
    submitModal: document.querySelector("#submit-modal")
  };

  let timerId = null;
  let submitted = false;

  const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const formatTime = (seconds) => {
    const safe = Math.max(0, seconds);
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  };

  const answeredCount = () => Object.keys(state.answers).length;

  const renderQuestionGrid = () => {
    elements.grid.innerHTML = state.questions.map((_, index) => {
      const classes = [
        state.answers[index] ? "answered" : "",
        index === state.currentIndex ? "current" : ""
      ].filter(Boolean).join(" ");
      return `<button class="${classes}" type="button" data-index="${index}" aria-label="Đi đến câu ${index + 1}">${index + 1}</button>`;
    }).join("");
  };

  const renderQuestion = (animate = false) => {
    const question = state.questions[state.currentIndex];
    if (animate) elements.card.classList.add("switching");

    window.setTimeout(() => {
      const displayNumber = state.currentIndex + 1;
      elements.counter.textContent = `Câu ${displayNumber} / ${state.questionCount}`;
      elements.number.textContent = `Câu hỏi ${String(displayNumber).padStart(2, "0")}`;
      elements.text.textContent = question.question;
      elements.progress.style.width = `${(displayNumber / state.questionCount) * 100}%`;
      elements.answeredCounter.textContent = `Đã làm ${answeredCount()} câu`;

      elements.answers.innerHTML = question.options.map((option) => {
        const selected = state.answers[state.currentIndex] === option.key;
        return `
          <div class="answer-option${selected ? " selected" : ""}" role="button" tabindex="0" data-key="${option.key}" aria-pressed="${selected}">
            <span class="answer-key">${option.key}</span>
            <span class="answer-text">${escapeHtml(option.text)}</span>
          </div>`;
      }).join("");

      elements.prev.disabled = state.currentIndex === 0;
      const isLast = state.currentIndex === state.questionCount - 1;
      elements.next.innerHTML = isLast ? "Nộp bài <span>✓</span>" : "Câu tiếp <span>→</span>";
      renderQuestionGrid();
      elements.card.classList.remove("switching");
    }, animate ? 130 : 0);
  };

  function escapeHtml(value) {
    const node = document.createElement("div");
    node.textContent = value;
    return node.innerHTML;
  }

  const goToQuestion = (index) => {
    if (index < 0 || index >= state.questionCount || index === state.currentIndex) return;
    state.currentIndex = index;
    saveState();
    renderQuestion(true);
  };

  const showSubmitModal = () => {
    document.querySelector("#submit-answered").textContent = answeredCount();
    document.querySelector("#submit-unanswered").textContent = state.questionCount - answeredCount();
    elements.submitModal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const hideSubmitModal = () => {
    elements.submitModal.hidden = true;
    document.body.style.overflow = "";
  };

  const closeDrawer = () => {
    elements.drawer.classList.remove("open");
    elements.drawer.setAttribute("aria-hidden", "true");
    window.setTimeout(() => { elements.drawerBackdrop.hidden = true; }, 280);
  };

  const openDrawer = () => {
    renderQuestionGrid();
    elements.drawerBackdrop.hidden = false;
    elements.drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => elements.drawer.classList.add("open"));
  };

  const submitExam = (timedOut = false) => {
    if (submitted) return;
    submitted = true;
    clearInterval(timerId);
    const correct = state.questions.reduce((score, question, index) => (
      score + (state.answers[index] === question.correctAnswer ? 1 : 0)
    ), 0);
    const unanswered = state.questionCount - answeredCount();
    const result = {
      ...state,
      correct,
      wrong: state.questionCount - correct - unanswered,
      unanswered,
      elapsedSeconds: Math.min(state.totalSeconds, state.totalSeconds - state.remainingSeconds),
      percentage: Math.round((correct / state.questionCount) * 100),
      timedOut,
      submittedAt: Date.now(),
      status: "completed"
    };
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
    localStorage.removeItem(STORAGE_KEY);
    window.location.replace("result.html");
  };

  const updateTimer = () => {
    const now = Date.now();
    const passed = Math.max(0, Math.floor((now - state.lastTick) / 1000));
    if (passed > 0) {
      state.remainingSeconds = Math.max(0, state.remainingSeconds - passed);
      state.elapsedSeconds = state.totalSeconds - state.remainingSeconds;
      state.lastTick = now;
      saveState();
    }
    elements.timerText.textContent = formatTime(state.remainingSeconds);
    elements.timer.classList.toggle("danger", state.remainingSeconds < 60);
    if (state.remainingSeconds <= 0) submitExam(true);
  };

  elements.answers.addEventListener("click", (event) => {
    // Không kích hoạt chọn đáp án khi bôi đen (highlight) text để dịch hoặc copy
    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) return;

    const option = event.target.closest(".answer-option");
    if (!option) return;
    state.answers[state.currentIndex] = option.dataset.key;
    saveState();
    renderQuestion();
  });
  elements.answers.addEventListener("keydown", (event) => {
    if (["Enter", " "].includes(event.key)) {
      const option = event.target.closest(".answer-option");
      if (option) {
        event.preventDefault();
        state.answers[state.currentIndex] = option.dataset.key;
        saveState();
        renderQuestion();
      }
    }
  });
  elements.prev.addEventListener("click", () => goToQuestion(state.currentIndex - 1));
  elements.next.addEventListener("click", () => {
    if (state.currentIndex === state.questionCount - 1) showSubmitModal();
    else goToQuestion(state.currentIndex + 1);
  });
  elements.grid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) return;
    goToQuestion(Number(button.dataset.index));
    closeDrawer();
  });
  document.querySelector("#question-list-btn").addEventListener("click", openDrawer);
  document.querySelector("#close-drawer").addEventListener("click", closeDrawer);
  elements.drawerBackdrop.addEventListener("click", closeDrawer);
  document.querySelector("#drawer-submit").addEventListener("click", () => { closeDrawer(); showSubmitModal(); });
  document.querySelector("#continue-quiz").addEventListener("click", hideSubmitModal);
  document.querySelector("#confirm-submit").addEventListener("click", () => submitExam(false));
  elements.submitModal.addEventListener("click", (event) => {
    if (event.target === elements.submitModal) hideSubmitModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goToQuestion(state.currentIndex - 1);
    if (event.key === "ArrowRight") goToQuestion(state.currentIndex + 1);
    if (/^[1-4]$/.test(event.key)) {
      const option = state.questions[state.currentIndex].options[Number(event.key) - 1];
      if (option) {
        state.answers[state.currentIndex] = option.key;
        saveState();
        renderQuestion();
      }
    }
    if (event.key === "Escape") {
      closeDrawer();
      hideSubmitModal();
    }
  });

  window.addEventListener("beforeunload", saveState);
  renderQuestion();
  updateTimer();
  timerId = window.setInterval(updateTimer, 1000);
})();
