<template>
  <div class="flex flex-column align-center">
    <!-- <ScrollBar /> -->
    <Header @like="likeArticle" :title="datas.title" :music="datas.musicUrl"/>
    <div class="detail">
      <h1 class="title">{{ datas.title }}</h1>
      <div class="status flex align-center">
        <span>{{ datas.monthCh }} {{ datas.day }}, {{ datas.year }}</span>
        <span>阅读 {{ datas.visitsNum }}</span>
        <!--依据请求数据的次数计算-->
        <span>字数：{{ datas.textWordNum }}</span>
        <!-- <span>评论：{{ commentList.total }}</span> -->
        <span>喜欢: {{ datas.likeNum }}</span>
      </div>
      <div class="content markdown-body">
        <div v-html="content"></div>
      </div>
      <CommentInput
        :hasUserName="hasUserName"
        :aiteName="aiteName"
        @addUser="addUser"
        @addArtCom="addArtCom"
        @editUserName="editUserName"
        @tagClose="tagClose"
      />
      <CommentList @replay="replayUser" :commentInfo="commentInfo" />
    </div>
    <div class="loader flex align-center justify-center">
      <!-- 没点击的时候出现这个 点击的时候出现下面的那个，正常来说LoadMore是等于isLoader的,点击后才不等 -->
      <BottomLoading v-show="isLoader" />
      <span class="notMany" v-show="!isLoader && !isNext"
        >可恶啊，已经没有了(〃＞目＜)</span
      >
    </div>
  </div>
  </div>
</template>

<script>
import marked from "marked";

import Header from "@content/Header";
import CommentInput from "@content/CommentInput";
import CommentList from "@content/CommentList";
import BottomLoading from "@common/BottomLoading";

import { likeArticle } from "@api/article";
import { addUser, login, updateUserInfo } from "@api/user.js";
import { addArtCom, getComList } from "@api/articleCom.js";

import bottomMix from "@utils/bottomMix";
export default {
  name: "Detail",
  components: { Header, CommentInput, CommentList, BottomLoading },
  mixins: [bottomMix],
  data() {
    return {
      datas: {},
      content: "",
      hasUserName: "",
      articleId: "",
      commentInfo: [],
      pageInfo: {
        page: 1,
        limit: 10,
      },
      aiteName: "",
      floorId: "",
      len: 0, //拿了多少条评论了
      isLoader: false, //用于加载元素的出现
      isNext: true, //用于是否可以接着获取文章
    };
  },

  async created() {
    /* 这里使用async await 的原因是 getArticleDetail是异步获取数据的,而我们markRender的时候如果不异步就是同步的，
    这样会拿不到里面的数据content  所以必须await getArticleDetail结束了才能marked Render
     */
    this.articleId = this.$route.params.id;
    await this.getArticleDetail();
    await this.markedRender();
    this.isOrNoUserName();
    this.arriveBottomEvent(
      //这里一定会要传回调进去啊，然后执行这个回调拿到isNext，不然传入的this.isNext永远是最初始的那个true
      () => this.isNext,
      () => {
        this.isLoader = true;
      }
    );
  },
  mounted() {
    this.getComList();
  },
  destroyed() {
    this.clearArriveBottomEvent();
  },
  watch: {
    isLoader() {
      if (this.isLoader === true) {
        this.pageInfo.limit += 10;
        setTimeout(() => {
          this.getComList();
        }, 2000);
      }
    },
  },
  methods: {
    // 获取文章的细节
    async getArticleDetail() {
      this.datas = await this.$store.dispatch(
        "getArticleDetail",
        this.articleId
      );
    },

    // 获取文章评论的列表
    async getComList() {
      const data = { ...this.pageInfo, articleId: this.articleId };
      const result = await getComList(data);
      this.commentInfo = result.data.data;
      const { len, total } = this.commentInfo;
      this.len += len;
      this.isNext = this.len < total;
      this.isLoader = false;
    },

    // markedown的渲染
    markedRender() {
      //markdowm使用参见： https://marked.js.org/using_advanced#options
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
          const hljs = require("highlight.js");
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        pedantic: false, //要不要修复尽可能的遵循原始markedowm.pl
        gfm: true, //使用github flavored markdown的规范
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true, //use smarter list behavior than those found in markdown.pl
        smartypants: false,
        xhtml: false,
      });
      this.content = marked(this.datas.content);
    },

    // 喜欢文章
    async likeArticle(hadLike) {
      if (hadLike) {
        //如果已经喜欢过了
      } else {
        //第一次喜欢   articleId
        const articleId = this.$route.params.id; //拿到文章的id号,传入设置喜欢
        await likeArticle({ articleId });
      }
    },

    // 看看用户之前用有没有来过
    isOrNoUserName() {
      try {
        const { userName } = JSON.parse(localStorage.getItem("userInfo"));
        if (userName) {
          this.hasUserName = userName;
          return true;
        }
      } catch (e) {}
    },

    // 用户第一次发评论,需要注册一个用户
    async addUser(info) {
      try {
        const result = await addUser({ userName: info.userName });
        const userInfo = result.data.data;

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        const { account } = userInfo;

        await login({ account });

        this.hasUserName = userInfo.userName;
        const { id } = userInfo;

        await this.addArtCom({ ...info, userId: id });
      } catch (e) {
        console.log(e);
      }
    },
    // 不是第一次，直接添加评论
    async addArtCom(info, cb) {
      info.articleId = this.articleId;
      this.floorId && (info.floorId = this.floorId);
      await addArtCom(info);
      await this.getComList();
      this.$message({ type: "success", message: "评论成功", offset: 60 });
      cb();
    },

    // 修改用户名
    async editUserName(userName) {
      try {
        const result = await updateUserInfo({ userName });
        const userInfo = result.data.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      } catch (e) {
        console.log(e);
      }
    },

    // 处理@的情况
    replayUser(info) {
      this.aiteName = info.userName;
      this.floorId = info.parentId;
    },
    // 清楚掉aite后 删除艾特信息
    tagClose() {
      this.aiteName = "";
      this.floorId = "";
    },
  },
};
</script>
<style lang='less' scoped>
#hash {
  margin-bottom: 100px;
}
.detail {
  width: 800px;
  .title {
    font-size: 30px;
    padding: 130px 0 22px;
    color: #333;
  }
  .status {
    color: #6a737d;
    position: relative;
    line-height: 22px;
    &::before {
      content: "";
      width: 100%;
      height: 1px;
      background: #eaeaeaa6;
      position: absolute;
      left: 0;
      bottom: -30px;
    }
    span {
      font-size: 13px;
      margin-right: 10px;
    }
  }
  .content {
    text-align: left;
    padding-top: 100px;
    font-size: 14px;
  }
}

@media screen and (max-width: 800px) {
  .detail {
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .detail {
    .content {
      padding-top: 30px;
    }
    .title {
      font-size: 26px;
      padding-top: 88px;
    }
    .status {
      span {
        font-size: 12px;
      }
    }
  }
}
</style>