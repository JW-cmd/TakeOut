<template>
  <div>
    <section class="search">
      <take-out-top title="搜索"></take-out-top>
      <form class="search_form"
            @submit.prevent="search">
        <input type="search"
               name="search"
               placeholder="请输入商家或美食名称"
               class="search_input"
               v-model="searchText">
        <input type="submit"
               name="submit"
               class="search_submit">
      </form>
      <section class="list"
               v-if="!noSearchShops">
        <ul class="list_container">
          <li v-for="item in searchedData"
              :key="item.id"
              class="list_li">
            <section class="item_left">
              <img :src="imgBaseUrl + item.image_path"
                   class="restaurant_img">
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p style="overflow:hidden; width:280px;">
                  <span>{{item.name}}</span>
                </p>
                <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
              </div>
            </section>
          </li>
        </ul>
      </section>

      <div class="search_none"
           v-else>很抱歉！无搜索结果</div>
    </section>
  </div>
</template>

<script>
import TakeOutTop from '../../components/TakeOutTop.vue'
import { mapState } from 'vuex'
export default {
  components: { TakeOutTop },
  name: 'Search',
  data () {
    return {
      searchText: '',//搜索文本
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      noSearchShops: false
    }
  },
  computed: {
    ...mapState('searchAbout', ['searchedData'])
  },
  methods: {
    search () {
      // 得到搜索关键字
      const keyword = this.searchText.trim()
      // 进行搜索
      if (keyword) {
        this.$store.dispatch('searchAbout/req_search_data', keyword)
      }
    },
  },
  watch: {
    searchedData (value) {
      if (!value.length) { // 没有数据
        this.noSearchShops = true
      } else {// 有数据
        this.noSearchShops = false
      }
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search
  width 100%
  height 100%
  overflow hidden
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774
  .list
    .list_container
      background-color #fff
      .list_li
        display flex
        justify-content center
        padding 10px
        border-bottom 1px solid $bc
        .item_left
          margin-right 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    margin 0 auto
    color #333
    background-color #fff
    text-align center
    margin-top 0.125rem
</style>