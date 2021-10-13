<template>
<div class="main">
  <!-- <quiz-navigator :onNext="handleLoadNext" :onPrevious="handleLoadPrevious"/> -->
  <!-- <quiz-progress :quizLength="quizObj.questions.length" :currentQuiz="currentQuestionId" :quizAnswerHistory="[1,0,1,0,0,1,-1,-1,-1,-1]" /> -->
  <quiz-progress
    :quizLength="quizObj.questions.length"
    :currentQuiz="currentQuestionId"
    :quizAnswerHistory="quizAnswerHisotry"
    :onSelectNewQuestion="handleSelectNewQuestion"
  />
  <quiz
    :quiz="quizObj.questions[currentQuestionId]"
    :answer="quizAnswerHistoryXmlText[currentQuestionId]"
    :onCorrect="handleCorrect"
    :onError="handleError"
  />
</div>
</template>

<script>
import Quiz from "@/components/quiz/mainQuiz";
import QuizProgress from "@/components/quiz/quizProgress";
import QuizNavigator from "@/components/quiz/quizNavigator";

import { quiz1 } from "@/util/quizes";
export default {
  name: "quiz-page",
  components: {
    Quiz,
    QuizProgress,
    QuizNavigator
  },
  props: {
    // TODO: quizObj and quizAnswerHistory should be put in vuex
    quizObj: {
      type: Object,
      default() {
        return quiz1;
      }
    }, // all the tests
    quizAnswerHistoryXmlText: {
      type: Array,
      default() {
        return [];
      }
    },
    quizAnswerHisotry: {
      type: Array,
      default() {
        return [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
      }
    }
  },
  data() {
    return {
      currentQuestionId: 0
    };
  },
  computed: {},
  methods: {
    handleSelectNewQuestion(questionId) {
      console.log(questionId);
      this.currentQuestionId = questionId;
    },
    handleCorrect(quizDomText, isActiveCheck) {
      if (!isActiveCheck) // 这个和下面的逻辑相反，貌似挺合理，再优化吧。 TODO
        this.$message({ message: "答dui鸟", type: "success" });
      console.log("答对了", this.currentQuestionId);
      this.$set(this.quizAnswerHisotry, this.currentQuestionId, 1);
      this.$set(
        this.quizAnswerHistoryXmlText,
        this.currentQuestionId,
        quizDomText
      );
    },
    handleError(quizDomText, isActiveCheck) {
      if (isActiveCheck) this.$message({ message: "答cuo鸟", type: "error" });
      console.log("答错了", this.currentQuestionId);
      this.$set(this.quizAnswerHisotry, this.currentQuestionId, 0);
      this.$set(
        this.quizAnswerHistoryXmlText,
        this.currentQuestionId,
        quizDomText
      );
    },
    handleLoadPrevious() {
      if (this.currentQuestionId === 1) {
        return;
      }
      this.currentQuestionId -= 1;
    },
    handleLoadNext() {
      if (this.currentQuestionId === this.quizObj.questions.length + 1) {
        return;
      }
      this.currentQuestionId += 1;
    }
  },
  created() {},
  mounted() {},
  beforeRouteUpdate(to, from, next) {},
  beforeRouteLeave(to, from, next) {},
  updated() {}
};
</script>


<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
#work-container {
  position: relative;
  display: flex;
  .song-item {
    margin: 20px;
  }
}
</style>
