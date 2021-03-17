<template>
  <div class="two">
    <chart  ref="chartTwo" :options="optiondata.option" :auto-resize="true" style="width:100%;height:100%;"></chart>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldTwo',
  props: {
    optiondata: Object,
    
  },
   mounted() {
      console.log('***************22222222',this.optiondata)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.two{
  width: 344px;
  height: 430px;
  margin: 10px;
  border: 1px solid #000000;
  background: #ffffff;
  border-radius: 4px;
}
</style>
