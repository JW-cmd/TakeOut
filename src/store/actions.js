// 所有业务逻辑

// 导入封装的异步请求函数
import {
    getLocationByIp,
    getFoodCategroy,
    getShopList,
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
    
}