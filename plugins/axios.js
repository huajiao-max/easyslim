import { Message, Loading } from "element-ui";
export default function ({ store, redirect, app: { $axios } }) {
  let loadingInstance = null;
  // 后端接口地址
  // $axios.defaults.baseURL = 'https://aabbcc.com/api'
  $axios.defaults.baseURL =
    process.env.NODE_ENV == "development" ? "/api" : "https://z.mp3drink.cc";

  // Request拦截器：设置Token
  $axios.onRequest((config) => {
    //  使用Vuex存储Token，并做持久化处理
    let noLoda = config.noLoad;
    if (!noLoda) {
      loadingInstance = Loading.service({
        fullscreen: true,
        background: "#fff",
      });
    }
    config.headers["Authorization"] = "Bearer" + localStorage.getItem("token");
  });
  // Error拦截器：出现错误的时候被调用，根据状态码做对应判断并显示全局Message
  $axios.onError((error) => {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }
    const code = parseInt(error.response && error.response.status);
    switch (code) {
      case 400:
        Message.error("Request error");
        break;
      // 未登录
      case 401:
        Message.error("Token exceed the time limit");
        break;
      case 403:
        Message.error("Access Denied");
        break;
      case 404:
        Message.error(`Error requesting address: ${error.response.config.url}`);
        break;
      case 408:
        Message.error("Request timeout");
        break;
      case 500:
        Message.error("Internal server error");
        break;
      case 501:
        Message.error("The service has not been realized");
        break;
      case 502:
        Message.error("Gateway error");
        break;
      case 503:
        Message.error("Services are not available");
        break;
      case 504:
        Message.error("Gateway timeout");
        break;
      case 505:
        Message.error("The HTTP version is not supported");
        break;
      default:
        break;
    }
    // 异常信息
    // Message.error(error.response.data.message)
  });
  // Response拦截器：对正常返回的数据进行处理
  $axios.onResponse((response) => {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }
    return response.data;
  });
}
