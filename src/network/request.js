import axios from "axios";
import { baseURL } from "./baseURL";

export function haks(config) {
  // 1. 创建 axios 实例 instance
  const instance = axios.create({
    baseURL,
  });

  // 2. 设置 instance 的请求拦截器
  instance.interceptors.request.use(
    (conf) => {
      // 2.1. 请求成功会触发此函数
      return conf;
    },
    (err) => {
      // 2.2. 请求失败会触发此函数
      console.log(err);
      return Promise.reject(err);
    }
  );

  // 3. 设置 instance 的响应拦截器
  instance.interceptors.response.use(
    (result) => {
      // 3.1. 2xx 范围内的状态码都会触发该函数
      return result.data;
    },
    (err) => {
      // 3.2. 超出 2xx 范围的状态码都会触发该函数
      console.log(err);
      return Promise.reject(err);
    }
  );

  // 4. 返回 instance Promise
  // 注释：axios 官方已经废弃了.all() 方法，所以当有多个请求需要发送时，直接使用原生 Promise 提供的静态方法
  return instance(config);
}
