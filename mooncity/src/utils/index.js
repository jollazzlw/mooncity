// import { Message } from 'element-ui'

export function debounce(fnc, delay = 500) {

  let timer           //用闭包存一个timer
  return function () {

    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null;
      fnc.apply(this, args)
    }, delay)
  }
}
export function throttle(func, delay = 500) {

  let timer = null
  let pre = Date.now()

  return function () {
    const context = this
    let now = Date.now()
    let reamining = delay - (now - pre)
    clearTimeout(timer)
    if (reamining <= 0) {
      func.apply(context, arguments)
      pre = +Date.now()
    } else {
      timer = setTimeout(() => {
        pre = +Date.now()
        func.apply(context, arguments)
      }, reamining)
    }
  }
}

// 滚动的防抖
//这里是要把全部整个防抖函数返回给监听事件 ,箭头函数不能有{} 因为要return啊
/*

let throttleScroll = null    //定义个变量来存储要注册到EventTarget上面的listener ,因为添加和移除的listener要一样才能移除
export function arriveBottomEvent(isScroll, cb) {
  throttleScroll = throttle(scrollChange.bind(null, isScroll, cb), 300)
  window.addEventListener(
    "scroll",
    throttleScroll
  );
}

export function clearArriveBottomEvent() {
  window.removeEventListener('scroll', throttleScroll)
}


function scrollChange(isScroll, cb) {
  // console.log("scrollChange", isScroll());

  if (!isScroll()) return    //不能再滚了
  // 滚动条的纵坐标位置
  const scrollTop = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
  // 可视区
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 总内容高度
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || window.scrollHeight
  console.log(scrollTop, windowHeight, scrollHeight);
  if ((scrollTop + windowHeight) >= scrollHeight) {
    if (cb && cb instanceof Function) cb()     //到达最底部在执行回调函数，这个回调里面是获取数据的
  }
} */



