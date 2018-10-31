<template>
    <div class="address">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <div class="address-list">
        <div class="address-select clearfix">
          <!--<select v-model="getInfo" class="left">-->
            <!--<option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</option>-->
          <!--</select>-->
          <input type="text" readonly @click="getState()" :value="stateValue">
          <span></span>
          <p class="right">共20名客户</p>
          <div class="triange-bottom">
          </div>
        </div>
        <ul class="address-ul">
          <router-link :to="{name:'customerInfo'}" tag="li" v-for="(item,index) in address" :key="index">
          <!--<router-link :to="{name:'address'}" tag="li" v-for="(item,index) in address" :key="index">-->
            <div class="left"><img :src="item.src" alt=""></div>
            <div class="left address-name">
              <p>{{ item.name }}</p>
              <p>{{ item.content }}</p>
            </div>
            <div class="right">
              <p>{{ item.last }}</p>
              <p>{{ item.time }}</p>
            </div>
          </router-link>
        </ul>
      </div>

      <!--选择器-->
      <van-popup v-model="show" position="bottom" :overlay="true">
        <van-picker
          show-toolbar
          title=""
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
</template>

<script>
  export default {
    name: "Address",
    data() {
      return {
        value:'',
        getInfo:0,
        stateValue:'最后活动时间',
        stateList:[
          {value:0,label:"最后活动时间"},
          {value:1,label:"开发中"},
          {value:2,label:"已完成"},
          {value:3,label:"停用"},
          {value:4,label:"已变更"},
        ],
        address:[],
        columns: ['预计成交率', '最后跟进时间', '最后活动时间', '工作交接', '扫码','转发'],
        show:false
      }
    },
    methods:{
      onSearch() {
        // console.log(this.value);
      },
      onConfirm(value, index) {
        // console.log(value);
        this.stateValue=value;
        this.show=false;
        // Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onCancel() {

      },
      getState() {
        this.show=true
      }
    },
    watch:{
      getInfo(value,oldValue){
        console.log(value);
      }
    },
    created() {
      // this.axios.get('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c').then(res=>{
      //   console.log(res.data);
      //   this.address=res.data;
      // })
      // this.axios.get('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c')
      this.axios.get('http://localhost:3000/address')
        .then(res=>{
          console.log(res);
          this.address=res.data;
        })
    }
  }
</script>

<style scoped>
  .van-search {
    padding: 10px 15px;
  }
  .address-list {
    padding: .4rem .5rem;
  }
  .left>img {
    float: left;
    width: 1.45rem;
  }
  .address li {
    height: 1.9rem;
    line-height: 1.9rem;
    border-bottom: 1px solid #eee;
    clear: both;
    padding-top: .2rem;
    box-sizing: border-box;
  }
  .address .address-name,.right {
    margin-top: .1rem;
    line-height: normal;
  }
  .address .address-name p:nth-child(1) {
    color: #333;
  }
  .address .address-name p:nth-child(2) {
    color: #3e84ff;
  }
  .address li p {
    font-size: .42rem;
    margin-left: .3rem;
  }
  .address-ul .right>p {
    font-size: .33rem;
    color: #c2bfbf;
    text-align: right;
  }
  .address-ul .right>p:nth-child(1) {
    margin-top: .1rem;
  }
  select {
    border: none;
    outline: none;
    font-size: .42rem;
    height: 1rem;
    width: 3.3rem;
  }
  .address-select>p {
    font-size: .42rem;
    height: 1rem;
    line-height: 1rem;
    color: #9a9a9a;
  }
  input[type=text] {
    height: 1rem;
    padding-top: .2rem;
    box-sizing: border-box;
  }
  div.address-select{
    position: relative;
  }
  .triange-bottom {
    position: absolute;
    left: 29%;
    bottom: .26rem;
    width:0;
    height:0;
    border: .15rem solid;
    border-color: #666 transparent transparent;
  }
</style>
