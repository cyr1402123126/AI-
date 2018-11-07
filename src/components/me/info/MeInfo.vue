<template>
  <div class="meInfo">
    <p class="meInfo-person">个人信息</p>
    <van-cell-group>
      <van-field
        v-model="username"
        type="text"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="phone"
        type="number"
        label="手机"
        placeholder="请输入号码"
      />
      <van-field
        v-model="wechat"
        type="text"
        label="微信"
        placeholder="请填写"
      />
      <van-field
        v-model="telphone"
        type="number"
        label="座机"
        placeholder="请填写"
      />
      <van-field
        v-model="mailbox"
        type="text"
        label="邮箱"
        placeholder="请填写"
      />
      <van-field
        v-model="area"
        type="text"
        label="地区"
        placeholder="选择省/市/区"
        @click="selectArea()"
        readonly
      />
      <van-field
        v-model="location"
        type="text"
        label="地址"
        placeholder="请填写"
      />
    </van-cell-group>
    <div class="meInfo-footer">
      <van-button size="large" @click="save">保存</van-button>
    </div>

    <!--省市区选择-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-area :area-list="areaList"
                @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import area from '@/area.js'
  export default {
    name: "MeInfo",
    data() {
      return {
        username:'',
        areaList:'',
        phone:"",
        wechat:"",
        telphone:"",
        mailbox:"",
        location:"",
        area:"",
        show:false,
        areaList:{
          province_list: area.province_list,
          city_list: area.city_list,
          county_list: area.county_list
        },
        searchResult: [1,2,3]
      }
    },
    created() {
      this.$store.commit('getActive',4)
      this.axios.get('cardDetail.php?type=info&token=cb81cd5b8407b0bb01edd81576e1cdfd')
        .then(res=>{
          console.log(res.data);
          this.username=res.data.username;
          this.phone=res.data.phone;
          this.wechat=res.data.wechat;
          this.telphone=res.data.telphone;
          this.mailbox=res.data.mailbox;
          this.location=res.data.location;
          this.area=res.data.area;
          console.log(res.data);
        })
    },
    methods: {
      selectArea() {
        this.show=true
      },
      confirm(val) {
        var area=val.map(val=>{
          // console.log(val.name);
          return val.name;
        })
        this.area=area.toString();
        this.show=false;
      },
      save() {
        let company_id=this.getCookie('company_id');
        let staff_id=this.getCookie('staff_id');
        // let qs = require('qs');
        let data={
          username:this.username,
          phone:this.phone,
          wechat:this.wechat,
          telphone:this.telphone,
          mailbox:this.mailbox,
          area:this.area,
          location:this.location,
          company_id:company_id,
          staff_id:staff_id
        };
        if (this.beforeSubmit()) {
          this.axios.post('cardDetail.php?type=cardDetail&token=84dbe86a4685520e49c6bdf777b49209',data)
            .then(res=>{
              let status=res.data.code;
              if (status == '402') {
                Toast('请填写信息');
              }else if (status == '401' || status == '400') {
                Toast('网络出错');
              }else if (status == '200'){
                Toast('保存成功');
                this.$router.push('/me/list')
              }
              console.log(res);
            });
        }

      },
      beforeSubmit() {
        if (this.username == '') {
          Toast('请輸入姓名');
          return false;
        }
        if (this.phone == '') {
          Toast('请填写手机号码');
          return false;
        }
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          Toast('手机号码有误,请重填');
          return false;
        }
        if (this.wechat == '') {
          Toast('请填写微信号');
          return false;
        }
        if (this.telphone == '') {
          Toast('请填写座机号码');
          return false;
        }
        /*if (!(/^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/.test(this.telphone))) {
          Toast('座机号码格式不对,请重填');
          return false;
        }*/
        if (this.mailbox == '') {
          Toast('请填写邮箱');
          return false;
        }
        if (! /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(this.mailbox)) {
          Toast('请填写正确的邮箱格式');
          return false;
        }
        if (this.area == '') {
          Toast('请选择地区');
          return false;
        }
        if (this.location == '') {
          Toast('请填写地址');
          return false;
        }
        return true;
      }
    },
    mounted() {
      var flag=true;
      window.onresize=function () {
        if (flag) {
          document.querySelector('.van-hairline--top-bottom').style.visibility = "hidden";
          flag = false;
        } else {
          document.querySelector('.van-hairline--top-bottom').style.visibility = "visible";
          flag = true;
        }
      }
    }
  }
</script>

<style scoped>
  .meInfo {

  }
  .meInfo-person {
    margin: .4rem .35rem;
  }
  .van-button--default {
    background: #3b83ff;
    color: #fff;
    width: 100%;
    border-radius: .12rem;
  }
  .meInfo-footer {
    width:100%;
    box-sizing: border-box;
    padding: .5rem .3rem;
  }
</style>
