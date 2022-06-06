// import { from } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import index from '../views/index.vue'
import peakIntroduction from '../views/intoThePeak/peakIntroduction.vue'
import peakBusiness from '../views/peakBusiness/peakBusiness.vue'
import peakCases from '../views/peakCases/peakCases.vue'
import peakCasesDetail from '../views/peakCases/peakCasesDetail.vue'
import peakView from '../views/peakView/peakView.vue'
import peakTeam from '../views/intoThePeak/peakTeam.vue'
import peakTeamDetail from '../views/intoThePeak/peakTeamDetail.vue'
import topNews from '../views/intoThePeak/topNews.vue'
import peakStyle from '../views/intoThePeak/peakStyle.vue'
import cooperativePartner from '../views/intoThePeak/cooperativePartner.vue'
import professionalWorks from '../views/peakView/professionalWorks.vue'
import industrialAlliance from '../views/intoThePeak/industrialAlliance.vue'
import legalDeclaration from '../views/contactUs/legalDeclaration.vue'
import contactUs from '../views/contactUs/contactUs.vue'
import siteMap from '../views/contactUs/siteMap.vue'
import peakViewDetail from '../views/peakView/peakViewDetail.vue'
import professWorksDetail from '../views/peakView/professWorksDetail.vue'
import queryResults from '../views/contactUs/queryResults.vue'
import newsIndex from '../views/intoThePeak/newsDetails/newsIndex.vue'
import newsDetail from '../views/intoThePeak/newsDetails/newsDetail.vue'
import index_h5 from '../views/page/hIndex'
import us_h5 from '../views/page/us/us.vue'
import law_h5 from "../views/page/us/law.vue";
import introduce_h5 from "../views/page/goCompany/introduce.vue";
import team_h5 from "../views/page/team/team.vue"
import teamDetail_h5 from "../views/page/team/teamDetail.vue"
import demeanor_h5 from "../views/page/demeanor/demeanor.vue";
import focus_5 from "../views/page/focus/focus.vue";
import partner_h5 from "../views/page/partner/partner.vue";
import viewpoint_h5 from "../views/page/viewpoint/viewpoint.vue"
import pointDetail_h5 from "../views/page/pointDetail/pointDetail.vue";
import caseDetail_h5 from "../views/page/caseDetail/caseDetail.vue";
import business_h5 from "../views/page/caseDetail/business.vue"
import union_h5 from "../views/page/goCompany/union.vue";
import point_h5 from "../views/page/pointDetail/point.vue";
import case_h5 from "../views/page/caseDetail/case.vue";
import work_h5 from "../views/page/pointDetail/work.vue";
import focusDetail_h5 from "../views/page/focus/focusDetails.vue"
Vue.use(VueRouter)

export const constantRoutes = [{
        path: '/',
        name: 'home',
        component: home,
        redirect: 'index',
        meta: {
            title: "首页"
        },
        children: [

            {
                path: 'index',
                name: 'index',
                component: index,
                meta: {
                    title: "首页"
                }
            },
            {
                path: 'index_h5',
                name: 'index_h5',
                component: index_h5,
                meta: {
                    title: "首页"
                }
            },
            {
                path: 'introduce_h5/0/0',
                name: 'introduce_h5',
                component: introduce_h5,
                meta: {
                    title: '巅峰介绍'
                }
            },
            {
                path: 'introduce_h5/0/1',
                name: 'team_h5',
                component: team_h5,
                meta: {
                    title: '巅峰团队'
                }
            },
            // teamDetail_h5
            {
                path: 'teamDetail_h5',
                name: 'teamDetail_h5',
                component: teamDetail_h5,
                meta: {
                    title: '团队详情'
                }
            },
            {
                path: 'introduce_h5/0/2',
                name: 'demeanor_h5',
                component: demeanor_h5,
                meta: {
                    title: '巅峰风采'
                }
            },
            {
                path: 'introduce_h5/0/3',
                name: 'focus_5',
                component: focus_5,
                meta: {
                    title: '巅峰要闻'
                }
            },
            {
                path: 'focusDetail_h5',
                name: 'focusDetail_h5',
                component: focusDetail_h5,
                meta: {
                    title: '巅峰要闻详情'
                }
            },
            {
                path: 'introduce_h5/0/4',
                name: 'union_h5',
                component: union_h5,
                meta: {
                    title: '产业联盟'
                }
            },

            {
                path: 'introduce_h5/0/6',
                name: 'partner_h5',
                component: partner_h5,
                meta: {
                    title: '合作伙伴'
                }
            },
            {
                path: 'caseDetail_h5',
                name: 'caseDetail_h5',
                component: caseDetail_h5,
                meta: {
                    title: '巅峰案例详情'
                }
            },
            {
                path: 'introduce_h5/2',
                name: 'case_h5',
                component: case_h5,
                meta: {
                    title: '巅峰案例'
                }
            },
            {
                path: 'business_h5',
                name: 'business_h5',
                component: business_h5,
                meta: {
                    title: '业务详情'
                }
            },
            {
                path: 'viewpoint_h5',
                name: 'viewpoint_h5',
                component: viewpoint_h5,
                meta: {
                    title: '巅峰著作'
                }
            },
            {
                path: 'pointDetail_h5',
                name: 'pointDetail_h5',
                component: pointDetail_h5,
                meta: {
                    title: '详情'
                }
            },
            {
                path: 'introduce_h5/3/0',
                name: 'point_h5',
                component: point_h5,
                meta: {
                    title: '巅峰观点'
                }
            },
            {
                path: 'introduce_h5/3/1',
                name: 'work_h5',
                component: work_h5,
                meta: {
                    title: '专业著作'
                }
            },
            {
                path: 'introduce_h5/5',
                name: 'us_h5',
                component: us_h5,
                meta: {
                    title: '联系我们'
                }
            },
            {
                path: 'introduce_h5/5/1',
                name: 'law_h5',
                component: law_h5,
                meta: {
                    title: '关于我们'
                }
            },


            // 走进巅峰-巅峰介绍
            {
                path: 'peakIntroduction/:id',
                name: 'peakIntroduction',
                component: peakIntroduction,
            },

            // 走进巅峰-巅峰团队
            {
                path: 'peakTeam/:id',
                name: 'peakTeam',
                component: peakTeam,
                meta: {
                    title: "巅峰团队"
                },
            },
            // 走进巅峰-巅峰团队详情
            {
                path: 'peakTeamDetail/:id',
                name: 'peakTeamDetail',
                component: peakTeamDetail,
            },
            // 走进巅峰-巅峰要闻
            {
                path: 'topNews/:id',
                name: 'topNews',
                component: topNews,
                meta: {
                    title: "巅峰要闻"
                },
                children: [{
                    path: '/',
                    name: 'newsIndex',
                    component: newsIndex,
                    meta: {
                        title: "巅峰要闻"
                    }
                }, {
                    path: 'newsDetail/:id',
                    name: 'newsDetail',
                    component: newsDetail,
                    meta: {
                        title: "详情"
                    }
                }]
            },
            // 走进巅峰-巅峰风采
            {
                path: 'peakStyle/:id',
                name: 'peakStyle',
                component: peakStyle,
            },
            // 走进巅峰-合作伙伴
            {
                path: 'cooperativePartner/:id',
                name: 'cooperativePartner',
                component: cooperativePartner,
            },
            // 走进巅峰-产业联盟
            {
                path: 'industrialAlliance/:id',
                name: 'industrialAlliance',
                component: industrialAlliance,
            },
            // 巅峰业务
            {
                path: 'peakBusiness/:id',
                name: 'peakBusiness',
                component: peakBusiness,
            },
            // 巅峰案例
            {
                path: 'peakCases/:id',
                name: 'peakCases',
                component: peakCases,
            },
            // 巅峰案例-详情
            {
                path: 'peakCasesDetail/:id',
                name: 'peakCasesDetail',
                component: peakCasesDetail,
            },
            // 巅峰观点-行业观点
            {
                path: 'peakView/:id',
                name: 'peakView',
                component: peakView,
            },
            // 巅峰观点-行业观点详情
            {
                path: 'peakViewDetail/:id',
                name: 'peakViewDetail',
                component: peakViewDetail,
            },
            // 巅峰观点-专业著作
            {
                path: 'professionalWorks/:id',
                name: 'professionalWorks',
                component: professionalWorks,
            },
            // 巅峰观点-专业著作详情
            {
                path: 'professWorksDetail/:id',
                name: 'professWorksDetail',
                component: professWorksDetail,
            },
            //法律声明
            {
                path: 'legalDeclaration',
                name: 'legalDeclaration',
                component: legalDeclaration,
            },
            //联系我们
            {
                path: 'contactUs/:id',
                name: 'contactUs',
                component: contactUs,
            },
            //网站地图
            {
                path: 'siteMap',
                name: 'siteMap',
                component: siteMap,
            },
            //搜索
            {
                path: 'queryResults/:id',
                name: 'queryResults',
                component: queryResults,
            },
            // {
            //
            // }

        ],

    },

]
export default new VueRouter({
        mode: 'history', // 去掉url中的#
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })
    // const router = new VueRouter({
    //     mode: 'history',
    //     base: process.env.BASE_URL,
    //     routes
    // })

// router.beforeEach((to,from,next)=>{

//   })

// export default router
