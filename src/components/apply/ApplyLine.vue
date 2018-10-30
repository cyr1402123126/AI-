<template>
    <div class="ApplyLine">
      <div class="ApplyLine-top clearfix">
        <div class="ApplyLine-img left">
          <img :src="firstLine.src" alt="">
        </div>
        <div class="ApplyLine-one clearfix">
          <div class="left">
            <p>{{ firstLine.name }}</p>
            <span>第{{ firstLine.id }}名</span>
          </div>
          <div class="right">
            <p class="big">{{ firstLine.love }}</p>
            <img src="@/assets/images/love.png" v-if="!firstLine.zanShow" alt="" @click="addOnce(firstLine)">
            <img v-else="firstLine.zanShow" src="@/assets/images/love_active.png" alt="">
          </div>
          <div class="right right-data">
            <p class="big">{{ firstLine.rank }}</p>
            <span>单日客户数</span>
          </div>
        </div>
      </div>
      <div class="ApplyLine-container">
        <div class="ApplyLine-content" v-for="(item,index) in line" :key="index">
          <div class="left ApplyLine-times">{{ item.id }}</div>
          <div class="ApplyLine-img left">
            <img :src="item.src" alt="">
          </div>
          <div class="ApplyLine-one clearfix">
            <div class="left">
              <p>{{ item.name }}</p>
              <span>{{ item.major }}</span>
            </div>
            <div class="right">
              <p class="big">{{ item.love }}</p>
              <img v-if="!item.zanShow" src="@/assets/images/love.png" alt="" @click="addOnce(item)">
              <img v-else="item.zanShow" src="@/assets/images/love_active.png" alt="">
            </div>
            <div class="right right-data">
              <p class="big">{{ item.rank }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  export default {
    name: "ApplyLine",
    data() {
      return {
        firstLine:{
          src:'',
          name:'',
          id:"",
          rank:'',
          loveSum:'',
          type:'',
          zanShow:''
        },
        line:[
          /*{id:"1",src:require("@/assets/images/logo.png"),name:'陈林',major:"工程师",rank:"15",love:"0"},
          {id:"2",src:require("@/assets/images/logo.png"),name:'陈林',major:"工程师",rank:"15",love:"0"},
          {id:"3",src:require("@/assets/images/logo.png"),name:'陈林',major:"工程师",rank:"15",love:"0"},
          {id:"4",src:require("@/assets/images/logo.png"),name:'陈林',major:"工程师",rank:"15",love:"0"},
          {id:"5",src:require("@/assets/images/logo.png"),name:'陈林',major:"工程师",rank:"15",love:"0"},*/
        ]
      }
    },
    created() {
      this.axios.get('rank_list.php?type=rank_list&token=e8cd78cfa5397595b796aa412e86f1dd&category=list')
      // this.axios.get('line')
        .then(res=>{
          console.log(res.data);
          this.firstLine=res.data.firstLine;
          this.line=res.data.line;
        })
    },
    methods:{
      addOnce(val) {
        console.log(val.staff_id);
        if (!val.zanShow) {
          val.rank++;
          val.zanShow=true;
          this.axios.post('rank_list.php?type=rank_list&token=e8cd78cfa5397595b796aa412e86f1dd&category=zan',{
            id:val.staff_id
          })
        }
      }
    }
  }
</script>

<style scoped>
  .ApplyLine {
    background: #f2f2f2;
  }
  .ApplyLine-img {
    width: 1.3rem;
  }
  .ApplyLine-img img {
    border-radius: 50%;
  }
  .ApplyLine-top {
    padding: .4rem .5rem;
    padding-bottom: .4rem;
    background: #fff;
  }
  .ApplyLine-one {
    overflow: hidden;
    font-size: .38rem;
    color: #888888;
  }
  .ApplyLine-one .left>p {
    font-size: .48rem;
    color: #4a4a4a;
    height: .7rem;
    line-height: .7rem;
  }
  .ApplyLine-one .left {
    margin-left: .35rem;
  }
  .ApplyLine-one .right img {
    width: .5rem;
  }
  .ApplyLine-one .right .big {
    font-size: .8rem;
    color: #3e84ff;
    height: .7rem;
    line-height: .7rem;
  }
  .ApplyLine-one .right-data {
    text-align: right;
    margin-right: .55rem;
  }
  .ApplyLine-one .right:nth-child(2) .big {
    font-size: .38rem;
    color: #666666;
    text-align: center;
  }
  .ApplyLine-container {
    background: #fff;
    margin-top: .2rem;
  }
  .ApplyLine-content {
    padding: .4rem .5rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid #dcdcdc;
  }
  .ApplyLine-times {
    font-size: .6rem;
    height: 1.4rem;
    line-height: 1.4rem;
    margin-right: .5rem;
  }
  .ApplyLine-container .ApplyLine-one .right .big {
    line-height: 1.8;
  }
  .ApplyLine-content:nth-child(1) .ApplyLine-one .left:nth-child(1) p {
    color: #ff933e;
  }
  .ApplyLine-content:nth-child(1) .ApplyLine-one .right-data .big,
  .ApplyLine-content:nth-child(2) .ApplyLine-one .right-data .big,
  .ApplyLine-content:nth-child(3) .ApplyLine-one .right-data .big{
    color: #ff933e;
  }

</style>
