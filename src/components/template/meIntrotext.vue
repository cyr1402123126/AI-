<template>
    <div id="publicIntrotext">
      <!--个人介绍-->
      <div class="welecome">
        <form action="">
          <textarea type="text" name="wecomeText"  :placeholder='autoIntro' cols="5"></textarea>
        </form>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          autoIntro: '欢迎来到我的个人名片。我是xxx，在xxx公司" +\n' +
            '            "部(部门)担任xxx(职位)，负责xxx工作(工作职责，如" +\n' +
            '            "销售)。进入xxx公司以前，我曾在xxx、xxx(过往任职" +\n' +
            '            "公司)任xxx、xxx(职位)。'
        }
      },
        name: "meIntrotext"
    }
</script>

<style scoped lang="scss">
  .welecome{
    font-size: .38rem;
    color: #888888;
    textarea{
      -webkit-input-placeholder {
        color: #8888;
        font-size: .38rem;
      }
      -moz-placeholder {
        color: #8888;
        font-size: .38rem;
      }
      -ms-placeholder {
        color: #8888;
        font-size: .38rem;
      }
      -moz-placeholder {
        color: #8888;
        font-size: .38rem;
      }
      overflow:hidden;
      width: 100%;
      height: 2.2rem;
      border:0;
      text-indent: 20px;
    }
  }
</style>
