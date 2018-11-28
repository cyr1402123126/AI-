<template>
    <div>
      <van-tabs v-model="active">
        <van-tab title="今天">
          <div class="container" style="margin-bottom: 4rem">
            <div class="list">
              <div class="content" v-for="(item,key) in dataToday" :key="key">
                <p>{{ item.time }}</p>
                <ul>
                  <li ref="fade" v-for="(value,index) in item.list" :key="index" class="border-1px" v-show="value.show">
                    <!--<transition-group name="fade">-->
                    <van-checkbox-group v-model="result" @click.native="hideCicle(item,index,value,$event)" :key="index">
                      <van-checkbox
                        :name="value.id"
                      >
                      </van-checkbox>
                    </van-checkbox-group>
                    <!--</transition-group>-->
                    <!--<p class="value">{{ value.content }}</p>-->
                    <router-link class="value" tag="p" :to="{name:'task',params:{taskId : value.id}}">{{ value.content }}</router-link>
                    <span v-show="!value.isStar"><img @click="slideTop(item.list,index,value)" src="@/assets/images/star.png" alt=""></span>
                    <span v-show="value.isStar"><img @click="slideTop(item.list,index,value)" src="@/assets/images/star_active.png" alt=""></span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="finished">
              <div class="rank" @click="showBottom"><p style="width: 80%;">显示已完成任务</p></div>
              <ul class="show" style="padding:.4rem" v-show="isShow">
                <li v-for="(value,index) in showDataToday" :key="index" class="border-1px" @click="leftShowCicle(value)">
                  <van-checkbox-group v-model="result">
                    <van-checkbox
                      :name="value.id"
                    >
                    </van-checkbox>
                  </van-checkbox-group>
                  <STRIKE>{{ value.content }}</STRIKE>
                  <!--<span><img src="@/assets/images/star.png" alt=""></span>-->
                </li>
              </ul>
            </div>
            <div class="bottom">
              <input type="button" value="新建任务" class="fixed" @click="add">
            </div>
          </div>
        </van-tab>
        <van-tab title="全部">
          <div class="container" style="margin-bottom: 4rem">
            <div class="list">
              <div class="content" v-for="(item,key) in data" :key="key">
                <p>{{ item.time }}</p>
                <ul>
                    <li ref="fade" v-for="(value,index) in item.list" :key="index" class="border-1px" v-show="value.show">
                      <!--<transition-group name="fade">-->
                        <van-checkbox-group v-model="result" @click.native="hideCicle(item,index,value,$event)" :key="index">
                          <van-checkbox
                            :name="value.id"
                          >
                          </van-checkbox>
                        </van-checkbox-group>
                      <!--</transition-group>-->
                      <!--<p class="value">{{ value.content }}</p>-->
                      <router-link class="value" tag="p" :to="{name:'task',params:{taskId : value.id}}">{{ value.content }}</router-link>
                      <span v-show="!value.isStar"><img @click="slideTop(item.list,index,value)" src="@/assets/images/star.png" alt=""></span>
                      <span v-show="value.isStar"><img @click="slideTop(item.list,index,value)" src="@/assets/images/star_active.png" alt=""></span>
                    </li>
                </ul>
              </div>
            </div>
            <div class="finished">
              <div class="rank" @click="showBottom"><p style="width: 80%;">显示已完成任务</p></div>
              <ul class="show" style="padding:.4rem" v-show="isShow">
                <li v-for="(value,index) in showData" :key="index" class="border-1px" @click="showCicle(value)">
                  <van-checkbox-group v-model="result1">
                    <van-checkbox
                      :name="value.id"
                    >
                    </van-checkbox>
                  </van-checkbox-group>
                  <STRIKE>{{ value.content }}</STRIKE>
                  <!--<span><img src="@/assets/images/star.png" alt=""></span>-->
                </li>
              </ul>
            </div>
            <div class="bottom">
              <input type="button" value="新建任务" class="fixed" @click="add">
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
  export default {
    name: "SaveList",
    data () {
      return {
        active :"0",
        result: [],
        result1: [],
        data: [
          /*{
            time: '2018-11-20',
            list:[
              {id:1,content:"工作态度",show:false},
              {id:2,content:1223,show:false},
              {id:6,content:1224,show:false},
            ]
          },
          {
            time: '2018-11-21',
            list:[
              {id:9,content:1225,show:false},
              {id:10,content:1226,show:false},
              {id:11,content:1227,show:false},
            ]
          },
          {
            time: '2018-11-20',
            list:[
              {id:1,content:"工作态度",show:false},
              {id:2,content:1223,show:false},
              {id:6,content:1224,show:false},
            ]
          },
          {
            time: '2018-11-21',
            list:[
              {id:9,content:1225,show:false},
              {id:10,content:1226,show:false},
              {id:11,content:1227,show:false},
            ]
          },*/
        ],
        dataToday :[],
        showData : [
  /*      {id:1,content:1222,show:false},
        {id:2,content:1223,show:false},
        {id:6,content:"工作态度",show:false},*/
      ],
        showDataToday :[],
        isShow : false,
        fade : false
      }
    },
    created () {
      /*this.axios.get('http://192.168.1.149:53000/rank')
        .then(res => {
          this.data = res.data.data;
          this.showData = res.data.showData;
        })*/
     this.axios.get('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=task_list')
       .then(res => {
         console.log(res.data);
         let data = res.data.data;
         this.data = data.data;
         this.showData = data.showData;
         this.result = data.ids;
       })
      this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=task_list',{
        time : new Date()
      }).then(res => {
        let data = res.data.data;
        this.dataToday = data.data;
        this.result1 = data.ids;
        this.showDataToday = data.showData;
        // this.showDataToday = data.showData;
      })
    },
    methods : {
      add () {
        this.$router.push({name:'task',params:{id:this.$route.params.id,taskId:0}})
      },
      showBottom () {
        this.isShow = !this.isShow;
      },
      hideCicle (arr,index,value,e) {
        /*let target = e.target.parentNode.parentNode.parentNode;
        target = target.nodeName == "LI" ? target : target.parentNode;
        if (target.nodeName == "LI") {
          target.className = 'fade';
          setTimeout(() => {
            // target.className = 'hide';
            console.log(arr);
            this.showData.unshift(value);

            // value.show = false;
            setTimeout(() => {
              arr.splice(index,1)
            },200)
          },200)
        }*/
        console.log(arr);
        arr.list.splice(index,1)
        this.showData.unshift(value);
        this.showDataToday.unshift(value);
        arr.list.length == 0 ? arr.time = '' : ''
        this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
          status : 1,
          id : value.id
        }).then(res => {

        }).catch(err => {
          console.log(err);
        })

      },
      showCicle (value) {
        console.log(value.id);
        this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
          status : 0,
          id : value.id
        }).then(res => {
          this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=task_list')
            .then(res => {
              let data = res.data.data;
              this.data = data.data;
              this.showData = data.showData;
            })
        }).catch(err => {
          console.log(err);
        })
      },
      leftShowCicle (value) {
        this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
          status : 0,
          id : value.id,
        }).then(res => {
          this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=task_list',{
            time : new Date()
          }).then(res => {
              let data = res.data.data;
              this.dataToday = data.data;
              this.showDataToday = data.showData;
            })
        }).catch(err => {
          console.log(err);
        })
      },
      slideTop (list,index,value) {
        list[index].isStar = !list[index].isStar;
        if (list[index].isStar == true) {
          this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
            is_top : 1,
            id : value.id
          })
          list.unshift(list.splice(index,1)[0])
          // let a = list.splice(index,1)
          // list.unshift(a[0])
        } else {
          this.axios.post('card_task.php?type=card_task&token=32973e46d86ce0d4950b2bbade38963f&cate=save_task',{
            is_top : 0,
            id : value.id
          })
          list.push(list.splice(index,1)[0])
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .list {
    padding: 0rem .4rem 0 .4rem;
    .content {
      margin-top: .4rem;
      p {
        font-size: .36rem;
        color: #444444;
        margin-bottom: .1rem;
      }
      .value {
        font-size: .44rem;
        width: 80%;
      }
    }
    .content:last-child li:last-child::after {
      border-top: none;
    }
  }
  ul {
    li {
      height: 1.2rem;
      line-height: 1.2rem;
      clear: both;
      STRIKE,p {
        float: left;
        font-size: .46rem;
        color: #d0cece;
      }
      span {
        img {
          width: .5rem;
          height: .5rem;
          float: right;
          margin-top: .25rem;
        }
      }
    }
  }
  .finished {
    width: 100%;
    text-align: center;
    .rank {
      width: 100%;
      height: 1.3rem;
      line-height: 1.3rem;
      color: #3e84ff;
      margin: 0 auto;
      font-size: .36rem;
      text-align: center;
      background: #f2f2f2;
    }
  }
  .bottom {
    width: 100%;
    height: 2rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    input[type=button] {
      width: 9.7rem;
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      font-size: .48rem;
      background: #3e84ff;
      color: #fff;
      border-radius: .15rem;
    }
  }
  .van-checkbox-group {
    float: left;
    padding-top: .18rem;
    margin-right: .3rem;
  }
  .border-1px {
    position: relative;
  }
  .border-1px:after {
    position: absolute;
    content: '';
    top: 90%;
    bottom: -50%;
    left: -50%;
    right: -50%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-top: 1px solid #eaeaea;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade {
    animation: fade 1s;
  }
  .hide {
    display: none;
  }
  @keyframes fade {
    0% {
      opacity:1;
      /*transform: translateY(0rem);*/
    }
    25% {
      opacity:.5;
      /*transform: translateY(0rem);*/
    }
    50% {
      opacity:0;
      /*transform: translateY(.4rem);*/
    }
    75% {
      opacity:0.5;
      /*transform: translateY(.6rem);*/
    }
    100% {
      opacity:1;
      /*transform: translateY(.8rem);*/
    }
  }
</style>
