import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  musixisers: [],
  works: [],
};

const mutations = {
  [types.REFRESH_FAV_MUSIXISERS](state, { data }) { // {a}相当于{'a':a}
    if (data) {
      state.musixisers = data;
    } else {
      state.musixisers = [];
    }

    // Object.keys(userInfo).forEach((key) => {
      // Vue.set(state, musixisers, userInfo[key]);// use set,instead of value assignment

    // });
  },
  [types.REFRESH_FAV_WORKS](state, { data }) { // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    if (data) {
      state.works = data;
    } else {
      state.works = [];
    }

    // Object.keys(userInfo).forEach((key) => {
      // Vue.set(state.userInfo, key, userInfo[key]);// use set,instead of value assignment

    // });
  },
};

export default {
  state,
  mutations,
};
