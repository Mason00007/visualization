<template>
  <div onbeforeunload class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="content-left"> 
        <div class="button-wrap"><button @click="addDataOnePage">创建1*1</button></div>
        <div class="button-wrap"><button @click="addDataTwoPage">创建1*2</button></div>
        <div class="button-wrap"><button @click="addDataThreePage">创建2*2</button></div>
        <div class="button-wrap"><button @click="addPage">新增一页</button></div>
        <div class="button-wrap"><button @click="saveData">保存</button></div>
        <div class="button-wrap"><button @click="restoreData">还原数据</button></div>
      </div>
    
    <div id="content" class="content">
      <div class="page">
        <div 
          class="member"
          v-for="(item,index) in pageTable.items" 
          :key="item.id" 
          :data-id="item.id"
          :index="index"
          :style="{top:item.top+'px',left:item.left+'px'}"
          draggable="true" 
          @dragstart="onDragstartPage($event)"
          @dragend="onDragendPage($event,index,item.type,item.x,item.y)" 
          @dragover="onDragoverPage($event)"
          @drop="onDropPage($event)"
          >
          
          <!-- <el-popover
              placement="bottom"
              width="160"
              v-model="visible">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text">取消</el-button>
                <el-button type="primary" size="mini">确定</el-button>
              </div>
              <p slot="reference" class="addDataBox" @click="showPopo" >+</p>
            </el-popover> -->
          <div class="addDataBox" @click="changeDataBox(index)">线图</div>
          <div class="addDataPerBox" @click="changePerDataBox(index)">饼图</div>
          <div class="deleteDataBox" @click="deleteDataBox(index,item.type,item.x,item.y)">删除</div>
          <component  :is="item.type" :optiondata="item.data">
          </component>
        </div>
        
        <div class="arr-Data">
          <div class="a" v-for="(item,indexA) in pageTable.arrData" :key="indexA">
            <div class="b"  v-for="(b,indexB) in item"  :index="indexA+''+indexB" :key='b.num'>{{b.num}}</div>
          </div>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorldTwo from '@/components/HelloWorldTwo.vue'
import HelloWorldThree from '@/components/HelloWorldThree.vue'
// import HelloWorldFour from '@/components/HelloWorldFour.vue'
import {lineChart,pieChart} from '@/config'
export default {
  name: 'Home',
  data() {
    return {
      startExchangeIndex: '',
      endExchangeIndex: '',
      visible:false,
      arrData:[],
      items: [],
      pageTable:{
        arrData:[],
        items:[
          // {
          //   xy:{x:0,y:0},
          //   width:'344',
          //   height:'205',
          //   top:10,
          //   left:10,
          //   type: 'HelloWorld',
          //   data:{
          //     id:'0',
          //     option:{
          //       xAxis: {
          //           type: 'category',
          //           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          //       },
          //       yAxis: {
          //           type: 'value'
          //       },
          //       series: [{
          //           data: [820, 932, 901, 934, 1290, 1330, 1320],
          //           type: 'line'
          //       }]
          //     }
          //   }
          // },
          // { 
          //   xy:{x:1,y:2},
          //   top:236,
          //   left:740,
          //   width:'344',
          //   height:'430',
          //   type: 'HelloWorldTwo',
          //   data:{
          //     id:'3',
          //     option : {
          //       tooltip: {
          //           trigger: 'item',
          //           formatter: '{a} <br/>{b}: {c} ({d}%)'
          //       },
          //       legend: {
          //           orient: 'vertical',
          //           left: 10,
          //           data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          //       },
          //       series: [
          //           {
          //               name: '访问来源',
          //               type: 'pie',
          //               radius: ['50%', '70%'],
          //               avoidLabelOverlap: false,
          //               label: {
          //                   show: false,
          //                   position: 'center'
          //               },
          //               emphasis: {
          //                   label: {
          //                       show: true,
          //                       fontSize: '30',
          //                       fontWeight: 'bold'
          //                   }
          //               },
          //               labelLine: {
          //                   show: false
          //               },
          //               data: [
          //                   {value: 335, name: '666'},
          //                   {value: 310, name: '777'},
          //                   {value: 234, name: '888'},
          //                   {value: 135, name: '999'},
          //                   {value: 1548, name: '555'}
          //               ]
          //           }
          //       ]
          //     }
          //   }
          // },
        ]
      },
    }
  },
  mounted() {
    this.pageTable.arrData=this.addTable(4,4)
  },
  methods: {
    //id随机生成
    getRandomNum(n) {
      let rdmNum= "";
      for (let i = 0; i < n; i++) {
        rdmNum+= Math.floor(Math.random() * 10); // [0,10)的整数
      }
      return rdmNum;
    },
    showPopo(){
      this.visible =true
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
      if(this.pageTable.arrData.length<=16){
        let data = [...this.pageTable.arrData,...this.addNewTable(4,4,this.pageTable.arrData.length)];
        this.pageTable.arrData = data;
      }
    },
    //删除类型并解放位置
    deleteDataBox(index,type,x,y){
      
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
    changeDataBox(index){
      this.pageTable.items[index].data = lineChart
    },
    changePerDataBox(index){
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
      // console.log('HelloWorld',this.pageTable.arrData)
      let helloOne = { 
        type: 'HelloWorld',
        data:{
          id:this.pageTable.items.length+1,
          option:{
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
          }
        }
      }
      let data = this.handleItemsPageOne(helloOne)
      //判断数组是空，退出。
      if(data.length == 0) return
      this.pageTable.items = [...this.pageTable.items,data]
      console.log('新增类型1',this.pageTable.arrData)
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
            // this.pageTable.arrData[newIndex][0].seletion = true;
            // this.pageTable.arrData[newIndex+1][0].seletion = true;
            // [item.top,item.left,item.num] = [data[newIndex][0].top,data[newIndex][0].left,data[newIndex][0].num];
            // return item
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
      let helloTwo = { 
        type: 'HelloWorldTwo',
        data:{
          id:this.items.length+1,
          option:{
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
          }
        }
      }
      let data = this.handleItemsPageTwo(helloTwo)
      //判断数组是空，退出。
      if(data.length == 0) return
      this.pageTable.items = [...this.pageTable.items,data]
      console.log('新增类型2',this.pageTable.arrData)
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
      let helloThree = { 
        type: 'HelloWorldThree',
        data:{
         
          option : {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '666'},
                        {value: 310, name: '777'},
                        {value: 234, name: '888'},
                        {value: 135, name: '999'},
                        {value: 1548, name: '555'}
                    ]
                }
            ]
          }
        }
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
      // this.pageTable.items[index].top = this.pageTable.arrData[i][j].top 
      // this.pageTable.items[index].left = this.pageTable.arrData[i][j].left 
      this.pageTable.items[index].top = this.pageTable.arrData[i][j].top 
      this.pageTable.items[index].left = this.pageTable.arrData[i][j].left 
      this.pageTable.items[index].num = this.pageTable.arrData[i][j].num 
      this.pageTable.items[index].x = i
      this.pageTable.items[index].y = j
    },
    onDragstartPage(event) {
      // console.log('start:event',event)
      console.log('start:event.offsetX',event.offsetX) 
    },
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
      // console.log('*************onDropw 我是谁',event.target.closest('[data-id]').getAttribute('index'))
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
.home{
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  // align-items: center;
  min-width: 1600px;
  .content-left{
    width: 60px;
    margin-right: 10px;
    .button-wrap{
      margin: 10px 0;
      width: 100%;
      button{
        width: 100%;
      }
    }
  }
  .content{
    position: relative;
    width:1480px;
    min-height: 920px;
    height: 100%;
    /* border: 1px solid yellow; */
    // padding: 10px;
    /* display: flex;
    align-items:flex-start;
    justify-content: flex-start;
    flex-wrap:wrap;
    align-content: flex-start; */
    
    .page{
      border:1px solid black ;
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
        right: 90px;
        z-index: 10;
      }
    }
    .arr-Data{
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      /* width:1480px;
      height: 920px; */
      //border: 1px solid black;
      z-index: 10;
      padding: 10px;
      .a{
        display: flex;
        .b{
          border: 1px dashed blueviolet;
          width: 344px;
          height: 205px;
          margin: 10px;
        }
      }
    }
   
    /* .setOne{
      position: absolute;
      top: 10px;
      left: -100px;
    }
    .setTwo{
      position: absolute;
      top: 50px;
      left: -100px;
    }
    .setThree{
      position: absolute;
      top: 90px;
      left: -100px;
    }
    .setFour{
      position: absolute;
      top: 140px;
      left: -100px;
    }
    .save-Data{
      position: absolute;
      top: 190px;
      left: -100px;
    }
    .restore-Data{
      position: absolute;
      top: 240px;
      left: -100px;
    }
    .export-Data{
      position: absolute;
      top: 290px;
      left: -100px;
    } */
  }
}
</style>
