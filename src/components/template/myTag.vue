<template>
    <div class="publicTag">
        <span class="tag" v-for="(item,index) of myTag" :key="index">
            {{item.text}}
            <span class="close">
                x
            </span>
            <span class="count">
              {{item.count}}
            </span>
          </span>
    </div>
</template>

<script>
    export default {
      name: "myTag",
      data(){
        return{
          myTag:[{text:'有两把刷子',count:'0'},{text:'互联网创业者',count:'0'},{text:'诚信至上',count:'0'},{text:'豪爽耿直',count:'0'}]
        }
      }
    }
</script>

<style scoped lang="scss">
  span.tag{
    display: inline-block;
    position: relative;
    margin-top: .3rem;
    margin-right: .35rem;
    padding: .3rem .45rem .3rem .8rem;
    background: $color-qBlue;
    color: $color-sBlue;
    border-radius: 5px;
    span.close{
      position: absolute;
      right: -.15rem;
      top: -.15rem;
      width: .42rem;
      height: .42rem;
      line-height: .32rem;
      background: rgb(102,102,102);
      text-align: center;
      color: #ffffff;
      border-radius: 50%;
    }
  }
</style>
