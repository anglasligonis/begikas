// Quiz logic
document.querySelectorAll('.quiz').forEach(quiz => {
  const correctIdx = parseInt(quiz.dataset.correct);
  const opts = quiz.querySelectorAll('.quiz-opt');
  const feedback = quiz.querySelector('.quiz-feedback');
  opts.forEach((opt, idx) => {
    opt.addEventListener('click', () => {
      if (quiz.dataset.answered) return;
      quiz.dataset.answered = 'true';
      opts.forEach(o => o.disabled = true);
      if (idx === correctIdx) {
        opt.classList.add('correct');
        opt.innerHTML += '<span class="mark">✓</span>';
      } else {
        opt.classList.add('wrong');
        opt.innerHTML += '<span class="mark">✗</span>';
        opts[correctIdx].classList.add('correct');
        opts[correctIdx].innerHTML += '<span class="mark">✓</span>';
        feedback.classList.add('wrong');
      }
      feedback.classList.add('show');
      // Mark lesson complete once quiz is answered
      const lessonEl = quiz.closest('.lesson');
      const idx2 = parseInt(lessonEl.id.replace('lesson-', ''));
      completed.add(idx2);
      refreshPills();
    });
  });
});

// Mark a lesson complete when its bottom (step-nav) is reached
const completeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const lessonEl = e.target.closest('.lesson');
      if (lessonEl) {
        const idx = parseInt(lessonEl.id.replace('lesson-', ''));
        completed.add(idx);
        refreshPills();
      }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.lesson .step-nav').forEach(el => completeObserver.observe(el));
