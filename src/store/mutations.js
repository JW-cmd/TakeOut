// 所有操作数据的方法

import Vue from "vue"

// home页面
export const homeMutation ={
    RECEIVE_LOCATION(state,location){
        state.address = location.address
        state.latitude = location.point.y
        state.longitude = location.point.x
        // console.log(state.address)
    },
    RECEIVE_CATAGROY(state,categroy){
        state.foodCategroy = categroy
    },
    RECEIVE_SHOP(state,shop){
        state.shopList = shop
    }
}

// search页面
export const searchMutation = {

}

// order页面
export const orderMutation = {
    
}

// profile页面
export const profileMutation = {
    
}

// login页面
export const loginMutation = {
    RECEIVE_USER(state,user){
        state.user = user
    },
    RESET_USER(state){
        state.user = {}
    },
}

// shop页面
export const shopMutation = {
    REQ_SHOP_GOODS(state,goods){
        state.goods = goods
    },
    REQ_SHOP_RATING(state,rating){
        state.rating = rating
    },
    REQ_SHOP_INFO(state,info){
        state.info = info
    },
    getShop(state,shop){
      state.shop = shop
    },
    ADDFOOD(state,food){
      if(!food.count){
        Vue.set(food,'count',1)
        state.cartFoods.push(food)
      }
      else
        food.count++
    },
    MINUSFOOD(state,food){
      if(food.count){
        food.count--

        if(food.count === 0){
          // 移出cartFoods
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
      }
        
    }
}
