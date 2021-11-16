import { throttle } from '@utils'

export default {


  data() {
    return {
      throttleScroll: () => { },  //定义个变量来存储要注册到EventTarget上面的listener ,因为添加和移除的listener要一样才能移除
      isLoader: false, //用于加载元素的出现
      isNext: true, //用于是否可以接着获取文章
    }
  },
  activated() {
    this.arriveBottomEvent(
      () => this.isNext, //这里一定会要传回调进去啊，然后执行这个回调拿到isNext，不然传入的this.isNext永远是最初始的那个true
      () => {
        this.isLoader = true;
      }
    );
  },

  deactivated() {
    this.clearArriveBottomEvent();
  },
  methods: {

    arriveBottomEvent(isScroll, cb) {
      // 这里bind只是为了将参数传进去，如果不bind 就会变成scrollChange(isScroll,cd)了，变成直接执行了
      this.throttleScroll = throttle(this.scrollChange.bind(null, isScroll, cb), 300)
      window.addEventListener(
        "scroll",
        this.throttleScroll
      );
    },

    clearArriveBottomEvent() {
      window.removeEventListener('scroll', this.throttleScroll)
    },

    scrollChange(isScroll, cb) {
      // console.log("scrollChange", isScroll);
      if (!isScroll()) return    //不能再滚了
      // 滚动条的纵坐标位置
      const scrollTop = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
      // 可视区
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 总内容高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || window.scrollHeight
      // console.log(scrollTop, windowHeight, scrollHeight);
      if ((scrollTop + windowHeight) >= scrollHeight) {
        if (cb && cb instanceof Function) cb()     //到达最底部在执行回调函数，这个回调里面是获取数据的
      }
    }

  },
};