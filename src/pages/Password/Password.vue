<template>
    <div>
        <section class="login_message">
            <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="userName">
        </section>
        <section class="login_verification">
            <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="userPwd">
            <input type="password" maxlength="8" placeholder="密码" v-else v-model="userPwd">
            <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                <div class="switch_circle" :class="{right: showPwd}"></div>
                <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
            </div>
        </section>
        <section class="login_message">
            <input type="text" maxlength="11" placeholder="验证码" v-model='userCode'>
            <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                ref="imgCaptcha" @click="getNewCode()">
        </section>
        <button class="login_submit" @click.prevent="login()">登录</button>
    </div>
</template>

<script>
import {loginByPwd,} from '../../api'
import {Toast } from 'vant'
export default {
    name:'Password',
    data(){
        return {
            userName:'',
            userPwd:'',
            userCode:'',
            showPwd:false,
        }
    },
    methods:{
        getNewCode(){
            this.$refs.imgCaptcha.src="http://localhost:4000/captcha?time=" + Date.now()
        },
        login(){
            if(this.userName && this.userPwd && this.userCode){
                // 发请求验证
                loginByPwd(this.userName,this.userPwd,this.userCode).then(value=>{
                    if(value.code !== 0) 
                    {
                        // 重新获取图片验证码
                        this.getNewCode()
                        this.userCode = ''
                        return Toast.fail({
                            message:value.msg,
                            position:'bottom',
                        })
                    }
                    // 成功登录，往Vuex中存储用户数据
                    this.$store.commit('loginAbout/RECEIVE_USER',value.data)
                    // 跳转路由
                    this.$router.replace('/profile')
                    })
            }else{
                Toast.fail({
                    message:'所有项均不能为空',
                    position:'bottom',
                })
            }
        }
    }
}
</script>

<style>

</style>