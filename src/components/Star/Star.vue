<template>
  <div class="star" :class="'star-' + size">
      <span v-for="(star,index) in starArr" :key='index' class="star-item" :class="star"></span>
    </div>
</template>

<script>
export default {
    name:'Star',
    props:{
        score:Number,
        size:Number,
    },
    computed:{
        // 通过分数计算出一个长度为五，只含'on'/'half'/'off'类名的数组
        starArr(){
            const arr = []
            // 得到满星的个数
            for (let index = 0; index < Math.floor(this.score); index++) {
                arr.push('on')
            }
            // 判断是否有半颗星（个位大于等于0.5）
            if((this.score*10)%10 >= 5){
                arr.push('half')
            }
            // 剩下的就是灰星
            while(arr.length<5){
                arr.push('off')
            }
            return arr
        }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../commen/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>