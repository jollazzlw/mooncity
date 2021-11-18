<template>
  <div id="outer">
    <GiantScreen />
    <div class="content-wrap">
      <ArticleShow
        :datas="datas"
        :isLoader="isLoader"
        :isNext="isNext"
        @toLoadMore="toLoadMore"
      />
    </div>
  </div>
</template>
<script>
import GiantScreen from "@common/GiantScreen";
import ArticleShow from "@content/Article";
import bottomMix from "@utils/bottomMix";
export default {
  name: "home",
  components: {
    GiantScreen,
    ArticleShow,
  },
  mixins: [bottomMix],
  data() {
    return {
      datas: [], //请求后台的文章数据
      pageInfo: {
        pageSize: 5, //offset
        pageNum: 1, //limit
        isHome: true, //后端传过来一个大数组【没有按月分组】，按时间降序
      },
      len: 0, //现在有多少条数据
    };
  },
  created() {
    this.getArticleList();
  },

  methods: {
    toLoadMore() {
      this.pageInfo.pageNum += 1;
      this.getArticleList();
    },
    async getArticleList() {
      console.log("获取后台数据");
      const result = await this.$store.dispatch(
        "getArticleList",
        this.pageInfo
      );

      const { total, articleList, len } = result;

      /* articleList.forEach((item) => {
        this.$store.dispatch("dataHandle", item); //处理时间的格式
      }); */
      console.log(articleList);
      this.datas.push(...articleList);
      this.len += len;
      this.isNext = this.len < total;
      this.isLoader = false;
    },
  },
};
</script>
<style lang="less" scoped>
.content-wrap {
  position: relative;
  padding-top: 100px;
}
</style>
