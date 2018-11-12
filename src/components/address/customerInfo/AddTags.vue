<template>
  <div>
    <div class="tags">
      <div class="wraper">
        <div class="title"><span class="green"></span>基本信息</div>
        <ul class="list base">
          <li v-for="(item,index) in base" :key="index" @click="showGreen(item,$event)">{{ item }}</li>
          <li></li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="green"></span>关注点</div>
        <ul class="list">
          <li v-for="(item,index) in attention" :key="index" @click="showGreen(item,$event)">{{ item }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="blue"></span>级别</div>
        <ul class="list">
          <li v-for="(item,index) in rank" :key="index" @click="showBlue(item,$event)">{{ item }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="blue"></span>类型</div>
        <ul class="list">
          <li v-for="(item,index) in type" :key="index" @click="showBlue(item,$event)">{{ item }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="orange"></span>跟进状态</div>
        <ul class="list">
          <li v-for="(item,index) in follwStatus" :key="index" @click="showOrange(item,$event)">{{ item }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="orange"></span>成交状态</div>
        <ul class="list">
          <li v-for="(item,index) in successStatus" :key="index" @click="showOrange(item,$event)">{{ item }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="orange"></span>付款状态</div>
        <ul class="list">
          <li v-for="(item,index) in payStatus" :key="index" @click="showOrange(item,$event)">{{ item }}</li>
        </ul>
      </div>
      <div class="wraper">
        <div class="title"><span class="purple"></span>其他</div>
        <ul class="list end">
          <li v-for="(item,index) in other" :key="index" @click="showPurple(item,$event)">{{ item }}</li>
          <li class="left" style="font-size: .6rem" @click="addTag">+</li>
        </ul>
      </div>
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
        base: ["男","女","已婚","00后","90后","80后","70后","60后"],
        attention: ['在意价格','在意质量','在意服务'],
        rank: ['一般客户','重要客户','核心客户','潜在客户','意向客户','流失客户'],
        type: ['客户','渠道商','供应商','合作伙伴','直销客户','老客户推荐'],
        follwStatus:['已发资料','已发报价','已拜访','价格谈判','合同审核','已签合同',],
        successStatus: ['已成交','近期可成交','需长期跟进','流失'],
        payStatus:['已付全款','已支付首付款','已支付尾款','未付全款','未支付首付款','未支付尾款'],
        other: [],

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
      console.log(this.$store.state.tags);
      this.other = this.$store.state.tags;
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
      changeBackground(data,e,color) {
        let dom=e.target;
        if (dom.className == color) {
          dom.className = '';
          this.arr.remove(data)
        }else {
          dom.className = color;
          this.arr.push(data);
        }
        console.log(this.arr);
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
        this.other.push(this.tag)
        this.show=false;
      },
      confirm() {
        if (this.tag == '') {
          this.$toast('输入的标签不能为空');
          this.show=true;
        }else {
          // this.other.push(this.tag);
          this.show=false;
          this.$store.commit('addTag',this.tag)
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
          background: #14c39c;
          margin-right: .3rem;
          margin-bottom: .02rem;
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
      .base {
        li:last-child {
          visibility: hidden;
        }
      }
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
