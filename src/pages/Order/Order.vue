<template>
  <div>
    <section class="order">
      <take-out-top title="订单列表"></take-out-top>
      <section class="order_no_login">
        <img src="./images/order/person.png">
        <h3>登录后查看外卖订单</h3>
        <button @click="clickToLogin">{{user._id?'已登录':'立即登录'}}</button>
      </section>
    </section>
  </div>
</template>

<script>
import TakeOutTop from '../../components/TakeOutTop.vue'
import { mapState } from 'vuex'
export default {
  name: 'Order',
  components: {
    TakeOutTop,
  },
  computed: {
    ...mapState('loginAbout', ['user'])
  },
  methods: {
    clickToLogin () {
      if (this.user._id) return
      this.$router.push('/login')
    }
  }
}
</script>
        

<style lang="stylus">
.order // 订单
  width 100%
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center
    >img
      display block
      width 100%
      height 30%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    >button
      display inline-block
      background #02a774
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
</style>