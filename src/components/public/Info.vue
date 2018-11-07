<template>
    <div class="info">
      <ul>
        <router-link :to="{name:'chat',params:{staff_id:item.staff_id,customer_id:item.customer_id}}" tag="li" v-for="(item,index) in info" :key="index">
          <div class="left"><img :src="item.src" alt=""></div>
          <div class="left info-name">
            <p>{{ item.name }}</p>
            <p>{{ item.content }}</p>
          </div>
          <div class="right">{{ item.time }}</div>
        </router-link>
      </ul>
    </div>
</template>

<script>
  export default {
    name: "Info",
    data() {
      return {
        info:[
        /*  {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},
          {name:"夏泡泡雪",content:"在么",time:"下午16:28"},*/
        ],
      }
    },
    created() {
      this.$store.commit('getActive',1)
      let staff_id=this.getCookie('staff_id');
      /*this.axios.post('message.php?type=message&token=d09abebb9f5a9ec1dc6f16d55559154a',{
        staff_id:staff_id,
        customer_id:84,
      }).then(res=>{
        console.log(res.data);
        this.info=res.data;
        this.$store.commit('getStaff_id',res.data.staff_id);
        this.$store.commit('getCustomer_id',res.data.customer_id);
      })*/
      this.axios.get('message.php?type=message&token=d09abebb9f5a9ec1dc6f16d55559154a')
        .then(res=>{
        console.log(res.data);
        this.info=res.data;
        this.$store.commit('getStaff_id',res.data.staff_id);
        this.$store.commit('getCustomer_id',res.data.customer_id);
      })
    }
  }
</script>

<style scoped>
 .info {
   padding: .4rem .5rem;
 }
 .left>img {
   float: left;
   width: 1.45rem;
 }
  .info li {
    height: 1.9rem;
    line-height: 1.9rem;
    border-bottom: 1px solid #eee;
    clear: both;
    padding-top: .2rem;
    box-sizing: border-box;
  }
  .info .info-name,.right {
    margin-top: .1rem;
    line-height: normal;
  }
 .info .info-name p:nth-child(1) {
   color: #333;
 }
 .info .info-name p:nth-child(2) {
   color: #979797;
 }
 .info li p {
   font-size: .42rem;
   margin-left: .3rem;
 }
  .info .right {
    font-size: .33rem;
    color: #c2bfbf;
  }
</style>
