<template>
  <div>
    <div class="tags">
      <div class="wraper" v-for="(value,index) in list" :key="index">
        <div class="title"><span :class="value.color"></span>{{ value.title }}</div>
        <ul class="list base">
          <li :class="item.show ? item.class : ''" v-for="(item,index) in value.list" :key="index" @click="showColor(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="purple"></span>{{ other.title }}</div>
        <ul class="list end">
          <li :class="{purple:item.show}" v-for="(item,index) in other.list" :key="index" @click="showPurple(item,$event)">{{ item.id }}</li>
          <li class="left" style="font-size: .6rem" @click="addTag">+</li>
        </ul>
      </div>
      <!--<div class="wraper">
        <div class="title"><span class="green"></span>{{ attention.title }}</div>
        <ul class="list">
          <li :class="{green:item.show}" v-for="(item,index) in attention.list" :key="index" @click="showGreen(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="blue"></span>{{ rank.title }}</div>
        <ul class="list">
          <li :class="{blue:item.show}" v-for="(item,index) in rank.list" :key="index" @click="showBlue(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="blue"></span>{{ type.title }}</div>
        <ul class="list">
          <li :class="{blue:item.show}" v-for="(item,index) in type.list" :key="index" @click="showBlue(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="orange"></span>{{ follwStatus.title }}</div>
        <ul class="list">
          <li :class="{orange:item.show}" v-for="(item,index) in follwStatus.list" :key="index" @click="showOrange(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="orange"></span>{{ successStatus.title }}</div>
        <ul class="list">
          <li :class="{orange:item.show}" v-for="(item,index) in successStatus.list" :key="index" @click="showOrange(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="orange"></span>{{ payStatus.title }}</div>
        <ul class="list">
          <li :class="{orange:item.show}" v-for="(item,index) in payStatus.list" :key="index" @click="showOrange(item,$event)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="purple"></span>{{ other.title }}</div>
        <ul class="list end">
          <li :class="{purple:item.show}" v-for="(item,index) in other.list" :key="index" @click="showPurple(item,$event)">{{ item.id }}</li>
          <li class="left" style="font-size: .6rem" @click="addTag">+</li>
        </ul>
      </div>-->
    </div>
    <input type="button" value="保存" @click="save">

    <!--弹出标签框-->
    <van-dialog
      v-model="show"
      :title="label"
      show-cancel-button
      :lockScroll='lock'
      :before-close="beforeClose"
      @confirm="confirm"
      class="alertDialog"
    >
      <van-field
        v-model="tag"
        placeholder="输入自定义标签"
      />
    </van-dialog>
  </div>
</template>

<script>
  export default {
    name: "AddTags",
    data() {
      return {
        list: [
          {
            color: 'green',
            title: '基本信息',
            list: [
              {name: '男',id: 1,class: 'green',show: true},{name: '女',id: 2,class: 'green',show: true},{name: '已婚',id: 3,class: 'green',show: false},{name: '00后',id: 4,class: 'green',show: false},
              {name: '90后',id: 5,class: 'green',show: false},{name: '80后',id: 6,class: 'green',show: false},{name: '70后',id: 7,class: 'green',show: false},{name: '60后',id: 8,class: 'green',show: false},{name: '50后',id: 50,class: 'green',show: false}
            ],
          },
          {
            color: 'green',
            title: '关注点',
            list: [
              {name: '在意价格',id: 9,class: 'green',show: false},{name: '在意质量',id: 10,class: 'green',show: false},{name: '在意服务',id: 11,class: 'green',show: false}
            ]
          },
          {
            color: 'blue',
            title: '级别',
            list: [
              {name: '一般客户',id: 12,class: 'blue',show: true},{name: '重要客户',id: 13,class: 'blue',show: false},{name: '核心客户',id: 14,class: 'blue',show: false},{name: '潜在客户',id: 15,class: 'blue',show: false},{name: '意向客户',id: 16,class: 'blue',show: false},{name: '流失客户',id: 17,class: 'blue',show: false}
            ]
          },
          {
            title: '类型',
            color: 'blue',
            list: [
              {name: '客户',id: 18,class: 'blue',show: false},{name: '渠道商',id: 19,class: 'blue',show: false},{name: '供应商',id: 20,class: 'blue',show: false},{name: '合作伙伴',id: 21, class: 'blue',show: false},{name: '直销客户',id: 22, class: 'blue',show: false},{name: '老客户推荐',id: 23,class: 'blue',show: false}
            ]
          },
          {
            color: 'orange',
            title: '跟进状态',
            list: [
              {name: '已发资料',id: 24,class: 'orange',show: false},{name: '已发报价',id: 25,class: 'orange',show: false},{name: '已拜访',id: 26,class: 'orange',show: false},{name: '价格谈判',id: 27,class: 'orange',show: false},{name: '合同审核',class: 'orange',id: 28,show: false},{name: '已签合同',id: 29,class: 'orange',show: false}
            ]
          },
          {
            color: 'orange',
            title: '成交状态',
            list: [
              {name: '已成交',id: 30,class: 'orange',show: false},{name: '近期可成交',id: 31,class: 'orange',show: false},{name: '需长期跟进',id: 32,class: 'orange',show: false},{name: '流失',id: 33,class: 'orange',show: false}
            ]
          },
          {
            color: 'purple',
            title :'付款状态',
            list :[
              {name: '已付全款',id: 34,class: 'purple',show: true},{name: '已支付首付款',id: 35,class: 'purple',show: false},{name: '已支付尾款',id: 36,class: 'purple',show: false},{name: '未付全款',id: 37,class: 'purple',show: false},{name: '未支付首付款',id: 38,class: 'purple',show: false},{name: '未支付尾款',id: 39,class: 'purple',show: false}
            ]
          },
        ],
        other: {
          title: '其他',
          list: [
            {name: '已付全款',id: 34,show: true}
          ]
        },


        //添加标签
        show:false,
        label:'添加标签',
        lock:false,
        tag:'',
        //把添加到数组
        arr: []
      }
    },
    created() {
      /*console.log(this.$store.state.tags);
      this.other = this.$store.state.tags;
      let arr = [1,46];
      this.base.forEach((value,index)=>{
        this.arr.forEach((item,count)=>{
          if (value.id == item) {
            this
          }
        })
      })*/
    },
    methods: {
      showGreen(data,e) {
        this.changeBackground(data,e,"green");
      },
      showBlue(data,e) {
        this.changeBackground(data,e,"blue");
      },
      showOrange(data,e) {
        this.changeBackground(data,e,"orange");
      },
      showPurple(data,e) {
        this.changeBackground(data,e,"purple");
      },
      showColor(data,e) {
        // this.changeBackground(data,e,"green");
        let dom=e.target;
        if (dom.className == data.class) {
          dom.className = '';
          this.arr.remove(data.id);
        }else {
          dom.className = data.class;
          this.arr.push(data.id);
        }
        console.log(this.arr);
        // console.log(data.show);
      },
      changeBackground(data,e,color) {
        let dom=e.target;
        if (dom.className == color || data.show) {
          dom.className = '';
          this.arr.remove(data.id);
          data.show = false;
        }else {
          dom.className = color;
          this.arr.push(data.id);
          data.show = true;
        }
        console.log(this.arr);
        console.log(data.show);
      },
      addTag() {
        this.tag='';
        this.show=true;
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      done() {
        this.other.push({id: this.tag})
        this.show=false;
      },
      confirm() {
        if (this.tag == '') {
          this.$toast('输入的标签不能为空');
          this.show=true;
        }else {
          // this.other.push(this.tag);
          this.show=false;
          this.$store.commit('addTag',{id: this.tag})
        }
      },
      save() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  .tags {
    padding: .4rem .5rem;
    box-sizing: border-box;
    .wraper {
      border-bottom: 1px solid #eaeaea;
      margin-bottom: .3rem;
      .title {
        font-size: .46rem;
        color: #4a4a4a;
        margin-bottom: .5rem;
        span {
          width: .3rem;
          height: .3rem;
          display: inline-block;
          border-radius: 50%;
          margin-right: .3rem;
          margin-bottom: .02rem;
        }
        .green {
          background: #14c39c;
        }
        .blue {
          background: #49aaf9;
        }
        .orange {
          background: #f9b15f;
        }
        .purple {
          background: #a92dea;
        }
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-around;
        li {
          flex: 0 0 2.8rem;
          height: .85rem;
          line-height: .85rem;
          margin-bottom: .45rem;
          background: #f6f6f6;
          text-align: center;
          color: #828186;
          font-size: .36rem;
        }
        .green {
          background: #e0fbf6;
          color: #75a096;
        }
        .blue {
          background: #e8f5fd;
          color: #71abd9;
        }
        .orange {
          background: #fff5ec;
          color: #dcc786;
        }
        .purple {
          background: #e8eefc;
          color: #8289bf;
        }
      }
      .end {
        justify-content: flex-start;
        li {
          margin-right: .7rem;
        }
        li:nth-child(3n) {
          margin-right: 0;
        }
      }
      /*.base {
        li:last-child {
          visibility: hidden;
        }
      }*/
    }
    .wraper:last-of-type {
      border-bottom: none;
    }
  }
  input[type=button] {
    background: #3b83ff;
    color: #fff;
    width: 9.7rem;
    display: block;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    margin: 0 auto;
    margin-top: .5rem;
    font-size: .46rem;
    border-radius: .15rem;
  }
  .van-cell {
    width: 85%;
    border: 1px solid #d6d6d6;
    margin: 0 auto;
  }
  .van-dialog .van-dialog__header {
    margin-bottom: .3rem;
  }
</style>
