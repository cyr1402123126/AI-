<template>
  <div>
    <p class="clearfix">
      7天内被查看的行为统计
      <span class="right" @click="getAlert()"><img src="@/assets/images/calendar.png" alt=""></span>
    </p>

    <!--弹出框-->
    <van-dialog
      v-model="flag1"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field
        v-model="startTime"
        placeholder="请输入开始时间"
        type="text"
        @click="getStart()"
        readonly
      />
      <van-field
        v-model="endTime"
        type="text"
        placeholder="请输入结束时间"
        @click="getEnd()"
        readonly
      />
    </van-dialog>

    <!--时间选择器-->
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @confirm="confirm"
        @change="getValue" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "SelectTime",
    data() {
      return {
        flag1:false,
        currentDate: new Date(),
        minDate: new Date(2008, 0, 1),
        currentValue:'',
        startTime: '',
        endTime: '',
        show: false,
        count:true
      }
    },
    methods:{
      getAlert() {
        this.flag1=true;
      },
      change(item,e) {
        if (this.flag) {
          e.currentTarget.querySelector(".arrow").setAttribute('src',require('@/assets/images/more_top.png'));
          item.show = !item.show;
          this.flag=false;
        }else {
          e.currentTarget.querySelector(".arrow").setAttribute('src',require('@/assets/images/more_bottom.png'));
          item.show = !item.show;
          this.flag=true;
        }
      },
      beforeClose(action, done) {
        // this.startTime='';
        // this.endTime='';
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      confirm(val) {
        if (this.count) {
          this.startTime=this.currentValue.toString();
        }else {
          this.endTime=this.currentValue.toString();
        }
        this.show=false;
      },
      getStart() {
        this.show=true;
        this.count=true;
      },
      getValue(e) {
        this.currentValue=e.getValues();
        console.log(e.getValues())
      },
      getEnd() {
        this.show=true;
        this.count=false;
      }
    }
  }
</script>

<style scoped lang="scss">
  p {
    margin: .4rem 0;
    color: #696969;
    font-size: .32rem;
    img {
      width: .5rem;
    }
  }
</style>
