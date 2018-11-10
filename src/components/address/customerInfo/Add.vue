<template>
    <div class="wraper">
      <div class="select clearfix">
        <p class="left">选择跟进常用语</p>
      </div>
      <p class="discuss">跟进秒速</p>
      <textarea v-autosize placeholder="在这里输入跟进语"></textarea>
      <span>0/200</span>
      <div class="clearfix"></div>
      <input type="button" value="提交">
    </div>
</template>

<script>
    export default {
        name: "Add"
    }
</script>

<style scoped lang="scss">
  .wraper {
    padding: .4rem .5rem;
    width: 100%;
    box-sizing: border-box;
    color: #4a4a4a;
    font-size: .42;
    .select {
      color: #5176ab;
      position: relative;
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      img {
        width: .2rem;
        height: .35rem;
        float: right;
      }
    }
    .select:after {
      content: '';
      background: url("~@/assets/images/icons_right.png")no-repeat;
      width: .2rem;
      height: .35rem;
      background-position: right center;
      background-size: .2rem;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .discuss {
      margin: .6rem 0;
      color: #8a8888;
    }
    >span {
      margin-top: .2rem;
      display: inline-block;
      float: right;
    }
    input[type=button] {

    }
  }
  input,button,select,textarea{outline:none}
  textarea{
    resize:none;
    background: #fff;
    width: 100%;
    height: 2.5rem;
    border: none;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#b8b8b8;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#b8b8b8;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#b8b8b8;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#b8b8b8;
  }
</style>
