<template>
  <div class="background">
    <div class="task">
      <div class="content border-1px">
        <div class="top">主题</div>
        <textarea v-model="discuss" class="discuss" v-autosize name="" placeholder="例如:电话回访客户"></textarea>
      </div>
      <div class="content border-1px">
        <div class="top">日期及时间</div>
        <!--<p v-show="!showDelete" @click="showTime">{{ time | translateTime }}</p>-->
        <!--<p v-show="showDelete" @click="showTime">{{ time }}</p>-->
        <p @click="showTime">{{ time }}</p>
      </div>
      <div class="content border-1px" style="padding-bottom: .5rem">
        <div class="top clearfix">关联客户 <span class="right">{{ customer.length+'/100' }}</span></div>
        <div class="images clearfix">
          <div v-show="showCustomer" class="img" v-for="(item,index) in customer" :key="index" @click="deleteCustomer(item,index)">
            <img class="head" :src="item.cover" alt="">
            <img class="close" src="@/assets/images/me_close.png" alt="">
            <p>{{ item.name }}</p>
          </div>
          <router-link @click.native="saveData" style="margin-top: .07rem" class="img" tag="div" :to="{name:'addressList',params:{id:this.$route.params.id}}">
            <div class="img">
              <div class="push">+</div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="content">
        <div class="top">备注</div>
        <textarea v-model="remark" class="discuss" v-autosize name="" placeholder="请填写"></textarea>
      </div>
      <div style="text-align: center">
        <input type="button" value="保存" @click="save">
        <input v-show="showDelete" type="button" value="删除" @click="deleteTask">
      </div>
    </div>
    <!--时间选择器-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "Task",
    data() {
      return {
        show:false,
        discuss: '',
        remark: '',
        time :new Date(),
        customer_ids : [this.$route.params.id],
        customer : [],
        showDelete : false,
        showcustomer:true,
        //时间选择
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2028, 12, 31),
        currentDate: new Date()
      }
    },
    filters : {
      translateTime (val) {
        this.changeDate(val);
        /*console.log(val);
        var date = new Date(val);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() <10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() <10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes());
        return val = Y+M+D+h+m;*/
      }
    },
    beforeRouteEnter (to,from,next) {
      if (from.name == 'addressList') {
        next(vm => {
          console.log(vm.$store.state.addressData.customer_ids);
          vm.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=get_customer',{
            customer_ids : vm.$store.state.addressData.customer_ids,
          }).then(res => {
            vm.customer = res.data.data.customer;
            vm.customer_ids = vm.$store.state.addressData.customer_ids;
            vm.$store.commit('saveAddressImg',vm.$store.state.addressData.customer_ids);
          })
        })
      } else if (to.params.taskId > 0) {
        // alert(1)
        next(vm => {
          vm.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=edit_task',{
            id : vm.$route.params.taskId
            // id : vm.$store.state.addressData.customer_ids
          }).then(res => {
            vm.showDelete = true;
            let data = res.data.data;
            let time = new Date(data.time);
            vm.customer = data.customer;
            vm.time = data.time;
            vm.discuss = data.discuss;
            vm.remark = data.remark;
            vm.$store.commit('saveAddressImg',vm.$store.state.addressData.customer_ids);
            let arr = [];
            data.customer.forEach((val)=> {
              arr.push(val.customer_id)
            })
            vm.customer_ids = arr;
            vm.$store.commit('saveAddressImg',arr);
          })
        })
      } else {
        next(vm => {
          console.log(vm.$store.state.addressData.customer_ids);
          console.log(vm.$route.params.id);
          vm.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=get_customer', {
            customer_ids: [vm.$route.params.id],
          }).then(res => {
            // vm.showCustomer =true;
            res.data.data.customer
            console.log(res.data.data.customer);
            vm.customer = res.data.data.customer;
            let time =vm.changeDate(new Date());
            vm.discuss = '';
            vm.remark = '';
            vm.time = time;
          })
        });
      }
      next(true)
    },
    created () {
      let data = this.$store.state.addressData;
      this.discuss = data.discuss;
      this.remark = data.remark;
      this.time = data.time;
      this.$store.commit('getAddressActive',1);
    },
    computed : {
      showCustomer () {
        if (this.$route.params.taskId == -1) {
          return this.showcustomer=false;
        }else {
          return this.showcustomer=true;
        }
        // return this.showcustomer=true;
      }
    },
    methods: {
      changeDate (val) {
        var date = new Date(val);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() <10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() <10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes());
        return Y+M+D+h+m;
      },
      //时间选择
      showTime () {
        this.show = true;
      },
      confirm(val) {
        let time = this.changeDate(val)
        this.showDelete = false;
        this.time = time;
        this.show = false;
      },
      cancel() {
        this.show = false;
      },
      deleteCustomer (item,index) {
        this.customer_ids.remove(item.customer_id)
        this.customer.splice(index,1);
      },
      deleteTask () {
        this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
          status : 2,
          id : this.$route.params.taskId
        }).then(res => {
          this.$router.go(-1)
        })
      },
      save() {
        if (this.discuss == '') {
          this.$toast('主题不能为空');
        }else {
          this.customer_ids.remove(0);
          this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
            discuss : this.discuss,
            time : this.time,
            remark : this.remark,
            customer_ids : this.customer_ids,
            id : this.$route.params.taskId
          }).then(res => {
            this.$router.push({name:"saveList",params:{taskId : this.$route.params.taskId}});
            // this.$router.go(-1);
            // alert(4)
            if (this.$route.params.taskId == 0) {
              let data = {
                customer_ids : this.$route.params.id,
                discuss : '',
                remark : '',
                time : ''
              }
              this.$store.commit('getAddress',data);
            }
          });
        }
      },
      saveData() {
        let data = {
          discuss : this.discuss,
          time : this.time,
          customer_ids : [this.customer_ids],
          remark : this.remark
        };
        console.log(data);
        console.log(this.$store.state.addressData.customer_ids);
        this.$store.commit('getAddress',data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .background {
    height: 100%;
    width: 100%;
    .task {
      background: #ffffff;
      color: #8c8b8b;
      height: 100%;
      input[type=button] {
        background: #3b83ff;
        color: #fff;
        width: 9.7rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        margin-top: .4rem;
        font-size: .46rem;
        border-radius: .15rem;
      }
      .content {
        padding: .3rem .5rem .4rem .5rem;
        .top {height: 100%;
          font-size: .36rem;
        }
        .discuss {
          font-size: .4rem;
          height: 100px;
          margin: .2rem 0 0rem 0;
          color: #4a4a4a;
          /*border: 1px solid red;*/
        }
        p {
          margin-top: .2rem;
          color: #4a4a4a;
        }
        .images {
          margin-bottom: .2rem;
          width: 100%;
          .img {
            position: relative;
            margin-right: .7rem;
            width: 1.4rem;
            display: inline-block;
            vertical-align: top;
            margin-top: .5rem;
            .head {
              position: absolute;
              width: 1.4rem;
              border-radius: .2rem;
              height: 1.4rem;
            }
            .close {
              width: .4rem;
              position: absolute;
              right: -.18rem;
              top: -.18rem;
            }
            p {
              margin-top: 1.5rem;
              text-align: center;
              font-size: .34rem;
            }
          }
          .img:nth-child(5n) {
            margin-right: 0;
          }
          .push {
            width: 1.5rem;
            height: 1.25rem;
            background: #f1f1f1;
            text-align: center;
            vertical-align: middle;
            display: table-cell;
            font-size: .8rem;
            border: 1px solid #cecece;
          }
        }
      }
    }
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#b8b8b8;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#b8b8b8;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#b8b8b8;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#b8b8b8;
  }
  .border-1px {
    position: relative;
  }
  .border-1px:after {
    position: absolute;
    content: '';
    top: 80%;
    bottom: -50%;
    left: -50%;
    right: -50%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-top: 1px solid #e0dddd;
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
</style>
