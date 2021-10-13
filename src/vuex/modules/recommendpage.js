import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  renderer: {},
};

const mutations = {
  [types.RECOMMEND_LOADED](state, { data }) { // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    console.log(data);
    Object.keys(data).forEach((key) => {
      Vue.set(state.renderer, key, data[key]);// use set,instead of value assignment
    });
  },
  [types.UPDATE_MUSIXISER_RELATION](state, { data }) { // {a}相当于{'a':a}
    // state.renderer.hotMusixisers.forEach((item,index)=>{
    //   if (item.userId == data.followId) {
    //     console.log(state.renderer.hotMusixisers[index].followStatus)
    //     console.log(data.status)
    //     state.renderer.hotMusixisers[index].followStatus = !data.status
    //   }
    // })
    // state.renderer.latestMusixisers.forEach((item,index)=>{
    //   if (item.userId == data.followId) {
    //     state.renderer.hotMusixisers[index].followStatus = !data.status //Vue.set
    //   }
    // })
  },
};

export default {
  state,
  mutations,
};
