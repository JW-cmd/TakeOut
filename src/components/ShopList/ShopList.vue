<template>
  <div class="shop_container">
    <ul class="shop_list"
        v-if="shopList.length">
      <li v-for="item in shopList"
          :key="item.id"
          class="shop_li border-1px"
          @click="handleClick(item)">
        <a>
          <div class="shop_left">
            <img class="shop_img"
                 :src="baseImageUrl + item.image_path">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{item.name}}</h4>
              <ul class="shop_detail_ul">
                <li class="supports"
                    v-for="(support,index) in item.supports"
                    :key="index"
                    :style="{color:support.icon_color}">{{support.icon_name}}</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <!-- 星级 -->
                <Star :score='item.rating'
                      :size='24' />
                <div class="rating_section">
                  {{item.rating}}
                </div>
                <div class="order_section">
                  月售{{item.recent_order_num}}单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">{{item.delivery_mode.text}}</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{item.float_minimum_order_amount}}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{item.float_delivery_fee}}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in 6"
          :key="item">
        <img src="./images/shop_back.svg"
             alt="back" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Star from '../Star/Star.vue'
export default {
  components: { Star },
  name: 'shopList',
  data () {
    return {
      baseImageUrl: 'http://cangdu.org:8001/img/'
    }
  },
  methods: {
    ...mapActions(
      'homeAbout',
      ['receive_shop']
    ),
    handleClick (item) {
      this.$store.commit('shopAbout/getShop', item)
      this.$router.push('/shop')
    }
  },
  mounted () {
    this.receive_shop()
  },
  computed: {
    ...mapState('homeAbout',
      ['shopList']
    )
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../commen/mixins.styl'
.msite_shop_list
  top-border-1px(#e4e4e4)
  margin-top 10px
  background #fff
  .shop_header
    padding 10px 10px 0
    .shop_icon
      margin-left 5px
      color #999
    .shop_header_title
      color #999
      font-size 14px
      line-height 20px
  .shop_container
    .shop_list
      .shop_li
        bottom-border-1px(#f1f1f1)
        width 100%
        >a
          clearFix()
          display block
          box-sizing border-box
          padding 15px 8px
          width 100%
          .shop_left
            float left
            box-sizing border-box
            width 23%
            height 75px
            padding-right 10px
            .shop_img
              display block
              width 100%
              height 100%
          .shop_right
            float right
            width 77%
            .shop_detail_header
              clearFix()
              width 100%
              .shop_title
                float left
                width 200px
                color #333
                font-size 16px
                line-height 16px
                font-weight 700
                &::before
                  content '品牌'
                  display inline-block
                  font-size 11px
                  line-height 11px
                  color #333
                  background-color #ffd930
                  padding 2px 2px
                  border-radius 2px
                  margin-right 5px
              .shop_detail_ul
                float right
                margin-top 3px
                .supports
                  float left
                  font-size 10px
                  color #999
                  border 1px solid #f1f1f1
                  padding 0 2px
                  border-radius 2px
            .shop_rating_order
              clearFix()
              width 100%
              margin-top 18px
              margin-bottom 8px
              .shop_rating_order_left
                float left
                color #ff9a0d
                .rating_section
                  float left
                  font-size 10px
                  color #ff6000
                  margin-left 4px
                .order_section
                  float left
                  font-size 10px
                  color #666
                  transform scale(0.8)
              .shop_rating_order_right
                float right
                font-size 0
                .delivery_style
                  transform-origin 60px 0
                  transform scale(0.7)
                  display inline-block
                  font-size 12px
                  padding 1px
                  border-radius 2px
                .delivery_left
                  color #fff
                  margin-right -10px
                  background-color #02a774
                  border 1px solid #02a774
                .delivery_right
                  color #02a774
                  border 1px solid #02a774
            .shop_distance
              clearFix()
              width 100%
              font-size 12px
              .shop_delivery_msg
                float left
                transform-origin 0
                transform scale(0.9)
                color #666
              .segmentation
                color #ccc
</style>