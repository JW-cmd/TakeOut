// 封装所有ajax请求
import axios from 'axios'

export default function ajax(url,data={},type='GET'){
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

        // 发送get请求
        promise = axios.get(url)
    }else{
        // 发送post请求
        promise = axios.post(url,data)
    }

    return promise
    
}