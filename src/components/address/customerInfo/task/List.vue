<template>
  <div>
    <addressList :showAddress="showAddress"></addressList>
  </div>
</template>

<script>
  import addressList from '@/components/template/addressList'
  export default {
    name: "List",
    data () {
      return {
        showAddress : false
      }
    },
    components : {
      addressList
    },
    created () {
      this.showAddress = false;
    }
  }
</script>

<style scoped>

</style>
