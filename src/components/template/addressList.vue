<template>
  <div>
    <div class="address">
      <van-search
        v-model="value"
        placeholder="请输入搜索用户名"
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
          <p class="right">共{{ count }}名客户</p>
          <div class="triange-bottom">
          </div>
        </div>
        <vue-better-scroll
          style="height:70vh;"
          class="wrapper"
          ref="scroll"
          :scrollbar="scrollbarObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingUp="onPullingUp">
          <!--内容-->
          <ul class="address-ul" v-if="showAddress">
            <router-link :to="{name:'customerInfo',params:{id:item.id}}" tag="li" v-for="(item,index) in address" :key="index">
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
          <ul class="address-ul" v-if="!showAddress">
            <li v-for="(item,index) in address" :key="index">
              <van-checkbox-group v-model="result">
                <van-checkbox
                  :name="item.id"
                >
                  <!--复选框 {{ item.id }}-->
                  <div class="left"><img :src="item.src" alt="" style="width: 1.45rem;margin-bottom: .6rem;"></div>
                  <div class="left address-name">
                    <p>{{ item.name }}</p>
                    <p>{{ item.content }}</p>
                  </div>
                  <div class="right">
                    <p>{{ item.last }}</p>
                    <p>{{ item.time }}</p>
                  </div>
                </van-checkbox>
              </van-checkbox-group>
            </li>
          </ul>
        </vue-better-scroll>
        <div class="button">
          <input v-if="!showAddress" type="button" class="save" value="保存" @click="save">
        </div>
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
  </div>
</template>

<script>
  import VueBetterScroll from 'vue2-better-scroll'
  let count = 1;
  export default {
    name: "addressList",
    data() {
      return {
        //复选框
        result : [this.$route.params.id],

        addressData : [],
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
        // address:this.Address,
        columns: ['预计成交率', '最后跟进时间', '最后活动时间', '工作交接', '扫码','转发'],
        show:false,
        // count:this.Count,

        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: {
          fade: true
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: ' ',
            noMore: '没有更多数据了'
          }
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: []
      }
    },
    props :['showAddress','address','count'],
    components: {
      VueBetterScroll
    },
    created() {
      /*setTimeout(()=> {
        this.address = this.Address;
        this.count = this.Count;
      },100)*/
      // this.address = this.Address;
      // this.count = this.Count;

      // console.log(this.Address);
      this.$store.commit('getActive',2);
      this.$store.commit('getAddressActive',0);
      /*this.addressData = this.$store.state.addressData.customers;
      this.addressData.forEach(val => {
        this.result.push(val.customer_id);
      })*/
      this.result = this.$store.state.addressData.customer_ids[0];
      this.$store.commit('saveAddressImg',this.result)
      console.log(this.$store.state.addressData.customer_ids[0]);
      // this.axios.get('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c')
      this.axios.get('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c')
        .then(res=>{
          this.address=res.data.data;
          this.count=res.data.count;
        })
    },
    methods:{
      onSearch() {
        this.axios.post('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c',{
          name: this.value
        }).then(res => {
          res.data.data.length == 0 ? this.$toast('用户不存在,请重新搜索') : '';
          this.address = res.data.data;
          this.count = res.data.count;
        })
      },
      onConfirm(value, index) {
        this.axios.post('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c',{
          cate: index
        }).then(res => {
          res.data.data.length == 0 ? this.$toast('用户不存在') : '';
          /*if (res.data.data.length == 0) {
            this.$toast('用户不存在')
          }*/
          this.address = res.data.data;
          this.count = res.data.count;
        })
        this.stateValue=value;
        this.show=false;
        // Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onCancel() {
        this.show=false;
      },
      getState() {
        this.show=true
      },
      // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 模拟数据请求
      getData () {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = [];
            count++;
            console.log(count);
            this.axios.post('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c',{
              page:count
            }).then(res=>{
              console.log(res.data.data);
              let length=res.data.data.length;
              if (length == 0) {
                this.$toast('无更多数据')
              }
              for (let i = 0; i < length; i++) {
                this.address.push(res.data.data[i])
                // this.address=res.data.data;
              }
              this.count=res.data.count;
              // console.log(this.introduce);
              resolve(arr)
            })
          }, 1000)
        })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        this.getData().then(res => {
          this.items = this.items.concat(res)
          if(count<50){
            this.$refs.scroll.forceUpdate(true)
          }else{
            this.$refs.scroll.forceUpdate(false)
          }
        })
      },
      save () {
        console.log(this.result);
        let storeData = this.$store.state.addressData;
        let data = {
          customer_ids : this.result,
          discuss : storeData.discuss,
          remark : storeData.remark,
          time : storeData.time
        }
        // this.$router.go(-1);
        this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=get_customer',data)
          .then(res => {
            this.$store.commit('getAddress',data)
            this.$router.go(-1);
          }).catch(err => {
          console.log(err);
        })
        // console.log(data);
        // console.log(this.result);
      }
    },
    watch:{
      getInfo(value,oldValue){
        console.log(value);
      }
    },
  }
</script>
<style scoped>
  .van-search {
    padding: 10px 15px;
    position: relative;
    z-index: 1;
  }
  .address-list {
    padding: 0rem .5rem .4rem .5rem;
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
    z-index: 2;
    background: #fff;
  }
  .triange-bottom {
    position: absolute;
    left: 31%;
    bottom: .28rem;
    width:0;
    height:0;
    border: .15rem solid;
    border-color: #666 transparent transparent;
  }
  .van-checkbox-group {
    /*float: left;*/
  }
  .button {
    width: 100%;
    height: 1.5rem;
    position: fixed;
    bottom: 0;
    padding-bottom: .2rem;
    left: 0;
    background: #fff;
    text-align: center;
  }
  .save {
    background: #3b83ff;
    color: #fff;
    width: 9.7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    /*margin-top: 1.2rem;*/
    font-size: .46rem;
    border-radius: .15rem;
  }
</style>
