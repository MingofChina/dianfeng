<template>
  <div id="app">
    <div class="introduce-background">
        <div class="introduce-title">
          巅峰介绍
        </div>
        <div class="introduce-title2">
          THE PEAK IS INTRODUCED
        </div>
      <div class="introduce-divide"></div>
      <img class="icon-home"  src = "../../assets/bei/icon_home.png"/>
      <img class="icon-jiantou1" src = "../../assets/bei/icon.png"/>
      <div class="link1">
          走进巅峰
      </div>
      <img class="icon-jiantou2" src = "../../assets/bei/icon.png"/>
      <div class="link2">巅峰介绍</div>
        <div class="top-card">
          <div class="chuangli">创立</div>
          <div class="data1">{{brand_messa.found_years}}</div>
          <div class="suffix1">年</div>
          <div class="desc1">文旅行业实践者</div>
          <div class="wanchengxiangmu">完成项目</div>
          <div class="data2">{{brand_messa.finish_projects}}</div>
          <div class="suffix2">+</div>
          <div class="desc2">美丽中国价值经典</div>
          <div class="yunyingjingqu">运营景区</div>
          <div class="data3">{{brand_messa.scenic_spot_num}}</div>
          <div class="suffix3">+</div>
          <div class="desc3">专业运营旅游景区</div>
          <div class="ronghuojiangxiang">荣获奖项</div>
          <div class="data4">{{brand_messa.member_num}}</div>
          <div class="suffix4">+</div>
          <div class="desc4">国内外奖项获得者</div>
          <div class="gugan">骨干员工近</div>
          <div class="data5">{{brand_messa.peak_introduce}}</div>
          <div class="desc5">业界骨干创意精英</div>
        </div>
      </div>
    <div class="introduce2-background">
      <div class="introduce2-title">
        巅峰介绍
      </div>
      <div class="about-us">
        ABOUT US
      </div>
      <div class="introduce2-content1">
        北京巅峰智业旅游文化创意股份有限公司始创于2001年，目前已发展成为中国旅游规划行业的头部企业、文旅产业的创新引领者和开拓者，提出了 “规划设计、落地建设、产品打造、运营管理”四位一体全链服务战略，为客户提供文旅产业创新发展线上线下一站式解决方案。
      </div>
      <div class="introduce2-content2">
        作为文旅规划建设运营全程服务商，巅峰智业资质全面, 拥有旅游规划设计甲级、城乡规划编制甲级、风景园林工程设计专项甲级、城市及道路照明工程专业承包壹级、专业舞台灯光设计、安装及调试甲级，专业舞台设计制作工程甲级，专业舞台音视频设计、安装及调试甲级，专业舞台音响设计、安装及调试甲级的“八项甲级”资质；业务覆盖全国，完成3000余项高品质项目，累计运管景区100余家，在1000余项国际、国内项目竞标中拔得头筹。创新推出安庆太湖文博园《天仙配新传》、张家口下花园《西游归来》、济南大石崮《好汉山东》等“巅峰震撼”系列光影剧强势新IP，其中《天仙配新传》还作为安庆文旅新名片，被央视新闻联播重点报道。《顺德华侨城空间秀》等系列夜游目的地新地标，已成为年轻人喜爱的网红打卡地。此外，还推动了松鼠森林、绿心童乡、欢乐星球、峰物文创、旅豆学堂等一系列落地产品。
      </div>
      <div class="introduce2-video">
        <video ref="videoPlayer" controls :src=brand_messa.peak_video  controlslist="nodownload"

               :class="['porel','fullwidth','mal','fla','mat','movie-show-video']"
               style="width: 100%; height: 100%; object-fit: fill">
        </video>
      </div>
    </div>
    <div class="introduce3-background">
      <div class="introduce3-title">
        巅峰旗下品牌
      </div>
      <div class="introduce3-list">
        <div class="introduce3-item" v-for="(item,i) in brand_slogan" >
          <div class="introduce3-item-row">
            <img class="introduce3-item-logo" src="item.logo" />
            <div
                v-if="i == currentBrandIndex? false: true"
                class="introduce3-item-slogan"
            >{{item.brand_slogan}}</div>
            <img
                v-if="i == currentBrandIndex? true: false"
                class="introduce3-item-btn1"
                src="../../assets/mines/icon_shut down@2x.png"
                v-on:click="closeBrand(i)"
            />
            <img
                v-if="i == currentBrandIndex? false: true"
                class="introduce3-item-btn2" src="../../assets/presentation/icon_xiala@2x.png"
                v-on:click="openBrand(i)"
            />
          </div>

          <div
              v-if="i == currentBrandIndex? true: false"
              class="introduce3-item-brief">
            {{ item.small_descrip }}
          </div>

          <div
              v-if="i == currentBrandIndex? true: false"
              class="introduce3-item-summary">
            {{ item.summary}}
          </div>
          <div class="introduce3-divide"></div>

        </div>
      </div>

    </div>
    <div class="introduce4-background">
      <div class="introduce4-title">
        大事记
      </div>
      <div class="introduce4-time">
        {{currentYear}}年
      </div>
      <div class="introduce4-content">
        {{ currentDate.title}}
      </div>
      <div class="introduce4-img">
        <img src="currentDate.original_image"/>
      </div>



      <div class="introduce4-y-time-list">
        <div class="introduce4-y-time-item" v-for="(item,i) in filter_dates" >
            <div class="introduce4-y-item-date" v-on:click="changeDate(item.addtime)">{{item.addtime}}</div>
        </div>
      </div>

      <div class="introduce4-x-time-list">
        <div class="introduce4-x-time" v-for="(item,i) in filter_memorabilia" :key="item.year"
             v-on:click="changeYear(item.year)">
          {{item.year}}
        </div>
      </div>

      <div class="introduce4-y-line">
      </div>
      <div class="introduce4-to-down" v-on:click="toDown4()">
      </div>
      <div class="x-dot1"></div>
      <div class="x-dot2"></div>
      <div class="x-dot3"></div>
      <div class="x-dot4"></div>
      <div class="x-dot5"></div>
      <div class="x-dot6"></div>
      <div class="x-dot7"></div>

      <div class="introduce4-left-and-right">
      <div class="introduce4-to-left" v-on:click="toLeft4()">
      </div>
      <div class="introduce4-to-right" v-on:click="toRight4()">
      </div>
      <div class="introduce4-divider">
      </div>
      </div>
    </div>
    <div class="introduce5-background">
      <div class="introduce5-title">
        资质荣誉
      </div>
      <div class="introduce5-zizhi">
        企业资质
      </div>
      <div class="introduce5-list">
        <div class="introduce5-item" v-for="(item,i) in filter_enterprise_qualification" :key="item.id">
          <img class="introduce5-image" src="item.original_image">
          <div class="introduce5-item-title">{{item.title}}</div>
        </div>
      </div>
      <div class="introduce5-to-left" v-on:click="toLeft5()">
      </div>
      <div class="introduce5-to-right" v-on:click="toRight5()">
      </div>
    </div>
    <div class="introduce6-background">
      <div class="introduce6-title">
        荣誉证书
      </div>
      <div class="introduce6-list">
        <div class="introduce6-item" v-for="(item,i) in filter_certificate_honor" :key="item.id">
          <img class = "introduce6-image" src="item.original_image">
        </div>
      </div>
      <div class="introduce6-to-left" v-on:click="toLeft6()">
      </div>
      <div class="introduce6-to-right" v-on:click="toRight6()">
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      "currentBrandIndex":0,
      "currentDate":{},
      "currentYear":2020,
      "memorabilia_dates":[],
      "filter_dates":[],//月份
      "date_filter_number":1,//切换月份
      "filter_certificate_honor":[],
      "qualification_filter_number":1,//切换荣誉图片
      "filter_enterprise_qualification":[],
      "honor_filter_number":1,//切换资质图片
      "filter_memorabilia":[],//大事件年份
      "memorabilia_filter_number":1,//切换大事件年份
      "brand_messa": {
        "found_years": "21",
        "finish_projects": "3000",
        "scenic_spot_num": "100",
        "prize_num": "100",
        "member_num": "1000",
        "peak_introduce": "132456",
        "peak_video": "/uploads/20220318/138e11e208b20da75b55094950f551a9.mp4"
      },
      "brand_slogan": [
        {
          "logo": "/corporation/davost.png",
          "brand_slogan": "巅峰智业",
          "small_descrip": "这是巅峰智业",
          "summary": "北京巅峰智业旅游文化创意股份有限公司始创于2001年，目前已发展成为中国旅游规划行业的头部企业、文旅产业的创新引领者和开拓者，提出了 “规划设计、落地建设、产品打造、运营管理”四位一体全链服务战略，为客户提供文旅产业创新发展线上线下一站式解决方案。"
        },
        {
          "logo": "/corporation/aftrip.png",
          "brand_slogan": null,
          "small_descrip": null,
          "summary": "　　北京达沃斯巅峰旅游投资管理有限公司(简称巅峰旅投)成立于2002年，是巅峰智业旗下的全资子公司。\r  巅峰旅投作为国内知名的旅游投资运营综合服务商，一直致力于旅游景区的投资运营，创造了享誉业界的“投”、“建”、“运”(投资、建设、运营)全程服务的“巅峰模式”，为景区提供专业化、标准化、品牌化的连锁运营服务。"
        },
        {
          "logo": "/corporation/smarttourism.png",
          "brand_slogan": null,
          "small_descrip": null,
          "summary": "北京巅峰美景科技有限责任公司(简称巅峰美景)成立于2008年，是巅峰智业旗下的全资子公司。\r　　巅峰美景是一家专注于旅游营销和智慧旅游的创新型服务企业。公司总部设于北京，汇集众多来自国内外知名的行业专家与业界精英。参与编撰了多项国家及地方行业标准，是构建“智慧旅游”规划与设计蓝图的高科技企业。"
        },
        {
          "logo": "/corporation/ctv.png",
          "brand_slogan": null,
          "small_descrip": null,
          "summary": "北京中视巅峰光影科技有限公司，由北京巅峰智业旅游文化创意股份有限公司和北京中视光影灯光设计有限公司联合成立。"
        },
        {
          "logo": "/corporation/hqc.png",
          "brand_slogan": null,
          "small_descrip": null,
          "summary": ""
        }
      ],
      "memorabilia": [
        {
          "year": "2020",
          "child": [
            {
              "title": "旅豆学堂公益课堂服务客户2000余家，知识覆盖12万用户",
              "addtime": "02-18",
              "original_image": "/memorabilia/gallery/2020/0612/lb9is45kjfbs6sg.jpg"
            },
            {
              "title": "多部巅峰震撼光影剧成功落地，取得良好观众反馈和极佳社会效应",
              "addtime": "03-01",
              "original_image": "/memorabilia/gallery/2020/0612/ihnd9vfce4pqbbd.jpg"
            },
            {
              "title": "连续举办线上巅峰大会，助力文旅产业疫后提振",
              "addtime": "05-15",
              "original_image": "/memorabilia/gallery/2020/0612/phcwnmgy2uv3s6p.jpg"
            },
            {
              "title": "直击文旅痛点，共论大运营之道|第六届中国文旅产业巅峰大会圆满落幕",
              "addtime": "10-18",
              "original_image": "/memorabilia/gallery/2020/1103/kagpitrerny6wvm.jpg"
            }
          ]
        },
        {
          "year": "2019",
          "child": [
            {
              "title": "主题为“唤心逐梦 笑傲巅峰”的巅峰智业2018年度年会盛典，在北京新云南皇冠假日酒店顺利举办。",
              "addtime": "01-15",
              "original_image": "/memorabilia/gallery/2019/1216/x00cctdwcwxhop1.jpg"
            },
            {
              "title": "由巅峰智业助力创建的“湖北三国赤壁古战场”国家AAAAA级旅游景区于当日正式挂牌，巅峰智业董事长束盈受邀参加揭牌仪式。",
              "addtime": "01-18",
              "original_image": "/memorabilia/gallery/2019/1216/ksdkromtxbgqjpo.png"
            },
            {
              "title": "由新旅界主办的“第三届中国文旅产业年会暨2018中国文旅风尚榜”颁奖盛典在海南三亚举行，刘锋博士被评为“2018中国文旅十大商业领袖”，巅峰智业荣获 “2018最佳文旅产业服务商” 入围奖。",
              "addtime": "04-11",
              "original_image": "/memorabilia/gallery/2019/1216/2sxxbfhr2hhrtjr.png"
            },
            {
              "title": "5月8日，2019 IAI国际创享节暨第19届IAI国际广告奖颁奖盛典隆重召开，巅峰美景凭借《南昌旅游海外品牌形象宣传片》荣获第19界IAI国际广告奖优秀奖。",
              "addtime": "05-08",
              "original_image": "/memorabilia/gallery/2019/1216/at24azhru8shleb.png"
            },
            {
              "title": "以“智慧旅游 让生活更美好”为主题的2019云南国际智慧旅游大会在昆明召开。巅峰智业受云南省文化和旅游厅邀请，作为文旅产业创新引领者，参加了“2019年云南国际智慧旅游大会”及“主题展览”。",
              "addtime": "05-21",
              "original_image": "/memorabilia/gallery/2019/1216/mlldktkxzdvobox.png"
            },
            {
              "title": "5月23日，2019第四届中国文旅产业巅峰大会开幕式暨夜游巅峰论坛在张家口下花园顺利举行，期间，中国文旅夜游经济联盟正式成立。",
              "addtime": "05-23",
              "original_image": "/memorabilia/gallery/2019/1216/1lloij1mtpb46tz.png"
            },
            {
              "title": "由巅峰智业、华侨城旅投集团联合主办的“2019第四届文旅产业巅峰大会“在北京成功举办。",
              "addtime": "05-24",
              "original_image": "/memorabilia/gallery/2019/1216/akksisfbhykmina.png"
            },
            {
              "title": "由中共中央组织部委托文化和旅游部举办的地方党政领导干部文旅融合与产业发展专题研究班在北京开班，期间前往国家文化产业示范基地巅峰智业北京总部进行现场教学。",
              "addtime": "07-16",
              "original_image": "/memorabilia/gallery/2019/1216/tgev0jpa3accci5.jpg"
            },
            {
              "title": "由巅峰智业主办的【巅峰荟】暨“第一期旅游文创产业研习课堂“圆满结束，巅峰智业文创事业部总裁吴晖、巅峰智业旅豆学堂项目负责人钱明与到场嘉宾共同探讨旅游文创产业的创新商业模式，打造属于企业自身的IP文创产品。",
              "addtime": "07-25",
              "original_image": "/memorabilia/gallery/2019/1216/nn5wh0xkdmfoqxc.jpg"
            },
            {
              "title": "“心怀天下•行者无疆”郭来喜先生学术报告会暨“85华诞庆生日会“在巅峰智业总部顺利举行，巅峰智业创始人、华侨城旅投董事长刘锋博士，巅峰智业董事长束盈和公司全体在京同仁，共同祝贺郭来喜先生85华诞。",
              "addtime": "07-26",
              "original_image": "/memorabilia/gallery/2019/1216/eqevwrcpp1l5jib.jpg"
            },
            {
              "title": "第七期全国文化和旅游厅局长、第十四期全国地市文化和旅游局长和第二十二期全国县市文化和旅游局长“不忘初心、牢记使命”主题教育专题培训班在京举办，现场教学环节，走进巅峰智业北京总部了解文旅业界的新融合、新科技。",
              "addtime": "08-26",
              "original_image": "/memorabilia/gallery/2019/1216/adjpq35oiwvucac.jpg"
            },
            {
              "title": "9月19日，由安徽出版集团投资3.5亿倾情打造，巅峰智业、中视巅峰历经2年精心打磨的实景光影剧5.0产品《巅峰震撼-天仙配新传》在安庆太湖五千年文博园正式内部试演。这张专属于安庆的“文化名片”的正式亮相，展示了传统文化+科技+旅游所带来的震撼魅力。",
              "addtime": "09-19",
              "original_image": "/memorabilia/gallery/2019/1216/hxeexzpdmvjqmdn.jpg"
            },
            {
              "title": "首批国家全域旅游示范区名单正式公布。巅峰智业在国家标准指导下，为江西省抚州市资溪县、新疆维吾尔自治区巴音郭楞蒙古自治州博湖县、浙江省衢州市江山市、内蒙古呼伦贝尔市满洲里市和重庆市巫山县等20家相关市、县的创建工作提供过全域旅游规划或创建辅导",
              "addtime": "09-25",
              "original_image": "/memorabilia/gallery/2019/1216/fozjzcowvzkavec.jpg"
            },
            {
              "title": "“匠心筑梦 巅峰共赢”巅峰智业十八周年庆典暨景区赋能转型及夜游经济发展研讨会在北京隆重举行。",
              "addtime": "10-25",
              "original_image": "/memorabilia/gallery/2019/1216/5s9lkukszleqorh.jpg"
            },
            {
              "title": "第三届紫禁城巅峰文旅论坛暨2019劲旅峰会在北京皇家菜博物馆隆重举行，巅峰智业及旗下子公司巅峰旅投和初到科技受邀出席活动，并荣获了年度智慧文旅劲旅奖。",
              "addtime": "11-27",
              "original_image": "/memorabilia/gallery/2019/1216/gfcq0jels7lvths.jpg"
            },
            {
              "title": "2019中国旅游集团发展论坛在京开幕，巅峰智业创始人刘锋博士受邀参加论坛，并作为业界专家参与“数字化时代的旅游业”圆桌对话。",
              "addtime": "12-15",
              "original_image": "/memorabilia/gallery/2019/1216/gw5m0lrs53mvh6x.jpg"
            }
          ]
        },
        {
          "year": "2018",
          "child": [
            {
              "title": "巅峰智业与中国中车集团旗下两家成员企业中车城市交通有限公司、株洲中车特种装备科技有限公司，共同签订了旅游项目合作框架协议。",
              "addtime": "01-11",
              "original_image": "/memorabilia/gallery/2018/0313/ryedvdzidhylcub.jpg"
            },
            {
              "title": "由巅峰智业协办的“中国景区联盟培训A系列暨大目的地营销峰会”在北京召开。",
              "addtime": "01-15",
              "original_image": "/memorabilia/gallery/2018/0313/g9dqghlhblvpftg.jpg"
            },
            {
              "title": "刘锋博士喜获“2017新旅界特约评论员”、 “2017中国旅游十大商业领袖人物”双料大奖，巅峰智业斩获2017年度中国文旅产业总榜“最佳旅游产业服务商”奖项!",
              "addtime": "01-24",
              "original_image": "/memorabilia/gallery/2018/0313/shootcmwo90doy2.jpg"
            },
            {
              "title": "巅峰智业2018“锦绣巅峰芳华绽放”民国风主题年会璀璨盛放。",
              "addtime": "02-01",
              "original_image": "/memorabilia/gallery/2018/0313/ukgi5oy5ztsnlnn.jpg"
            },
            {
              "title": "第七届“艾蒂亚奖”金奖名单揭晓，巅峰智业创始人刘锋博士荣获“2017中国旅游投资十大先锋人物奖”。",
              "addtime": "02-01",
              "original_image": "/memorabilia/gallery/2018/0313/oqjiccsqkbcmfes.jpg"
            },
            {
              "title": "巅峰智业受邀出席“2018中国地产•金融大会、第八届中国地金联盟年会、中国特色小镇联盟峰会暨第四届华表奖颁奖盛典”，并获颁“中国特色小镇联盟副理事长单位”，创始人刘锋博士受聘为中国特色小镇联盟专家委员会委员。",
              "addtime": "03-07",
              "original_image": "/memorabilia/gallery/2018/1108/eylsiwhipzqpykt.jpg"
            },
            {
              "title": "2018全域旅游年乡村振兴发展高峰论坛，巅峰智业获得新丰县“旅游扶贫先行标杆单位”荣誉，中共韶关市委副书记、新丰县委书记陈波为巅峰智业授牌，创始人刘锋博士代表巅峰智业接受荣誉。",
              "addtime": "03-22",
              "original_image": "/memorabilia/gallery/2018/1108/eyebpuuhprgig9c.jpg"
            },
            {
              "title": "第三届中国文旅产业巅峰大会暨产业资源链接博览会在北京震撼开场。",
              "addtime": "05-11",
              "original_image": "/memorabilia/gallery/2018/1108/vcpe531fnthghvo.jpg"
            },
            {
              "title": "第三届赶潮谋变中国文旅大消费创新峰会上，巅峰智业作为旅游扶贫标杆示范单位，荣获中国旅游扶贫联盟颁发的旅游扶贫荣誉企业称号，实是业界对巅峰智业多年扶贫工作的认可。",
              "addtime": "06-07",
              "original_image": "/memorabilia/gallery/2018/1108/lga1wmrvuvwpmey.jpg"
            },
            {
              "title": "海丝文旅产业联盟暨文旅专家智库在泉州成立，巅峰智业作为文旅产业创新引领者受邀成为联盟成员单位。",
              "addtime": "06-22",
              "original_image": "/memorabilia/gallery/2018/1108/iqguc2e79hk0h0s.jpg"
            },
            {
              "title": "巅峰智业《安吉灵峰国际养心小镇》和《郁孤台历史文化街区提升改造投资及运营管理》两大项目成功入选《2018文化产业项目手册》，成为国家文化和旅游部文化产业司重点指导宣传推介项目。",
              "addtime": "06-27",
              "original_image": "/memorabilia/gallery/2018/1108/usljax8ylofljx0.jpg"
            },
            {
              "title": "巅峰智业与新丰县人民政府在新丰县签订了《新丰黄磜全域旅游战略合作协议》，携手探索乡村振兴新丰模式。",
              "addtime": "07-03",
              "original_image": "/memorabilia/gallery/2018/1108/3raaqh01uuavdyk.jpg"
            },
            {
              "title": "中视巅峰打造的世界首部大型实景民族史诗光影秀《满秀》在承德宽城震撼公演，现场上千观看位座无虚席，视频直播观看人数突破13万人！",
              "addtime": "07-21",
              "original_image": "/memorabilia/gallery/2018/1108/zalwdgtnw9tjwip.jpg"
            },
            {
              "title": "麦盖提县旅游智力扶贫签约大会在新疆维吾尔自治区旅游发展委员会顺利举行，是巅峰智业为极度贫困地区实施的又一个旅游扶贫公益规划项目。",
              "addtime": "07-31",
              "original_image": "/memorabilia/gallery/2018/1108/pchvfpdb35btaiv.jpg"
            },
            {
              "title": "巅峰智业助推世界瓷都德化旅游资源对接会在德华顺利举办。",
              "addtime": "08-13",
              "original_image": "/memorabilia/gallery/2018/1108/egcdtlnqhsovfbj.jpg"
            },
            {
              "title": "巅峰智业协办新文旅50人论坛，总裁朱明辉发表了主题演讲",
              "addtime": "08-17",
              "original_image": "/memorabilia/gallery/2018/1108/m6zu4eklxbmzofw.jpg"
            },
            {
              "title": "由中视巅峰打造的夜游文旅爆品水塔激光秀实景演出——《巅峰震撼-西游归来》首演取得圆满成功。",
              "addtime": "08-21",
              "original_image": "/memorabilia/gallery/2018/1108/ello2m6gmfnucky.jpg"
            },
            {
              "title": "由巅峰智业支持举办的2018内蒙古首届旅游产业发展高峰论坛及呼包鄂旅游一体化发展峰会于9月2日-3日在内蒙古自治区包头市隆重举办。",
              "addtime": "09-04",
              "original_image": "/memorabilia/gallery/2018/1108/4j51kmglnol1ku5.jpg"
            },
            {
              "title": "巅峰智业作为文旅产业创新引领者受邀出席了“2018科睿国际创新节”，并荣获“年度创新影响力平台”和“品牌创新类·金奖”两项大奖。",
              "addtime": "09-11",
              "original_image": "/memorabilia/gallery/2018/1108/5r0in9cpoqpfe4h.jpg"
            },
            {
              "title": "十年磨一剑，今朝展新颜——巅峰旅投托管的天津杨柳青古镇景区国庆正式营业。",
              "addtime": "09-26",
              "original_image": "/memorabilia/gallery/2018/1108/d6wcrmrzlqp0w9o.jpg"
            },
            {
              "title": "十一假期巅峰旅投运营景区再创佳绩，接待游客量突破300万人次，同比增长60%；总营业收入近2亿元，同比增长92.05%。",
              "addtime": "10-08",
              "original_image": "/memorabilia/gallery/2018/1108/6pjz6pjn4bkloe6.jpg"
            },
            {
              "title": "刘锋博士受邀出席2018国际山地旅暨户外运动大会之文化旅游体育产业融合发展峰会，并担任嘉宾互动环节主持人。",
              "addtime": "10-16",
              "original_image": "/memorabilia/gallery/2018/1108/lzxadyune7gcrto.jpg"
            },
            {
              "title": "“唤心逐梦 为巅峰打call”2018巅峰智业十七周年庆典暨巅峰智业17周岁初心日活动在北京总部隆重举行。",
              "addtime": "10-23",
              "original_image": "/memorabilia/gallery/2018/1108/mwmwe91srcs7xxa.jpg"
            },
            {
              "title": "“唤心逐梦 为巅峰打call”2018巅峰智业十七周年庆典暨巅峰智业17周岁初心日活动在北京总部隆重举行。",
              "addtime": "10-23",
              "original_image": "/memorabilia/gallery/2019/1216/80xwc1qd6zo92lr.png"
            },
            {
              "title": "巅峰智业创新研究院聚焦“乡村振兴”国家战略，成功举行了《图解乡村振兴战略与旅游实践》一书首发仪式，献礼巅峰智业十七周岁，助力乡村振兴。",
              "addtime": "10-25",
              "original_image": "/memorabilia/gallery/2018/1108/5ldedy3kvqnkcnf.jpg"
            },
            {
              "title": "巅峰智业董事长束盈受邀出席“中国人寿郧西扶贫招商会”，并代表巅峰智业与郧西县人民政府签署《郧西县人民政府战略合作协议》，助力郧西县打赢扶贫攻坚战。",
              "addtime": "11-05",
              "original_image": "/memorabilia/gallery/2018/1108/ykiatmkikwldhhx.jpg"
            },
            {
              "title": "巅峰智业、实景高塔光影秀《巅峰震撼-西游归来》和郁孤台历史文化街区分别被评选为“2018旅游产业影响力的创新企业、2018旅游产业影响力的旅游演艺和2018旅游产业影响力的旅游策划规划项目”。",
              "addtime": "12-01",
              "original_image": "/memorabilia/gallery/2019/1216/mazctds4lyic2un.png"
            },
            {
              "title": "第四届“SportIN大会暨体育BANK颁奖盛典暨2018首都文创产业项目路演推介会”在北京开幕，巅峰智业创始人、华侨城旅游投资公司董事长刘锋博士特邀出席，并被聘为体银智库专家委员会委员。",
              "addtime": "12-10",
              "original_image": "/memorabilia/gallery/2019/1216/6zqu7lguo5ihpnj.png"
            },
            {
              "title": "第二届全经联特色小镇产业运营大会在广东省梅州市“中国•客天下”隆重召开，华侨城旅投集团董事长、巅峰智业创始人刘锋博士受邀出席，并被聘为客天下“乡镇城融合发展研究院”名誉院长",
              "addtime": "12-14",
              "original_image": "/memorabilia/gallery/2019/1216/jzi2ih2swtokcos.png"
            }
          ]
        },
        {
          "year": "2017",
          "child": [
            {
              "title": "“2017 Word巅峰就是不一样”主题年会",
              "addtime": "01-16",
              "original_image": "/memorabilia/gallery/2017/0118/h7x92scvt9rsbga.jpg"
            },
            {
              "title": "巅峰智业创始人刘锋博士入选财政部PPP专家库。",
              "addtime": "02-16",
              "original_image": "/memorabilia/gallery/2017/0216/fisxbyxdiod322y.jpg"
            },
            {
              "title": "巅峰智业联合主办的首届中国旅游投资领袖峰会暨第六届中国旅游投资艾蒂亚颁奖典礼圆满成功。",
              "addtime": "03-18",
              "original_image": "/memorabilia/gallery/2017/0705/jmxmyduml77sipu.jpg"
            },
            {
              "title": "巅峰智业联合主办的第二届中国特色小镇战略规划与投资论坛圆满成功。",
              "addtime": "03-27",
              "original_image": "/memorabilia/gallery/2017/0705/pktkfesjkexgzlg.jpg"
            },
            {
              "title": "巅峰智业携手知学学院举办的景区升级研讨会系列第三季“全域旅游与景区升级研讨会”圆满落幕。",
              "addtime": "05-26",
              "original_image": "/memorabilia/gallery/2017/0705/qinhcftoa5tb3r5.jpg"
            },
            {
              "title": "巅峰智业组建成立“景区巅峰荟”，整合从规划设计到产品落地的全产业链优质资源，共同为中国景区提质增效。",
              "addtime": "06-23",
              "original_image": "/memorabilia/gallery/2017/0705/zniwttdwgtbnvl5.jpg"
            },
            {
              "title": "巅峰智业联合东方资产和山水盛典，发起成立由20余家国内顶级文旅企业共同参与的资源整合平台，培育文旅商业联合生态圈，促进区域文旅产业发展和消费升级。",
              "addtime": "06-24",
              "original_image": "/memorabilia/gallery/2017/0707/qlr2dx6zw3jnimk.jpg"
            },
            {
              "title": "巅峰智业成功举办2017第二届中国文旅产业巅峰大会暨全域旅游峰会，围绕主题新思路•新机遇•新伙伴，开启全域旅游新格局。",
              "addtime": "06-24",
              "original_image": "/memorabilia/gallery/2017/0705/ns4nroimfocul0r.jpg"
            },
            {
              "title": "第二届国际乡村旅游大会在湖州举行，大会主体增加了中国乡村旅游产业巅峰大会版块。次日，由巅峰智业承办的中国“两山”乡村旅游大讲堂也在大会分会场安吉灵峰山景区隆重开幕!",
              "addtime": "07-17",
              "original_image": "/memorabilia/gallery/2018/0313/givw61rl1xtutdd.jpg"
            },
            {
              "title": "巅峰智业旗下中视巅峰光影公司打造的大型沉浸式灯光演艺秀“天海传奇”于连云港老街华丽盛放!",
              "addtime": "07-29",
              "original_image": "/memorabilia/gallery/2018/0313/54spyjry8e5nusl.jpg"
            },
            {
              "title": "巅峰智业旗下中视巅峰光影主创团队打造的大型实景沉浸体验光影秀《满秀》在宽城花溪城华丽首秀。",
              "addtime": "08-27",
              "original_image": "/memorabilia/gallery/2018/0313/hunptlzc8qswvy3.jpg"
            },
            {
              "title": "2017年全国旅游援藏工作会议授牌巴松措5A级旅游景区，巅峰智业作为巴松措风景旅游区创建5A整改提升与创意策划的规划设计单位，近四年来，完成编制《巴松措风景旅游区创建国家5A级旅游景区整改提升与创意策划》等系列创建成果资料和景区管理制度。",
              "addtime": "09-08",
              "original_image": "/memorabilia/gallery/2018/0313/sq1bruquncblmfj.jpg"
            },
            {
              "title": "2017山西省旅游发展大会在晋中召开。巅峰智业创始人刘锋博士作为山西省旅游发展专家咨询委员会委员受邀出席大会并发表主题演讲。",
              "addtime": "09-21",
              "original_image": "/memorabilia/gallery/2018/0313/vymksidojm8mzg9.jpg"
            },
            {
              "title": "巅峰智业受邀出席华侨城策划规划联盟成立大会，并成为华侨城策划规划联盟成员单位!",
              "addtime": "11-17",
              "original_image": "/memorabilia/gallery/2018/0313/hlw0naxgti2k94t.jpg"
            },
            {
              "title": "巅峰智业与重庆八戒工程网络有限公司，签约组建成立网络旅游规划院——北京八戒巅峰网络旅游规划院。",
              "addtime": "11-29",
              "original_image": "/memorabilia/gallery/2018/0313/xzzymalxdmlckdi.jpg"
            },
            {
              "title": "巅峰智业被授予2016-2017年度中关村信用培育双百工程——“百家最具影响力信用企业”荣誉证书。",
              "addtime": "12-06",
              "original_image": "/memorabilia/gallery/2018/0313/tt3eboyutkzhfkb.jpg"
            }
          ]
        },
        {
          "year": "2016",
          "child": [
            {
              "title": "国际旅游联合会任命巅峰智业执行总裁刘惠女士为中国区副主席并颁发国际旅游大奖“骑士勋章”。",
              "addtime": "01-15",
              "original_image": "/memorabilia/gallery/2016/0125/17igpxnm5eoym8s.jpg"
            },
            {
              "title": "巅峰智业成功举办2016年终总结暨表彰大会",
              "addtime": "01-20",
              "original_image": "/memorabilia/gallery/2016/0125/eipcdt2u4kh1tyo.jpg"
            },
            {
              "title": "巅峰智业最新力作《一带一路旅游创新发展》正式出版",
              "addtime": "02-18",
              "original_image": "/memorabilia/gallery/2016/0223/sld5dduggxrfujc.jpg"
            },
            {
              "title": "巅峰智业与春光集团正式签约合作“海南布隆赛绿心公社”",
              "addtime": "04-19",
              "original_image": "/memorabilia/gallery/2016/0613/lzfx2c8k5qu85ba.png"
            },
            {
              "title": "巅峰智业协办第六届中国旅游项目投资大会成功举办，首席顾问刘锋博士发表《以景区运营提升旅游投资价值》主题演讲",
              "addtime": "06-16",
              "original_image": "/memorabilia/gallery/2016/0920/mbqm8xmcwi3yeqe.jpg"
            },
            {
              "title": "巅峰智业携手冀州市人民政府签订战略合作协议，推动冀州旅游跨越式发展。",
              "addtime": "06-16",
              "original_image": "/memorabilia/gallery/2016/0920/z5qa4i4rmlysiex.jpg"
            },
            {
              "title": "由平安银行、巅峰智业等9家文旅龙头企业联合发起资源整合平台——“平安景区荟”",
              "addtime": "06-18",
              "original_image": "/memorabilia/gallery/2016/0920/zhcav4y2mcbksmg.jpg"
            },
            {
              "title": "巅峰智业获评企业信用最高等级AAA资信等级",
              "addtime": "06-24",
              "original_image": "/memorabilia/gallery/2016/0920/5yjdyod5irpd0es.jpg"
            },
            {
              "title": "成功举办首届中国文旅产业巅峰大会，打造文旅产业资源对接、跨界、融合、创新的交流合作平台",
              "addtime": "11-12",
              "original_image": "/memorabilia/gallery/2016/1124/zhhsuahi2mmvddo.jpg"
            },
            {
              "title": "文旅巨擘云集——巅峰智业十五周年庆典",
              "addtime": "11-12",
              "original_image": "/memorabilia/gallery/2016/1124/3hoqzgvwvpyejfj.jpg"
            }
          ]
        },
        {
          "year": "2015",
          "child": [
            {
              "title": "国家旅游局发布《景区最大承载量核定工作导则》等行业标准，其中《景区最大承载量核定工作导则》由巅峰智业课题组编写。",
              "addtime": "01-05",
              "original_image": "/memorabilia/gallery/2015/0105/0nhcoib58atccp3.jpg"
            },
            {
              "title": "巅峰智业专家团队的不懈努力下终于出版发行《大转型—旅游•改革•新型城镇化》。",
              "addtime": "01-06",
              "original_image": "/memorabilia/gallery/2016/0920/pnuxfb91ul1b8c2.jpg"
            },
            {
              "title": "由中国生物多样性保护与绿色发展基金会与中国旅游资源整合联盟联合主办、巅峰智业等多家业内专业公司团队协办的首届“新丝路•中国梦”文旅产业发展高峰论坛在深圳召开。",
              "addtime": "01-16",
              "original_image": "/memorabilia/gallery/2015/0204/yuksuyy7i6cz1ih.jpg"
            },
            {
              "title": "由中国旅游报社主办，巅峰智业独家冠名的“2014美丽中国行 中央媒体大型采访采风活动纪实”即《美丽中国行》系列纪实丛书正式出版，并于今日在中国旅游产业发展年会推出",
              "addtime": "01-18",
              "original_image": "/memorabilia/gallery/2015/0204/2zlt1rvcbc1vauj.jpg"
            },
            {
              "title": "巅峰智业全体员工举行一年一度的迎春年会",
              "addtime": "01-27",
              "original_image": "/memorabilia/gallery/2015/0204/5pplgrrbgnvbwvw.jpg"
            },
            {
              "title": "巅峰智业首席顾问刘锋博士受湖南省旅游局邀请，发表题为“新常态下湖南旅游发展之路”的精彩演讲",
              "addtime": "01-30",
              "original_image": "/memorabilia/gallery/2015/0204/zmm3fydpkre3ukk.jpg"
            },
            {
              "title": "“一带一路”旅游先通先锋工程启动仪式暨中国旅游品牌战略发展峰会、CCTV《对话神州》栏目开机仪式和《走访丝路》丛书征编仪式新闻发布会",
              "addtime": "02-08",
              "original_image": "/memorabilia/gallery/2015/0303/vopo5xicrrbh2wb.jpg"
            },
            {
              "title": "文化部公布第六批国家文化产业示范基地名单，巅峰智业作为唯一一家规划设计类文创企业获此殊荣",
              "addtime": "02-11",
              "original_image": "/memorabilia/gallery/2015/0303/mkxhi7bwrpppz3k.jpg"
            },
            {
              "title": "巅峰旅投综合运营的景区——三亚·凤凰花海2015首次开启收费模式，便以日均万人的入园量跃升三亚“八大景区”行列",
              "addtime": "02-26",
              "original_image": "/memorabilia/gallery/2016/0920/9kb80u0fkudq6hn.jpg"
            },
            {
              "title": "巅峰智业与北京工商大学艺术与传媒学院签署学生就业实习基地协议，建立高校学生实习就业交流平台",
              "addtime": "03-19",
              "original_image": "/memorabilia/gallery/2015/0414/vlszxvhoomrdwwy.jpg"
            },
            {
              "title": "2015年广东省扬帆计划韶关市旅游系统北京高级研修班(第二期)于5月26日在北京举办",
              "addtime": "05-26",
              "original_image": "/memorabilia/gallery/2015/0612/cxonxsm8tsg9qia.jpg"
            },
            {
              "title": "中央文化干部管理学院举办的“2015年国家级文化产业示范园区基地高层经营管理人员培训班”旅游专题培训课程于巅峰智业北京总部讲堂举行",
              "addtime": "06-05",
              "original_image": "/memorabilia/gallery/2015/0713/v04hzcpohpelc9r.jpg"
            },
            {
              "title": "巅峰智业受国家发展改革委员会规划司邀请，作为民间智库出席“国家‘十二五’规划实施总结评估座谈会”，为国家发展建言献策",
              "addtime": "06-12",
              "original_image": "/memorabilia/gallery/2015/0713/faxlus2xc3ijhny.jpg"
            },
            {
              "title": "巅峰智业在第二十一届亚洲旅游业金旅奖盛典上荣登“2015大中华区旅游文化榜”，获得“最具品牌影响力旅游规划企业”荣誉称号",
              "addtime": "06-16",
              "original_image": "/memorabilia/gallery/2015/0713/pfslwh0xafbp1kf.jpg"
            },
            {
              "title": "巅峰智业在“一带一路(中国)旅游品牌战略发展峰会暨一带一路(中国)品牌推荐活动电视盛典”上荣膺“一带一路•最具创新力旅游企业”称号，巅峰旅投荣膺“一带一路• 十佳旅游特色企业”称号",
              "addtime": "06-23",
              "original_image": "/memorabilia/gallery/2015/0713/sjmh8d0ztl3kkqe.jpg"
            },
            {
              "title": "巅峰智业与首都经济贸易大学签署战略合作协议，建立首都经济贸易大学校外人才培养基地。",
              "addtime": "06-26",
              "original_image": "/memorabilia/gallery/2015/0713/yaaul9lbydu53p4.png"
            },
            {
              "title": "由中央文化干部管理学院举办的“2015年国家级文化产业示范园区基地高层经营管理人员培训班”第十一期、第十二期学员旅游专题培训于巅峰智业北京总部顺利举行",
              "addtime": "07-24",
              "original_image": "/memorabilia/gallery/2015/0831/jyvfsosndbns7l0.jpg"
            },
            {
              "title": "巅峰智业通过甲级城乡规划编制资质审核，正式成为同时拥有甲级城乡规划编制资质和甲级旅游规划设计资质的旅游智力服务企业",
              "addtime": "08-28",
              "original_image": "/memorabilia/gallery/2015/0831/rq3uzk6lu1blmjq.jpg"
            },
            {
              "title": "巅峰旅投综合运营的重庆黑山谷景区率先制定发布了全国养生旅游方面的首个地方标准《生态养生旅游景区》",
              "addtime": "08-28",
              "original_image": "/memorabilia/gallery/2015/0831/eynxf73phnrrsen.jpg"
            },
            {
              "title": "巅峰智业首席顾问刘锋博士由中国房地产创新模式大会组委会评选为“中国房地产创新人物”",
              "addtime": "09-11",
              "original_image": "/memorabilia/gallery/2015/1015/yveaey03kjcl4t2.jpg"
            },
            {
              "title": "巅峰十月技术交流周暨金鹰特训班三期开学典礼圆满落幕",
              "addtime": "10-15",
              "original_image": "/memorabilia/gallery/2015/1106/8gjddvqluizmnl5.jpg"
            },
            {
              "title": "巅峰智业成立第14周年：三位一体，智造美丽中国",
              "addtime": "10-26",
              "original_image": "/memorabilia/gallery/2015/1104/y0hbwj6muavqvtq.jpg"
            },
            {
              "title": "巅峰文旅众创孵化空间加入全经联众创空间联盟，成为联盟的第21位成员",
              "addtime": "11-05",
              "original_image": "/memorabilia/gallery/2015/1106/tpyki9jtoi0bmlf.jpg"
            },
            {
              "title": "巅峰智业助力的第五届艾蒂亚奖在京举行新闻发布会，公布了本届艾蒂亚奖提名奖榜单，巅峰智业共获得四项提名。",
              "addtime": "12-08",
              "original_image": "/memorabilia/gallery/2015/1231/wbhip7exsox9qex.jpg"
            }
          ]
        },
        {
          "year": "2014",
          "child": [
            {
              "title": "“爱巅峰 有梦想 我快乐”——2014巅峰智业迎新年会在北京海航万豪酒店宴会厅隆重举办，巅峰智业数百名骨干精英及众多顾问专家共襄盛典。",
              "addtime": "01-15",
              "original_image": "/memorabilia/gallery/2014/1023/edl92hzfjbwaust.jpg"
            },
            {
              "title": "2013中国(福建)旅游总评榜论坛暨颁奖盛典成功举办，巅峰智业荣获“福建旅游规划杰出贡献奖”。",
              "addtime": "03-06",
              "original_image": ""
            },
            {
              "title": "由北京巅峰智业旅游文化创意股份有限公司独家冠名的“2014年美丽中国之旅推广宣传活动”启动。活动包含：“首届美丽中国之旅摄影大赛”， “2014 美丽中国行大型采风活动”，“2014美丽中国旅游产业论坛”，“2014 美丽中国旅游目的地及线路推选”。",
              "addtime": "03-06",
              "original_image": "/memorabilia/gallery/2014/1023/sonpjjq5oxh5uey.jpg"
            },
            {
              "title": "由国家旅游局组织，北京巅峰智业旅游文化创意股份有限公司编制的《中华人民共和国旅游法》细则之《旅游景区开放管理暂行办法》及《景区旅游者承载量核定工作导则》两项成果研讨会，在国家旅游局会议室成功举行。",
              "addtime": "03-21",
              "original_image": "/memorabilia/gallery/2014/1023/bmdsso3zjs2db1v.jpg"
            },
            {
              "title": "巅峰旅投成功签约国家首批5A级景区——贵州省龙宫风景名胜区。",
              "addtime": "06-12",
              "original_image": "/memorabilia/gallery/2014/1023/emvdz7m8qgezrqg.jpg"
            },
            {
              "title": "“巅峰之夜 共话投资”主题投资沙龙完美落幕。",
              "addtime": "06-13",
              "original_image": "/memorabilia/gallery/2014/1023/4gfy1ayohsfd0at.png"
            },
            {
              "title": "巅峰智业联合主办的“2014第四届中国旅游项目投资大会”于北京新世纪日航饭店顺利召开。",
              "addtime": "06-13",
              "original_image": "/memorabilia/gallery/2014/1023/vbk4hf82ygohzcx.jpg"
            },
            {
              "title": "由巅峰智业承办的“首届中国商学院环青海湖超级越野跑”青海开幕。",
              "addtime": "07-24",
              "original_image": "/memorabilia/gallery/2014/1023/5ju5gvoegonmgym.jpg"
            },
            {
              "title": "巅峰智业获得土地规划机构乙级资质。",
              "addtime": "08-16",
              "original_image": "/memorabilia/gallery/2014/1023/avvrh2jr06tcvtc.gif"
            },
            {
              "title": "第二十七届 IAOPA 世界会员大会暨第四届中国低空经济论坛于北京昆仑饭店召开，巅峰智业协办首届中国通航旅游产业分论坛 。",
              "addtime": "09-09",
              "original_image": ""
            },
            {
              "title": "2014中国旅游产业博览会特设系列智慧旅游主题活动——智慧旅游主题展览、国际智慧旅游高峰论坛。",
              "addtime": "09-28",
              "original_image": ""
            },
            {
              "title": "巅峰智业助力支持的2014中国智慧旅游创新发展大会暨首期全国智慧旅游建设培训班将在北京•河南大厦召开。",
              "addtime": "10-25",
              "original_image": ""
            },
            {
              "title": "巅峰美景完成的“三间房国际动漫游艺产业园智慧园区建设”规划项目荣获“2014全国智慧旅游优秀案例”奖。",
              "addtime": "10-31",
              "original_image": "/memorabilia/gallery/2014/1117/4jlrt908ntovkpx.jpg"
            },
            {
              "title": "由中国生态学学会和中国生态文明研究与促进会生态旅游分会主办、巅峰智业支持的“2014第十届中国生态旅游发展论坛”在成都举办。",
              "addtime": "11-01",
              "original_image": ""
            },
            {
              "title": "巅峰智业携手城市理想集团公司打造景区特色“理想音乐节”。",
              "addtime": "11-02",
              "original_image": "/memorabilia/gallery/2014/1117/2wupiiqkewsx3fw.jpg"
            },
            {
              "title": "巅峰智业专家团队向国家旅游局新任局长李金早先生汇报了《“丝绸之路经济带”旅游合作发展战略规划》。",
              "addtime": "11-13",
              "original_image": "/memorabilia/gallery/2014/1117/rflsin5jnhhqect.jpg"
            },
            {
              "title": "巅峰智业与房教中国正式签署战略合作协议。",
              "addtime": "11-15",
              "original_image": "/memorabilia/gallery/2015/0105/d1rgayjxthrhmc1.jpg"
            },
            {
              "title": "巅峰智业经过全国竞标，顺利中标《海南省旅游发展总体规划(2015-2025)》。",
              "addtime": "11-20",
              "original_image": "/memorabilia/gallery/2015/0105/l8pdmaca7dumrp5.jpg"
            },
            {
              "title": "由中国主题公园建设高级专家团主办、巅峰智业和中国旅游资源整合联盟联合主办的“2014中国主题公园建设高级研讨班（第一期）”在北京隆重举行。",
              "addtime": "12-18",
              "original_image": "/memorabilia/gallery/2015/0105/zbnxyn1shsfowyf.jpg"
            },
            {
              "title": "巅峰国际旅游文化商学院首期班——广东省扬帆计划韶关市旅游系统北京高级研修班在北京举办。",
              "addtime": "12-19",
              "original_image": "/memorabilia/gallery/2015/0105/4wgklpo8nunyfuz.jpg"
            },
            {
              "title": "《三亚市乡村旅游发展专项规划(2015-2035)》(简称“《规划》”)编制工作全面启动。",
              "addtime": "12-20",
              "original_image": "/memorabilia/gallery/2015/0105/x3eumlvtgftuw0i.jpg"
            },
            {
              "title": "由人民网、国际旅游学会联合主办，普陀区旅游局、大地蜗牛，巅峰智业等承办的“2014国际旅游度假目的地论坛”在舟山隆重召开。",
              "addtime": "12-21",
              "original_image": ""
            }
          ]
        },
        {
          "year": "2013",
          "child": [
            {
              "title": "第三届中国智慧城市大会上，巅峰智业旗下北京巅峰美景科技有限责任公司以卓越的智慧旅游城市建设理念受到业界的高度评价，荣获“2012年度智慧旅游杰出品牌企业奖”。",
              "addtime": "01-10",
              "original_image": "/memorabilia/gallery/2014/1023/oe48ap64gs7bpqt.jpg"
            },
            {
              "title": "在杭州举办的第五届中国房地产策划师年会暨华策奖颁奖大会上，北京巅峰智业旅游文化创意股份有限公司凭借“青龙山中国酒地总体策划、概念性设计、控制性详细规划及修建性详细规划“项目荣获“2012年度华策奖——区域规划年度最佳策划奖”。",
              "addtime": "01-11",
              "original_image": "/memorabilia/gallery/2014/1023/rb6y8rbjtdo8hhj.jpg"
            },
            {
              "title": "北京巅峰智业旅游文化创意股份有限公司全资收购艾肯联合建筑规划设计顾问有限公司。这一联姻，将巅峰智业强大的品牌势能、规模效应及业务聚合力与艾肯联合具有国际高度的战略咨询力、前瞻性的创意表现力完美融合，双方将致力于共同打造城市规划与旅游咨询第一品牌。",
              "addtime": "07-12",
              "original_image": ""
            },
            {
              "title": "巅峰智业6层新办公区正式启用，奋力再创新辉煌。",
              "addtime": "08-08",
              "original_image": "/memorabilia/gallery/2014/1023/3t0sr0168i1nvh1.jpg"
            },
            {
              "title": "巅峰智业与《华夏时报》共同主办的“2013中国旅游品牌论坛”在万达长白山度假区隆重召开，来自地方旅游部门、旅游及衍生企业、旅游行业媒体等单位的100余位负责人莅临现场，以权威观点、专业解读，探讨中国旅游品牌的成长与发展。",
              "addtime": "09-01",
              "original_image": ""
            },
            {
              "title": "由中国旅游产业博览会由国家旅游局和天津市政府共同主办、联合国世界旅游组织特别支持的2013中国旅游产业博览会在天津梅江会展中心隆重开幕。其中，巅峰美景承办的智慧旅游峰会。",
              "addtime": "09-05",
              "original_image": "/memorabilia/gallery/2014/1023/tgncjc9lq3zftjv.jpg"
            },
            {
              "title": "巅峰智业入选由北京市文化创意产业促进中心评选的“北京最具投资价值文化创意企业”。",
              "addtime": "11-06",
              "original_image": "/memorabilia/gallery/2014/1023/xiqaykfoxodwpil.png"
            },
            {
              "title": "在“第三届亚洲房地产金融投资年会”上，巅峰智业荣获“2013年度中国文化旅游地产创新大奖”，董事长束盈女士被评为“2013年度中国城镇化建设特别贡献人物”。",
              "addtime": "12-24",
              "original_image": "/memorabilia/gallery/2014/1023/umln4f4rzq52xhc.jpg"
            }
          ]
        },
        {
          "year": "2012",
          "child": [
            {
              "title": "巅峰智业 “贵州生态文化旅游创新区产业发展规划”项目获得了第二届中国旅游投资“ITIA(艾蒂亚)”中国最佳旅游项目规划设计奖；",
              "addtime": "01-06",
              "original_image": "/memorabilia/gallery/2014/1023/lzobmdwwm9zu8yz.jpg"
            },
            {
              "title": "由巅峰旅投委托管理的、投资21亿元的重庆最大的亲水公园——长寿湖景区盛大开园。",
              "addtime": "04-28",
              "original_image": "/memorabilia/gallery/2014/1023/0y4agi42pigejx3.jpg"
            },
            {
              "title": "国家旅游局局长邵琪伟实地调研由巅峰旅投托管的万盛黑山谷景区，对景区管理在国家5A级景区创建工作中做出的努力给予了肯定。",
              "addtime": "07-03",
              "original_image": "/memorabilia/gallery/2014/1023/7ku3qdrbpgfuark.png"
            },
            {
              "title": "巅峰智业成功参展在天津举办的“2012中国旅游产业博览会”，成为全场馆的亮点，受到了国家旅游局局长邵琪伟及有关领导的高度评价。",
              "addtime": "09-02",
              "original_image": "/memorabilia/gallery/2014/1023/o3zxgi6ccgriqah.jpg"
            },
            {
              "title": "巅峰智业旗下子公司——北京国智创想旅游文化传媒有限公司成立，立足于成为中国领先的城市与旅游目的地整合营销传播服务商。",
              "addtime": "09-14",
              "original_image": ""
            },
            {
              "title": "由巅峰国智委托管理的重庆黑山谷景区，正式成为重庆第5家国家5A级旅游景区。",
              "addtime": "10-27",
              "original_image": ""
            },
            {
              "title": "巅峰智业股份制改造完成，更名为“北京巅峰智业旅游文化创意股份有限公司”，并召开第一次股东会和董事会，标志着巅峰智业的发展实现了新的跨越。",
              "addtime": "11-13",
              "original_image": "/memorabilia/gallery/2014/1023/dstfxmrfmrjclu5.jpg"
            },
            {
              "title": "巅峰智业发布了《2012年度CTC创意旅游综合体研究报告》，以完整详实的客观数据、纵览全局的全产业链视角，精辟独到的解读分析，帮助旅游企业在2013年旅游综合体的发展中把握方向，抓住机遇。",
              "addtime": "11-29",
              "original_image": "/memorabilia/gallery/2014/1023/2xoqf8qajh4kypo.gif"
            },
            {
              "title": "由巅峰智业协办的《2012中国旅游发展论坛》在杭州举办，邀请了近250名嘉宾到场，共同探讨“旅游投融资与集团成长”，从旅游业发展趋势、目的地城市建设、投融资项目选择、旅游业多元化创新发展以及投资成功案例剖析等多角度进行了深层次的智慧分享。",
              "addtime": "12-01",
              "original_image": ""
            },
            {
              "title": "由巅峰智业送选的“贵州文化旅游创新区产业发展规划”在100多项参选的作品中脱颖而出，获得评审专家的一致赞叹与肯定，夺得第九届中国人居典范建筑设计规划设计竞赛“最佳规划设计金奖”。",
              "addtime": "12-20",
              "original_image": "/memorabilia/gallery/2014/1023/1lw4ka5fm3k7xw1.jpg"
            }
          ]
        },
        {
          "year": "2011",
          "child": [
            {
              "title": "巅峰智业在首届中国旅游项目投资大会荣获”中国最佳旅游投资服务机构“大奖。",
              "addtime": "06-11",
              "original_image": "/memorabilia/gallery/2014/1023/rluitqxni36mu4a.jpg"
            },
            {
              "title": "巅峰金鹰特训班在刘锋博士的主讲下开班，把巅峰智业的内部培养计划推向高峰阶段，使企业成为有目标、有体系、有高度的学习型企业。",
              "addtime": "07-08",
              "original_image": "/memorabilia/gallery/2014/1023/jdjkbvvskngfcbo.jpg"
            },
            {
              "title": "由北京达沃斯旅游规划设计院完成的“内蒙古呼和浩特小黑河景观”以优秀的设计理念和富有创新性的设计亮点问鼎2011年度国际环境艺术创新设计——“华鼎奖”。",
              "addtime": "10-08",
              "original_image": "/memorabilia/gallery/2014/1023/blym50wwvldnd3k.jpg"
            },
            {
              "title": "致力于工程设计和工程建设的专业机构北京巅峰丽景园林景观工程有限公司成立。",
              "addtime": "10-18",
              "original_image": ""
            },
            {
              "title": "达沃斯巅峰旅游规划设计院在第六届中国国际设计艺术博览会上获2010-2011年度“十大最具影响力景观设计机构”称号。",
              "addtime": "10-20",
              "original_image": "/memorabilia/gallery/2014/1023/qffjfwccl5bonii.jpg"
            },
            {
              "title": "巅峰智业十周年庆典暨中国旅游前沿发展峰会隆重举行，庆典以强大的号召力汇聚了500余名行业知名人士，以高层次、高规格、大规模成为中国旅游规划行业的盛典！以这次成功的庆典为起点，巅峰智业开始迈向新的征程！",
              "addtime": "11-15",
              "original_image": "/memorabilia/gallery/2014/1023/mhecihk0jot0lxa.jpg"
            },
            {
              "title": "巅峰智业北京巅峰美景科技有限责任公司的《中国休闲度假全球营销联盟》方案获得“2011中国休闲创新贡献奖”。“中国休闲创新奖”是对于三十年来中国旅游发展中产生的新领域、新业态及为旅游休闲发展做出卓越贡献的企业及人士，通过网络公众评选和专家委员会的评定，确定的最高荣誉。",
              "addtime": "12-06",
              "original_image": "/memorabilia/gallery/2014/1023/tvwl4idymdb4bu5.jpg"
            },
            {
              "title": "巅峰智业成功协办“2011中国旅游发展论坛”，并发布了国内首个针对旅游新经济体的发展报告《旅游创意综合体(CTC)发展报告》，受到业界人士的一致好评与追捧。",
              "addtime": "12-09",
              "original_image": "/memorabilia/gallery/2014/1023/lw7jygqwm4xpp7z.gif"
            },
            {
              "title": "巅峰智业荣获由中国房地产协会和国家地理杂志联合颁布的“中国旅游地产领军企业”大奖，成为中国旅游规划界的旅游地产规划最权威咨询机构。",
              "addtime": "12-16",
              "original_image": "/memorabilia/gallery/2014/1023/vtuq1rlvlktdsh8.jpg"
            }
          ]
        },
        {
          "year": "2010",
          "child": [
            {
              "title": "巅峰智业与太极湖集团展开全面合作。至此，巅峰智业已与中信集团、河北新奥集团、大连海昌集团、万象集团、象屿集团、中国房产信息集团、昌荣传媒、金融街、红背带木结构管理机构等知名集团品牌及北京第二外国语学院等单位进行战略合作，实现了“一站式全程服务”的服务理念及目标。",
              "addtime": "03-10",
              "original_image": ""
            },
            {
              "title": "巅峰智业乔迁国门大厦新址。",
              "addtime": "05-06",
              "original_image": "/memorabilia/gallery/2014/1023/lsyfsbg8sg4uwx4.jpg"
            },
            {
              "title": "巅峰智业成为国家旅游局全国旅游人才开发专家服务团智力支持单位，在旅游人才开发领域做出的贡献得到业界普遍的高度认可。",
              "addtime": "10-08",
              "original_image": "/memorabilia/gallery/2014/1023/uant12urfnjpr1l.jpg"
            },
            {
              "title": "巅峰智业参展2010中国旅游博览会，一举摘得“最佳主题创意奖”、“最佳展台设计奖”、“最佳旅游贡献奖”三项桂冠。",
              "addtime": "10-16",
              "original_image": "/memorabilia/gallery/2014/1023/3ardbtexi33nehg.jpg"
            },
            {
              "title": "巅峰智业成功中标内蒙古呼和浩特敕勒川广场概念方案设计、内蒙古呼和浩特小黑河景观设计及内蒙古呼和浩特成吉思汗大街景观设计三个项目，使巅峰智业成为最专业、最优质的旅游地产规划咨询品牌。",
              "addtime": "11-26",
              "original_image": ""
            },
            {
              "title": "由巅峰智业为国际知名品牌“北京奥林匹克公园”创建国家5A级旅游景区提供的全程咨询服务相关规划顺利通过评审。在巅峰智业的倾力支持下，创建国家5A级旅游景区各方面工作如期实现目标。巅峰智业从此与光荣和梦想同行！",
              "addtime": "12-01",
              "original_image": ""
            }
          ]
        },
        {
          "year": "2009",
          "child": [
            {
              "title": "巅峰智业力助首届中国旅游信息化发展论坛成功举办。巅峰智业在业内成为率先关注信息技术对旅游业的推进及影响的企业。",
              "addtime": "08-01",
              "original_image": ""
            },
            {
              "title": "巅峰智业承接的《黑龙江汤旺河国家公园发展总体规划》顺利通过评审。“黑龙江汤旺河国家公园”是中国第一个国家公园。该项目的顺利完成为巅峰智业在公园规划领域的权威地位奠定了基础。",
              "addtime": "12-01",
              "original_image": "/memorabilia/gallery/2014/1023/9atv9x6fbqmq3ir.jpg"
            }
          ]
        },
        {
          "year": "2008",
          "child": [
            {
              "title": "北京巅峰美景科技有限公司的成立，使巅峰智业在智慧旅游这一前沿领域成为领跑者。也是从这一年起，巅峰智业确立了一体两翼的发展战略，即以旅游规划咨询为一体，以景区托管及智慧旅游为两翼的业务主架构，形成了三点一面的稳固发展格局。",
              "addtime": "01-29",
              "original_image": ""
            },
            {
              "title": "巅峰智业支援地震灾区向灾区捐款参与灾区重建，成立四川灾区灾后旅游重建规划志愿者支援队。在灾后四川形成一道“巅峰爱心“ 的风景线。",
              "addtime": "05-29",
              "original_image": "/memorabilia/gallery/2014/1023/tvv6a7skeakzhvl.jpg"
            },
            {
              "title": "巅峰智业参加河北国际旅游博览会，吹响进军华北区域旅游市场的冲锋号 。",
              "addtime": "09-11",
              "original_image": ""
            },
            {
              "title": "由巅峰智业承接的国家旅游局《丝绸之路旅游区总体规划》项目顺利通过终稿评审。标志着巅峰智业的大区域旅游规划水平登上新台阶。",
              "addtime": "12-22",
              "original_image": "/memorabilia/gallery/2014/1023/qfhcj2aihbbgzu5.jpg"
            }
          ]
        },
        {
          "year": "2007",
          "child": [
            {
              "title": "巅峰智业走进瑞士达沃斯参加“欧中城市与旅游合作论坛”，巅峰人回家。",
              "addtime": "06-18",
              "original_image": "/memorabilia/gallery/2014/1023/omfsgaoxixnlvcm.jpg"
            },
            {
              "title": "巅峰智业应邀参加全国红色旅游高峰论坛，巅峰智业在红色旅游领域已享有盛誉。",
              "addtime": "11-01",
              "original_image": ""
            },
            {
              "title": "巅峰智业为第二外国语学院旅游管理专业5位品学兼优的学生颁发了首届巅峰智业奖学金。截至目前，巅峰智业奖学金已经连续设立了四年。巅峰智业还先后设立了北京第二外国语学院旅游管理学院实习基地、天津商业大学商学院实习基地、北京师范大学地理学与遥感科学学院实习基地。",
              "addtime": "12-06",
              "original_image": "/memorabilia/gallery/2014/1023/97ryjzvlqh0bnp5.jpg"
            },
            {
              "title": "巅峰智业旗下达沃斯巅峰旅游规划设计院荣获“旅游规划设计甲级资质”。",
              "addtime": "12-19",
              "original_image": "/memorabilia/gallery/2014/1023/7to4cfbtlx65j6n.jpg"
            }
          ]
        },
        {
          "year": "2006",
          "child": [
            {
              "title": "企业内部正式发布“企业规划设计技术规范标准”，“质量内控管理流程”，“员工手册”等系列管理制度。基本上完成了制度化管理建设工作，是全国同类行业中最早实行制度化、创新化管理的企业之一。",
              "addtime": "01-01",
              "original_image": ""
            },
            {
              "title": "北京巅峰智业咨询顾问有限公司，即巅峰智业机构正式成立。巅峰智业机构开创性地提出“为中国旅游投智”的口号及理念，从此迈开了集团化发展的步伐。",
              "addtime": "07-20",
              "original_image": ""
            },
            {
              "title": "北京达沃斯巅峰旅游规划设计院成为国家旅游局《旅游业在社会主义新农村建设中的作用及各有关方面的对策研究（课程申请书）》课题研究竞标优胜者，标志着机构在农村旅游研究方面登上制高点。",
              "addtime": "08-01",
              "original_image": ""
            },
            {
              "title": "巅峰智业在北京举办“中国旅游智业巅峰论坛\"，引领旅游业的新跨越。",
              "addtime": "10-22",
              "original_image": "/memorabilia/gallery/2014/1023/h8mydws5z005fw9.jpg"
            }
          ]
        },
        {
          "year": "2005",
          "child": [
            {
              "title": "国家旅游局局长何光暐为北京达沃斯巅峰旅游规划设计院题词：“旅游智业，大有可为”。",
              "addtime": "01-13",
              "original_image": ""
            },
            {
              "title": "北京达沃斯巅峰旅游规划设计院喜获“年度中国优秀旅游规划设计机构”的荣誉称号。",
              "addtime": "06-09",
              "original_image": "/memorabilia/gallery/2014/1023/8xkmvmeumbzhisn.jpg"
            },
            {
              "title": "巅峰智业与西班牙TOURIS M&LEISURE Advisory Services规划咨询公司形成战略联盟，迈开了国际化发展的步伐。",
              "addtime": "06-15",
              "original_image": ""
            }
          ]
        },
        {
          "year": "2004",
          "child": [
            {
              "title": "北京达沃斯巅峰旅游规划设计院先后在大连市、宁波市、八达岭长城大景区、雅安市、黄河小浪底、河津市等旅游规划竞标中荣获第一名。巅峰智业驶上了发展的快速路。",
              "addtime": "05-12",
              "original_image": ""
            },
            {
              "title": "北京达沃斯巅峰旅游景观设计中心获《八达岭长城大景区规划设计概念方案》国际竞标第一名。该项目使达沃斯巅峰旅游景观设计中心在国内外众多规划设计单位中脱颖而出，为巅峰智业这一品牌积累了国际声誉。",
              "addtime": "06-01",
              "original_image": ""
            },
            {
              "title": "北京达沃斯巅峰旅游景观设计中心专业旅游咨询杂志——《旅游智业》创刊号正式刊印，两年后正式发行《旅游智业》电子期刊，为中国旅游界贡献出一本业内专业刊物的经典读本。",
              "addtime": "06-01",
              "original_image": "/memorabilia/gallery/2014/1023/wtia2mfvqbe3vir.gif"
            },
            {
              "title": "由北京达沃斯巅峰旅游景观设计中心承办，国家发改委培训中心主办的“旅游投融资与规划高级研修班”取得圆满成功。巅峰智业为旅游业的高级人才培养做出了努力。",
              "addtime": "07-01",
              "original_image": ""
            },
            {
              "title": "北京达沃斯巅峰旅游景观设计中心在“大连旅游业总体规划”全国招标中获得第一名，成功中标。巅峰智业从此开始了与大连旅游长达八年的持续合作。",
              "addtime": "10-01",
              "original_image": ""
            }
          ]
        },
        {
          "year": "2003",
          "child": [
            {
              "title": "在国家旅游局公告颁布的首批乙级旅游规划设计单位中，北京达沃斯巅峰旅游景观设计中心名列榜首。",
              "addtime": "01-09",
              "original_image": ""
            },
            {
              "title": "由于巅峰智业为青海省旅游做出的一系列规划咨询，青海省旅游局为北京达沃斯巅峰旅游景观设计中心颁发了“2002年度青海省旅游发展特别贡献奖”。",
              "addtime": "03-17",
              "original_image": "/memorabilia/gallery/2014/1022/zegxeb78nrt4con.jpg"
            },
            {
              "title": "北京达沃斯巅峰旅游景观设计中心获得中国旅游报评选的2002年度“中国知名旅游品牌”。",
              "addtime": "04-02",
              "original_image": "/memorabilia/gallery/2014/1022/ip8xfbbyvjigdrg.jpg"
            }
          ]
        },
        {
          "year": "2002",
          "child": [
            {
              "title": "北京达沃斯巅峰控股的巅峰国智景区投资管理有限公司（原国智景元旅游顾问有限公司）成立，标志着巅峰智业业务进入景区管理领域。",
              "addtime": "09-24",
              "original_image": ""
            }
          ]
        },
        {
          "year": "2001",
          "child": [
            {
              "title": "北京达沃斯巅峰旅游景观设计中心正式成立，成为中国旅游规划咨询界第一批为数不多的民营企业的一员。",
              "addtime": "10-26",
              "original_image": "/memorabilia/gallery/2014/1022/o7cppqeam0uzjoy.jpg"
            }
          ]
        }
      ],
      "enterprise_qualification": [
        {
          "id": "1",
          "title": "旅游规划甲级资质",
          "original_image": "/attachs/honor/gallery/2014/1230/7sm4d7wi0gz2unf.jpg"
        },
        {
          "id": "2",
          "title": "城乡规划甲级资质",
          "original_image": "/attachs/honor/gallery/2021/1118/j4w18dpvy7cgal8.jpg"
        },
        {
          "id": "3",
          "title": "风景园林工程设计甲级资质",
          "original_image": "/attachs/honor/gallery/2018/0703/pnelro5gf1xemxo.jpg"
        },
        {
          "id": "64",
          "title": "城市及道路照明壹级资质",
          "original_image": "/attachs/honor/gallery/2019/1230/hdolzhcrbdgohea.jpg"
        },
        {
          "id": "51",
          "title": "建筑行业(建筑工程资质)",
          "original_image": "/attachs/honor/gallery/2018/1218/luwd4h0jutegozq.jpg"
        },
        {
          "id": "4",
          "title": "土地规划资质",
          "original_image": "/attachs/honor/gallery/2018/1218/xvr4mwyyqxkhfvc.jpg"
        },
        {
          "id": "49",
          "title": "高新技术产业",
          "original_image": "/attachs/honor/gallery/2016/0302/tyekqovmuf5p22f.jpg"
        },
        {
          "id": "68",
          "title": "展陈工程设计施工一体化一级资质",
          "original_image": "/attachs/honor/gallery/2022/0124/icy3qprpyruuout.png"
        },
        {
          "id": "63",
          "title": "AAA 级资信等级证书",
          "original_image": "/attachs/honor/gallery/2020/0525/vh5f4twp5vnxjnf.jpg"
        }
      ],
      "certificate_honor": [
        {
          "id": "66",
          "title": "文化和旅游部优秀研究成果",
          "original_image": "/attachs/honor/gallery/2020/0408/b6f4oggzpcjwjdp.jpg"
        },
        {
          "id": "67",
          "title": "夜游经济实验室",
          "original_image": "/attachs/honor/gallery/2020/0408/0pe8ertjhbekvnk.png"
        },
        {
          "id": "45",
          "title": "国家文化产业示范基地",
          "original_image": "/attachs/honor/gallery/2015/0211/0tdwpe6108nnisk.jpg"
        },
        {
          "id": "48",
          "title": "最具品牌影响力旅游规划企业",
          "original_image": "/attachs/honor/gallery/2015/0825/yrl6ebccb84jdio.png"
        },
        {
          "id": "5",
          "title": "中国旅游知名品牌",
          "original_image": "/attachs/honor/gallery/2014/1015/fqvbdgklilddy3z.jpg"
        },
        {
          "id": "6",
          "title": "全国旅游人才专家开发服务团智力支持单位",
          "original_image": "/attachs/honor/gallery/2014/1021/28emyfbi2sahxi5.jpg"
        },
        {
          "id": "53",
          "title": "中国优秀旅投品牌",
          "original_image": "/attachs/honor/gallery/2019/0221/efdc5hw7gcljvyg.jpg"
        },
        {
          "id": "7",
          "title": "中国智慧旅游领导品牌",
          "original_image": "/attachs/honor/gallery/2014/1021/zo9fsgykwwxmtk2.jpg"
        },
        {
          "id": "9",
          "title": "中国优秀旅游规划设计机构",
          "original_image": "/attachs/honor/gallery/2014/1021/ebkuopn4f3pnrlh.jpg"
        },
        {
          "id": "38",
          "title": "中国智慧旅游优秀案例",
          "original_image": "/attachs/honor/gallery/2014/1031/rcdu59mqxrwlvke.jpg"
        },
        {
          "id": "11",
          "title": "中国最佳旅游投资服务机构",
          "original_image": "/attachs/honor/gallery/2014/1021/gikncvrq7ecpqxm.jpg"
        },
        {
          "id": "13",
          "title": "十大最具影响力设计机构奖",
          "original_image": "/attachs/honor/gallery/2014/1021/byfqgkyzvb1hj39.jpg"
        },
        {
          "id": "52",
          "title": "国际旅游联合会骑士勋章",
          "original_image": "/attachs/honor/gallery/2019/0221/d5goyqtwh4rvqfy.jpg"
        },
        {
          "id": "57",
          "title": "2016-2017年度中关村信用培育双百工程——“百家最具影响力信用企业",
          "original_image": "/attachs/honor/gallery/2019/0221/tbbwogwow0chooj.jpg"
        },
        {
          "id": "59",
          "title": "中国特色小镇联盟副理事长单位",
          "original_image": "/attachs/honor/gallery/2019/0221/xmaotmlcchjosuv.jpg"
        },
        {
          "id": "16",
          "title": "中国旅游景区协会理事单位",
          "original_image": "/attachs/honor/gallery/2019/0221/rl9lgfo4ij50pg0.jpg"
        },
        {
          "id": "14",
          "title": "中国休闲产业联盟—休闲创意专业委员会成员",
          "original_image": "/attachs/honor/gallery/2014/1021/0uzq88sevfgx7be.jpg"
        },
        {
          "id": "55",
          "title": "全经联众创空间联盟成员机构",
          "original_image": "/attachs/honor/gallery/2019/0221/6gobluvcwubyvoy.jpg"
        },
        {
          "id": "65",
          "title": "国际山地旅游联盟会员单位",
          "original_image": "/attachs/honor/gallery/2019/0305/4jfgm4jtikhp60y.jpg"
        },
        {
          "id": "37",
          "title": "游艺机协会会员理事单位",
          "original_image": "/attachs/honor/gallery/2014/1024/5ragoxkbl3lwnbx.jpg"
        },
        {
          "id": "58",
          "title": "2017年度中国文旅产业总榜“最佳旅游产业服务商”",
          "original_image": "/attachs/honor/gallery/2019/0221/ruzfyozca29ao6m.jpg"
        },
        {
          "id": "60",
          "title": "“2017中国劲旅奖——年度最佳全域旅游规划服务商”",
          "original_image": "/attachs/honor/gallery/2019/0221/fp2viadrdjq7qww.png"
        },
        {
          "id": "18",
          "title": "中国最佳旅游产业创新奖",
          "original_image": "/attachs/honor/gallery/2014/1021/icx0pa7ta7wpsdy.jpg"
        },
        {
          "id": "15",
          "title": "中国文化旅游地产创新大奖",
          "original_image": "/attachs/honor/gallery/2014/1021/ibbqxheaxwzuh0z.jpg"
        },
        {
          "id": "56",
          "title": "艾里缇斯——最佳旅游景区运营管理公司",
          "original_image": "/attachs/honor/gallery/2019/0221/h4adqvzomm8w4kz.jpg"
        },
        {
          "id": "27",
          "title": "中国旅游产业博览会最佳站台奖",
          "original_image": "/attachs/honor/gallery/2014/1024/ellvjo7qmal42fe.jpg"
        },
        {
          "id": "28",
          "title": "国际环境艺术创新设计华鼎奖——景观设计类一等奖",
          "original_image": "/attachs/honor/gallery/2014/1024/0fg15r1sqf0mlda.jpg"
        },
        {
          "id": "20",
          "title": "中国最佳旅游项目规划设计奖",
          "original_image": "/attachs/honor/gallery/2014/1021/gksnxe7lhaofbhh.jpg"
        },
        {
          "id": "61",
          "title": "科睿国际创新节 年度创新影响力平台奖",
          "original_image": "/attachs/honor/gallery/2019/0221/4zxg9sj9sckpubd.jpg"
        },
        {
          "id": "62",
          "title": "科睿国际创新节 品牌创新金奖",
          "original_image": "/attachs/honor/gallery/2019/0221/9s8bx153jf6edqq.jpg"
        },
        {
          "id": "22",
          "title": "中国人居典范建筑规划设计金奖",
          "original_image": "/attachs/honor/gallery/2014/1021/yullhr2kcmqkf67.jpg"
        },
        {
          "id": "23",
          "title": "华策奖区域规划年度最佳策划奖",
          "original_image": "/attachs/honor/gallery/2014/1021/5i1glctk2gnkuox.jpg"
        },
        {
          "id": "46",
          "title": "2015年中国旅游业创业创新50强企业",
          "original_image": "/attachs/honor/gallery/2015/0811/ydhwn2ryvy0xike.jpg"
        },
        {
          "id": "47",
          "title": "2015年中国旅游业创业创新50强企业",
          "original_image": "/attachs/honor/gallery/2015/0811/5spfo2nqcrtnrpk.jpg"
        },
        {
          "id": "24",
          "title": "中国旅游产业博览会优秀展台奖",
          "original_image": "/attachs/honor/gallery/2014/1021/sqlr1vlymdlmtwj.jpg"
        },
        {
          "id": "25",
          "title": "中国休闲创新奖",
          "original_image": "/attachs/honor/gallery/2014/1021/tkk85emy0jj6fvs.jpg"
        },
        {
          "id": "43",
          "title": "福建旅游规划杰出贡献奖",
          "original_image": "/attachs/honor/gallery/2014/1225/wcdfwsdfrsrpih1.jpg"
        },
        {
          "id": "19",
          "title": "中国旅游产业博览会旅游贡献奖",
          "original_image": "/attachs/honor/gallery/2014/1021/9nai53iclqzkxd4.jpg"
        },
        {
          "id": "26",
          "title": "中国休闲创新贡献奖",
          "original_image": "/attachs/honor/gallery/2014/1024/uszmmjjswpfc4se.jpg"
        },
        {
          "id": "42",
          "title": "中华文化促进会艺术与设计联盟理事会副理事长单位",
          "original_image": "/attachs/honor/gallery/2014/1225/luczarnimp4wuab.jpg"
        },
        {
          "id": "44",
          "title": "北京沈阳企业商会SCCB常务理事单位",
          "original_image": "/attachs/honor/gallery/2014/1225/usblavown8w5ig2.jpg"
        },
        {
          "id": "29",
          "title": "青海省旅游局旅游顾问单位",
          "original_image": "/attachs/honor/gallery/2014/1024/mk1thdhmm6lj5ut.jpg"
        },
        {
          "id": "40",
          "title": "国际旅游投资协会副会长单位",
          "original_image": "/attachs/honor/gallery/2014/1225/gnjjxsu3j09wgbz.jpg"
        },
        {
          "id": "41",
          "title": "韶关市政府战略合作伙伴",
          "original_image": "/attachs/honor/gallery/2014/1225/ipr75t2qemm9kdo.jpg"
        },
        {
          "id": "30",
          "title": "吉林省旅游规划咨询中心",
          "original_image": "/attachs/honor/gallery/2014/1024/uz8aatsgpbe9yoa.jpg"
        },
        {
          "id": "31",
          "title": "中国房地产协会旅游地产研究中心",
          "original_image": "/attachs/honor/gallery/2014/1024/y7rl6uoqwcdm2fk.jpg"
        },
        {
          "id": "32",
          "title": "自驾车旅游研究中心",
          "original_image": "/attachs/honor/gallery/2014/1024/koa58eenmeaxnxl.jpg"
        },
        {
          "id": "33",
          "title": "北京林业大学园林学院实习基地",
          "original_image": "/attachs/honor/gallery/2014/1024/7uddylhpyurcem1.jpg"
        },
        {
          "id": "34",
          "title": "北京师范大学地理学与遥感科学学院实习基地",
          "original_image": "/attachs/honor/gallery/2014/1024/icmbdd449vk3ej2.png"
        },
        {
          "id": "35",
          "title": "北京第二外国语学院旅游管理学院实习基地",
          "original_image": "/attachs/honor/gallery/2014/1024/a8gbz2tzqwtymya.jpg"
        },
        {
          "id": "36",
          "title": "天津商业大学商学院实习基地",
          "original_image": "/attachs/honor/gallery/2014/1024/dutlukcdagmrrg7.png"
        },
        {
          "id": "39",
          "title": "中国智慧旅游优秀案例",
          "original_image": "/attachs/honor/gallery/2014/1031\\hpdrh6poafjtuqv.jpg"
        }
      ],
      "seo_message": {
      "meta_title": "巅峰介绍_北京巅峰智业旅游文化创意股份有限公司官方网站",
            "meta_keywords": null,
            "meta_description": "巅峰介绍_北京巅峰智业旅游文化创意股份有限公司官方网站",
            "meta_author": "巅峰智业,davost.com",
            "meta_copyright": "巅峰智业 Copyright (C), All Rights Reserved."
      }
    }
  },
  methods:{
    /*updateTime(e){
      //this.currentTime = e.target.currentTime
    },*/

    openBrand(index){
      this.currentBrandIndex = index;
    },
    closeBrand(index){
      this.currentBrandIndex = -1;
    },
    changeYear(year){
      let temp = this.memorabilia.filter(item => item.year === year);
      console.log(temp);
      this.memorabilia_dates = temp[0].child;
      this.filter_dates = this.memorabilia_dates.slice(0,4);
      this.currentYear = year;
    },
    changeDate(date){
      let temp = this.filter_dates.filter(item => item.addtime === date);
      console.log(temp);
      /*this.memorabilia_dates = temp[0].child;
      this.filter_dates = this.memorabilia_dates.slice(0,4);
      this.currentYear = year;*/
      this.currentDate = temp[0];
    },
    toLeft4(){
      let number = this.memorabilia_filter_number;
      if(number === 1){
        this.memorabilia_filter_number = Math.ceil(this.memorabilia.length / 7);
        number = Math.ceil(this.memorabilia.length / 7);
      }
      else{
        this.memorabilia_filter_number = this.memorabilia_filter_number -1;
        number = this.memorabilia_filter_number;
      }
      this.filter_memorabilia = this.memorabilia.slice((number-1)*7,number*7);
      console.log(this.memorabilia)
    },
    toRight4(){
      console.log(this.memorabilia_filter_number);
      let number = this.memorabilia_filter_number;
      if(number === Math.ceil(this.memorabilia.length / 7)){
        number = 1;
        this.memorabilia_filter_number = 1;
      }
      else{
        this.memorabilia_filter_number = this.memorabilia_filter_number + 1;
        number = this.memorabilia_filter_number;
      }
      this.filter_memorabilia = this.memorabilia.slice((number-1)*7,number*7);
    },
    toLeft5(){
      let number = this.qualification_filter_number;
      if(number === 1){
        this.qualification_filter_number = Math.ceil(this.enterprise_qualification.length / 8);
        number = Math.ceil(this.enterprise_qualification.length / 8);
      }
      else{
        this.qualification_filter_number = this.qualification_filter_number -1;
        number = this.qualification_filter_number;
      }
      this.filter_enterprise_qualification = this.enterprise_qualification.slice((number-1)*8,number*8);
    },
    toRight5(){
      let number = this.qualification_filter_number;
      if(number === Math.ceil(this.enterprise_qualification.length / 8)){
        number = 1;
        this.qualification_filter_number = 1;
      }
      else{
        this.qualification_filter_number = this.qualification_filter_number + 1;
        number = this.qualification_filter_number;
      }
      this.filter_enterprise_qualification = this.enterprise_qualification.slice((number-1)*8,number*8);
    },
    toLeft6(){
      let number = this.honor_filter_number;
      if(number === 1){
        this.honor_filter_number = Math.ceil(this.certificate_honor.length / 8);
        number = Math.ceil(this.certificate_honor.length / 8);
      }
      else{
        this.honor_filter_number = this.honor_filter_number -1;
        number = this.honor_filter_number;
      }
      this.filter_certificate_honor = this.certificate_honor.slice((number-1)*8,number*8);
    },
    toRight6(){
      console.log(this.honor_filter_number);
      let number = this.honor_filter_number;
      if(number === Math.ceil(this.certificate_honor.length / 8)){
        number = 1;
        this.honor_filter_number = 1;
      }
      else{
        this.honor_filter_number = this.honor_filter_number + 1;
        number = this.honor_filter_number;
      }
      this.filter_certificate_honor = this.certificate_honor.slice((number-1)*8,number*8);
    },
    toDown4(){
      let number = this.date_filter_number;
      if(number === Math.ceil(this.memorabilia_dates.length / 4)){
        number = 1;
        this.date_filter_number = 1;
      }else{
        this.date_filter_number = this.date_filter_number + 1;
        number = this.date_filter_number;
      }
      this.filter_dates = this.memorabilia_dates.slice((number-1)*4,number*4);
    },
  },
  created: function(){
    this.filter_certificate_honor = this.certificate_honor.slice(0,8);
    this.filter_enterprise_qualification = this.enterprise_qualification.slice(0,8);
    this.filter_memorabilia = this.memorabilia.slice(0,7);
    this.filter_dates = this.memorabilia_dates.slice(0,4);
    this.changeYear(this.filter_memorabilia[0].year);
    this.changeDate(this.filter_dates[0].addtime);
    this.currentBrandIndex = 0;
  }

};
</script>
<style scoped="scoped">
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.introduce-background{
  position: relative;
  width: 1920px;
  height: 700px;
  background: url("../../assets/presentation/Group 377.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}
.introduce-title{
  position: absolute;
  top: 248px;
  left: 813px;
  width: 395px;
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 14px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce-title2{
  position: absolute;
  top: 322px;
  left: 795px;
  width: 630px;
  height: 32px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 4px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce-divide{
  position: absolute;
  top: 370px;
  left: 920px;
  width: 80px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}

.icon-home{
  position: absolute;
  top: 570px;
  left: 236px;
  width: 24px;
  height: 24px;
  opacity: 1;
  box-sizing: border-box;
}
.icon-jiantou1{
  position: absolute;
  top: 574px;
  left: 272px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-jiantou2{
  position: absolute;
  top: 574px;
  left: 376px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.link1{
  position: absolute;
  top: 570px;
  left: 300px;
  width: 64px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.link2{
  position: absolute;
  top: 570px;
  left: 404px;
  width: 64px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.top-card{
  position: absolute;
  top: 624px;
  left: 236px;
  background: url("../../assets/bei/beijing.png");
  width: 1448px;
  height: 192px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  z-index: 100;
}
.chuangli{
  position: absolute;
  top: 80px;
  left: 105px;
  width: 40px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data1{
  position: absolute;
  top: 50px;
  left: 157px;
  width: 57px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix1{
  position: absolute;
  top: 77px;
  left: 218px;
  width: 24px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 28px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc1{
  position: absolute;
  top: 130px;
  left: 118px;
  width: 112px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.wanchengxiangmu{
  position: absolute;
  top: 80px;
  left: 304px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data2{
  position: absolute;
  top: 50px;
  left: 396px;
  width: 114px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix2{
  position: absolute;
  top: 70px;
  left: 514px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc2{
  position: absolute;
  top: 130px;
  left: 354px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.yunyingjingqu{
  position: absolute;
  top: 80px;
  left: 594px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data3{
  position: absolute;
  top: 50px;
  left: 686px;
  width: 85px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix3{
  position: absolute;
  top: 70px;
  left: 765px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc3{
  position: absolute;
  top: 130px;
  left: 630px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.ronghuojiangxiang{
  position: absolute;
  top: 80px;
  left: 855px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data4{
  position: absolute;
  top: 50px;
  left: 947px;
  width: 85px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix4{
  position: absolute;
  top: 70px;
  left: 1056px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc4{
  position: absolute;
  top: 130px;
  left: 891px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.gugan{
  position: absolute;
  top: 80px;
  left: 1116px;
  width: 100px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data5{
  position: absolute;
  top: 50px;
  left: 1228px;
  width: 114px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc5{
  position: absolute;
  top: 130px;
  left: 1165px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-background{
  position: relative;
  width: 1920px;
  height: 1000px;
  background: url("../../assets/img/beijing.png");
  background-size: 100% 100%;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce2-title{
  position: absolute;
  top: 216px;
  left: 236px;
  width: 176px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.about-us{
  position: absolute;
  top: 290px;
  left: 236px;
  width: 198px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-content1{
  position: absolute;
  top: 380px;
  left: 236px;
  width: 594px;
  height: 123px;
  font-size: 18px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #000000;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-content2{
  position: absolute;
  top: 534px;
  left: 236px;
  width: 584px;
  height: 384px;
  font-size: 18px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #000000;
  line-height: 32px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-video{
  position: absolute;
  top: 380px;
  left: 920px;
  background: url("../../assets/bei/epcjianshe.png");
  width: 764px;
  height: 470px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce3-background{
  position: relative;
  width: 1920px;
  height: 1342px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
}
.introduce3-title{
  position: absolute;
  top: 100px;
  left: 828px;
  width: 264px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-list{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 226px;
  left:236px;
}
.introduce3-item{
  margin-top: 32px;
}
.introduce3-item-row{
  display: flex;
  justify-content: space-between;
}
.introduce3-item-logo{
  background-color: #808080;
  width: 240px;
  height: 104px;
  border-radius: 0px 0px 0px 0px;
  background-size: 100% 100%;
  opacity: 1;
}
.introduce3-item-slogan{
  width: 390px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-item-btn1{
  width: 32px;
  height: 32px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce3-item-btn2{
  width: 32px;
  height: 32px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce3-item-brief{
  margin-top: 12px;
  width: 1440px;
  height: 48px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #C8000A;
  line-height: 38px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-item-summary{
  margin-top: 16px;
  width: 1312px;
  height: 100px;
  font-size: 20px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-divide{
  width: 1448px;
  height: 1px;
  background: #CACACA;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-top: 12px;
}


/*
.introduce3-img{
  position: absolute;
  top: 226px;
  left: 236px;
  background: url("../../assets/bei/logo.png");
  width: 282px;
  height: 68px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
*/
.introduce4-background{
  position: relative;
  background: url("../../assets/presentation/Group 390.png");
  width: 1919px;
  height: 773px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce4-title{
  position: absolute;
  top: 70px;
  left: 885px;
  width: 150px;
  height: 75px;
  font-size: 50px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 59px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-time{
  position: absolute;
  top: 354px;
  left: 373px;
  width: 250px;
  height: 65px;
  font-size: 60px;
  font-family: D-DIN-DIN-Bold, D-DIN-DIN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 70px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-content{
  position: absolute;
  top: 205px;
  left: 805px;
  width: 669px;
  height: 81px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-img{
  position: absolute;
  top: 306px;
  left: 805px;
  background: #808080;
  width: 608px;
  height: 260px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}




.introduce5-background{
  position: relative;
  width: 1920px;
  height: 1136px;
  background: #F4F4F4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce5-title{
  position: absolute;
  top: 102px;
  left: 872px;
  width: 176px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce5-zizhi{
  position: absolute;
  top: 228px;
  left: 153px;
  width: 128px;
  height: 26px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 26px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce5-to-left{
  position: absolute;
  top: 1042px;
  left: 868px;
  background: url("../../assets/presentation/Group 185.png");
  height: 57px;
  width: 57px;
}
.introduce5-to-right{
  position: absolute;
  top: 1042px;
  left: 963px;
  background: url("../../assets/presentation/Group 321.png");
  height: 57px;
  width: 57px;
}
.introduce6-background{
  position: relative;
  width: 1920px;
  height: 1372px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
}
.introduce6-title{
  position: absolute;
  top: 156px;
  left: 155px;
  width: 128px;
  height: 26px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 26px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}

.introduce6-to-left{
  position: absolute;
  top: 850px;
  left: 868px;
  background: url("../../assets/presentation/Group 185.png");
  height: 57px;
  width: 57px;
}
.introduce6-to-right{
  position: absolute;
  top: 850px;
  left: 963px;
  background: url("../../assets/presentation/Group 321.png");
  height: 57px;
  width: 57px;
}
.introduce6-list{
  position: absolute;
  top: 294px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.introduce6-list > div{
  width: 20%
}
.introduce6-item{
  width: 400px;
  height: 270px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-right: 19px;
}
.introduce6-image{
  background-color: #545454;
  width: 358px;
  height: 230px;
}
.introduce5-list{
  position: absolute;
  top: 294px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.introduce5-list > div{
  width: 20%
}
.introduce5-item{
  width: 400px;
  height: 270px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-right: 19px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.introduce5-item:nth-child(n+5){
  margin-top: 40px;
}
.introduce5-image{
  background-color: #545454;
  width: 358px;
  height: 230px;
  display: block;
  margin-bottom: 8px;
}
.introduce5-item-title{
  width: 100%;
  height: 26px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 26px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-left-and-right{
  justify-content: center;
  vertical-align: middle;
}
.introduce4-to-left{
  position: absolute;
  top: 679px;
  left: 164px;
  background: url("../../assets/presentation/Group 185.png");
  height: 57px;
  width: 57px;
}
.introduce4-to-right{
  position: absolute;
  top: 679px;
  left: 1716px;
  background: url("../../assets/presentation/Group 321.png");
  height: 57px;
  width: 57px;
}
.introduce4-divider{
  position: absolute;
  top: 707px;
  left: 236px;
  width: 1448px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce4-x-time-list{
  position: absolute;
  top: 649px;
  left: 276px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

}
.introduce4-x-time-list > div{
   width: 4%
 }

.introduce4-x-time{
  width: 60px;
  height: 35px;
  font-size: 32px;
  font-family: D-DIN-DIN-Bold, D-DIN-DIN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 38px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-x-time:nth-child(n+1){
  margin-right: 160px;
}
.introduce4-y-time-list{
  position: absolute;
  top: 214px;
  left: 667px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /*justify-content: center;*/

}
.introduce4-y-time-item{
  margin-top: 44px;
  width: 100px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 28px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-y-item-date{

}
/*.introduce4-x-time-list{

}
.introduce4-x-time-list > div{
  width: 4%
}*/
.introduce4-to-down{
  position: absolute;
  top: 522px;
  left: 743px;
  background: url("../../assets/presentation/icon_xiala.png");
  width: 40px;
  height: 30px;
  opacity: 1;
}
.introduce4-y-line{
  position: absolute;
  top: 205px;
  left: 763px;
  width: 2px;
  height: 300px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
}
.x-dot1{
  background: #fff;
  position: absolute;
  top: 692px;
  left: 328px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.x-dot2{
  position: absolute;
  top: 705px;
  left: 555px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}
.x-dot3{
  position: absolute;
  top: 705px;
  left: 782px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}
.x-dot4{
  position: absolute;
  top: 705px;
  left: 1007px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}
.x-dot5{
  position: absolute;
  top: 705px;
  left: 1232px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}
.x-dot6{
  position: absolute;
  top: 705px;
  left: 1455px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}
.x-dot7{
  position: absolute;
  top: 705px;
  left: 1678px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}
</style>
