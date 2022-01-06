<template>
  <div class="footer_guide">
    <!-- 判断哪个模块应该高亮 -->
  <span class="guide_item" :class="{on:'/home' === $route.path}" @click="goTo('/home')">
    <span class="item_icon">
      <van-icon name="shop-collect" size="25"/>
    </span>
    <span>外卖</span>
  </span>
  <span class="guide_item" :class="{on:'/search' === $route.path}" @click="goTo('/search')">
    <span class="item_icon">
      <i class="iconfont icon-search"></i>
    </span>
    <span>搜索</span>
  </span>
  <span class="guide_item" :class="{on:'/order' === $route.path}" @click="goTo('/order')">
    <span class="item_icon">
      <i class="iconfont icon-dingdan"></i>
    </span>
    <span>订单</span>
  </span>
  <span class="guide_item" :class="{on:'/profile' === $route.path}" @click="goTo('/profile')">
    <span class="item_icon">
      <i class="iconfont icon-geren"></i>
    </span>
    <span>我的</span>
  </span>
</div>
</template>

<script>
// 按需导入vant，可以直接使用vant中的组件标签
import { Icon } from 'vant'
export default {
    name:'FooterGuide',
    methods:{
      goTo(path){
        this.$router.replace(path)
      }
    },
    components:{
      [Icon.name] : Icon,
    }
}
</script>

<style lang="stylus">
  @import "../../commen/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
