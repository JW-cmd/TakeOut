<template>
  <div>
    <section class="login_message">
        <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
        <button :disabled="!(rightPhone && !timerId)" class="get_verification" 
            :class="{right_phone:rightPhone && !timerId}" @click.prevent="getCode()">
                {{timerId ? '已发送('+sendStime+')秒' : '获取验证码'}}
        </button>
    </section>
    <section class="login_verification">
    <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
    </section>
    <section class="login_hint">
    温馨提示：未注册TakeOut帐号的手机号，登录时将自动注册，且代表已同意
    <a href="javascript:;">《用户服务协议》</a>
    </section>
    <button class="login_submit" @click.prevent="login()">登录</button>
</div>
</template>

<script>
import {sendMsgCode,isTureCode} from '../api'
import {Toast } from 'vant'
export default {
    name:'Message',
    data(){
        return {
            phone:'',
            timerId:'',
            sendStime:30,
            code:'',
        }
    },
    computed:{
        rightPhone(){
            return /^1\d{10}$/.test(this.phone)
        }
    },
    methods:{
        getCode(){
            // 倒计时 当没有倒计时才开启一个循环定时器
            if(!this.timerId){

                // 发请求  只有在没记时的时候能发送请求
                sendMsgCode(this.phone).then((value)=>{
                    if(value.code!==0) 
                    {
                        Toast.fail({
                            message:value.msg,
                            position:'bottom'
                            })
                    }
                    else{
                        this.timerId = setInterval(()=>{
                        this.sendStime--
                        if(this.sendStime <= 0){
                            clearInterval(this.timerId)
                            this.sendStime = 30
                            this.timerId = null
                        }
                    },1000)
                        Toast.success({
                            message:'已发送请注意查收！',
                            position:'bottom',
                        })
                    }
                })
            }

        },
        login(){
            if(!this.rightPhone) return Toast.fail({
                            message:'手机号不正确',
                            position:'bottom'
                            })
            if(!/^\d{6}$/.test(this.code)){
                return Toast.fail({
                            message:'短信验证码必须是六位数字',
                            position:'bottom'
                            })
            }
            isTureCode(this.phone,this.code).then(value=>{
                if(value.code !== 0){
                    //清空输入框  
                    this.phone = ''
                    this.code = ''
                    return Toast.fail({
                            message:value.msg,
                            position:'bottom'
                            })
                } 
                this.$store.commit('loginAbout/RECEIVE_USER',value.data)
                // 跳转路由
                this.$router.replace('/profile')
            })
      },
    }
}
</script>

<style>

</style>