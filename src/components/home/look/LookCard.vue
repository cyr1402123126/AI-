<template>
  <div class="look">
    <SelectTime></SelectTime>
    <Info :introduce="introduce"></Info>
  </div>
</template>

<script>
  import SelectTime from '@/components/template/SelectTime'
  import Info from '@/components/template/Info'
  export default {
    name: "LookCard",
    data() {
      return {
        introduce:[
          {day:"2018/10/08",time:"17:42",src:require("@/assets/images/logo.png"),name:"猫"},
          {day:"2018/10/08",time:"17:42",src:require("@/assets/images/logo.png"),name:"猫和"},
          {day:"2018/10/08",time:"17:42",src:require("@/assets/images/logo.png"),name:"猫和老鼠"},
        ]
      }
    },
    components:{
      SelectTime,
      Info
    }
  }
</script>

<style scoped>
  .look {
    padding: .4rem .5rem;
  }
</style>
