// 所有操作数据的方法

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