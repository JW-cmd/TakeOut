import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
import {comment,Home,Login} from './state'
import {homeMutation,loginMutation} from './mutations'
import {homeAction,loginAction} from './actions'
import {homeGetter,} from './getters'

Vue.use(Vuex)

const homeAbout = {
    // 开启命名空间
    namespaced:true,
    actions:{
        ...homeAction,
    },
    mutations:{
        ...homeMutation,
    },
    state:{
        ...comment,
        ...Home,
    },
    getters:{
        ...homeGetter,
    },
}

// const personAbout = {
//     namespaced:true,
//     actions:{},
//     mutations:{
        
//     },
//     state:{
        
//     },
//     getters:{},
// }

const loginAbout = {
    namespaced:true,
    actions:{
        ...loginAction,
    },
    mutations:{
        ...loginMutation,
    },
    state:{
        ...Login,
    },
    getters:{},
}


export default new Vuex.Store({
    // 开启命名空间后便于模块化
    modules:{
        homeAbout,
        loginAbout,
    }
})

