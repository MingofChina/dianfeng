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
import topNews from '../views/intoThePeak/topNews.vue'
import peakStyle from '../views/intoThePeak/peakStyle.vue'
import cooperativePartner from '../views/intoThePeak/cooperativePartner.vue'
import professionalWorks from '../views/peakView/professionalWorks.vue'
import industrialAlliance from '../views/intoThePeak/industrialAlliance.vue'
import legalDeclaration from '../views/contactUs/legalDeclaration.vue'
import contactUs from '../views/contactUs/contactUs.vue'
import siteMap from '../views/contactUs/siteMap.vue'
import peakViewDetail from '../views/peakView/peakViewDetail.vue'
import queryResults from '../views/contactUs/queryResults.vue'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/',
        name: 'home',
        component: home,
        redirect:'index',
        children:[
            // 首页
            {
                path:'index',
                name:'index',
                component:index,
            },
            // 走进巅峰-巅峰介绍
            {
                path:'peakIntroduction/:id',
                name:'peakIntroduction',
                component:peakIntroduction,
            },
            // 走进巅峰-巅峰团队
            {
                path:'peakTeam/:id',
                name:'peakTeam',
                component:peakTeam,
            },
             // 走进巅峰-巅峰要闻
             {
                path:'topNews/:id',
                name:'topNews',
                component:topNews,
            },
             // 走进巅峰-巅峰风采
             {
                path:'peakStyle/:id',
                name:'peakStyle',
                component:peakStyle,
            },
             // 走进巅峰-合作伙伴
             {
                path:'cooperativePartner/:id',
                name:'cooperativePartner',
                component:cooperativePartner,
            },
             // 走进巅峰-产业联盟
             {
                path:'industrialAlliance/:id',
                name:'industrialAlliance',
                component:industrialAlliance,
            },
            // 巅峰业务
            {
                path:'peakBusiness/:id',
                name:'peakBusiness',
                component:peakBusiness,
            },
            // 巅峰案例
            {
                path:'peakCases/:id',
                name:'peakCases',
                component:peakCases,
            },
            // 巅峰观点-行业观点
            {
                path:'peakView/:id',
                name:'peakView',
                component:peakView,
            },
            // 巅峰观点-行业观点
            {
                path:'peakViewDetail/:id',
                name:'peakViewDetail',
                component:peakViewDetail,
            },
            // 巅峰观点-专业著作
            {
                path:'professionalWorks/:id',
                name:'professionalWorks',
                component:professionalWorks,
            },
            //法律声明
            {
                path:'legalDeclaration',
                name:'legalDeclaration',
                component:legalDeclaration,
            },
            //联系我们
            {
                path:'contactUs',
                name:'contactUs',
                component:contactUs,
            },
            //网站地图
            {
                path:'siteMap',
                name:'siteMap',
                component:siteMap,
            },
            //搜索
            {
                path:'queryResults/:id',
                name:'queryResults',
                component:queryResults,
            },
            //搜索
            {
                path:'queryResults',
                name:'queryResults',
                component:queryResults,
            },
        ]
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