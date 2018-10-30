<template>
    <div id="suggest">
      意见反馈
      <footer>
        <router-link class="button" to="/me/Confirmsuggest" tag="div">
          意见反馈
        </router-link>
      </footer>
    </div>
</template>

<script>
    export default {
        name: "suggest"
    }
</script>

<style scoped lang="scss">
  $color-666: rgb(237,237,237);
  $font-38: .38rem;
  $font-49: .49rem;
  $font-26: .26rem;
  $sl: #009cff;
  #suggest{
    footer{
      position: fixed;
      bottom: 2%;
      left: 0;
      width: 100%;
      div.button{
        margin: 0 auto;
        width: 90%;
        line-height: 1.2rem;
        background: $sl;
        font-size: $font-49;
        color: #ffffff;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
</style>
