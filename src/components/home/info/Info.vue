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
        this.$store.commit('getActive',0)
      // console.log(this.$route.params);
    }
  }
</script>

<style scoped>

</style>
