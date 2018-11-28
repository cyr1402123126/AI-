<template>
    <div>
      <addressList :showAddress="showAddress" :address="address" :count="count"></addressList>
    </div>
</template>

<script>
  import addressList from '@/components/template/addressList'
  export default {
    name: "Address",
    data() {
      return {
        showAddress : false,
        address : '',
        count : '',
      }
    },
    components : {
      addressList
    },
    created () {
      this.showAddress = true;
      this.axios.get('address.php?type=address&token=2df885165ebea246edd089ddbd69af8c')
        .then(res=>{
          this.address=res.data.data;
          this.count=res.data.count;
        })
    }
  }
</script>

<style scoped>

</style>
