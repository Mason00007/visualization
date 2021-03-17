<template>
  <div onbeforeunload class="homeThree">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="content-left"> 
        <div class="button-wrap"><button @click="isEditStatus">编辑状态</button></div>
        <div class="button-wrap"><button @click="addDataOnePage">创建1*1</button></div>
        <div class="button-wrap"><button @click="addDataTwoPage">创建1*2</button></div>
        <div class="button-wrap"><button @click="addDataThreePage">创建2*2</button></div>
        <div class="button-wrap"><button @click="addMapPage">地图</button></div>
        <div class="button-wrap"><button @click="dialogVisible = true">Excel表</button></div>
        <div class="button-wrap"><button @click="addPage">新增一页</button></div>
        <div class="button-wrap"><button @click="saveData">保存</button></div>
        <div class="button-wrap"><button @click="restoreData">还原数据</button></div>
        <div v-show="!editStatus" class="button-wrap"><button @click="exportPDF">导出PDF</button></div>
      </div>
    
    <div id="content" class="content">
      <div id="contentPage" class="page">
        <div 
          class="member"
          v-for="(item,index) in pageTable.items" 
          :key="item.id" 
          :data-id="item.id"
          :index="index"
          :style="{top:item.top+'px',left:item.left+'px'}"
          :draggable='editStatus'
          
          @dragend="onDragendPage($event,index,item.type,item.x,item.y)" 
          @dragover="onDragoverPage($event)"
          @drop="onDropPage($event)"
          >
          <div v-show="editStatus" class="addDataBox" @click="changeDataBox(index)">线图</div>
          <div v-show="editStatus" class="addDataPerBox" @click="changePerDataBox(index)">饼图</div>
          <div v-show="editStatus" class="addDataWorldBox" @click="changeWorldDataBox(index,item.type)">地图</div>
          <div v-show="editStatus" class="deleteDataBox" @click="deleteDataBox(index,item.type,item.x,item.y)">删除</div>
          <component  :is="item.type" :optiondata="item.data">
          </component>
        </div>
        
        <div class="arr-Data">
          <div class="a" v-for="(item,indexA) in pageTable.arrData" :key="indexA">
            <div :class="[{ active: editStatus },'b']"  v-for="(b,indexB) in item"  :index="indexA+''+indexB" :key='b.num'></div>
          </div>
        </div>
        
      </div>
    </div>
    <el-dialog
    title="选择开始日期和结束日期"
    :visible.sync="dialogVisible"
    width="30%">
      <el-date-picker
        v-model="datetime"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyyMMdd"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmTime">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorldTwo from '@/components/HelloWorldTwo.vue'
import HelloWorldThree from '@/components/HelloWorldThree.vue'
// import HelloWorldFour from '@/components/HelloWorldFour.vue'
import {lineChart,pieChart,barChart,handleMapNumSizeColor} from '@/config'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
export default {
  name: 'Home',
  data() {
    return {
      startExchangeIndex: '',
      endExchangeIndex: '',
      datetime:'',
      loading:null,
      pickerOptions:{
        disabledDate(time) {
          let curDate = (new Date()).getTime();
          let three = 6 * 30 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      },
      dialogVisible:false,
      visible:false,
      editStatus:false,
      arrData:[],
      items: [],
      pageTable:{
        arrData:[],
        items:[]
      },
    }
  },
  mounted() {
    this.pageTable.arrData=this.addTable(4,4)

  },
  methods: {
    //确认选择的时间段
    confirmTime(){
      let startTime = this.datetime[0] +''
      let endTime = this.datetime[1] +''
      //获取注册人数并导出Excel表
      if(startTime == 'undefined'){
        return
      } 
      this.getData(startTime,endTime)
      this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
      });
    },
    //获取后台数据
    getData(startTime,endTime){
      let _this = this
      this.$API.get('api/info',{params: { 'start': startTime,'end':endTime },responseType: "blob",headers: {'Content-Type': 'application/xhtml+xml'}})
        .then(function (res){
          let blob = new Blob([res.data])
          let url = URL.createObjectURL(blob)
          _this.downloadFile(url, _this.getRandomNum(6)+'sidusRegister.xlsx')
        })
    },
    //导出Excel表
    downloadFile(downUrl,fileName){
      const aLinkUrl = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      aLinkUrl.href = downUrl
      aLinkUrl.download = fileName
      const clickAlink = (obj) => { // 模拟点击
        const ev = document.createEvent('MouseEvents')
        ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        obj.dispatchEvent(ev)
      }
      clickAlink(aLinkUrl)
      setTimeout(()=>{
        this.loading.close()
        this.dialogVisible = false
      },50)
      
    },
    //id随机生成
    getRandomNum(n) {
      let rdmNum= "";
      for (let i = 0; i < n; i++) {
        rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
      }
      return rdmNum;
    },
    exportPDF(){
      if(this.editStatus) return;
      let content = document.getElementById("contentPage")
      html2canvas(content).then((canves)=>{
        let contentWidth = canves.width
        let contentHeight = canves.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight

        var pageData = canves.toDataURL('image/jpeg', 1.0);
        
        var PDF = new jsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        let name ='sidus'+ this.getRandomNum(10)+'.pdf'
        PDF.save(name);

      })
    },
    //是否在编辑状态
    isEditStatus(){
      this.editStatus = !this.editStatus
    },
    //保存数据
    saveData(){
      let data = this.pageTable
      sessionStorage.setItem("visualizationData", JSON.stringify(data));
    },
    //还原数据。
    restoreData(){
      let data = sessionStorage.getItem("visualizationData");
      this.pageTable = JSON.parse(data)
    },
    //新增一页
    addPage(){
      if(!this.editStatus) return;
      if(this.pageTable.arrData.length<=16){
        let data = [...this.pageTable.arrData,...this.addNewTable(4,4,this.pageTable.arrData.length)];
        this.pageTable.arrData = data;
      }
    },
    //删除类型并解放位置
    deleteDataBox(index,type,x,y){
      if(!this.editStatus) return;
      switch(type){
        case 'HelloWorld':
          this.pageTable.arrData[x][y].seletion = false
          this.pageTable.items.splice(index,1)
          break;
        case 'HelloWorldTwo':
          this.pageTable.arrData[x][y].seletion = false
          this.pageTable.arrData[x+1][y].seletion = false
          this.pageTable.items.splice(index,1)
          break; 
        case 'HelloWorldThree':
          this.pageTable.arrData[x][y].seletion = false
          this.pageTable.arrData[x+1][y].seletion = false
          this.pageTable.arrData[x][y+1].seletion = false
          this.pageTable.arrData[x+1][y+1].seletion = false
          this.pageTable.items.splice(index,1)
          break;    

      }
      
    },
    //改变图表的类型
    changeWorldDataBox(index,type){
      if(!this.editStatus) return;
      // this.pageTable.items[index].data = handleSymbolSize(type)
      this.pageTable.items[index].data = handleMapNumSizeColor(type)
    },
    changeDataBox(index){
      if(!this.editStatus) return;
      this.pageTable.items[index].data = lineChart
    },
    changePerDataBox(index){
      if(!this.editStatus) return;
      this.pageTable.items[index].data = pieChart
    },
    //增加表格列数
    addTable(i,j) {
      let arr = new Array(i).fill(new Array(j).fill({seletion:false}))
      for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
          arr[i][j] = {
            ...arr[i][j],
            num: '' + i + j,
            x:i,
            y:j,
            top: 10+i*226,
            left:10+365*j
          }
        }
        arr[i] = [ ...arr[i] ]
      }
      return arr
    },
    //原有的基础上增加表格
    addNewTable(i,j,startIndex) {
      let arr = new Array(i).fill(new Array(j).fill({seletion:false}))
      for(let a=0;a<arr.length;a++){
        for(let b=0;b<arr[a].length;b++){
          arr[a][b] = {
            ...arr[a][b],
            num: '' + (a+startIndex) + b,
            x:a+startIndex,
            y:b,
            top: 10+(a+startIndex)*226,
            left:10+365*b
          }
        }
        arr[a] = [ ...arr[a] ]
      }
      return arr
    },
    //处理新增类型1问题
    handleItemsPageOne(item){
      //判断是类型1
      if(item.type == 'HelloWorld'){
        for(let i=0;i<this.pageTable.arrData.length;i++){
          for(let j=0;j<this.pageTable.arrData[i].length;j++){
            //判断最后一个是否也被占了，是就增加一页。
            if(i==this.pageTable.arrData.length-1&&j==this.pageTable.arrData[i].length-1){
              if(this.pageTable.arrData[i][j].seletion){
                let newIndex = this.pageTable.arrData.length;
                let data = [...this.pageTable.arrData,...this.addNewTable(4,4,this.pageTable.arrData.length)];
                this.pageTable.arrData = data;
                this.pageTable.arrData[newIndex][0].seletion = true;
                let ID = this.getRandomNum(6);
                [item.id,item.top,item.left,item.num,item.x,item.y] = [ID,data[newIndex][0].top,data[newIndex][0].left,data[newIndex][0].num,data[newIndex][0].x,data[newIndex][0].y];
                return item
              }
            }
            //判断是否被占领
            if(this.pageTable.arrData[i][j].seletion ==false){
              this.pageTable.arrData[i][j].seletion = true;
              let ID = this.getRandomNum(6);
              [item.id,item.top,item.left,item.num,item.x,item.y] = [ID,this.pageTable.arrData[i][j].top,this.pageTable.arrData[i][j].left,this.pageTable.arrData[i][j].num,this.pageTable.arrData[i][j].x,this.pageTable.arrData[i][j].y];
              return item
            }
          }
        }
      }
      return []
    },
    //新增类型1
    addDataOnePage(){
     
      if(!this.editStatus) return;
      let helloOne = { 
        type: 'HelloWorld',
        data:lineChart
      }
      let data = this.handleItemsPageOne(helloOne)
      //判断数组是空，退出。
      if(data.length == 0) return
      this.pageTable.items = [...this.pageTable.items,data]
    },
    //处理新增类型2问题
    handleItemsPageTwo(item){
      for(let i=0;i<this.pageTable.arrData.length;i++){
        for(let j=0;j<this.pageTable.arrData[i].length;j++){
          //判断是否到了最后一行，是就增加一页。
          if(i==this.pageTable.arrData.length-1){
            //let newIndex = this.pageTable.arrData.length;
            let data = [...this.pageTable.arrData,...this.addNewTable(4,4,this.pageTable.arrData.length)];
            this.pageTable.arrData = data;
            for(let a=0;a<this.pageTable.arrData.length;a++){
              for(let b=0;b<this.pageTable.arrData[a].length;b++){
                 if(this.pageTable.arrData[a][b].seletion ==false && this.pageTable.arrData[a+1][b].seletion ==false){
                  this.pageTable.arrData[a][b].seletion = true;
                  this.pageTable.arrData[a+1][b].seletion = true;
                  let ID = this.getRandomNum(6);
                  [item.id,item.top,item.left,item.num,item.x,item.y] = [ID,this.pageTable.arrData[a][b].top,this.pageTable.arrData[a][b].left,this.pageTable.arrData[a][b].num,this.pageTable.arrData[a][b].x,this.pageTable.arrData[a][b].y];
                  return item
                }
              }
            }
          }
          //判断是否被占领
          if(this.pageTable.arrData[i][j].seletion ==false && this.pageTable.arrData[i+1][j].seletion ==false){
            this.pageTable.arrData[i][j].seletion = true;
            this.pageTable.arrData[i+1][j].seletion = true;
            let ID = this.getRandomNum(6);
            [item.id,item.top,item.left,item.num,item.x,item.y] = [ID,this.pageTable.arrData[i][j].top,this.pageTable.arrData[i][j].left,this.pageTable.arrData[i][j].num,this.pageTable.arrData[i][j].x,this.pageTable.arrData[i][j].y];
            return item
          }
        }
      }
    },
    //新增类型2
    addDataTwoPage(){
      if(!this.editStatus) return;
      let helloTwo = { 
        type: 'HelloWorldTwo',
        data:barChart
      }
      let data = this.handleItemsPageTwo(helloTwo)
      //判断数组是空，退出。
      if(data.length == 0) return
      this.pageTable.items = [...this.pageTable.items,data]
    },
    //处理新增类型3问题
    handleItemsPageThree(item){
      for(let i=0;i<this.pageTable.arrData.length;i++){
        for(let j=0;j<this.pageTable.arrData[i].length;j++){
          //先判断是否到了最后一行，是就增加一页。
          if(i==this.pageTable.arrData.length-1){
            //let newIndex = this.pageTable.arrData.length;
            let data = [...this.pageTable.arrData,...this.addNewTable(4,4,this.pageTable.arrData.length)];
            this.pageTable.arrData = data;
            for(let a=0;a<this.pageTable.arrData.length;a++){
              for(let b=0;b<this.pageTable.arrData[a].length;b++){
                if(a<this.pageTable.arrData.length-1&&b<this.pageTable.arrData[a].length-1){
                  //判断是否被占领
                  if(this.pageTable.arrData[a][b].seletion ==false &&
                    this.pageTable.arrData[a+1][b].seletion ==false&&
                    this.pageTable.arrData[a][b+1].seletion ==false&&
                    this.pageTable.arrData[a+1][b+1].seletion ==false){
                      this.pageTable.arrData[a][b].seletion = true;
                      this.pageTable.arrData[a+1][b].seletion = true;
                      this.pageTable.arrData[a][b+1].seletion = true;
                      this.pageTable.arrData[a+1][b+1].seletion = true;
                      let ID = this.getRandomNum(6);
                      [item.id,item.top,item.left,item.num,item.x,item.y] = [ID,this.pageTable.arrData[a][b].top,this.pageTable.arrData[a][b].left,this.pageTable.arrData[a][b].num,this.pageTable.arrData[a][b].x,this.pageTable.arrData[a][b].y];
                      return item
                  }
                }
              }
            }
          }
          //后判断是能放到2*2格子的内容
          if(i<this.pageTable.arrData.length-1&&j<this.pageTable.arrData[i].length-1){
            //判断是否被占领
            if(this.pageTable.arrData[i][j].seletion ==false &&
              this.pageTable.arrData[i+1][j].seletion ==false&&
              this.pageTable.arrData[i][j+1].seletion ==false&&
              this.pageTable.arrData[i+1][j+1].seletion ==false){
                this.pageTable.arrData[i][j].seletion = true;
                this.pageTable.arrData[i+1][j].seletion = true;
                this.pageTable.arrData[i][j+1].seletion = true;
                this.pageTable.arrData[i+1][j+1].seletion = true;
                let ID = this.getRandomNum(6);
                [item.id,item.top,item.left,item.num,item.x,item.y] = [ID,this.pageTable.arrData[i][j].top,this.pageTable.arrData[i][j].left,this.pageTable.arrData[i][j].num,this.pageTable.arrData[i][j].x,this.pageTable.arrData[i][j].y];
                return item
              }
          }
        }
      }
    },
    //新增类型3
    addDataThreePage(){
      if(!this.editStatus) return;
      let helloThree = { 
        type: 'HelloWorldThree',
        data:pieChart
      }
      
      let data = this.handleItemsPageThree(helloThree)
      //判断数组是空，退出。
      if(data.length == 0) return
      this.pageTable.items = [...this.pageTable.items,data]
    },
    //增加地图
    addMapPage(){
      if(!this.editStatus) return;
      let helloThree = { 
        type: 'HelloWorldThree',
        // data:handleSymbolSize('HelloWorldThree')
        data:handleMapNumSizeColor('HelloWorldThree')
      }
      
      let data = this.handleItemsPageThree(helloThree)
      //判断数组是空，退出。
      if(data.length == 0) return
      this.pageTable.items = [...this.pageTable.items,data]
    },
    //*********************拖曳
    //改变类型和改变位置
    changeToTypeOne(index,i,j){
      this.pageTable.items[index].top = this.pageTable.arrData[i][j].top 
      this.pageTable.items[index].left = this.pageTable.arrData[i][j].left 
      this.pageTable.items[index].num = this.pageTable.arrData[i][j].num 
      
      this.pageTable.items[index].x = i
      this.pageTable.items[index].y = j
      this.pageTable.items[index].type = 'HelloWorld'
    },
    //改变位置
    changeToPosition(index,i,j){
      this.pageTable.items[index].top = this.pageTable.arrData[i][j].top 
      this.pageTable.items[index].left = this.pageTable.arrData[i][j].left 
      this.pageTable.items[index].num = this.pageTable.arrData[i][j].num 
      this.pageTable.items[index].x = i
      this.pageTable.items[index].y = j
    },
    // onDragstartPage(event) {
    //   // console.log('start:event',event)
    //   console.log('start:event.offsetX',event.offsetX) 
    // },
    //开始结束
    onDragendPage(event,index,type,startX,startY){
      let dragendX = event.pageX - document.getElementById("content").offsetLeft
      let dragendY = event.pageY - document.getElementById("content").offsetTop
      let maxTop = 0
      let maxLeft = 0
      for(let i=0;i<this.pageTable.arrData.length;i++){
        for(let j=0;j<this.pageTable.arrData[i].length;j++){
          maxTop = this.pageTable.arrData[i][j].top + 205
          maxLeft = this.pageTable.arrData[i][j].left + 344
          //第一次判断是点击的那个区域
          if(dragendX<=maxLeft&&dragendY<=maxTop){
            //判断这个区域是否被占了,被占了就互相交换数据。
            if(this.pageTable.arrData[i][j].seletion==true){
              [this.pageTable.items[index].data, this.pageTable.items[this.endExchangeIndex].data] = [this.pageTable.items[this.endExchangeIndex].data, this.pageTable.items[index].data];
              return;
            }else{
              switch(type){
                case 'HelloWorld':
                  this.pageTable.arrData[startX][startY].seletion = false;
                  this.pageTable.arrData[i][j].seletion = true;
                  this.changeToPosition(index,i,j);
                  return;
                  // break;
                case 'HelloWorldTwo':
                  //是否在最后一行，在最后一行就变成类型1并改变位置
                  if(this.pageTable.arrData.length-1 === i){
                    this.changeToTypeOne(index,i,j)
                    this.pageTable.arrData[startX][startY].seletion = false
                    this.pageTable.arrData[startX+1][startY].seletion = false
                    this.pageTable.arrData[i][j].seletion = true
                  }else{
                    //判断拖动到的位置的下一列是否被占。被占了变成类型1并改变位置
                    if(this.pageTable.arrData[i+1][j].seletion == true){
                      this.changeToTypeOne(index,i,j)
                      this.pageTable.arrData[startX][startY].seletion = false
                      this.pageTable.arrData[startX+1][startY].seletion = false
                      this.pageTable.arrData[i][j].seletion = true
                    }else{
                      this.pageTable.arrData[startX][startY].seletion = false
                      this.pageTable.arrData[startX+1][startY].seletion = false
                      this.pageTable.arrData[i][j].seletion = true
                      this.pageTable.arrData[i+1][j].seletion = true
                      this.changeToPosition(index,i,j)
                    }
                  }
                  break;  
                case 'HelloWorldThree':
                  //是否在最后一行和最后一列，在最后一行就变成类型1并改变位置。
                  if(this.pageTable.arrData.length-1 === i || this.pageTable.arrData[i].length-1 === j){
                    this.changeToTypeOne(index,i,j)
                    this.pageTable.arrData[startX][startY].seletion = false
                    this.pageTable.arrData[startX+1][startY].seletion = false
                    this.pageTable.arrData[startX][startY+1].seletion = false
                    this.pageTable.arrData[startX+1][startY+1].seletion = false
                    this.pageTable.arrData[i][j].seletion = true
                  }else{
                    //判断三个位置是否被占
                    if(this.pageTable.arrData[i+1][j].seletion || this.pageTable.arrData[i][j+1].seletion || this.pageTable.arrData[i+1][j].seletion){
                      this.changeToTypeOne(index,i,j)
                      this.pageTable.arrData[startX][startY].seletion = false
                      this.pageTable.arrData[startX+1][startY].seletion = false
                      this.pageTable.arrData[startX][startY+1].seletion = false
                      this.pageTable.arrData[startX+1][startY+1].seletion = false
                      this.pageTable.arrData[i][j].seletion = true
                    }else{
                      this.pageTable.arrData[startX][startY].seletion = false
                      this.pageTable.arrData[startX+1][startY].seletion = false
                      this.pageTable.arrData[startX][startY+1].seletion = false
                      this.pageTable.arrData[startX+1][startY+1].seletion = false
                      this.pageTable.arrData[i][j].seletion = true
                      this.pageTable.arrData[i+1][j].seletion = true
                      this.pageTable.arrData[i][j+1].seletion = true
                      this.pageTable.arrData[i+1][j+1].seletion = true
                      this.changeToPosition(index,i,j)
                    }
                  }
                  break;  
              }
              // console.log('拖动时的2',this.pageTable.arrData)
              return;
            }

          }else{
            maxTop = 0
            maxLeft = 0
          }
        }
      }
    },
    onDropPage(event){
      if (event.target.className == 'member') {
        this.endExchangeIndex = event.target.getAttribute('index')
      } else {
        this.endExchangeIndex = event.target.closest('[data-id]').getAttribute('index')
      }
    },
    onDragoverPage(event){
      // 阻止元素的默认行为，不然ondrop不管用
      event.preventDefault();
    }
  },
  components: {
    HelloWorld,
    HelloWorldTwo,
    HelloWorldThree,
    // HelloWorldFour
  }
}
</script>

<style scoped lang="scss">
.homeThree{
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  // align-items: center;
  min-width: 1600px;
  .content-left{
    margin-right: 10px;
    .button-wrap{
      margin: 10px 0;
      width: 100%;
      button{
        width: 100%;
        border: none;
        color: #ffffff;
        background: #1890ff;
        padding: 10px;
        border-radius: 4px;
        box-sizing: border-box;
        outline: none;
        text-align: center;
        
      }
    }
  }
  .content{
    position: relative;
    width:1480px;
    min-height: 920px;
    height: 100%;
    border: 1px solid #000000;
    .page{
      position: relative;
      width: 1480px;
    }
    .member{
      position: absolute;
      
      
      z-index: 11;
      .addDataBox{
        font-size: 14px;
        position: absolute;
        top: 10px;
        right: 15px;
        z-index: 10;
      }
      .addDataWorldBox{
        font-size: 14px;
        position: absolute;
        top: 10px;
        right: 90px;
        z-index: 10;
      }
      .addDataPerBox{
        font-size: 14px;
        position: absolute;
        top: 10px;
        right: 52px;
        z-index: 10;
      }
      .deleteDataBox{
        font-size: 14px;
        position: absolute;
        top: 10px;
        right: 130px;
        z-index: 10;
      }
    }
    .arr-Data{
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
      padding: 10px;
      .a{
        display: flex;
        .b{
          width: 344px;
          height: 205px;
          margin: 10px;
        }
        .active{
          border: 1px dashed blueviolet;
        }
      }
    }
  }
}
</style>
