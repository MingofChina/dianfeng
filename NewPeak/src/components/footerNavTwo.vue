<template>
    <div class="containerNAv">
        <div class="arrlist">
            <div class="typearea">
                <div class="finish-1">
<!--                    <div class="arrlist-1">-->
<!--                        <div v-for="(itemd,index1) in top" :key="itemd.id" class="zuoce">-->
<!--                            <h2 v-if="itemd.name!='联系我们'" class="divhover">{{ itemd.name }}</h2>-->
<!--                            <h2 v-else @click="tositeMap" class="divhover">网站地图</h2>-->
<!--                            <li v-show='index1 != top.length -1' v-for="(itemds,index) in itemd.child_column" :key="itemds.id" @click="footNavfn(itemds,index,index1)" class="divhover" style="white-space:nowrap;">-->
<!--                                {{ itemds.name }}-->
<!--                            </li>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="arrlist-2">
                        <div class="second">
                            <div class="liebiao-1">
                            <span>
                                <img style="width: 1rem;height: 1rem" src="../assets/img/icon_the phone@2x.png" alt=""/>
                            </span>
                                <span style="font-size: 12px">服务热线</span>
                                <h2>{{ bottom.company_phone }}</h2>
                            </div>
                            <div class="liebiao-1">
                            <span>
                                <img style="width: 1rem;height: 1rem" src="../assets/img/icon_the phone@2x.png" alt=""/>
                            </span>
                                <span style="font-size: 12px">服务热线</span>
                                <h2>{{ bottom.free_phone }}</h2>
                            </div>
                        </div>
                        <div style="white-space:nowrap;">
                            <ul>
                                <li>
                                    <img :src="baseUrl+bottom.applet_url" alt="" />
                                    <p>关注小程序</p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <img :src="baseUrl+bottom.video_number_url" alt="" />
                                    <p>关注视频号</p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <img :src="baseUrl+bottom.public_number_url" alt="" />
                                    <p>关注公众号</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="finish-2">
                    <div class="fin-2-left" >
                        <div class="fin-2-right divhover">法律声明</div>
                        <div class="base">{{ bottom.meta_copyright }}</div>
                        <div class="baseInfo">
                            <div class=" divhover" @click="ulrHref(1)">{{ bottom.icp_number }}</div>
                            <div class=" divhover" @click="ulrHref(2)">{{ bottom.legal_counsel }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { column, BottomMessage } from "@/api/api";
    export default {
        data() {
            return {
                top: [],
                bottom: [], //底部导航信息数据
                baseUrl:'http://ceshi.davost.com'
            };
        },

        created() {
            this.columnfn();
            this.BottomMessagefn(); ///底部導航信息
        },
        methods: {
            topFn(){
                document.documentElement.scrollTop = 0
            },
            // 底部导航信息
            async BottomMessagefn() {
                let { data } = await BottomMessage({id:45});
                this.bottom = data.data;
            },
            ulrHref(data){
                if(data == 1) {
                    location.href = 'https://beian.miit.gov.cn/'
                }else{
                    location.href = 'https://www.jtnfa.com/'

                }
            },
            tositeMap(){
                // this.$router.push("/siteMap") ;
                let routeUrl = this.$router.resolve({
                    path: `/siteMap`
                });
                window.open(routeUrl.href, '_blank');
            },
            routerFn(){
                // this.$router.push("/legalDeclaration") ;
                let routeUrl = this.$router.resolve({
                    path: `/legalDeclaration`
                });
                window.open(routeUrl.href, '_blank');
            },
            // 底部导航信息
            async columnfn() {
                let { data } = await column();
                this.top = data.data;
                // console.log(this.top);
            },
            footNavfn(data,index,index1){
                if(index1 == 1){
                    // this.$router.push(`/peakBusiness/${data.childcontent[0].id}`) ;
                    let routeUrl = this.$router.resolve({
                        path: `/peakBusiness/${data.childcontent[0].id}`
                    });
                    window.open(routeUrl.href, '_blank');
                    return
                }else if(index1 == 2){
                    sessionStorage.setItem('peakCasesId',data.id)
                    // this.$router.push(`/peakCases/${data.id}`)
                    let routeUrl = this.$router.resolve({
                        path: `/peakCases/${data.id}`
                    });
                    window.open(routeUrl.href, '_blank');
                }else if(index1 == 4){

                }else{
                    if(index1 == 0 && index == 5){
                        location.href = data.url
                    }else{
                        // this.$router.push(`/${data.url}/${data.id}`) ;
                        let routeUrl = this.$router.resolve({
                            path: `/${data.url}/${data.id}`
                        });
                        window.open(routeUrl.href, '_blank');
                    }

                }

            },
        },
    };
</script>

<style  scoped lang="less">

    .divhover:hover{
        color: #C8000A;
    }
    .zuoce{
        font-size: .9rem;
    }
    .containerNAv{
        width: 100%;
        height: 31.875rem;
        background-color: #000000;
        position: relative;
        z-index: 99;
    }
    .arrlist {
        width: 100%;
        background-color: #000000;
        // background-color: #fff;
    }
    .finish-1 {
        width: 85%;
        margin: 0 auto;
        /*padding-left: 1rem;*/
        /*padding-top:1.875rem;*/
        display: flex;
    }
    .arrlist-2 {
        color: #ffff;

    }
    .arrlist-2 div ul {
        display: inline-block;
        padding: 0;
    }
    .arrlist-2 div ul li {
        list-style: none;
        text-align: left;
        font-size: 20px;
        color: #fff;
        margin-right: 1.875rem;
    }
    .arrlist-2 div ul li img {
        width: 8.875rem;

    }
    .arrlist-2 div ul li p {
    }
    .position {
        box-sizing: border-box;

    }
    .second{
        display: flex;
        justify-content: space-between;
    }
    .second div {
        display: inline-block;
        margin-top: 3.5rem;
    }
    .liebiao-1 {
        box-sizing: border-box;
        margin-right: 2.625rem;

    }
    .liebiao-1 h2{
        color: #d2d2d2;
        /*width: 133px;*/
        margin-top: .75rem;
        font-size: 1.25rem;
    }
    .liebiao-1 img {
        width: 1rem;
        margin-right: .25rem;
    }
    .liebiao-2 {
        box-sizing: border-box;

    }
    .arrlist-1 div h2 {
        color: #d2d2d2;
    }
    .finish-2 {
        display: flex;
        margin-top: 2.5rem;
        color: #FFFFFF;
        line-height: 6.875rem;
        border-top: 1px solid #FFFFFF;
        padding-left:2rem;
        padding-bottom: 1rem;
    }
    .fin-2-left {
        /*display: flex;*/
        list-style: none;
        /*text-align: center;*/
        width: 85%;
    }
    .fin-2-left div {
        margin-top: 2rem;
        line-height: 1rem;
        /*margin-right: 1.6875rem;*/

    }
    .fin-2-left .base {
        text-align: center;
        width: 35.4375rem;
        margin-top: 2rem;
        line-height: 1rem;
        font-size: 0.625rem;
        color: rgba(255,255,255,0.5);
        /*margin-right: 1.6875rem;*/
    }
    .fin-2-left .baseInfo {
        display: flex;
        justify-content: space-around;
        /*margin-left: 0.3rem;*/
        margin: 0 0 0 1.35rem;
        color: rgba(255,255,255,0.5);
    }
    .fin-2-right {
        text-align: left;
        color: rgba(255,255,255,0.5);
        font-size: 1rem;
    }
</style>