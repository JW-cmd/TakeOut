// 存储共享数据

// 多处要用到经纬度，所以将其存储为独立的部分
export const comment = {
    latitude:'',//纬度
    longitude:'',//经度
}

// 首页所需数据
export const Home = {
    address:'',//地址字符串
    foodCategroy:[],//食物分类
    shopList:[],//店铺列表
}

// 搜索业面所需数据
export const Search = {

}

// 订单页面所需数据
export const Order = {

}

// 个人中心数据
export const Profile = {

}

// 登录数据
export const Login = {
    user:{
      login:false,
    },
}

// 每个商铺的数据
export const Shop = {
    goods:[],
    shop:{},
    info:{},
    rating:[],
    cartFoods:[]//购物车中的食物列表
}