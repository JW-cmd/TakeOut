<template>
  <section class="msite">
    <!--首页头部-->
    <TakeOutTop :title="address">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </TakeOutTop>
    <!--首页导航（轮播图）-->
    <home-slipeshow></home-slipeshow>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>
  </section>
</template>

<script>
import HomeSlipeshow from '../../components/HomeSlipeshow/HomeSlipeshow.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import TakeOutTop from '../../components/TakeOutTop.vue'
import {mapActions,mapState} from 'vuex' 
export default {
    name:'Home',
    components:{
      TakeOutTop,
        HomeSlipeshow,
        ShopList,
    },
    methods:{
      ...mapActions(
        'homeAbout',
        ['receive_location',]
        )
    },
    mounted(){
      // home组件一挂载好就发请求
      this.receive_location()
    },
    computed:{
      ...mapState('homeAbout',
      ['address',]
      )
    },
}
</script>

<style lang="stylus">
  @import '../../commen/mixins.styl'
  .msite  //首页
    width 100%
    height 95%
    overflow auto
    .msite_header
      background-color #02a774
      position relative
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
</style>