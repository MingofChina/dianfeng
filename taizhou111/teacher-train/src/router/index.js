import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
  /* {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }*/
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //   path: '/permission',
    //   component: Layout,
    //   redirect: '/permission/page',
    //   alwaysShow: true, // will always show the root menu
    //   name: 'Permission',
    //   meta: {
    //     title: 'permission',
    //     icon: 'lock',
    //     roles: ['admin', 'editor'] // you can set roles in root nav
    //   },
    //   children: [
    //     {
    //       path: 'page',
    //       component: () => import('@/views/permission/page'),
    //       name: 'PagePermission',
    //       meta: {
    //         title: 'pagePermission',
    //         roles: ['admin'] // or you can only set roles in sub nav
    //       }
    //     },
    //     {
    //       path: 'directive',
    //       component: () => import('@/views/permission/directive'),
    //       name: 'DirectivePermission',
    //       meta: {
    //         title: 'directivePermission'
    //         // if do not set roles, means: this page does not require permission
    //       }
    //     },
    //     {
    //       path: 'role',
    //       component: () => import('@/views/permission/role'),
    //       name: 'RolePermission',
    //       meta: {
    //         title: 'rolePermission',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // {
    //   path: '/icon',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/icons/index'),
    //       name: 'Icons',
    //       meta: { title: 'icons', icon: 'icon', noCache: true }
    //     }
    //   ]
    // },

    /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,

    // {
    //   path: '/example',
    //   component: Layout,
    //   redirect: '/example/list',
    //   name: 'Example',
    //   meta: {
    //     title: 'example',
    //     icon: 'el-icon-s-help'
    //   },
    //   children: [
    //     {
    //       path: 'create',
    //       component: () => import('@/views/example/create'),
    //       name: 'CreateArticle',
    //       meta: { title: 'createArticle', icon: 'edit' }
    //     },
    //     {
    //       path: 'edit/:id(\\d+)',
    //       component: () => import('@/views/example/edit'),
    //       name: 'EditArticle',
    //       meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
    //       hidden: true
    //     },
    //     {
    //       path: 'list',
    //       component: () => import('@/views/example/list'),
    //       name: 'ArticleList',
    //       meta: { title: 'articleList', icon: 'list' }
    //     }
    //   ]
    // },

    // {
    //   path: '/tab',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/tab/index'),
    //       name: 'Tab',
    //       meta: { title: 'tab', icon: 'tab' }
    //     }
    //   ]
    // },

    // {
    //   path: '/error',
    //   component: Layout,
    //   redirect: 'noRedirect',
    //   name: 'ErrorPages',
    //   meta: {
    //     title: 'errorPages',
    //     icon: '404'
    //   },
    //   children: [
    //     {
    //       path: '401',
    //       component: () => import('@/views/error-page/401'),
    //       name: 'Page401',
    //       meta: { title: 'page401', noCache: true }
    //     },
    //     {
    //       path: '404',
    //       component: () => import('@/views/error-page/404'),
    //       name: 'Page404',
    //       meta: { title: 'page404', noCache: true }
    //     }
    //   ]
    // },

    // {
    //   path: '/error-log',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'log',
    //       component: () => import('@/views/error-log/index'),
    //       name: 'ErrorLog',
    //       meta: { title: 'errorLog', icon: 'bug' }
    //     }
    //   ]
    // },

    // {
    //   path: '/excel',
    //   component: Layout,
    //   redirect: '/excel/export-excel',
    //   name: 'Excel',
    //   meta: {
    //     title: 'excel',
    //     icon: 'excel'
    //   },
    //   children: [
    //     {
    //       path: 'export-excel',
    //       component: () => import('@/views/excel/export-excel'),
    //       name: 'ExportExcel',
    //       meta: { title: 'exportExcel' }
    //     },
    //     {
    //       path: 'export-selected-excel',
    //       component: () => import('@/views/excel/select-excel'),
    //       name: 'SelectExcel',
    //       meta: { title: 'selectExcel' }
    //     },
    //     {
    //       path: 'export-merge-header',
    //       component: () => import('@/views/excel/merge-header'),
    //       name: 'MergeHeader',
    //       meta: { title: 'mergeHeader' }
    //     },
    //     {
    //       path: 'upload-excel',
    //       component: () => import('@/views/excel/upload-excel'),
    //       name: 'UploadExcel',
    //       meta: { title: 'uploadExcel' }
    //     }
    //   ]
    // },

    // {
    //   path: '/zip',
    //   component: Layout,
    //   redirect: '/zip/download',
    //   alwaysShow: true,
    //   name: 'Zip',
    //   meta: { title: 'zip', icon: 'zip' },
    //   children: [
    //     {
    //       path: 'download',
    //       component: () => import('@/views/zip/index'),
    //       name: 'ExportZip',
    //       meta: { title: 'exportZip' }
    //     }
    //   ]
    // },

    // {
    //   path: '/pdf',
    //   component: Layout,
    //   redirect: '/pdf/index',
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/pdf/index'),
    //       name: 'PDF',
    //       meta: { title: 'pdf', icon: 'pdf' }
    //     }
    //   ]
    // },
    // {
    //   path: '/pdf/download',
    //   component: () => import('@/views/pdf/download'),
    //   hidden: true
    // },

    // {
    //   path: '/theme',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/theme/index'),
    //       name: 'Theme',
    //       meta: { title: 'theme', icon: 'theme' }
    //     }
    //   ]
    // },

    // {
    //   path: '/clipboard',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/clipboard/index'),
    //       name: 'ClipboardDemo',
    //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
    //     }
    //   ]
    // },

    // {
    //   path: '/i18n',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/i18n-demo/index'),
    //       name: 'I18n',
    //       meta: { title: 'i18n', icon: 'international' }
    //     }
    //   ]
    // },

    // {
    //   path: 'external-link',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'https://github.com/PanJiaChen/vue-element-admin',
    //       meta: { title: 'externalLink', icon: 'link' }
    //     }
    //   ]
    // },

    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true },

    {
        path: '/tz-myTraining',
        component: Layout,
        redirect: '/tz-myTraining/project',
        alwaysShow: true, // will always show the root menu
        name: 'tz-myTraining',
        meta: {
            title: '我的培训',
            icon: 'user',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'project',
                component: () =>
                    import ('@/views/tz-myTraining/project'),
                redirect: '/tz-myTraining/project/components/projectMain',
                name: 'project',
                meta: {
                    title: '我的培训项目',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                        path: 'components/projectMain',
                        component: () =>
                            import ('@/views/tz-myTraining/project/components/projectMain'),
                        name: 'projectMain',
                        hidden: true,
                        meta: {
                            title: '我的培训项目'
                        }
                    },
                    {
                        path: 'components/projectHome',
                        component: () =>
                            import ('@/views/tz-myTraining/project/components/projectHome'),
                        name: 'projectHome',
                        hidden: true,
                        meta: {
                            title: '项目首页'
                        }
                    },
                    {
                        path: 'components/viewClassDetails',
                        component: () =>
                            import ('@/views/tz-myTraining/project/components/viewClassDetails'),
                        name: 'viewClassDetails',
                        hidden: true,
                        meta: {
                            title: '看课详情'
                        }
                    }
                ]
            },
            //  {
            //  path: 'signUp',
            //  component: () => import('@/views/tz-myTraining/signUp'),
            // redirect: '/tz-myTraining/signUp/components/trainingRegistration',
            //  name: 'signUp',
            //  meta: {
            //    title: '培训报名',
            // 	breadcrumb: false,
            //    roles: ['admin'] // or you can only set roles in sub nav
            //  },
            // children: [
            // 	{
            // 	  path: 'components/trainingRegistration',
            // 	  component: () => import('@/views/tz-myTraining/signUp/components/trainingRegistration'),
            // 	  name: 'trainingRegistration',
            // 		hidden: true,
            // 	  meta: {
            // 	    title: '培训报名'
            // 	  }
            // 	}
            // ]
            //  },
            // {
            // path: 'seminar',
            // component: () => import('@/views/tz-myTraining/seminar'),
            // name: 'seminar',
            // meta: {
            //   title: '我的研讨',
            //   roles: ['admin'] // or you can only set roles in sub nav
            // }
            // },
            // {
            // path: 'hours',
            // component: () => import('@/views/tz-myTraining/hours'),
            // name: 'hours',
            // meta: {
            //   title: '我的学时',
            //   roles: ['admin'] // or you can only set roles in sub nav
            // }
            // }
        ]
    },
    {
        path: '/tz-municipal',
        component: Layout,
        redirect: '/tz-municipal/release',
        alwaysShow: true, // will always show the root menu
        name: 'tz-municipal',
        meta: {
            title: '市级培训管理',
            icon: 'documentation',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'release',
                component: () =>
                    import ('@/views/tz-municipal/release'),
                redirect: '/tz-municipal/release/components/trainingActivities',
                name: 'release',
                meta: {
                    title: '发布培训活动',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                        path: 'components/trainingActivities',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/trainingActivities'),
                        name: 'trainingActivities',
                        hidden: true,
                        meta: {
                            title: '发布培训活动'
                        }
                    },
                    {
                        path: 'components/eventManagement',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/eventManagement'),
                        name: 'eventManagement',
                        hidden: true,
                        meta: {
                            title: '培训活动管理'
                        }
                    },
                    {
                        path: 'components/setVideoCategories',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/setVideoCategories'),
                        name: 'setVideoCategories',
                        hidden: true,
                        meta: {
                            title: '上传培训视频'
                        }
                    },
                    {
                        path: 'components/setThemeSeminar',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/setThemeSeminar'),
                        name: 'setThemeSeminar',
                        hidden: true,
                        meta: {
                            title: '设置主题研讨'
                        }
                    },
                    {
                        path: 'components/seminarDetails',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/seminarDetails'),
                        name: 'seminarDetails',
                        hidden: true,
                        meta: {
                            title: '主题研讨详情'
                        }
                    },
                    {
                        path: 'components/setTrainingJobs',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/setTrainingJobs'),
                        name: 'setTrainingJobs',
                        hidden: true,
                        meta: {
                            title: '设置培训作业'
                        }
                    },
                    {
                        path: 'components/viewRegistrationResults',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/viewRegistrationResults'),
                        name: 'viewRegistrationResults',
                        hidden: true,
                        meta: {
                            title: '查看报名结果'
                        }
                    },
                    {
                        path: 'components/viewClassTimeStatistics',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/viewClassTimeStatistics'),
                        name: 'viewClassTimeStatistics',
                        hidden: true,
                        meta: {
                            title: '看课时长统计'
                        }
                    },
                    {
                        path: 'components/viewThematicSeminars',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/viewThematicSeminars'),
                        name: 'viewThematicSeminars',
                        hidden: true,
                        meta: {
                            title: '查看主题研讨'
                        }
                    },
                    {
                        path: 'components/viewTrainingAssignments',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/viewTrainingAssignments'),
                        name: 'viewTrainingAssignments',
                        hidden: true,
                        meta: {
                            title: '查看培训作业'
                        }
                    },
                    {
                        path: 'components/trainingJobDetails',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/trainingJobDetails'),
                        name: 'trainingJobDetails',
                        hidden: true,
                        meta: {
                            title: '培训作业详情'
                        }
                    },
                    {
                        path: 'components/studyStatistics',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/studyStatistics'),
                        name: 'studyStatistics',
                        hidden: true,
                        meta: {
                            title: '学情统计'
                        }
                    },
                    {
                        path: 'components/setRegionalAdmin',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/setRegionalAdmin'),
                        name: 'setRegionalAdmin',
                        hidden: true,
                        meta: {
                            title: '设置区域管理员'
                        }
                    },
                    {
                        path: 'components/importTestScores',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/importTestScores'),
                        name: 'importTestScores',
                        hidden: true,
                        meta: {
                            title: '导入考试成绩'
                        }
                    },
                    {
                        path: 'components/viewTrainingResults',
                        component: () =>
                            import ('@/views/tz-municipal/release/components/viewTrainingResults'),
                        name: 'viewTrainingResults',
                        hidden: true,
                        meta: {
                            title: '查看参训结果'
                        }
                    },
                ]
            },
            {
                path: 'statistics',
                component: () =>
                    import ('@/views/tz-municipal/statistics'),
                redirect: '/tz-municipal/statistics/components/staTrainingActivities',
                name: 'statistics',
                meta: {
                    title: '培训活动统计',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/staTrainingActivities',
                    component: () =>
                        import ('@/views/tz-municipal/statistics/components/staTrainingActivities'),
                    name: 'staTrainingActivities',
                    hidden: true,
                    meta: {
                        title: '培训活动统计'
                    }
                }, ]
            }
        ]
    },
    {
        path: '/tz-resource',
        component: Layout,
        redirect: '/tz-resource',
        children: [{
            path: 'tz-resource',
            component: () =>
                import ('@/views/tz-resource'),
            name: 'tz-resource',
            meta: {
                title: '培训资源管理',
                icon: 'dashboard',
            }
        }]
    },
    {
        path: '/tz-district',
        component: Layout,
        redirect: '/tz-district/disStatistics',
        alwaysShow: true, // will always show the root menu
        name: 'tz-district',
        meta: {
            title: '区级培训管理',
            icon: 'form',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'specify',
                component: () =>
                    import ('@/views/tz-district/specify'),
                redirect: '/tz-district/specify/components/specify',
                name: 'specifys',
                meta: {
                    title: '指定学校管理员',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/specify',
                    component: () =>
                        import ('@/views/tz-district/specify/components/specify'),
                    name: 'specify',
                    hidden: true,
                    meta: {
                        title: '指定学校管理员'
                    }
                }]
            },
            {
                path: 'disStatistics',
                component: () =>
                    import ('@/views/tz-district/disStatistics'),
                redirect: '/tz-district/disStatistics/components/disStatistics',
                name: 'disStatisticss',
                meta: {
                    title: '培训统计',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/disStatistics',
                    component: () =>
                        import ('@/views/tz-district/disStatistics/components/disStatistics'),
                    name: 'disStatistics',
                    hidden: true,
                    meta: {
                        title: '培训统计'
                    }
                }]
            }
        ]
    },
    {
        path: '/tz-school',
        component: Layout,
        redirect: '/tz-school/schStignUp',
        alwaysShow: true, // will always show the root menu
        name: 'tz-school',
        meta: {
            title: '学校培训管理',
            icon: 'documentation',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
                path: 'schStignUp',
                component: () =>
                    import ('@/views/tz-school/schStignUp'),
                redirect: '/tz-school/schStignUp/components/schStignUp',
                name: 'schStignUps',
                meta: {
                    title: '培训报名',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/schStignUp',
                    component: () =>
                        import ('@/views/tz-school/schStignUp/components/schStignUp'),
                    name: 'schStignUp',
                    hidden: true,
                    meta: {
                        title: '培训报名'
                    }
                }]
            },
            {
                path: 'schStatistics',
                component: () =>
                    import ('@/views/tz-school/schStatistics'),
                redirect: '/tz-school/schStatistics/components/schStatistics',
                name: 'schStatisticss',
                meta: {
                    title: '培训统计',
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [
                  {
                    path: 'components/schStatistics',
                    component: () =>
                        import ('@/views/tz-school/schStatistics/components/schStatistics'),
                    name: 'schStatistics',
                    hidden: true,
                    meta: {
                        title: '培训统计'
                    }
                },
                {
                    path: 'components/statisticaltime',
                    component: () =>
                        import ('@/views/tz-school/schStatistics/components/statisticaltime'),
                    name: 'statisticaltime',
                    hidden: true,
                    meta: {
                        title: '培训统计详情'
                    }
                },
                ]
            }
        ]
    },
    {
        path: '/tz-system',
        component: Layout,
        redirect: '/tz-system/user',
        alwaysShow: true, // will always show the root menu
        name: 'tz-system',
        meta: {
            title: '系统管理',
            icon: 'component',
            roles: ['admin'] // you can set roles in root nav
        },
        children: [{
                path: 'user',
                component: () =>
                    import ('@/views/tz-system/user'),
                redirect: '/tz-system/user/components/user',
                name: 'users',
                meta: {
                    title: '用户管理',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/user',
                    component: () =>
                        import ('@/views/tz-system/user/components/user'),
                    name: 'user',
                    hidden: true,
                    meta: {
                        title: '用户管理'
                    }
                }]
            },
            {
                path: 'area',
                component: () =>
                    import ('@/views/tz-system/area'),
                redirect: '/tz-system/area/components/area',
                name: 'areas',
                meta: {
                    title: '区域管理',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/area',
                    component: () =>
                        import ('@/views/tz-system/area/components/area'),
                    name: 'area',
                    hidden: true,
                    meta: {
                        title: '区域管理'
                    }
                }]
            },
            {
                path: 'unit',
                component: () =>
                    import ('@/views/tz-system/unit'),
                redirect: '/tz-system/unit/components/unit',
                name: 'units',
                meta: {
                    title: '单位管理',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/unit',
                    component: () =>
                        import ('@/views/tz-system/unit/components/unit'),
                    name: 'unit',
                    hidden: true,
                    meta: {
                        title: '单位管理'
                    }
                }]
            },
            {
                path: 'authorize',
                component: () =>
                    import ('@/views/tz-system/authorize'),
                redirect: '/tz-system/authorize/components/authorize',
                name: 'authorizes',
                meta: {
                    title: '用户角色授权',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/authorize',
                    component: () =>
                        import ('@/views/tz-system/authorize/components/authorize'),
                    name: 'authorize',
                    hidden: true,
                    meta: {
                        title: '用户角色授权'
                    }
                }]
            },
            {
                path: 'information',
                component: () =>
                    import ('@/views/tz-system/information'),
                redirect: '/tz-system/information/components/information',
                name: 'informations',
                meta: {
                    title: '平台信息维护',
                    breadcrumb: false,
                    roles: ['admin'] // or you can only set roles in sub nav
                },
                children: [{
                    path: 'components/information',
                    component: () =>
                        import ('@/views/tz-system/information/components/information'),
                    name: 'information',
                    hidden: true,
                    meta: {
                        title: '平台信息维护'
                    }
                }]
            },
            {
              path: 'role',
                component: () =>
                    import ('@/views/tz-system/role'),
                name: 'informations',
                meta: {
                  title: '角色列表',
                  breadcrumb: false,
                  roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
              path: 'authoriz-tree',
              component: () => import('@/views/tz-system/authorizeTree/index'),
              name: 'authoriz-tree',
              meta: {
                title: '权限树列表',
                breadcrumb: false,
                roles: ['admin'] // or you can only set roles in sub nav
              }
            }
          ]
      },
      {
        path: '*',
        component: () => import('@/views/error-page/404'),
        hidden: true
      },
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
