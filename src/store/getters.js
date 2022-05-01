// 共享数据的getter计算属性

// home页面
export const homeGetter ={
    
}

// search页面
export const searchGetter = {

}

// order页面
export const orderGetter = {
    
}

// profile页面
export const profileGetter = {
    
}

// shop页面
export const shopGetter = {
    cartCount(state){
      // Array.reduce(累加器（函数），初始化值)
        // 累加器：
        // (累加结果, 当前值(数组遍历中的当前项), 当前索引)=>{
        // 	return 处理结果
        // }
        return state.cartFoods.reduce((sum,food)=>{
          return sum + food.count
        },0)
    },
    cartPrice(state){
      return state.cartFoods.reduce((sum,food)=>{
          return sum + food.count * food.price
        },0)
    }
}