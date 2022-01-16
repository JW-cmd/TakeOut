// 封装所有ajax请求
import axios from 'axios'

export default function ajax(url,data={},type='GET'){
    // 返回值是一个promise对象
    return new Promise((resolve,reject)=>{
        let promise
        // 为get请求拼接参数
        if(type==='GET'){
            let dataStr = ''
            Object.keys(data).forEach(key=>{
                dataStr += key + '=' + data[key] + '&'//得到拼接好的参数字符串，但会多出一个'&'
            })
            if(dataStr !== ''){//不为空则证明需要传参，要去掉dataStr中末尾的'&'
                dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }

            // 发送get请求,返回值是promise
            promise = axios.get(url)
        }else{
            // 发送post请求
            promise = axios.post(url,data)
        }
        // 请求成功调用.then绑定的回调函数，失败调用.catch绑定的函数
        promise.then(response=>{
            resolve(response.data)
        })
        promise.catch(error=>{
            reject(error)
        })

    })
    
}