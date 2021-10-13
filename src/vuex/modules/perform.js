import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  deviceList: [],
  ready: false,
  liveMode: false,
  recordMode: false,
  recordStartTime: 0,
  recorder: [],
  chats: [],
  gifts: [],
  requests: [],
  audienceNum: 0,
};

const mutations = {
  [types.UPDATE_DEVICE](state, { device }) { // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    state.deviceList = [];
    for (let i = 0; i <= device.length - 1; i++) {
      console.log('gndjxbfkcn,jxv', device[i].value.name);
      state.deviceList.push(device[i]);
    }
  },
  [types.UPDATE_LIVE_STATUS](state, { status }) {
    state.liveMode = status;
  },
  [types.UPDATE_RECORD_STATUS](state, { status }) {
    state.recordMode = status;
    if (status) {
      state.recorder = [];
      state.recordStartTime = performance.now();
    } else {

    }
  },
  [types.CLEAR_RECORDER](state) {
    state.recorder = [];
  },

  [types.PUSH_RECORDER](state, { data }) {
    state.recorder.push(data);
  },
  // [types.HANDLE_MIDIDEVICE_RECEIVE_SIGNAL](state,{midimsg}) {
  //
  // }
  [types.PUSH_CHATS](state, { data }) {
    state.chats.push(data);
  },
  [types.PUSH_GIFTS](state, { data }) {
    state.gifts.push(data);
  },
  [types.PUSH_REQUESTS](state, { data }) {
    state.requests.push(data);
  },
  [types.AUDIENCE_COME](state) {
    state.audienceNum++;
  },
  [types.AUDIENCE_LEAVE](state, { data }) {
    state.audienceNum--;
  },
};

export default {
  state,
  mutations,
};
