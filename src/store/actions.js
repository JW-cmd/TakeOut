// 所有业务逻辑

// 导入封装的异步请求函数
import {
    getLocationByIp,
    getFoodCategroy,
    getShopList,
    loginByLocal,
    logout,
    reqShopGoods,
    reqShopRating,
    reqShopInfo,
} from '../api/index'

// home页面
export const homeAction ={
    // 异步获取位置信息
    receive_location({commit}){
        const location = getLocationByIp()
        location.then(
            value=>{
                commit('RECEIVE_LOCATION',value.content)
            },
            reason=>{
                console.log(reason)
            }
        )
    },
    // 异步获取分类
    receive_catagroy({commit}){
        const foodCategroy = getFoodCategroy()
        foodCategroy.then(
            value=>{
                commit('RECEIVE_CATAGROY',value.data)
            },
            reason=>{
                console.log(reason)
            }
        )
    },
    // 异步获取店铺列表
    receive_shop({state,commit}){
        const shopList = getShopList(state.latitude,state.longitude)
        shopList.then(
            value=>{
                commit('RECEIVE_SHOP',value.data)
            },
            reason=>{
                console.log(reason)
            } 
        )

    }
}

// search页面
export const searchAction = {

}

// order页面
export const orderAction = {
    
}

// profile页面
export const profileAction = {
    
}

// login页面
export const loginAction = {
    // 异步自动登录,获取数据给vuex中的user赋值
    async get_logined_user({commit}){
        const userInfo = await loginByLocal()
        if(userInfo.code===0){
            commit('RECEIVE_USER',userInfo.data)
        }
    },
    async logout({commit}){
        const userInfo = await logout()
        if(userInfo.code === 0){
            commit('RESET_USER')
        }
    },

}

// shop页面
export const shopAction = {
    async req_shop_goods({commit}){
        const goods = await reqShopGoods()
        if(goods.code===0){
            commit('REQ_SHOP_GOODS',goods.data)
        }
    },
    async req_shop_rating({commit}){
        const rating = await reqShopRating()
        if(rating.code===0){
            commit('REQ_SHOP_RATING',rating.data)
        }
    },
    async req_shop_info({commit}){
        const info = await reqShopInfo()
        if(info.code===0){
            commit('REQ_SHOP_INFO',info.data)
        }
    },
}