import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

const countAbout = {
    // 开启命名空间
    namespaced:true,
    actions:{
        
    },
    mutations:{
        
    },
    state:{
        
    },
    getters:{
        
    },
}

const personAbout = {
    namespaced:true,
    actions:{},
    mutations:{
        
    },
    state:{
        
    },
    getters:{},
}


export default new Vuex.Store({
    // 开启命名空间后便于模块化
    modules:{
        countAbout,
        personAbout,
    }
})

