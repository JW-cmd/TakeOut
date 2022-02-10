// 导入mock
import Mock from 'mockjs'
// 导入数据
import apiData from './data.json'


Mock.mock('/shop_info', {code:0, data:apiData.info})
Mock.mock('/shop_goods', {code:0, data:apiData.goods})
Mock.mock('/shop_rating', {code:0, data:apiData.rating})