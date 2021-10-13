import * as types from "../mutation-types";
import Vue from "vue";

const state = {
  musixiserObj: {},
  ownWorks: [],
  favWorks: []
};

const mutations = {
  [types.GET_MUSIXISER_DETAIL](state, { data }) {
    // {a}相当于{'a':a}
    if (data) {
      Object.keys(data).forEach(key => {
        Vue.set(state.musixiserObj, key, data[key]); // use set,instead of value assignment
      });
    } else {
      Vue.set(state.musixiserObj, {});
    }
  },
  [types.GET_MUSIXISER_DETAIL_OWN_WORK](state, { data }) {
    // {a}相当于{'a':a}
    // state.ownWorks = [];
    Vue.set(state, "ownWorks", []);
    if (data && data.list) {
      data.list.forEach((value, index) => {
        // vue caveats...
        Vue.set(state.ownWorks, index, value);
      });
    }
  },
  [types.GET_MUSIXISER_DETAIL_FAV_WORK](state, { data }) {
    // {a}相当于{'a':a}
    state.favWorks = [];
    if (data && data.list) {
      data.list.forEach((value, index) => {
        Vue.set(state.favWorks, index, value);
      });
    }
  },
  [types.UPDATE_MUSIXISER_RELATION](state, { data }) {
    // {a}相当于{'a':a}
    // console.log(data);
    // console.log(state.musixiserObj.userId)
    if (data.followId == state.musixiserObj.userId && data.status == 0) {
      // follow
      Vue.set(state.musixiserObj, "fansNum", state.musixiserObj.fansNum + 1);
      Vue.set(state.musixiserObj, "followStatus", 1); // followstatus 1关注, 0是未关注
    } else {
      Vue.set(state.musixiserObj, "fansNum", state.musixiserObj.fansNum - 1);
      Vue.set(state.musixiserObj, "followStatus", 0); // followstatus 1关注, 0是未关注
    }
  }
};

export default {
  state,
  mutations
};
