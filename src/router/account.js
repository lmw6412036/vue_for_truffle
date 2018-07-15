export default [
  {
    path: '/account/bind',
    component: () => import('../pages/account/bind')
  },
  /**
   * query
   * **** cid
   * **** mobile
   * **** captcha
   */
  {
    path: '/account/register',
    component: () => import('../pages/account/register')
  },
  /**
   * query
   * **** commpatId
   */
  {
    path: '/account/record/create',
    component: () => import('../pages/account/record/create')
  }
]
