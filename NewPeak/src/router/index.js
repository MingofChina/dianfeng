// import { from } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import index from '../views/index.vue'
import peakIntroduction from '../views/intoThePeak/peakIntroduction.vue'
import peakBusiness from '../views/peakBusiness/peakBusiness.vue'
import peakCases from '../views/peakCases/peakCases.vue'
import peakView from '../views/peakView/peakView.vue'
import peakTeam from '../views/intoThePeak/peakTeam.vue'
import peakTeamDetail from '../views/intoThePeak/peakTeamDetail.vue'
import topNews from '../views/intoThePeak/topNews.vue'
import peakStyle from '../views/intoThePeak/peakStyle.vue'
import cooperativePartner from '../views/intoThePeak/cooperativePartner.vue'
import professionalWorks from '../views/peakView/professionalWorks.vue'
import industrialAlliance from '../views/intoThePeak/industrialAlliance.vue'
import legalDeclaration from '../views/contactUs/legalDeclaration.vue'
import newsIndex from '../views/intoThePeak/newsDetails/newsIndex.vue'
import newsDetail from '../views/intoThePeak/newsDetails/newsDetail.vue'

Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'home',
        component: home,
        redirect: 'index',
        meta: {
            title: "首页"
        },
        children: [
            // 首页
            {
                path: 'index',
                name: 'index',
                component: index,
                meta: {
                    title: "首页"
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
            // 巅峰观点-行业观点
            {
                path: 'peakView/:id',
                name: 'peakView',
                component: peakView,
            },
            // 巅峰观点-专业著作
            {
                path: 'professionalWorks/:id',
                name: 'professionalWorks',
                component: professionalWorks,
            },
            //法律声明
            {
                path: 'legalDeclaration',
                name: 'legalDeclaration',
                component: legalDeclaration,
            },
        ]
    },

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to,from,next)=>{

//   })

export default router