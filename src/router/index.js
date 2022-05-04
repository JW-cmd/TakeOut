import VueRouter from 'vue-router'

//导入路由组件
// import Home from '../pages/Home/Home.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'
// import Login from '../pages/Login/Login.vue'
// import Shop from '../pages/Shop/Shop.vue'

// 因为一级路由下js复杂，组件较多，最好将一级路由更换为懒加载形式
// 此时在路径切换到某个组件再调用某个组件的js，在webpack打包时会生成独立的js文件
const Home = ()=>import ('../pages/Home/Home.vue')
const Order = ()=>import ('../pages/Order/Order.vue')
const Profile = ()=>import ('../pages/Profile/Profile.vue')
const Search = ()=>import ('../pages/Search/Search.vue')
const Login = ()=>import ('../pages/Login/Login.vue')
const Shop = ()=>import ('../pages/Shop/Shop.vue')

import Message from '../pages/Meaasge.vue'
import Password from '../pages/Password/Password.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'



export default new VueRouter ({
	routes:[
	{
		path:'/',
		component:Home,
		meta:{
			isNeedFooterGuide:true,
		}
	},
	{
		path:'/home',
		component:Home,
		meta:{
			isNeedFooterGuide:true,
		}
	},
	{
		path:'/order',
		component:Order,
		meta:{
			isNeedFooterGuide:true,
		}
	},
	{
		path:'/profile',
		component:Profile,
		meta:{
			isNeedFooterGuide:true,
		}
	},
	{
		path:'/search',
		component:Search,
		meta:{
			isNeedFooterGuide:true,
		}
	},
	{
		path:'/login',
		component:Login,
		children:[
			{
				path:'',
				redirect:'message',
			},
			{
				path:'message',
				component:Message,
			},
			{
				path:'password',
				component:Password,
			}
		]
	},
	{
		path:'/shop',
		component:Shop,
		meta:{
			
		},
		children:[
			{
				path:'',
				redirect:'shopGoods',
			},
			{
				path:'shopGoods',
				component:ShopGoods,
        
			},
			{
				path:'shopRating',
				component:ShopRating,
			},
			{
				path:'shopInfo',
				component:ShopInfo,
			}
		]
	},
	]
})

/*解决重复点击同一个标签实现路由跳转报错问题：下面三行语句解决报错问题
* Uncaught (in promise) NavigationDuplicated
* {_name: “NavigationDuplicated”, name: "NavigationDuplic}的报错问*/
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err);
}