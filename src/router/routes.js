const routes = [
  {
    path: '/',
    name: 'Donate',
    meta: {
      title: '捐赠页面',
      keepAlive: false,
      reload: false
    },
    component: () => import(/* webpackChunkName: "main" */ '@/pages/donate')
  }]

  export default routes