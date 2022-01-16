import VueRouter from 'vue-router'

//导入路由组件
import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import ShopInfo from '../pages/ShopInfo/ShopInfo.vue'
import Message from '../pages/Meaasge.vue'
import Password from '../pages/Password/Password.vue'


export default new VueRouter ({
	routes:[
	{
		path:'/',
		redirect:'/home',
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
		path:'/shopinfo',
		component:ShopInfo,
		meta:{
			
		}
	},
	]
})