<template>
    <div class="bar-race">
      <div id="barRaceId" class="bar-race-box">
        <div class="chart-bar-race">
          <chart  ref="chartBarRace" :options="option" :auto-resize="true" style="width:100%;height:100%;"></chart>
        </div>
        <button class="start-button" @click="startBarRaceing">开始</button>
        <button class="suspend-button" @click="suspendBarRaceing">暂停</button>
        <button :class="['drop-recording-button',{'activeDrop':!mediaRDropstop}]" :disabled="!mediaRDropstop" @click="dropRecordingBarRaceing">录制下载</button>
        <!-- <button class="recording-button" @click="recordingBarRaceing">录制</button>
        <button :class="['stop-recording-button',{'activeStop':!mediaR}]" :disabled="!mediaR" @click="stopRecordingBarRaceing">录制结束</button>
        <button :class="['drop-recording-button',{'activeDrop':!mediaR}]" :disabled="!mediaR" @click="dropRecordingBarRaceing">录制下载</button> -->
      </div>
      
      
    </div>
</template>

<script>
// import ChartBarRace from '@/components/chartBarRace.vue'
// import {barRaceData} from '@/config'
// import RecordRTC from 'recordrtc';
import CanvasRecorder from '@/config/CanvasRecorder.js'
// import { save } from 'save-file'
export default {
  data(){
    return {
      option:{},
      runInter:'',
      recordRTC:null,
      mediaR:null,
      mediaRDropstop:false,
      allChunks:[],
    }
  },
  created(){

  },
  mounted(){
    this.option = this.handleBarRaceData().option
    
  },
  methods:{

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
      //这是MediaRecorder方法制作视频，
      // let elementToShare = document.querySelector('#barRaceId canvas');
      // let stream=elementToShare.captureStream(60);
      // this.mediaR=new MediaRecorder(stream, {
      //   mimeType: 'video/webm;codecs=vp9',
      // });
      // this.mediaR.ondataavailable = e => {
      //   this.allChunks.push(
      //       e.data
      //   );
      // } 
      // this.mediaR.start(10);
    },
    dropRecordingBarRaceing(){

      this.mediaR.save(this.getRandomNum(6)+"test.webm")
      this.mediaRDropstop = false
      this.option = this.handleBarRaceData().option
      //这是MediaRecorder方法制作视频，
      // const fullBlob = new Blob(this.allChunks);
      // save(fullBlob, this.getRandomNum(6)+"test.mp4");
    },
    
    stopRecordingBarRaceing(){
      this.mediaR.stop()

      //这是MediaRecorder方法制作视频，
       // this.mediaR.stop()
    },
    startBarRaceing(){
      var _this=this

      let elementToShare = document.querySelector('#barRaceId canvas');
      this.mediaR = new CanvasRecorder(elementToShare, 4500000);
      this.mediaR.start();
      setTimeout(function() {
          _this.run();
      }, 0);
      this.runInter=setInterval(function () {
          _this.run();
      }, 3000);
    },
    suspendBarRaceing(){
      setTimeout(()=>{
        this.mediaR.stop()
        this.mediaRDropstop = true
      },6000)
      
      clearInterval(this.runInter)
    },
    handleBarRaceData(){
      var barRaceDataArr = [];
      for (let i = 0; i < 5; ++i) {
          barRaceDataArr.push(Math.round(Math.random() * 200));
      }
      let RaceData = {
        option : {
          xAxis: {
              max: 'dataMax',
          },
          yAxis: {
              type: 'category',
              data: ['苹果', '西瓜', '菠萝', '葡萄', '榴莲'],
              inverse: true,
              animationDuration: 300,
              animationDurationUpdate: 300,
              max: 2 // only the largest 3 bars will be displayed
          },
          series: [{
              realtimeSort: true,
              // name: 'X',
              type: 'bar',
              data: barRaceDataArr,
              label: {
                  show: true,
                  position: 'right',
                  valueAnimation: true
              }
          }],
          legend: {
              show: true
          },
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        }
      }
      return RaceData
    },
    run(){
      
      let data = this.option.series[0].data;
      for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
        }
        else {
            data[i] += Math.round(Math.random() * 200);
        }
      }
     
      let RaceData = {
        option : {
          xAxis: {
              max: 'dataMax',
          },          
          yAxis: {
              type: 'category',
              data: ['苹果', '西瓜', '菠萝', '葡萄', '榴莲'],
              inverse: true,
              animationDuration: 300,
              animationDurationUpdate: 300,
              max: 2 // only the largest 3 bars will be displayed
          },
          series: [{
              realtimeSort: true,
              type: 'bar',
              data: data,
              label: {
                  show: true,
                  position: 'right',
                  valueAnimation: true
              }
          }],
          legend: {
              show: true
          },
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        }
      }
      this.option  = RaceData.option
    }
  },
  // components: {
  //   ChartBarRace
  // }
}
</script>

<style lang="scss">
.bar-race{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .chart-bar-race{
    width:708px;
    height: 980px;
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