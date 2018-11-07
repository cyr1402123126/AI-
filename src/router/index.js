import Vue from 'vue'
import Router from 'vue-router'

const Rader =()=>import('@/components/public/Rader')
const Behavior =()=>import('@/components/home/Behavior')
const Person =()=>import('@/components/home/Person')
const Time =()=>import('@/components/home/Time')
const ApplyAI =()=>import('@/components/apply/ApplyAI')
const ApplyCard =()=>import('@/components/apply/ApplyCard')
const ApplyLine =()=>import('@/components/apply/ApplyLine')
const ApplyState =()=>import('@/components/apply/ApplyState')
const Info =()=>import('@/components/public/Info')
const Address =()=>import('@/components/public/Address')
const Work =()=>import('@/components/public/Work')
const Me =()=>import('@/components/public/Me')
const Base =()=>import('@/components/Base')
const Myself =()=>import('@/components/me/Myself')
const List =()=>import('@/components/me/List')
const Self =()=>import('@/components/me/myself/Self')
const MeInfo =()=>import('@/components/me/info/MeInfo')
const MePerson =()=>import('@/components/me/info/MePerson')
const MePoster =()=>import('@/components/me/info/MePoster')
const MeStyle =()=>import('@/components/me/info/MeStyle')
const MeVedio =()=>import('@/components/me/info/MeVedio')
const Card =()=>import('@/components/me/Info')
// const HomeInfo =()=>import('@/components/home/info/Info')
const LookCard =()=>import('@/components/home/look/LookCard')
const CustomerInfo =()=>import('@/components/address/CustomerInfo')
const Compile =()=>import('@/components/address/customerInfo/Compile')

const suggest =()=>import('@/components/me/suggest/suggest')
const Confirmsuggest = ()=>import('@/components/me/suggest/Confirmsuggest')
const edit =()=>import('@/components/apply/edit')
const Chat =()=>import('@/components/chat/Chat')

Vue.use(Router)

export default new Router({
  // mode:"history",
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: to.meta.savedPosition || 0};
  },
  routes: [
    {path: '/', name: 'Rader',redirect:'/time', component: Base,meta:{title:"雷达"},children:[
        {path: '/behavior', name: 'behavior', component: Behavior},
        {path: '/person', name: 'person', component: Person},
        // {path: '/time/:id', name: 'time', component: Time,meta:{title:"雷达"}},
        {path: '/time', name: 'time', component: Time,meta:{title:"雷达"}},
        {path: '/info', name: 'info', component: Info,meta:{title:"消息"}},
        {path: '/address', name: 'address', component: Address,meta:{title:"通讯录"}},
        {path: '/work', name: 'work', component: Work,meta:{title:"工作"}},
        {path: '/me', name: 'me', component: Me,meta:{title:"我"}},


        //我的
        {path:'/me/myself',name:'myself',component:Myself,meta:{title:"我的动态"}},

      ]},
    // {path:'/',name:'meVedio',component:List,meta:{title:"视频"}},
    {path:'/me/list/mePerson',name:'mePerson',component:MePerson,meta:{title:"编辑名片"}},
    //动态详情
    {path:'/me/myself/:id',name:'self',component:Self,meta:{title:"动态详情"}},
    //客户详情
    // {path:'/time/:id/:userId',name:'homeInfo',component:HomeInfo,meta:{title:"客户详情"}},
    //查看名片
    {path:'/behavior/lookCard',name:'lookCard',component:LookCard,meta:{title:"查看名片"}},
    //客户详情
    {path:'/address/:id',name:'customerInfo',component:CustomerInfo,meta:{title:"查看名片"}},
    {path:'/address/customerInfo/compile',name:'compile',component:Compile,meta:{title:"资料详情"}},


    //意见列表
    {path:'/me/suggest',name:'suggest',component:suggest,meta:{title:"意见反馈"}},
    //意见提交
    {path:'/me/confirmsuggest',name:'confirmsuggest',component:Confirmsuggest,meta:{title:"意见反馈"}},
    //发布
    {path:'/work/edit',name:'edit',component:edit,meta:{title:"编辑"}},

    //聊天室
    {path:'/info/:staff_id/:customer_id',name:'chat',component:Chat,meta:{title:"发送信息"}},
    // 我的应用
    {path:'/work/ai',name:'applyAI',component:ApplyAI,meta:{title:"AI报表"}},
    {path:'/work/card',name:'applyCard',component:ApplyCard,meta:{title:"我的名片日报"}},
    {path:'/work/line',name:'applyLine',component:ApplyLine,meta:{title:"排行榜"}},
    {path:'/work/state',name:'applyState',component:ApplyState,meta:{title:"动态"}},

    //编辑名片
    {path:'/me/list',name:'list',component:List,meta:{title:"编辑名片"}},
    {path:'/me/list/meInfo',name:'meInfo',component:MeInfo,meta:{title:"编辑基本信息"}},
    {path:'/me/list/mePoster',name:'mePoster',component:MePoster,meta:{title:"名片海报"}},
    {path:'/me/list/meStyle',name:'meStyle',component:MeStyle,meta:{title:"名片样式"}},
    {path:'/me/list/meVedio',name:'meVedio',component:MeVedio,meta:{title:"视频"}},
    {path:'/me/card',name:'card',component:Card,meta:{title:"我的名片"}},
  ]
})
