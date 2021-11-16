<template>
  <div>
    <!-- 文章列表 -->
    <div
      class="article-box flex align-center slideInUp"
      v-for="item in datas"
      :class="`wow${item.index}`"
      :key="item.id"
    >
      <div
        class="img-box flex align-center justify-center"
        @click="viewArticle(item.id)"
      >
        <img
          :src="
            item.imgUrl
              ? `${mainUrl}/img/${item.imgUrl}`
              : require('@assets/img/hmbb.jpg')
          "
          alt="图片飞了呢~"
        />
      </div>
      <div class="text-box">
        <div class="info">
          <div class="time">
            {{ item.month }} {{ item.day }}, {{ item.year }}
          </div>
          <div class="title" @click="viewArticle(item.id)">
            {{ item.title }}
          </div>
          <div class="description">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <!-- loader -->
    <div class="loader flex align-center justify-center">
      <!-- 没点击的时候出现这个 点击的时候出现下面的那个，正常来说LoadMore是等于isLoader的,点击后才不等 -->
      <div class="toLoadeMore" v-if="LoadMore && isLoader" @click="toLoadMore">
        点击加载更多
      </div>
      <BottomLoading v-else v-show="isLoader" />
      <span class="notMany" v-show="!isLoader && !isNext"
        >可恶啊，已经没有了(〃＞目＜)</span
      >
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";

import BottomLoading from "@common/BottomLoading";
export default {
  name: "ArticleShow",
  components: {
    BottomLoading,
  },
  data() {
    return {
      LoadMore: true,
      wowNum: 0,
    };
  },
  props: {
    datas: {
      type: [Array, Object],
      default: () => [], //对象或者数组默认从一个工厂函数中获取
    },
    isLoader: {
      type: Boolean,
      default: false,
    },
    isNext: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    isLoader() {
      this.LoadMore = this.isLoader;
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
    toLoadMore() {
      this.LoadMore = false;
      setTimeout(() => {
        this.$emit("toLoadMore");
      }, 2000);
    },
    viewArticle(id) {
      this.$router.push({ name: "Detail", params: { id } });
    },
  },
};
</script>
<style lang="less" scoped>
.article-box {
  position: relative;
  z-index: 2;
  &:not(:first-of-type) {
    margin-top: 50px;
  }
  &:nth-of-type(odd) {
    flex-direction: row-reverse;
  }
  .img-box {
    width: 680px;
    height: 440px;
    font-size: 0;
    position: relative;
    cursor: pointer;
    z-index: 3;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid #f3fafd;
    transition: all 0.3s;
    flex: 0 0 auto;
    img {
      flex: 0 0 auto;
      width: 100%;
      height: 100%;
    }
  }
  .text-box {
    padding: 80px 100px 0 80px;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    height: 400px;
    width: 500px;
    .info {
      .time {
        color: #999;
        font-size: 12px;
      }
      .title {
        margin: 8px 0 2px;
        font-size: 24px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-weight: 500;
        line-height: 30px;
        cursor: pointer;
        &:hover {
          cursor: pointer;
          text-decoration: none;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='blue' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E")
            repeat-x 0 100%;
          background-size: 20px auto;
          animation: waveMove 1s infinite linear;
        }
      }
      .description {
        color: #666;
        font-size: 14px;
        line-height: 22px;
        margin-top: 10px;
        overflow: hidden;
        // .text-overflow(3);
        text-overflow: ellipsis;
        /*弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*限制在一个块元素显示的文本的行数*/
        -webkit-line-clamp: 3;
        /*设置或检索伸缩盒子对象的子元素的排列方式*/
        -webkit-box-orient: vertical;
      }
      .handle {
        margin-top: 60px;
        font-size: 12px;
        color: #999;
        .handle-thunk {
          position: relative;
          &::after,
          &::before {
            opacity: 0;
            visibility: visible;
          }
          &::after {
            content: "浏览数";
            transform: translate(-50%, -5px);
            background: #ef6d57;
            white-space: nowrap;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            padding: 5px 14px;
            position: absolute;
            bottom: 100%;
            left: 50%;
            transition: all 0.3s;
          }
          &::before {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transition: all 0.3s;
            border: 5px solid transparent;
            border-top-color: #ef6d57;
            transform: translate(-50%, 5px);
          }
          &:hover {
            &::after,
            &::before {
              opacity: 1;
              visibility: visible;
            }
          }
          &:nth-of-type(1):hover {
            color: #ef6d57;
          }
          &:nth-of-type(2) {
            &::after {
              content: "喜欢人数";
            }
          }
          &:nth-of-type(3) {
            i {
              font-size: 16px;
              margin-right: 2px;
            }
            &::after {
              content: "评论数";
            }
          }
          &:nth-of-type(2):hover {
            color: #50bcb6;
            &::after {
              background-color: #50bcb6;
            }
            &::before {
              border-top-color: #50bcb6;
            }
          }
          &:nth-of-type(3):hover {
            color: #ffa800;
            &::after {
              background-color: #ffa800;
            }
            &::before {
              border-top-color: #ffa800;
            }
          }
          margin-right: 20px;
          i {
            font-size: 19px;
          }
        }
      }
    }
  }
}
.loader {
  height: 40px;
  margin: 30px 0 20px 0px;
  .toLoadeMore {
    letter-spacing: 2px;
    height: 34px;
    line-height: 34px;
    padding: 0 36px;
    color: #909090;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #0084ff;
    }
  }
  .notMany {
    letter-spacing: 2px;
    height: 34px;
    line-height: 36px;
    padding: 0 36px;
    color: #909090;
    border: 1px solid #eaeaea;
    border-radius: 4px;
  }
}
@media screen and (max-width: 1200px) {
  .article {
    .img-outer {
      width: 480px;
      height: 310px;
    }
    .text-outer {
      width: 420px;
      height: 290px;
      padding: 50px 60px 0;
      .info {
        .handle {
          margin-top: 30px;
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .article {
    flex-direction: column !important;
    border-bottom: 1px solid #eaeaea;
    .img-outer {
      width: 100%;
      height: auto;
      img {
        width: 680px;
        max-width: 100%;
      }
    }
    .text-outer {
      width: 96%;
      padding: 20px 20px;
      margin: auto;
      border: none;
      background: #fff;
      height: auto;
      .info {
        .handle {
          margin-top: 30px;
        }
        .description {
          // .text-overflow(2);
          overflow: hidden;
          text-overflow: ellipsis;
          /*弹性伸缩盒子模型显示*/
          display: -webkit-box;
          /*限制在一个块元素显示的文本的行数*/
          -webkit-line-clamp: 2;
          /*设置或检索伸缩盒子对象的子元素的排列方式*/
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>