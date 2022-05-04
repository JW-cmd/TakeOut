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
    reqSearchShop,
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
  async req_search_data({commit} ,keyword){
    const geohash = "40.10038" + ',' + "116.36867"
    const searchedData = await reqSearchShop(geohash, keyword)
        if(searchedData.code===0){
            console.log(searchedData)
            commit('REQ_SEARCH_DATA',searchedData.data)
        }
  }
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
    async req_shop_goods({commit},callback){
        const goods = await reqShopGoods()
        if(goods.code===0){
            commit('REQ_SHOP_GOODS',goods.data)
        }
        // 先确定有没有传回调，没有的话callback是undefined，对应false，这样就不会执行callback函数了
        callback && callback()
    },
    async req_shop_rating({commit},callback){
        const rating = await reqShopRating()
        if(rating.code===0){
            commit('REQ_SHOP_RATING',rating.data)
        }
        callback && callback()
    },
    async req_shop_info({commit},callback){
        const info = await reqShopInfo()
        if(info.code===0){
            commit('REQ_SHOP_INFO',info.data)
        }
        callback && callback()
    },
    // 清空购物车，同步请求
    cleanCartAll({commit}){
      commit('CLEAN_CART_ALL')
    },
    

}