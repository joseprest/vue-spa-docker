import * as types from "../mutation-types";
import Vue from "vue";

const state = {
  info: {},
  content: ""
};

const mutations = {
  [types.SET_WORK_DETAIL](state, { info, content }) {
    // state.info = info;
    // state.content = content;
    Vue.set(state, "info", info);
    Vue.set(state, "content", content);
  }
};

export default {
  state,
  mutations
};
