<template>
  <div class="content flex flex-column">
    <h2 class="flex align-center title">
      <span class="el-icon-magic-stick motto"></span>
      人生不相见，动如参与商。今夕复何夕，共此灯烛光。
    </h2>
    <section class="blocks flex flex-wrap">
      <!-- 个人简介 -->
      <section class="block info flex align-center justify-center">
        <h4 class="title">你好,{{ userInfo.userName }}</h4>
        <p>人生得意须尽欢</p>

        <ul>
          <li v-for="(item, index) in textList" :key="index">
            <i :class="item.icon" />
            <span> {{ item.text }}</span>
          </li>
        </ul>
      </section>
      <!-- 文章 -->
      <section
        class="block flex align-center justify-center flex-column article"
      >
        <div class="title">文章</div>
        <div>
          <span>{{ homeInfo.articleCount }}</span
          >篇
        </div>
        <div class="tips" v-if="homeInfo.articleCount !== 0">
          {{ homeInfo.disLastArticleDay }}天前发布了一篇文章，继续努力哦！
        </div>
        <div class="tips" v-if="homeInfo.articleCount === 0">
          赶紧去写文章吧
        </div>
      </section>
      <!-- 留言条数 -->
      <section
        class="block comment flex align-center justify-center flex-column"
      >
        <div class="title">留言</div>
        <div>
          <span>{{ homeInfo.wordCount }}</span
          >条
        </div>
        <div class="tips" v-if="homeInfo.wordCount !== 0">
          感谢陌生人的留言！
        </div>
        <div class="tips" v-if="homeInfo.wordCount === 0">
          赶紧写出好文吧，不然都没人留言呢！
        </div>
      </section>
      <!-- 访客 -->
      <section
        class="block flex align-center justify-center flex-column peopleNum"
      >
        <div class="title">访问人数</div>
        <div><span>0</span>次</div>
        <div class="tips">感谢你们的浏览！</div>
      </section>
    </section>
  </div>
</template>

<script>
import { getHomeInfo } from "../../api/user";
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: mapState(["userInfo"]), //mapState 返回的就是一个对象
  data() {
    return {
      homeInfo: {},
      textList: [
        {
          icon: "el-icon-ice-drink",
          text: "现在的你，是个怎样的人？",
        },
        {
          icon: "el-icon-lollipop",
          text: "你希望以后成为怎样的人？",
        },
        {
          icon: "el-icon-lollipop",
          text: "你心中的未来是怎样的？",
        },
        {
          icon: "el-icon-lollipop",
          text: "最想做的一件事是什么？",
        },
        {
          icon: "el-icon-lollipop",
          text: "你现在的生活，开心吗？",
        },
        {
          icon: "el-icon-hot-water",
          text: "心如止水，淡中得味！",
        },
      ],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      // getHomeInfo()返回的是一个promise
      getHomeInfo().then((res) => {
        this.homeInfo = res.data.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.content {
  justify-content: flex-start;
  font-size: 20px;
  .motto {
    margin-right: 30px;
  }
  .title {
    color: #248cff;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
  }
  .blocks {
    .block {
      flex: 1 0 46%;
      height: 340px;
      background-color: #ffffff;
      box-shadow: 0px 2px 19px 0px #248aff38;
      border-radius: 25px;
      position: relative;
      margin-top: 30px;
      &:nth-of-type(1),
      &:nth-of-type(2) {
        margin-bottom: 30px;
      }
      &:nth-of-type(odd) {
        margin-top: 30px;
        margin-right: 4%;
      }
      .title {
        position: absolute;
        left: 20px;
        top: 20px;
        color: #74bcff;
        font-size: 16px;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 20px;
          height: 2px;
          background: #dbe8f7;
        }
      }
      &.info {
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 20px;
          color: #909399;
          padding-left: 15px;
        }
        ul {
          width: 90%;
          margin: 10px 0;
          padding: 14px 0px 0px;
          border-radius: 10px;
          border: 1px solid #edf3f9;
          li {
            position: relative;
            color: #5182b3;
            line-height: 24px;

            font-size: 13px;
            letter-spacing: 1px;
            span {
              margin-right: 4px;
            }
          }
        }
      }
      &.article,
      &.comment,
      &.peopleNum {
        span {
          color: #0d80ff;
          font-size: 40px;
          font-style: oblique;
          margin-right: 6px;
        }
        .tips {
          color: #bdc6cf;
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
