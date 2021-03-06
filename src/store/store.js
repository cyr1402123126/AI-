import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    // 设置属性
    menuItems:{},
    currentUser: null,
    isLogin:false,
    test:'4',

    //id
    staff_id:'',
    customer_id:'',
    active:0,
    //跟进添加标签
    newTags:[],
    myTag:'选择跟进常用语',
    //标签页面保存自定义标签
    // tags:[ {name: '莫泊桑',id: '莫泊桑',show: false}],
    tags:[],
    //客户详情标签
    customerTags: ['添加标签','添加标签','添加标签'],
    //通讯录底边栏激活
    active1:0,
    //获取通讯录id
    addressData : {}
  },
  getters:{
    // 获取属性的状态
    getMenuItems: state => state.menuItems,
    currentUser:state => state.currentUser,
    isLogin:state => state.isLogin
  },
  mutations:{
    // 改变属性的状态
    setMenuItems(state,data){
      state.menuItems = data
    },
    // 将匹配到对象,在menuItems数组中删除
    removeMenuItems(state,data){
      state.menuItems.forEach((item,index) => {
        if(item == data){
          state.menuItems.splice(index,1)
        }
      });
    },
    // 将新添加的pizza Push到menuItems属性中
    pushToMenuItems(state,data){
      state.menuItems.push(data)
    },
    // 更改用户的状态信息
    userStatus(state,user){
      if(user){
        state.currentUser = user
        state.isLogin = true
      }else{
        state.currentUser = null
        state.isLogin = false
      }
    },

    test(state,data) {
      state.test=data;
    },
    getStaff_id(state,data) {
      state.staff_id=data;
    },
    getCustomer_id(state,data) {
      state.customer_id=data;
    },
    getActive(state,data) {
      state.active=data;
    },
    //添加跟进标签
    saveTag(state,data) {
      state.newTags.unshift(data);
    },
    //删除跟进标签
    deleteTag(state,index) {
      state.newTags.splice(index,1)
    },
    //选择跟进标签
    selectTag(state,data) {
      state.myTag=data;
    },
    //标签页面保存自定义标签
    addTag(state,data) {
      state.tags.push(data)
    },
    //通讯录底边栏激活
    getAddressActive(state,data) {
      state.active1 = data;
    },
    //新建任务获取通讯录id
    getAddress(state,data) {
      state.addressData = data;
    },
    //新建任务保存多个头像
    saveAddressImg (state,data) {
      console.log(state.addressData);
      state.addressData.customer_ids = data;
    }


  },
  actions:{
    // 应用mutations
    setUser({commit},user){
      commit("userStatus",user)
    }
  },
  plugins: [vuexAlong]
})
