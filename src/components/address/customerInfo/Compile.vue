<template>
  <div class="wraper">
    <div class="list">
      <ul>
        <li>
          <img class="left" src="@/assets/images/logo.png" alt="">
          <div class="right">燕子</div>
        </li>
        <li>
          <p class="left">备注名</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">公司</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">职位</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">性别</p>
          <van-radio-group v-model="radio">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </li>
        <li>
          <p class="left">标签</p>
          <p class="right">共<span>3</span>个<img src="@/assets/images/icons_right.png" style="width: .25rem;height: .4rem;margin: 0 0 0.05rem .25rem;" alt=""></p>
        </li>
        <li>
          <p class="left">备注手机</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">邮箱</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">详细地址</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">生日</p>
          <input type="text" placeholder="未填写">
        </li>
        <li>
          <p class="left">屏蔽TA的消息推送</p>
          <van-switch v-model="checked" />
        </li>
      </ul>
    </div>
    <input type="button" value="保存">
  </div>

</template>

<script>
  export default {
    name: "Compile",
    data() {
      return {
        radio: '1',
        checked: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    padding: .4rem;
    padding-top: 0rem;
    margin-bottom: 4rem;
    ul {
      li {
        height: 1.5rem;
        line-height: 1.5rem;
        vertical-align: middle;
        color: #333333;
        font-size: .4rem;
        clear: both;
        img {
          width: 1rem;
          height: 1rem;
          margin-top: .25rem;
          border-radius: .1rem;
        }
        input {
          text-align: right;
          float: right;
          color: #888888;
        }
      }
    }
  }
  input[type=button] {
    width: 100%;
    height: 1.5rem;
    background: #3b83ff;
    text-align: center;
    color: #fff;
    position: fixed;
    bottom: 0;
    font-size: .48rem;
    z-index: 1000;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #888;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #888;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #888;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #888;
  }
  li {
    position: relative;
  }
  li:after {
    position: absolute;
    content: '';
    /*top: 0%;*/
    bottom: 0;
    left: -50%;
    right: -50%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    border-top: 1px solid #efefef;
    height: 0px;
  }
  @media (-webkit-min-device-pixel-radio: 1.5), (min-device-pixel-radio: 1.5) {
    border-1px::after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-radio: 2), (min-device-pixel-radio: 2) {
    border-1px::after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .van-radio-group {
    float: right;
  }
  .van-radio {
    float: left;
    margin-left: .4rem;
  }
  .van-switch {
    float: right;
    margin-top: .3rem;
  }
  .wraper {
    overflow: hidden;
  }
  .wraper::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
</style>
