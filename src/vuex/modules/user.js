import * as types from "../mutation-types";
import Vue from "vue";

const state = {
  userInfo: {}
};

const mutations = {
  [types.UPDATE_USER](state, { userInfo }) {
    // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    Object.keys(userInfo).forEach(key => {
      // console.log(userInfo.key);//妈了b，这里不能.key,只能[key],因为key是String
      Vue.set(state.userInfo, key, userInfo[key]); // use set,instead of value assignment
      // state.userInfo.key = userInfo.key;
    });
    // if(userInfo['userId']) {
    //   Vue.set(state.userInfo,'uid',userInfo['userId'])
    // }
  },
  [types.LOGOUT_USER](state) {
    console.log("mutation,logout user");
    state.userInfo = {};
  }
};

export default {
  state,
  mutations
};
