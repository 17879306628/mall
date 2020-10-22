import axios from 'axios'


export function request(config) {
  
    // 1. 创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/w6',
      timeout: 10000
    })

    // 2. axios拦截器的设置
    // 这里的config指的是上面传入的config配置
    // 请求拦截
    instance.interceptors.request.use(config => {
      //console.log(config);
      return config
    }, err => {
      //console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      //console.log(res);
      return res.data
    }, err => {
      //console.log(err);
    })
    // 发送真正的网络请求
    return instance(config)
  
}