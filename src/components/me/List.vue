<template>
    <div class="list">
      <van-cell-group>
        <router-link v-for="(item,index) in list" :key="index" :to="{name:item.route}">
          <van-cell :title="item.name" is-link />
        </router-link>
      </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        list:[
          // {name:"选择名片样式",route:"meStyle"},
          {name:"名片基本信息",route:"meInfo"},
          {name:"名片海报",route:"mePoster"},
          {name:"个人简介/语音/标签/图片",route:"mePerson"},
          {name:"视频",route:"meVedio"},
        ]
      }
    }
  }
</script>

<style scoped>
  .list {
    /*padding: .4rem 0;*/
  }
  .van-cell {
    padding-left: 1.5rem;
    border-bottom: 1px solid #efefef;
    font-size: .42rem;
  }
  .van-cell-group a:nth-child(1) .van-cell {
    background: url("~@/assets/images/me_me_card.png") no-repeat;
    background-size: .75rem .75rem;
    background-position:.5rem center;
  }
  .van-cell-group a:nth-child(2) .van-cell {
    background: url("~@/assets/images/me_person.png") no-repeat;
    background-size: .75rem .75rem;
    background-position:.5rem center;
  }
  .van-cell-group a:nth-child(3) .van-cell {
    background: url("~@/assets/images/me_sea.png") no-repeat;
    background-size: .75rem .75rem;
    background-position:.5rem center;
  }
  .van-cell-group a:nth-child(4) .van-cell {
    background: url("~@/assets/images/me_introduce.png") no-repeat;
    background-size: .75rem .75rem;
    background-position:.5rem center;
  }
  .van-cell-group a:nth-child(5) .van-cell {
    background: url("~@/assets/images/me_vedio.png") no-repeat;
    background-size: .75rem .75rem;
    background-position:.5rem center;
    border-bottom: none;
  }
  .van-cell-group a:nth-child(6) .van-cell {
    background: url("~@/assets/images/me_vedio.png") no-repeat;
    background-size: .75rem .75rem;
    background-position:.5rem center;
    border-bottom: none;
  }
</style>
