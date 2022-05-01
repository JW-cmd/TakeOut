<template>
  <div>
    <div class="cartcontrol">
      <!-- 减 -->
      <transition name="move">
        <div class="iconfont icon-remove_circle_outline"
             v-if="food.count>0"
             @click.stop="minusFood"></div>
      </transition>
      <div class="cart-count"
           v-if="food.count">{{food.count}}</div>
      <!-- 加 -->
      <div class="iconfont icon-add_circle"
           @click.stop="addFood"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartCtrl',
  props: {
    food: Object,
  },
  methods: {
    minusFood () {
      // 去vuex中修改数据
      this.$store.commit('shopAbout/MINUSFOOD', this.food)

      // 触发shopCart中BScroll的刷新操作
      this.$emit('refresh')
    },
    addFood () {
      this.$store.commit('shopAbout/ADDFOOD', this.food)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../commen/mixins.styl'
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .icon-remove_circle_outline
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 146, 114)
    &.move-enter-active, &.move-leave-active
      transition all 0.3s
    &.move-enter, &.move-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .icon-add_circle
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 146, 114)
</style>
