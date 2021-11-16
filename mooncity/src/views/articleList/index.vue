<template>
  <div class="flex flex-column align-center">
    <div class="list">
      <ul class="monUl" v-for="(item, index) in datas" :key="index">
        <li class="monTitle">
          {{ item[0].month }},{{ item[0].day }},{{ item[0].year }}
        </li>
        <!-- 下面的to是到在routes里面注册了的Detail组件中去了，由于注册的detail是动态路由detail/:id  所以携带id过去才能找到对应的文章啊-->
        <router-link
          custom
          v-slot="{ navigate }"
          :to="{ name: 'Detail', params: { id: tunk.id } }"
          v-for="tunk in item"
          :key="tunk.id"
          class="mContent fadeInUp"
          :class="`wow${tunk.index}`"
        >
          <ul @click="navigate">
            <li class="mCLi flex space-between">
              <div class="mCLeft flex align-center">
                <img
                  :src="
                    tunk.imgUrl
                      ? `${mainUrl}/img/${tunk.imgUrl}`
                      : require('@assets/img/screen.jpg')
                  "
                  :alt="tunk.title"
                  :title="tunk.title"
                />

                <div class="mCLText flex flex-column space-around">
                  <span>{{ tunk.title }}</span>
                  <span
                    >{{ tunk.likeNum }} LIKE / {{ tunk.visitsNum }} READ</span
                  >
                </div>
              </div>
              <div class="mCRight flex align-center">
                <span>{{ tunk.day }}st</span>
              </div>
            </li>
          </ul>
        </router-link>
      </ul>
    </div>
    <div class="loader flex align-center justify-center">
      <!-- 没点击的时候出现这个 点击的时候出现下面的那个，正常来说LoadMore是等于isLoader的,点击后才不等 -->
      <BottomLoading v-show="isLoader" />
      <span class="notMany" v-show="!isLoader && !isNext"
        >可恶啊，已经没有了(〃＞目＜)</span
      >
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";

import bottomMix from "@utils/bottomMix";
import BottomLoading from "@common/BottomLoading";
export default {
  name: "articleList",
  components: { BottomLoading },
  mixins: [bottomMix],
  data() {
    return {
      wowNum: 0,
      datas: [], //请求后台的文章数据
      pageInfo: {
        pageSize: 8, //offset
        pageNum: 1, //limit
        isHome: false, //后端传过来一个二维数组，里面一个月的文章一个数组
      },
      len: 0, //现在有多少条数据
      isLoader: false, //用于加载元素的出现
      isNext: true, //用于是否可以接着获取文章
    };
  },
  created() {
    this.getArticleList();
  },
  watch: {
    isLoader() {
      if (this.isLoader === true) {
        this.pageInfo.pageNum += 1;
        setTimeout(() => {
          this.getArticleList();
        }, 2000);
      }
    },
    datas() {
      this.$nextTick(() => {
        new WOW({
          live: false, //是否持续检查页面有新的wow
          offset: 0,
          boxClass: `wow${this.wowNum}`,
        }).init();
        this.wowNum++;
      });
    },
  },
  methods: {
    async getArticleList() {
      // console.log("获取后台数据");
      const result = await this.$store.dispatch(
        "getArticleList",
        this.pageInfo
      );
      const { total, articleList, len } = result;

      articleList.forEach((item) => {
        this.$store.dispatch("dataHandle", ...item); //处理时间的格式
      });
      this.datas.push(...articleList);
      // console.log(this.datas);
      this.len += len;
      this.isNext = this.len < total;
      this.isLoader = false;
    },
  },
};
</script>
<style lang="less" scoped>
.list {
  width: 640px;
  padding: 80px 0 0px;
  .monUl {
    .monTitle {
      color: #6e7ab5;
      font-weight: 400;
      font-size: 18px;
      text-align: left;
      margin: 30px 0 10px;
      list-style: none;
      position: relative;
      &::before {
        content: "";
        width: 12px;
        height: 12px;
        display: inline-block;
        background-color: #dce8ec;
        border: 3px solid #afcfff;
        margin-right: 22px;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .mContent {
      padding-left: 30px;
      border-left: 1px solid #f3fafd;
      margin-left: 6px;
      .mCLi {
        padding: 25px 0;
        border-bottom: 1px solid #f3fafd;
        .mCLeft {
          img {
            flex-shrink: 0;
            width: 45px;
            height: 45px;
            border-radius: 4px;
            margin-right: 15px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid #f3fafd;
          }
          .mCLText {
            span:first-of-type {
              color: #5b6773;
              cursor: pointer;
              font-size: 20px;
              padding-bottom: 10px;
              transition: all 0.6s;
            }
            span:nth-of-type(odd):hover {
              text-decoration: none;
              background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='blue' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E")
                repeat-x 0 100%;
              background-size: 20px auto;
              animation: waveMove 1s infinite linear;
            }
            span {
              color: #a1a0d6;
              font-size: 13px;
              letter-spacing: 0;
            }
          }
        }
        .mCRight {
          color: #d2c6a3;
          font-size: 13px;
        }
      }
    }
  }
}
.notMany {
  width: 100%;
  margin: 20px 0;
  color: #909090;
  letter-spacing: 2px;
  transition: all 0.3s;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
}
.footer {
  height: 40px;
  margin-bottom: 40px;
}
@media screen and (max-width: 700px) {
  .list {
    width: 100%;
    padding: 80px 20px 20px;
  }
}
</style>
