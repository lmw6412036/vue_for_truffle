export default [
  {
    path: '/my',
    component: () => import('../pages/my/index')
  },
  {
    path: '/my/pat',
    component: () => import('../pages/my/pat')
  },
  {
    path: '/my/pat/add',
    component: () => import('../pages/my/pat/add')
  },
  /**
   * 修改手机号
   * query
   * **** type [pat,commpat]
   * **** step [1,2]
   * **** cid
   * **** captcha
   */
  {
    path: '/my/pat/mobile',
    component: () => import('../pages/my/pat/mobile')
  },
  {
    path: '/my/order',
    component: () => import('../pages/my/order')
  },
  {
    path: '/my/order/detail',
    component: () => import('../pages/my/order/detail')
  },
  /**
   * query
   * **** id
   * cache
   * **** dataCache
   */
  {
    path: '/my/detail',
    component: () => import('../pages/my/detail')
  },
  {
    path: '/my/edit',
    component: () => import('../pages/my/edit')
  },
  {
    path: '/my/archives',
    component: () => import('../pages/my/archives')
  },
  /**
   * 添加/编辑 健康档案
   * query
   * **** type
   * **** value
   */
  {
    path: '/my/archives/add',
    component: () => import('../pages/my/archives/add')
  },
  /**
   * 添加 病历
   * query
   * **** type
   * **** value
   */
  {
    path: '/my/archives/medical/add',
    component: () => import('../pages/my/archives/medical/save')
  },
  /**
   * 编辑 病历
   * query
   * **** id
   * cache
   * **** medicalDetail
   */
  {
    path: '/my/archives/medical/edit',
    component: () => import('../pages/my/archives/medical/save')
  },
  /**
   * 钱包管理
   * query
   * **** id
   * cache
   * **** medicalDetail
   */
  {
    path: '/my/wallet',
    component: () => import('../pages/my/wallet')
  }
]
