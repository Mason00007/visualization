<template>
  <div class="four">
    <chart ref="chartFour" :options="optiondata.option" :auto-resize="true" style="width:100%;height:100%;"></chart>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldFour',
  props: {
    optiondata: Object
  },
  mounted() {
      console.log('***************1',this.optiondata)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.four{
  width: 344px;
  height: 205px;
  margin: 10px;
  border: 1px solid #000000;
  background: #ffffff;
  border-radius: 4px;
}
</style>
