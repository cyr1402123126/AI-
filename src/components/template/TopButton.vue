<template>
  <div class="title">
    <ul>
      <!--<li class="active"><router-link :to="{name:'time',params:{id:-1}}">时间</router-link></li>-->
     <!-- <li :class="{active:show==index}"><router-link :to="{name:'time'}" @click.native="showColor()">时间</router-link></li>
      <li :class="{active:show==index}"><router-link :to="{name:'behavior'}" @click.native="showColor()">行为</router-link></li>
      <li :class="{active:show==index}"><router-link :to="{name:'person'}" @click.native="showColor()">人</router-link></li>-->

      <li :class="{active:show==index}" v-for="(item,index) in router" @click="showColor(index)"><router-link :to="{name:item.name}">{{ item.html }}</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "TopButton",
    data() {
      return {
        show:0,
        router:[{name:'time',html:'时间'},{name:'behavior',html:'行为'},{name:'person',html:'人'}]
      }
    },
    methods:{
      showColor(index) {
        console.log(index);
        console.log(this.show);
        this.show=index
      }
    }
  }
</script>

<style scoped>
  .rader-container .title ul {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
  }
  .rader-container .title li {
    width: 33.3%;
    background: #f5f5f5;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    float: left;
  }
  .active {
    background: #3e84ff!important;
  }
  .active a {
    color: #fff;
  }
</style>
