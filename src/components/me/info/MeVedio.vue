<template>
    <div class="video">
      <p>我的视频</p>
      <div class="upload" v-show="flag">
        <img src="@/assets/images/me_video.png" alt="">
        <input id="fileId" type="file" multiple="multiple" name="file" @change="update($event)" />
      </div>
      <div class="success" v-show="!flag">
        <video ref="aaa" src="@/assets/video/test.mp4" controls="controls">
          对不起，你的浏览器版本过低，请更换浏览器
        </video>
        <img src="@/assets/images/me_close.png" alt="" @click="close">
      </div>
    </div>
</template>

<script>
  export default {
    name: "MeVedio",
    data() {
      return {
        flag:true
      }
    },
    methods:{
      update(e) {
        // var file=e.target.files;
        // var formData = new FormData();
        // formData.append(file.name, file);
        // console.log(formData);
        console.log(e.target.files);
        console.log(this.$refs.aaa);
        this.flag=false
      },
      close() {
        this.flag=true
      }
    }
  }
</script>

<style scoped lang="scss">
  .video {
    padding: .4rem .5rem;
    p {
      margin: .3rem 0;
    }
    video {
      width: 100%;
    }
    .upload {
      position: relative;
      img {
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
        /*height: 5rem;*/
        width: 100%;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 5rem;
        opacity: 0;
      }
    }
    .success {
      position: relative;
      img {
        position: absolute;
        right: -.25rem;
        top: -.25rem;
        width: .6rem;
        z-index: 5;
      }
    }
  }

</style>
