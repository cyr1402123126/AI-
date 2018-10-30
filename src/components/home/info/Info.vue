<template>
    <div>
      {{ this.$route.params }}
    </div>
</template>

<script>
  export default {
    name: "Info",
    data() {
      return {

      }
    },
  /*  watch() {
      '$route':this.$route.params
    },*/
      created() {
      // console.log(this.$route.params);
    }
  }
</script>

<style scoped>

</style>
