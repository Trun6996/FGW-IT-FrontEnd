<template>
  <div class="test-card">
    <div class="test-header">
      <h2>Test Yourself</h2>
    </div>
    <div class="test-content">
      <div v-if="loading" class="ui active inline loader"></div>

      <div v-else>
        <div v-if="!isQuizActive && !isQuizComplete" class="centered">
          <button class="ui huge primary button" @click="startQuiz">
            <i class="play icon"></i> Start Quiz (10 Questions)
          </button>
        </div>

        <div v-else-if="isQuizComplete" class="centered quiz-complete">
          <h3 class="ui header" style="color: #1b70ff; font-size: 1.8rem;">Quiz Complete!</h3>
          <p style="font-size: 1.5rem; font-weight: 700; margin: 1rem 0;">Your Score: <span style="color: #e91e63;">{{ score }}/10</span></p>
          <p v-if="score >= 8" style="color: #4caf50; font-size: 1.1rem;">Excellent work! 🎉</p>
          <p v-else-if="score >= 6" style="color: #ff9800; font-size: 1.1rem;">Good job! Keep practicing.</p>
          <p v-else style="color: #f44336; font-size: 1.1rem;">Try again to improve your score.</p>
          <button class="ui primary button" @click="resetQuiz" style="margin-top: 1rem;">
            <i class="redo icon"></i> Start New Quiz
          </button>
        </div>

        <div v-else class="test-question">
          <div style="text-align: center; margin-bottom: 1rem; font-weight: 700; color: #1b70ff;">
            Question {{ quizQuestionCount }} of 10
            <div style="margin-top: 0.5rem; background: #e0eaff; height: 6px; border-radius: 3px; overflow: hidden;">
              <div :style="{ background: '#1b70ff', height: '100%', width: (quizQuestionCount / 10) * 100 + '%' }" />
            </div>
          </div>
          <h3 class="question-title">
            What is the
            <span v-if="targetLang === 'german'" class="lang">German</span>
            <span v-else class="lang">Vietnamese</span>
            word for:
          </h3>

          <p class="word-main">{{ current.english }}</p>

          <div class="ui form" style="margin:1rem 0">
            <input
              type="text"
              v-model="answer"
              :placeholder="targetLang === 'german' ? 'Type German...' : 'Type Vietnamese...'"
            />
          </div>

          <div class="test-actions">
            <button class="ui green button" @click="checkAnswer">
              <i class="check icon"></i> Check
            </button>
            <button class="ui button" @click="nextQuestion" style="margin-left:0.5rem">
              <i class="arrow right icon"></i> Next
            </button>
            <button class="ui basic button" @click="toggleLanguage" style="margin-left:0.5rem">
              <i class="exchange icon"></i> Swap
            </button>
          </div>

          <div v-if="result" :class="['ui', 'message', result.correct ? 'positive' : 'negative', 'result-message']">
            <p>{{ result.message }}</p>
            <p v-if="!result.correct">
              Correct answer:
              <strong>
                {{ targetLang === 'german' ? current.german : current.vietnamese }}
              </strong>
            </p>
          </div>
        </div>

        <div v-if="error" class="ui red message" style="margin-top:1rem">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../helpers/api";

export default {
  name: "TestCard",
  data() {
    return {
      words: [],
      current: null,
      targetLang: "german",
      answer: "",
      result: null,
      loading: true,
      error: null,
      isQuizActive: false,
      isQuizComplete: false,
      score: 0,
      quizQuestionCount: 0,
      quizzedWords: [],
      answeredQuestions: 0
    };
  },
  async mounted() {
    try {
      this.words = await api.getWords();
    } catch (err) {
      console.error("Failed to fetch words:", err);
      this.error = "Cannot load words from server!";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    startTest() {
      this.nextQuestion();
    },
    startQuiz() {
      this.isQuizActive = true;
      this.isQuizComplete = false;
      this.score = 0;
      this.quizQuestionCount = 0;
      this.answeredQuestions = 0;
      this.quizzedWords = [];
      this.nextQuestion();
    },
    resetQuiz() {
      this.isQuizActive = false;
      this.isQuizComplete = false;
      this.score = 0;
      this.quizQuestionCount = 0;
      this.answeredQuestions = 0;
      this.quizzedWords = [];
      this.current = null;
      this.answer = '';
      this.result = null;
    },
    nextQuestion() {
      if (!this.words.length) return;
      
      if (this.isQuizActive) {
        this.answeredQuestions++;
        if (this.answeredQuestions > 10) {
          this.isQuizActive = false;
          this.isQuizComplete = true;
          return;
        }
        this.quizQuestionCount = this.answeredQuestions;
      }

      this.current = this.words[Math.floor(Math.random() * this.words.length)];
      this.targetLang = Math.random() < 0.5 ? "german" : "vietnamese";
      this.answer = "";
      this.result = null;
    },
    checkAnswer() {
      if (!this.current) return;
      const correctValue =
        this.targetLang === "german"
          ? this.current.german
          : this.current.vietnamese;
      const user = (this.answer || "").trim().toLowerCase();
      const correct = (correctValue || "").trim().toLowerCase();

      if (!user) {
        this.result = { correct: false, message: "Please type an answer first." };
        return;
      }

      const isCorrect = user === correct;
      if (this.isQuizActive && isCorrect) {
        this.score++;
      }
      
      this.result = isCorrect
        ? { correct: true, message: "Correct!" }
        : { correct: false, message: "Wrong!" };
    },
    toggleLanguage() {
      this.targetLang = this.targetLang === 'german' ? 'vietnamese' : 'german';
      this.answer = '';
      this.result = null;
    },
  },
};
</script>

<style scoped>
.test-card {
  max-width: 520px;
  margin: 2.5rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(30,64,175,0.10), 0 1.5px 6px rgba(30,64,175,0.12);
  padding: 2.2rem 2.2rem 1.5rem 2.2rem;
}
.test-header {
  text-align: center;
  margin-bottom: 1.2rem;
}
.test-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1b70ff;
  margin: 0;
}
.centered {
  text-align: center;
  padding: 1.5rem 0;
}
.quiz-complete {
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.test-question {
  text-align: center;
}
.question-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.lang {
  color: #1b70ff;
  font-weight: 700;
}
.word-main {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.2rem;
}
.test-actions {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.result-message {
  margin-top: 1.2rem !important;
  font-size: 1.08rem;
}
</style>
