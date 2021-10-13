import * as types from "./mutation-types";
import Vue from "vue";
import * as API from "./api";
import * as Cookies from "js-cookie";

let req_config = {
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};
/** ************ USER AUTH (login,register,update,logout) **************/
export async function loginUser({ commit }, { loginInfo }) {
  const response = await API.loginUser(loginInfo);
  commit(types.UPDATE_USER, { userInfo: response.data.data });
}

export async function registerUser({ commit, dispatch }, { registerInfo }) {
  const response = await API.registerUser(registerInfo);
  // dispatch("loginUser", { loginInfo: registerInfo });
}

export const logoutUser = ({ commit }) => {
  req_config = {
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  };
  commit(types.LOGOUT_USER);
  Cookies.remove("serviceToken");
};
/** ******************************************************************/
export const refreshPage = ({ dispatch, state }, { path }) => {
  // refresh the page, based on passed-in path (cannot get current path in action...)
  // console.log(path.split('/')[1])
  switch (path.split("/")[1]) {
    case "":
      dispatch("loadRecommend");
      break;
    case "recommend":
      dispatch("loadRecommend");
      break;
    case "musixiser":
      dispatch("loadMusixiserDetail", { userId: path.split("/")[2] });
      break;
    case "favorite-musixisers":
      // dispatch('loadFavMusixisers',{userId:this.userInfo.userId})
      console.log("refreshing: ", state);
      dispatch("loadFavMusixisers", { userId: state.user.userInfo.userId });
      break;
    case "favorite-works":
      dispatch("loadFavWorks", { userId: state.user.userInfo.userId });
      break;
    default:
      break;
  }
};

export async function uploadRecord({ commit }, { record, info }) {
  await API.uploadRecord(record, info);
}
export async function loadMusixiserDetail({ commit }, { userId, pagination }) {
  if (userId) {
    const res = await API.fetchMusixiser(userId);
    commit(types.GET_MUSIXISER_DETAIL, { data: res.data.data });
  } else {
    return;
  }
}
export async function loadMusixiserWorks({ commit }, { userId, pagination }) {
  if (userId) {
    const res = await API.fetchWorksFromMusixiser(
      userId,
      pagination.currentPage
    );
    commit(types.GET_MUSIXISER_DETAIL_OWN_WORK, { data: res.data.data });
  } else {
    return;
  }
}
export async function loadMusixiserFavWorks(
  { commit },
  { userId, pagination }
) {
  if (userId) {
    const res = await API.fetchFavWorks(userId, pagination.currentPage);
    commit(types.GET_MUSIXISER_DETAIL_FAV_WORK, { data: res.data.data });
  } else {
    return;
  }
}

export async function fetchWork({ dispatch, commit, state }, { id }) {
  // 获取某id的音乐盒音乐内容
  // console.log("1", id);
  const project = await API.fetchMbox(id);
  // console.log(2);
  // console.log("xxi", project.data.data.url);
  // console.log("xxi", project.data.data.userId);

  // const musixiser = await API.fetchMusixiser(project.data.data.userId);
  // console.log("work musixiser info: ", musixiser.data.data);

  // project.data.data.userVO = musixiser.data.data; // 拼接口。
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", project.data.data.url, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        const type = request.getResponseHeader("Content-Type");
        if (type.indexOf("text") !== -1) {
          commit(types.SET_WORK_DETAIL, {
            content: JSON.parse(request.responseText),
            info: project.data.data
          });
          resolve();
        }
      }
    };
  });
}
export async function updateUser({ commit }, { updateInfo }) {
  await API.updateUser(updateInfo);
  const response = await API.loginUser({});
  commit(types.UPDATE_USER, { userInfo: response.data.data });
}
// To Complete

// export const loadRecommend = ({ commit }) => {
//   Vue.axios
//     .post("//blocks.musixise.com/api/home", "", req_config)
//     .then(response => {
//       commit(types.RECOMMEND_LOADED, { data: response.data.data });
//     });
// };

// export const loadFavMusixisers = ({ commit }, { userId, page }) => {
//   if (!userId) {
//     commit(types.REFRESH_FAV_MUSIXISERS, { data: { content: [] } });
//     return;
//   }
//   Vue.axios
//     .post(
//       `//blocks.musixise.com/api/follow/followings/${userId}`,
//       "",
//       req_config
//     )
//     .then(response => {
//       commit(types.REFRESH_FAV_MUSIXISERS, { data: response.data.data });
//     })
//     .catch(err => {});
// };

// export const loadFavWorks = ({ commit }, { userId, page }) => {
//   if (!userId) {
//     commit(types.REFRESH_FAV_WORKS, { data: { content: [] } });
//     return;
//   }
//   Vue.axios
//     .post(
//       `//blocks.musixise.com/api/favorite/getWorkList/${userId}`,
//       "",
//       req_config
//     )
//     .then(response => {
//       commit(types.REFRESH_FAV_WORKS, { data: response.data.data });
//     })
//     .catch(err => {});
// };

// export const followMusixiser = ({ commit }, { userId }) => {
//   console.log("jb");
//   const param = { followId: userId, status: 0 }; // 0 is code to follow
//   Vue.axios
//     .post(
//       "//blocks.musixise.com/api/follow/add",
//       JSON.stringify(param),
//       req_config
//     )
//     .then(response => {
//       commit(types.UPDATE_MUSIXISER_RELATION, { data: param });
//     })
//     .catch(err => {});
// };

// export const unfollowMusixiser = ({ commit }, { userId }) => {
//   const param = { followId: userId, status: 1 }; // 1 is code to unfollow
//   Vue.axios
//     .post(
//       "//blocks.musixise.com/api/follow/add",
//       JSON.stringify(param),
//       req_config
//     )
//     .then(response => {
//       commit(types.UPDATE_MUSIXISER_RELATION, { data: param });
//     })
//     .catch(err => {});
// };
// export const toggleFavSong = ({ commit }, { workId, status }) => {
//   Vue.axios
//     .post(
//       "//blocks.musixise.com/api/favorite/addWork",
//       JSON.stringify({ workId, status }),
//       req_config
//     )
//     .then(response => {})
//     .catch(err => {});
// };

// export const updateRecord = ({ commit }, { status }) => {};
