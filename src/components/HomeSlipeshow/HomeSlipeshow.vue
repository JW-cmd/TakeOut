<template>
  <nav class="msite_nav">
      <div class="swiper-container" v-if="categroyArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categroy,index) in categroyArr" :key="index">
            <a v-for="item in categroy" :key="item.id" href="javascript:" class="link_to_food">
              <div class="food_container">
                <img :src="baseImageUrl + item.image_url">
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else/>
    </nav>
</template>

<script>
// 导入swiper
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapActions,mapState} from 'vuex' 

export default {
    name:"Homeslipeshow",
    data(){
      return {
        baseImageUrl:'https://fuss10.elemecdn.com'
      }
    },
    methods:{
      ...mapActions(
        'homeAbout',
        ['receive_catagroy',]
        )
    },
    computed:{
      ...mapState('homeAbout',
      ['foodCategroy',]
      ),

      // 将分类数组中的数据按每组最多8个分成几个小数组
      categroyArr(){
        const arr = []
        let minArr = []
        this.foodCategroy.forEach(item => {
          minArr.push(item)
          if(minArr.length === 8){
            arr.push(minArr)
            minArr = []
          }
        })
        return arr
      },
    },
    mounted() {
      this.receive_catagroy()
    },
    watch:{
      // categroyArr初始值是undefined，之后异步请求到值后数据发生变化，能被watch监测到
      categroyArr(){
        // 数据一获取到，就会产生新虚拟DOM，在新虚拟DOM替换旧DOM之后立马对页面进行分页
        this.$nextTick(()=>{
          // 导入swiper后需要new一个实例对象并传入配置项
          // 注意swiper在数据放入页面之后才有作用
          new Swiper ('.swiper-container', {
            loop: true, //实现无缝切换
            // 如果需要分页器
            pagination: '.swiper-pagination',
            
          })
        })
      },
    },
}
</script>

<style lang="stylus">
  @import '../../commen/mixins.styl'
  .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 55px
      height 200px
      background #fff
      overflow hidden
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
