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
// 获取一次性验证码
// 用户名密码登陆
// 发送短信验证码
// 手机号验证码登陆
// 根据会话获取用户信息
// 用户登出