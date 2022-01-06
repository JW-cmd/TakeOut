import VueRouter from 'vue-router'

//导入路由组件
import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'


export default new VueRouter ({
	routes:[
	{
		path:'/',
		redirect:'/home',
	},
	{
		path:'/home',
		component:Home,
	},
	{
		path:'/order',
		component:Order,
	},
	{
		path:'/profile',
		component:Profile,
	},
	{
		path:'/search',
		component:Search,
	},
	]
})