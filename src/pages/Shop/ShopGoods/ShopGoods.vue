<template>
  <div>
    <div class="goods">
      <!-- 左边菜单栏 -->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item"
              :class="{
                'current': currentCart === index
              }"
              v-for="(category,index) in goods"
              :key="index"
              @click="handleClick(index)">
            <span class="text bottom-border-1px">
              <img :class="{icon:category.icon}"
                   :src="category.icon">
              {{category.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右边食物展示栏 -->
      <div class="foods-wrapper">
        <!-- 这个ul是包含每个分类小项的大ul -->
        <ul ref="foodUl">
          <!-- 每一个li代表一种优惠方式中的所有食物 -->
          <li class="food-list-hook"
              v-for="(good,index) in goods"
              :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(item,index) in good.foods"
                  :key='index'
                  @click="showFood(item)">
                <div class="icon">
                  <img width="57"
                       height="57"
                       :src="item.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{item.sellCount}} 份</span>
                    <span>好评率 {{item.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartCtrl :food='item'></cartCtrl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="food"
          ref="food" />>
    <shopCart></shopCart>
  </div>
</template>

<script>
import cartCtrl from '../../../components/cartCtrl.vue'
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'
import Food from '../../../components/Food.vue'
import shopCart from '../../../components/shopCart.vue'
export default {
  name: 'ShopGoods',
  data () {
    return {
      menuScorll: null,
      foodScorll: null,
      scrollY: 0,//只衡量距离，所以取的绝对值
      topList: [],
      food: {},
    }
  },
  components: { cartCtrl, Food, shopCart },
  computed: {
    ...mapState('shopAbout', ['goods']),
    // 当前分类索引值
    currentCart () {

      // console.log(this.scrollY, this.topList)
      // 初始化没有滚动的时候，应该返回0
      // if (this.scrollY === 0) {
      //   return 0
      // }

      // 当scrollY的值介于top[i]到top[i+1]之间时，currentCart为i

      // ************************尝试1***********************************************
      // let temp = 0
      // for (let item in this.topList) {
      //   if (this.scrollY >= this.topList[item] && this.scrollY < this.topList[item + 1]) {
      //     // console.log(item)
      //     temp = item
      //   }
      //   else {
      //     console.log(this.topList[item + 1])
      //   }
      // }
      // return temp

      // ******************************总结**********************************************
      // 最开始准备用foreach来返回索引，但是！！！foreach不能return，由于这个，不论找没找到，都会遍历所有元素
      // 然后尝试用for...in..（见上面注释），但是用了才发现，
      // 他只能访问当前索引的值，不能通过index+i访问其附近元素，会返回undefined！！

      // 最后使用findIndex才有结果，他只循环到第一个符合条件的元素，但是也要注意它找不到匹配的值，会返回-1
      return this.topList.findIndex((value, index) => {
        return (this.scrollY >= value && this.scrollY < this.topList[index + 1])
      })
    }
  },
  mounted () {
    // 子组件的数据最好在自己这个组件内获取，据我猜测，如果在父组件的mounted中获取，可能得等到所有子组件都挂载完毕之后才获取到数据
    this.$store.dispatch('shopAbout/req_shop_goods', () => {
      this.$nextTick(() => {
        // 因为betterScorll必须在数据渲染后才能起效，所以在这个节点调用
        this._initScroll()
        this._getTopList()
      })
    })

  },
  methods: {
    _initScroll () {
      this.menuScorll = new BScroll('.menu-wrapper', {
        click: true,
        scrollY: true,
        probeType: 2,
      })
      this.foodScorll = new BScroll('.foods-wrapper', {
        click: true,
        scrollY: true,
        probeType: 2,
      })
      // 给右侧食物滑动栏绑定滑动中触发的事件, 实时获取scrollY的值
      this.foodScorll.on('scroll', ({ y }) => {
        this.scrollY = Math.abs(y)
      })

      // 再给右侧食物滑动栏绑定滑动停止后触发的事件，以处理惯性滑动
      this.foodScorll.on('scrollEnd', (y) => {
        this.scrollY = Math.abs(y.y)
      })

      // 给左侧分类列表绑定点击事件

    },
    // 收集每个食物栏的top值
    _getTopList () {
      // 首先获取到每个li的高度，累加可获得每个li的top值
      const tops = []
      const lists = this.$refs.foodUl.getElementsByClassName('food-list-hook')
      let top = 0
      tops.push(top)
      // 这种拿到dom节点的方法一般生成的是伪数组，不能使用数组的方法，下面这步是将伪数组转为真正的数组
      // 拿到数组中的每个节点的clientY值
      Array.prototype.slice.call(lists).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })

      // 将拿到所有top值的数组赋值给topList
      this.topList = tops
      // console.log(this.topList)
    },

    handleClick (index) {
      // 拿到对应的top值,赋给scrollY
      const top = - this.topList[index]//因为要判断方向，所以有正负，往上滑，值为负
      // 立即更新scrollY,引起currentIndex的变化
      this.scrollY = -top
      // 滚动动画
      this.foodScorll.scrollTo(0, top, 800)
    },

    // 展示食物具体信息
    showFood (food) {
      // 传对应数据给food组件
      this.food = food

      // 使food显示出来,自定义组件也是标签，通过设置ref可以拿到这个DOM元素，就可以访问其属性和方法
      this.$refs.food.changeShow()
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../commen/mixins.styl'
.goods
  display flex
  position absolute
  top 195px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 8px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 30px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 5px
</style>
