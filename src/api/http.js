
import { message } from 'antd'
import {getToken} from '../util/localStorage'
import history from '../util/history'
const http = {
    get:function(url,params){

        let str =''
        if (params) {
        let arr = []
        Object.keys(params).forEach((item,index)=>{
            arr.push(item+'='+params[item])
        })
            str = arr.join('&')      
        }
        
     return  window.fetch(url+'?'+str,{
        method:'get',
        headers:{
            'Token':encodeURIComponent(getToken())
            
        }
     })
     .then(res=>res.json()).then(data=>{
        if (data.code!=='1000') {
            message.error(data.msg)
            history.push('/login')
        }else{
            return data.data
        }

     })
    },
    post:function(url,params){
      
        return window.fetch(url,{
        method: 'POST',
        body: params?JSON.stringify(params):'',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'Token': getToken()?encodeURIComponent(getToken()):''
        }
       }).then(res=>res.json()).then(data=>{
        if (data.code!=='1000') {
            message.error(data.msg)
            history.push('/login')
        }else{
            return data.data
        }

     })
    }
}
export default http