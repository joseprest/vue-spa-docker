<script>
export default {
  props: {
    onNext: {
      type: Function
    },
    onPrevious: {
      type: Function
    }
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<template>
    <div>
      <button @click="onNext">上一道</button>
      <button @click="onPrevious">下一道</button>
    </div>
</template>

<style lang="scss" scoped>
</style>
