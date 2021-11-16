export default [
  {
    path: '/',
    name: 'Home',
    component: () => {
      return import(/* webpackChunkName: "about" */ '@views/home')
    }
  },
  {
    path: '/exhibit',
    name: 'Exhibit',
    component: () => {
      return import(/* webpackChunkName: "about" */ '@views/exhibit')
    }
  },
  {
    path: '/articleList',
    name: 'ArticleList',
    component: () => {
      return import(/* webpackChunkName: "about" */ '@views/articleList')
    }
  },
  {
    path: '/detail:id',
    name: 'Detail',
    component: () => {
      return import(/* webpackChunkName: "about" */ '@views/detail')
    }
  },
  {
    path: '/Rainy',
    name: 'Rainy',
    component: () => {
      return import(/* webpackChunkName: "about" */ '@views/rainy')
    }
  },

]