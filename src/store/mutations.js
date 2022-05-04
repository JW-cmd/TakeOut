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
  REQ_SEARCH_DATA(state,searchedData){
    state.searchedData = searchedData
  }
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
        
    },
    CLEAN_CART_ALL(state){
       // 首先将food中count数量置为0(这里cartFoods相当于是一个存储着很多指向不同food的地址的变量)
      state.cartFoods.forEach(food=>{
        // 通过引用修改真实变量的值，所有引用的地方值都会改变
        food.count = 0
      })

      // 然后将cartFoods初始化
      state.cartFoods = []
    },
}
