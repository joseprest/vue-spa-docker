<script>
export default {
  props: {
    quizLength: {
      type: Number
    },
    currentQuiz: {
      type: Number
    },
    //[1,0,1,0,0,1,-1,-1,-1,-1] 1:correct,0:wrong,-1:not answered
    quizAnswerHistory: {
      type: Array
    },
    onSelectNewQuestion: {
      tyoe: Function
    }
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    activateQuiz(i) {
      this.onSelectNewQuestion(i);
    }
  }
};
</script>

<template>
    <div class="quiz-progress">
      <ul>
        <li v-for="i in quizLength" 
          :key="i" 
          :class="{
            active:currentQuiz==i-1,
            correct:currentQuiz!=i-1&&quizAnswerHistory[i-1]==1,
            wrong:currentQuiz!=i-1&&!quizAnswerHistory[i-1],
            notactive:currentQuiz!=i-1&&quizAnswerHistory[i-1]==-1
          }"
          @click="activateQuiz(i-1)"
        ></li>   
      </ul>
    </div>
</template>

<style lang="scss" scoped>
.quiz-progress {
  position: relative;
  width: 100%;
  height: 8px;
}
ul {
  display: flex;
  height: 8px;
  flex-direction: row;
  list-style-type: none;
  li {
    cursor: pointer;
    flex: 1;
    border: 1px solid #fff;
    &.active {
      background-color: #ebebeb;
    }
    &.correct {
      background-color: #8af0be;
    }
    &.wrong {
      background-color: #e06e6e;
    }
    &.notactive {
      background-color: #a7a7a7;
    }
  }
}
</style>
