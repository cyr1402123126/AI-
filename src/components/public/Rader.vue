<template>
  <div class="rader-container">
    <div class="title">
      <ul>
        <li><router-link :to="{name:'time'}">时间</router-link></li>
        <li><router-link :to="{name:'behavior'}">行为</router-link></li>
        <li><router-link :to="{name:'person'}">人</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Rader',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rader-container {
  padding: .4rem .5rem;
}
.rader-container li {
  width: 33.3%;
  background: #f5f5f5;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  float: left;
}
</style>
