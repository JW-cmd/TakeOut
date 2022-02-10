// 封装所有的请求方法(导出的都是函数)
import ajax from "./ajax"
const BaseUrl = 'api'


// 根据ip获取位置详情
export const getLocationByIp = ()=>ajax('/baidumap/location/ip',{ak:'9ZELAiPwcu3KTRAfvGFan2E8Tw5wcAYZ',coor:'bd0911'})
// 获取食品分类列表
export const getFoodCategroy = ()=>ajax(BaseUrl+'/index_category')
// 根据经纬度获取商铺列表,经纬度由getLocationByIp中的返回值决定
export const getShopList = (latitude,longitude)=>ajax(BaseUrl+'/shops',{latitude,longitude})
// 根据经纬度和关键字搜索商铺列表

// 用户名密码登陆
export const loginByPwd = (name,pwd,captcha)=>ajax(BaseUrl+'/login_pwd',{name,pwd,captcha},'POST')
// 发送短信验证码
export const sendMsgCode = (phone)=>ajax(BaseUrl+'/sendcode',{phone})
// 手机号验证码登陆
export const isTureCode = (phone,code)=>ajax(BaseUrl+'/login_sms',{phone,code},'POST')
// 根据会话获取用户信息
export const loginByLocal = ()=>ajax(BaseUrl+'/userinfo')
// 用户登出
export const logout = ()=>ajax(BaseUrl+'/logout')
//获取商家信息
export const reqShopInfo = () => ajax('/shop_info')
// 获取商家评价数组
export const reqShopRating = () => ajax('/shop_rating')
// 获取商家商品数组
export const reqShopGoods = () => ajax('/shop_goods')