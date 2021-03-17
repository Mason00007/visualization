<template>
    <div class="bar-race-two">
      <div id="barRaceId" class="bar-race-box">
        <div class="chart-bar-race">
          <!-- <chart  ref="chartBarRace" :options="option" :auto-resize="true" style="width:100%;height:100%;"></chart> -->
          <div></div>
        </div>
        <button class="start-button" @click="startBarRaceing">开始</button>
        <button class="suspend-button" @click="suspendBarRaceing">暂停</button>
        <button :class="['drop-recording-button',{'activeDrop':!mediaRDropstop}]" :disabled="!mediaRDropstop" @click="dropRecordingBarRaceing">录制下载</button>
      </div>
    </div>
</template>

<script>
import CanvasRecorder from '@/config/CanvasRecorder.js'
import countryData from '@/config/countryData.json'
export default {
  data(){
    return {
      option:{},
      mediaR:null,
      mediaRDropstop:false,
      dataA:[],
      countryColors:{
        "Australia":"#00008b","Canada":"#f00","China":"#ffde00","Cuba":"#002a8f","Finland":"#003580",
        "France":"#ed2939","Germany":"#000","Iceland":"#003897","India":"#f93","Japan":"#bc002d",
        "North Korea":"#024fa2","South Korea":"#000","New Zealand":"#00247d",
        "Norway":"#ef2b2d","Poland":"#dc143c","Russia":"#d52b1e",
        "Turkey":"#e30a17","United Kingdom":"#00247d","United States":"#b22234"
      },
      updateFrequency:2000,
      startIndex:10,
      dataYears:[]
    }
  },
  created(){

  },
  mounted(){
    for (var i = 0; i < countryData.length; ++i) {
      if (this.dataYears.length === 0 || this.dataYears[this.dataYears.length - 1] !== countryData[i][4]) {
          this.dataYears.push(countryData[i][4]);
      }
    }
    this.option = this.optionBar()
  },
  methods:{
    optionBar(){ 
      let _this= this
      let startYear = this.dataYears[this.startIndex];
      let option = {
        grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            label: {
                formatter: function (n) {
                    return Math.round(n);
                }
            }
        },
        dataset: {
            source: countryData.slice(1).filter(function (d) {
                return d[4] === startYear;
            })
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 8,
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 12
                },
                formatter: function (value) {
                    return value
                },
                rich: {
                    flag: {
                        fontSize: 25,
                        padding: 5
                    }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [{
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
                color: function (param) {
                    return _this.countryColors[param.value[3]] || '#5470c6';
                }
            },
            encode: {
                x: 0,
                y: 3
            },
            label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: false,
                fontFamily: 'monospace'
            }
        }],
        animationDuration: 0,
        animationDurationUpdate: this.updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
      };
      return option
    },
    getRandomNum(n) {
      let rdmNum= "";
      for (let i = 0; i < n; i++) {
        rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
      }
      return rdmNum;
    },
    recordingBarRaceing(){
      let elementToShare = document.querySelector('#barRaceId canvas');
      this.mediaR = new CanvasRecorder(elementToShare, 4500000);
      this.mediaR.start();
    },
    dropRecordingBarRaceing(){
      this.mediaR.save(this.getRandomNum(6)+"test.webm")
      this.mediaRDropstop = false
    },
    
    stopRecordingBarRaceing(){
      this.mediaR.stop()
    },
    startBarRaceing(){
      let _this =this
      let elementToShare = document.querySelector('#barRaceId canvas');
      this.mediaR = new CanvasRecorder(elementToShare, 4500000);
      this.mediaR.start();
      for (var i = _this.startIndex; i < _this.dataYears.length - 1; ++i) {
        (function (i) {
            setTimeout(function () {
                _this.updateYear(_this.dataYears[i + 1]);
                if(i == _this.dataYears.length-2){
                  _this.mediaRDropstop = true
                }
            }, (i - _this.startIndex) * _this.updateFrequency);
        })(i);
      }
    },
    updateYear(year){
      var source = countryData.slice(1).filter(function (d) {
            return d[4] === year;
        });
        let dataB = this.optionBar()
        dataB.series[0].data = source;
        this.option = dataB
    },
  },
}
</script>

<style lang="scss">
.bar-race-two{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .chart-bar-race{
    width:600px;
    height: 900px;
    margin: 10px;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 4px;
  }
  .bar-race-box{
    position: relative;
    button{
      /* width: 20px; */
      position: absolute;
      
      border: none;
      color: #ffffff;
      background: #1890ff;
      padding: 10px;
      border-radius: 4px;
      box-sizing: border-box;
      outline: none;
      text-align: center;
    }
    .start-button{
      top: 10px;
      right: -50px;
    }
    .suspend-button{
      top: 60px;
      right: -50px;
    }
    .recording-button{
      top: 110px;
      right: -50px;
    }
    .stop-recording-button{
      top: 160px;
      right: -77px;
    }
    .activeStop{
      background: rgb(255, 79, 79) !important;
    }
    .drop-recording-button{
      top: 210px;
      right: -77px;
    }
    .activeDrop{
      background: rgb(255, 79, 79) !important;
    }
  }
  
}
</style>