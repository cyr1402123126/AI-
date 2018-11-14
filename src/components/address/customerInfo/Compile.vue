<template>
  <div class="wraper">
    <div class="list">
      <ul>
        <li>
          <img class="left" :src="src" alt="">
          <div class="right">{{ name }}</div>
        </li>
        <li>
          <p class="left">备注名</p>
          <input type="text" placeholder="未填写" v-model="remarkName">
        </li>
        <li>
          <p class="left">公司</p>
          <input type="text" placeholder="未填写" v-model="company">
        </li>
        <li>
          <p class="left">职位</p>
          <input type="text" placeholder="未填写" v-model="major">
        </li>
        <li>
          <p class="left">性别</p>
          <van-radio-group v-model="sex">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </li>
        <router-link :to="{name:'addTags'}" tag="li">
          <p class="left">标签</p>
          <p class="right">共<span>{{ tags }}</span>个<img src="@/assets/images/icons_right.png" style="width: .25rem;height: .4rem;margin: 0 0 0.05rem .25rem;" alt=""></p>
        </router-link>
        <li>
          <p class="left">备注手机</p>
          <input type="number" placeholder="未填写" v-model="phone">
        </li>
        <li>
          <p class="left">邮箱</p>
          <input type="text" placeholder="未填写" v-model="email">
        </li>
        <li>
          <p class="left">详细地址</p>
          <input type="text" placeholder="未填写" v-model="address">
        </li>
        <li @click="getBirthDay">
          <p class="left">生日</p>
          <input type="text" placeholder="未填写" readonly v-model="birthDay">
        </li>
        <li>
          <p class="left">屏蔽TA的消息推送</p>
          <van-switch v-model="checked" />
        </li>
        <li>
          <p style="height: 1rem">备注</p>
          <textarea v-autosize placeholder="未填写" v-model="discuss"></textarea>
        </li>
      </ul>
    </div>
    <input type="button" value="保存" @click="save">

    <!--时间选择器-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :max-date="maxDate"
        :min-date="minDate"
        @confirm="confirm"
      />
    </van-popup>
  </div>

</template>

<script>
  export default {
    name: "Compile",
    data() {
      return {
        // 信息
        src: '',
        name:"燕子",
        remarkName: '',
        company: '',
        major: '',
        sex: '0',
        phone: '',
        email: '',
        address: '',
        birthDay: '44',
        discuss: '',
        checked: false,
        tags:0,

        show:false,
        maxDate: new Date(),
        minDate: new Date(1950, 1, 1),
        currentDate: new Date(1993, 6, 7),
      }
    },
    created() {
      this.$store.commit('getAddressActive',0);
      this.axios.post('customer_detail.php?type=customer_detail&token=af79028c6574ed3b6359b74ab0112796&category=customer',{
        customer_id: this.$route.params.id
      }).then(res=>{
        let data = res.data;
        this.name = data.wechat;
        this.src = data.src;
        this.remarkName = data.name;
        this.company = data.company;
        this.major = data.major;
        this.sex = data.sex;
        this.phone = data.remarkPhone;
        this.email = data.email;
        this.address = data.where;
        this.birthDay = data.birthday;
        this.discuss = data.remark;
        this.checked = data.is_send_msg;
        this.tags = data.tag;
      })
    },
    methods: {
      getBirthDay() {
        this.show=true;
      },
      confirm(val) {
        let month = val.getMonth() + 1;
        let day = val.getDate();
        month = month < 10 ? ('0'+month) : month;
        day = day < 10 ? ('0'+day) : day;
        // this.birthDay=val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate();
        this.birthDay=val.getFullYear() + '-' + month + '-' + day;
        this.show=false;
      },
      save() {
        let data = {
          customer_id: this.$route.params.id,
          name: this.remarkName,
          company: this.company,
          major: this.major,
          sex: this.sex,
          remarkPhone: this.phone,
          email: this.email,
          where: this.address,
          birthday: this.birthDay,
          remark: this.discuss,
          is_send_msg: this.checked,
          tags: this.tags
        };
        this.axios.post('customer_detail.php?type=customer_detail&token=af79028c6574ed3b6359b74ab0112796&category=edit_customer',data)
          .then(res=>{
            console.log(res.data);
          })
        if (this.beforeSbmit()) {
          this.$toast('保存成功');
          this.$router.go(-1);
        }
      },
      beforeSbmit() {
        if (this.phone != '' && !(/^1[34578]\d{9}$/.test(this.phone))) {
          this.$toast('手机号码有误,请重填');
          return false;
        }
        if (this.email != '' && !/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(this.email)) {
          this.$toast('请填写正确的邮箱格式');
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    padding: .4rem;
    padding-top: 0rem;
    margin-bottom: 4rem;
    ul {
      li {
        height: 1.5rem;
        line-height: 1.5rem;
        vertical-align: middle;
        color: #333333;
        font-size: .4rem;
        clear: both;
        position: relative;
        img {
          width: 1rem;
          height: 1rem;
          margin-top: .25rem;
          border-radius: .1rem;
        }
        input {
          text-align: right;
          float: right;
          color: #888888;
        }
        textarea{
          resize:none;
          background: #fff;
          width: 100%;
          height: 2.5rem;
          border: none;
          line-height: 1.8;
          color: #888;
          margin-top: .25rem;
        }
      }
      li:not(:last-child):after {
        position: absolute;
        content: '';
        /*top: 0%;*/
        bottom: 0;
        left: -50%;
        right: -50%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-top: 1px solid #efefef;
        height: 0px;
      }
    }
  }
  input[type=button] {
    width: 100%;
    height: 1.5rem;
    background: #3b83ff;
    text-align: center;
    color: #fff;
    position: fixed;
    bottom: 0;
    font-size: .48rem;
    z-index: 1000;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #b3b3b3;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #b3b3b3;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #b3b3b3;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #b3b3b3;
  }
  @media (-webkit-min-device-pixel-radio: 1.5), (min-device-pixel-radio: 1.5) {
    border-1px::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-radio: 2), (min-device-pixel-radio: 2) {
    border-1px::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .van-radio-group {
    float: right;
  }
  .van-radio {
    float: left;
    margin-left: .4rem;
  }
  .van-switch {
    float: right;
    margin-top: .3rem;
  }
  .wraper {
    overflow: hidden;
  }
  .wraper::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  .van-radio .van-icon-checked {
    background: #3e84ff;
  }
</style>
