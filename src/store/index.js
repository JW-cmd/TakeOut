import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
import {comment,Home,Login,Shop} from './state'
import {homeMutation,loginMutation,shopMutation} from './mutations'
import {homeAction,loginAction,shopAction} from './actions'
import {homeGetter,shopGetter} from './getters'

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
        ...shopGetter,
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

const shopAbout = {
    namespaced:true,
    actions:{
        ...shopAction,
    },
    mutations:{
        ...shopMutation,
    },
    state:{
        ...Shop,
    },
    getters:{
      ...shopGetter,
    },
}


export default new Vuex.Store({
    // 开启命名空间后便于模块化
    modules:{
        homeAbout,
        loginAbout,
        shopAbout,
    }
})

