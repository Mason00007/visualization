<template>
  <div class="chart-bar-race">
    <chart  ref="chartBarRace" :options="optiondata.option" :auto-resize="true" style="width:100%;height:100%;"></chart>
  </div>
</template>

<script>
export default {
  name: 'ChartBarRace',
  props: {
    optiondata: Object,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart-bar-race{
  width:708px;
  height: 980px;
  margin: 10px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
}
</style>
