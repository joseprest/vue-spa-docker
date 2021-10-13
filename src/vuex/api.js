import * as Cookies from "js-cookie";
import Vue from "vue";
import { Message } from "element-ui";
const axios = require("axios");

// real api address is 101.200.212.87:8083 <=> blocks.musixise.com
axios.interceptors.response.use(res => {
  if (res.data.errcode !== "0") {
    Message(res.data.resmsg);
    // alert(res.data.resmsg);
    return Promise.reject(res);
  }
  return res;
});
const reqConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};
// const tokenObj = { access_token: '' };
// TODO:cause 500?????? just cuz this few lines???

export function getUserInfo(wxcode) {
  const tokenInCookie = Cookies.get("serviceToken");
  if (tokenInCookie) {
    // alert('cookie used');
    reqConfig.headers.Authorization = `${tokenInCookie}`;
    // tokenObj.access_token = tokenInCookie;
    return axios.get("//101.200.212.87:8083/api/v1/user/getInfo", reqConfig);
  } else if (!tokenInCookie && wxcode) {
    // alert('no cookie');
    return new Promise((resolve, reject) => {
      axios
        .post(
          `//101.200.212.87:8083/api/v1/user/oauth/wechat/callback?code=${wxcode}`,
          "",
          reqConfig
        )
        .then(
          res => {
            if (res.data.errcode === 20001) {
              reject(20001); // 相当于return了
            }
            const serviceToken = res.data.data.id_token;
            reqConfig.headers.Authorization = `${serviceToken}`;
            // tokenObj.access_token = serviceToken;
            Cookies.set("serviceToken", serviceToken, {
              expires: 7
            });
            return axios.get(
              "//101.200.212.87:8083/api/v1/user/getInfo",
              reqConfig
            );
          },
          () => {
            reject();
          }
        )
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  // !tokenInCookie&&!wxcode的情况在app.js里处理, 不会走到这里
  return false;
}

export function uploadRecord(record, info) {
  return new Promise((resolve, reject) => {
    const formReqConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        processData: false,
        Authorization: reqConfig.headers.Authorization
      }
    };
    const blob = new Blob([JSON.stringify(record)]);
    const reader = new FileReader();
    reader.onload = async event => {
      const fd = new FormData();
      fd.append("fname", "block.txt");
      fd.append("data", event.target.result);
      // fd.append('access_token', tokenObj.access_token);
      let postFix = "";
      try {
        // important, othereise dispatch won't be stoped here...
        postFix = await axios.post(
          "//101.200.212.87:8083/api/v1/uploadAudio",
          fd,
          formReqConfig
        );
      } catch (e) {
        console.log(e);
        reject(e);
      }
      const workURL = `${postFix.data.data}`;
      const param = {
        // ...tokenObj,
        ...info, // title,content.cover
        url: workURL
      };
      console.log(workURL);
      return axios
        .post(
          "//101.200.212.87:8083/api/v1/work/create",
          JSON.stringify(param),
          reqConfig
        )
        .then(res => {
          resolve(res.data.data);
        })
        .catch(err => {
          reject(err);
        });
    };
    reader.readAsDataURL(blob);
  });
  // trigger the read from the reader...
}

export function fetchMbox(id) {
  return axios.get(`//101.200.212.87:8083/api/v1/work/detail/${id}`, reqConfig);
}
export function fetchMusixiser(id) {
  return axios.get(`//101.200.212.87:8083/api/v1/user/detail/${id}`, reqConfig);
}
export function fetchWorksFromMusixiser(id, page) {
  return axios.get(
    `//101.200.212.87:8083/api/v1/work/getListByUid/${id}?page=${page}&size=15`,
    reqConfig
  );
}
export function fetchFavWorks(id, page) {
  return axios.get(
    `//101.200.212.87:8083/api/v1/favorite/getWorkList/${id}?page=${page}&size=15`,
    reqConfig
  );
}
export function toggleFavSong({ workId, status }) {
  return axios.post(
    "//101.200.212.87:8083/api/v1/favorite/create",
    JSON.stringify({ workId, status }),
    reqConfig
  );
  // .then((res) => { console.log(res); })
  // .catch((err) => { console.log(err); });
}
export function updateWorkTitle({ id, title }) {
  return axios.put(
    `//101.200.212.87:8083/api/v1/work/updateWork/${id}`,
    JSON.stringify({ title }),
    reqConfig
  );
  // .then((res) => { console.log(res); })
  // .catch((err) => { console.log(err); });
}
export function getRecommendations() {
  return axios.post("//101.200.212.87:8083/api/v1/home", "", reqConfig);
}

// below is PC login
export async function loginUser(loginInfo) {
  const tokenInCookie = Cookies.get("serviceToken");
  if (loginInfo && !tokenInCookie) {
    const auth = await axios.post(
      "//101.200.212.87:8083/api/v1/user/authenticate",
      JSON.stringify(loginInfo),
      reqConfig
    );
    reqConfig.headers.Authorization = `${auth.data.data.id_token}`;
    Cookies.set("serviceToken", auth.data.data.id_token, {
      expires: 7
    });
    return axios.get("//101.200.212.87:8083/api/v1/user/getInfo", reqConfig);
  } else {
    reqConfig.headers.Authorization = `${tokenInCookie}`;
    return axios.get("//101.200.212.87:8083/api/v1/user/getInfo", reqConfig);
  }
}

export async function registerUser(registerInfo) {
  const response = await axios.post(
    "//101.200.212.87:8083/api/v1/user/register",
    JSON.stringify(registerInfo),
    reqConfig
  );
  console.log("in api", response);
  if (response.data.errcode !== "0") {
    console.log("good");
    return Promise.reject(response.data.errmsg);
  }
  return Promise.resolve(registerInfo);
}

export function updateUser(updateInfo) {
  axios.put(
    "//101.200.212.87:8083/api/v1/user/updateInfo",
    JSON.stringify(updateInfo),
    reqConfig
  );
}
