<template>
  <div class="Three">
    <chart  ref="chartThree" :options="optiondata.option" :auto-resize="true" style="width:100%;height:100%;"></chart>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldThree',
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
.Three{
  width:708px;
  height: 430px;
  margin: 10px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
}
</style>
