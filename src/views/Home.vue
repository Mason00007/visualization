<template>
  <div onbeforeunload class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    
    
    <div id="content" class="content">
      <div class="setOne"><button @click="addDataOnePage">创建1*1</button></div>
      <div class="setTwo"><button @click="addDataTwoPage">创建1*2</button></div>
      <div class="setThree"><button @click="addDataThreePage">创建2*2</button></div>
      <!-- <div class="setOne"><button @click="addDataOne">创建1*1</button></div>
      <div class="setTwo"><button @click="addDataTwo">创建1*2</button></div>
      <div class="setThree"><button @click="addDataThree">创建2*2</button></div>
      <div class="setFour"><button @click="addDataFour">空创建1*1</button></div>
      <div class="save-Data"><button @click="saveData">保存</button></div>
      <div class="restore-Data"><button @click="restoreData">还原数据</button></div>
      <div class="export-Data"><button @click="exportExcel">导出数据</button></div> -->
      <div :id="'pageId'+ indexPage" class="page" v-for="(page,indexPage) in pages" :key="indexPage">
        <div class="arr-Data">
          <div class="a" v-for="(item,indexA) in page.arrData" :key="indexA">
            <div class="b"  v-for="(b,indexB) in item"  :index="indexA+''+indexB" :key='b.num'>{{b.num}}</div>
          </div>
        </div>
        <div 
          class="member"
          v-for="(item,index) in page.items" 
          :key="item.type+index" 
          :data-id="item.data.id+'-'+index"
          :index="index"
          :style="{top:item.top+'px',left:item.left+'px'}"
          draggable="true" 
          @dragstart="onDragstartPage($event)"
          @dragend="onDragendPage($event,index,item,indexPage)" 
          @dragover="onDragoverPage($event)"
          @drop="onDropPage($event)"
          >
          <!-- <div>
            <component  :is="item.type" :optiondata="item.data">
            </component>
          </div> -->
          <div class="addDataBox" @click="addDataBox(index)">+</div>
          <div class="deleteDataBox" @click="deleteDataBox(index,item.num,item.type)">删除</div>
          <component  :is="item.type" :optiondata="item.data">
          </component>
        </div>
      </div>
      <!-- ************* -->
      <!-- <div class="page">
        <div class="arr-Data">
          <div class="a" v-for="(item,indexA) in arrData" :key="indexA">
            <div class="b"  v-for="(b,indexB) in item"  :index="indexA+''+indexB" :key='b.num'>{{b.num}}</div>
          </div>
        </div>
        <div 
          class="member"
          v-for="(item,index) in items" 
          :key="item.type+index" 
          :data-id="item.data.id+'-'+index"
          :index="index"
          :style="{top:item.top+'px',left:item.left+'px'}"
          draggable="true" 
          @dragstart="onDragstart($event)"
          @dragend="onDragend($event,index,item)" 
          @dragover="onDragover($event)"
          @drop="onDrop($event)"
        >
          <div class="addDataBox" @click="addDataBox(index)">+</div>
          <div class="deleteDataBox" @click="deleteDataBox(index,item.num,item.type)">删除</div>
          <component  :is="item.type" :optiondata="item.data">
          </component>
        </div>
      </div> -->
      <!-- 888888888888 -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
      <HelloWorldTwo msg="Welcome to Your Vue.js App"/> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorldTwo from '@/components/HelloWorldTwo.vue'
import HelloWorldThree from '@/components/HelloWorldThree.vue'
import HelloWorldFour from '@/components/HelloWorldFour.vue'
export default {
  name: 'Home',
  data() {
    return {
      startExchangeIndex: '',
      endExchangeIndex: '',
      arrData:[
        [
          {num:'00',seletion:false,top:'10',left:'10'},
          {num:'01',seletion:false,top:'10',left:'375'},
          {num:'02',seletion:false,top:'10',left:'740'},
          {num:'03',seletion:false,top:'10',left:'1104'}
        ],
        [
          {num:'10',seletion:false,top:'236',left:'10'},
          {num:'11',seletion:false,top:'236',left:'375'},
          {num:'12',seletion:false,top:'236',left:'740'},
          {num:'13',seletion:false,top:'236',left:'1104'}
        ],
        [
          {num:'20',seletion:false,top:'462',left:'10'},
          {num:'21',seletion:false,top:'462',left:'375'},
          {num:'22',seletion:false,top:'462',left:'740'},
          {num:'23',seletion:false,top:'462',left:'1104'}
        ],
        [
          {num:'30',seletion:false,top:'686',left:'10'},
          {num:'31',seletion:false,top:'686',left:'375'},
          {num:'32',seletion:false,top:'686',left:'740'},
          {num:'33',seletion:false,top:'686',left:'1104'}
        ]
      ],
      items: [
        // { 
        //   xy:{x:1,y:1},
        //   width:'344',
        //   height:'205',
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
        //   xy:{x:2,y:2},
        //   width:'708',
        //   height:'430',
        //   type: 'HelloWorldThree',
        //   data:{
        //     id:'1',
        //     option:{
        //       title: {
        //           text: '堆叠区域图'
        //       },
        //       tooltip: {
        //           trigger: 'axis',
        //           axisPointer: {
        //               type: 'cross',
        //               label: {
        //                   backgroundColor: '#6a7985'
        //               }
        //           }
        //       },
        //       legend: {
        //           data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        //       },
        //       toolbox: {
        //           feature: {
        //               saveAsImage: {}
        //           }
        //       },
        //       grid: {
        //           left: '3%',
        //           right: '4%',
        //           bottom: '3%',
        //           containLabel: true
        //       },
        //       xAxis: [
        //           {
        //               type: 'category',
        //               boundaryGap: false,
        //               data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        //           }
        //       ],
        //       yAxis: [
        //           {
        //               type: 'value'
        //           }
        //       ],
        //       series: [
        //           {
        //               name: '邮件营销',
        //               type: 'line',
        //               stack: '总量',
        //               areaStyle: {},
        //               data: [120, 132, 101, 134, 90, 230, 210]
        //           },
        //           {
        //               name: '联盟广告',
        //               type: 'line',
        //               stack: '总量',
        //               areaStyle: {},
        //               data: [220, 182, 191, 234, 290, 330, 310]
        //           },
        //           {
        //               name: '视频广告',
        //               type: 'line',
        //               stack: '总量',
        //               areaStyle: {},
        //               data: [150, 232, 201, 154, 190, 330, 410]
        //           },
        //           {
        //               name: '直接访问',
        //               type: 'line',
        //               stack: '总量',
        //               areaStyle: {},
        //               data: [320, 332, 301, 334, 390, 330, 320]
        //           },
        //           {
        //               name: '搜索引擎',
        //               type: 'line',
        //               stack: '总量',
        //               label: {
        //                   normal: {
        //                       show: true,
        //                       position: 'top'
        //                   }
        //               },
        //               areaStyle: {},
        //               data: [820, 932, 901, 934, 1290, 1330, 1320]
        //           }
        //       ]
        //     }
        //   }
        // },
        // { 
        //   xy:{x:1,y:1},
        //   width:'344',
        //   height:'205',
        //   type: 'HelloWorld',
        //   data:{
        //     id:'2',
        //     option:{
        //       xAxis: {
        //           type: 'category',
        //           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //       },
        //       yAxis: {
        //           type: 'value'
        //       },
        //       series: [{
        //           data: [120, 200, 150, 80, 70, 110, 130],
        //           type: 'bar',
        //           showBackground: true,
        //           backgroundStyle: {
        //               color: 'rgba(220, 220, 220, 0.8)'
        //           }
        //       }]
        //     }
        //   }
        // },
        // { 
        //   xy:{x:1,y:2},
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
      ],
      // ************
      pages:[
        {
          arrData:[
            [
              {num:'00',seletion:false,top:'10',left:'10'},
              {num:'01',seletion:false,top:'10',left:'375'},
              {num:'02',seletion:false,top:'10',left:'740'},
              {num:'03',seletion:false,top:'10',left:'1104'}
            ],
            [
              {num:'10',seletion:false,top:'236',left:'10'},
              {num:'11',seletion:false,top:'236',left:'375'},
              {num:'12',seletion:false,top:'236',left:'740'},
              {num:'13',seletion:false,top:'236',left:'1104'}
            ],
            [
              {num:'20',seletion:false,top:'462',left:'10'},
              {num:'21',seletion:false,top:'462',left:'375'},
              {num:'22',seletion:false,top:'462',left:'740'},
              {num:'23',seletion:false,top:'462',left:'1104'}
            ],
            [
              {num:'30',seletion:false,top:'686',left:'10'},
              {num:'31',seletion:false,top:'686',left:'375'},
              {num:'32',seletion:false,top:'686',left:'740'},
              {num:'33',seletion:false,top:'686',left:'1104'}
            ]
          ],
          items:[]
        },
        // {
        //   arrData:[
        //     [
        //       {num:'00',seletion:false,top:'10',left:'10'},
        //       {num:'01',seletion:false,top:'10',left:'375'},
        //       {num:'02',seletion:false,top:'10',left:'740'},
        //       {num:'03',seletion:false,top:'10',left:'1104'}
        //     ],
        //     [
        //       {num:'10',seletion:false,top:'236',left:'10'},
        //       {num:'11',seletion:false,top:'236',left:'375'},
        //       {num:'12',seletion:false,top:'236',left:'740'},
        //       {num:'13',seletion:false,top:'236',left:'1104'}
        //     ],
        //     [
        //       {num:'20',seletion:false,top:'462',left:'10'},
        //       {num:'21',seletion:false,top:'462',left:'375'},
        //       {num:'22',seletion:false,top:'462',left:'740'},
        //       {num:'23',seletion:false,top:'462',left:'1104'}
        //     ],
        //     [
        //       {num:'30',seletion:false,top:'686',left:'10'},
        //       {num:'31',seletion:false,top:'686',left:'375'},
        //       {num:'32',seletion:false,top:'686',left:'740'},
        //       {num:'33',seletion:false,top:'686',left:'1104'}
        //     ]
        //   ],
        //   items:[]
        // }
      ],
      pageNum:{
          arrData:[
            [
              {num:'00',seletion:false,top:'10',left:'10'},
              {num:'01',seletion:false,top:'10',left:'375'},
              {num:'02',seletion:false,top:'10',left:'740'},
              {num:'03',seletion:false,top:'10',left:'1104'}
            ],
            [
              {num:'10',seletion:false,top:'236',left:'10'},
              {num:'11',seletion:false,top:'236',left:'375'},
              {num:'12',seletion:false,top:'236',left:'740'},
              {num:'13',seletion:false,top:'236',left:'1104'}
            ],
            [
              {num:'20',seletion:false,top:'462',left:'10'},
              {num:'21',seletion:false,top:'462',left:'375'},
              {num:'22',seletion:false,top:'462',left:'740'},
              {num:'23',seletion:false,top:'462',left:'1104'}
            ],
            [
              {num:'30',seletion:false,top:'686',left:'10'},
              {num:'31',seletion:false,top:'686',left:'375'},
              {num:'32',seletion:false,top:'686',left:'740'},
              {num:'33',seletion:false,top:'686',left:'1104'}
            ]
          ],
          items:[]
        },
    }
  },
  mounted() {
    
  },
  methods: {
    //88888888888
    handleItemsPage(type,data){
      let pageNum={
            arrData:[
              [
                {num:'00',seletion:false,top:'10',left:'10'},
                {num:'01',seletion:false,top:'10',left:'375'},
                {num:'02',seletion:false,top:'10',left:'740'},
                {num:'03',seletion:false,top:'10',left:'1104'}
              ],
              [
                {num:'10',seletion:false,top:'236',left:'10'},
                {num:'11',seletion:false,top:'236',left:'375'},
                {num:'12',seletion:false,top:'236',left:'740'},
                {num:'13',seletion:false,top:'236',left:'1104'}
              ],
              [
                {num:'20',seletion:false,top:'462',left:'10'},
                {num:'21',seletion:false,top:'462',left:'375'},
                {num:'22',seletion:false,top:'462',left:'740'},
                {num:'23',seletion:false,top:'462',left:'1104'}
              ],
              [
                {num:'30',seletion:false,top:'686',left:'10'},
                {num:'31',seletion:false,top:'686',left:'375'},
                {num:'32',seletion:false,top:'686',left:'740'},
                {num:'33',seletion:false,top:'686',left:'1104'}
              ]
            ],
            items:[]
          }
    
      let trueArr = []
      for(let p=0;p<this.pages.length;p++){
        for(let i=0;i<4;i++){
          for(let j=0;j<4;j++){
            this.pages[p].arrData[i][j].seletion !== false 
            trueArr.push(this.pages[p].arrData[i][j].seletion)
          }
        }
      }
     
      if(trueArr.findIndex(target=>target===false) == -1){
        this.pages = [...this.pages,pageNum];
        let maxIndex = this.pages.length-1;
        if(type=='HelloWorld'){
          this.pages[maxIndex].arrData[0][0].seletion = true;
          [data.top,data.left,data.num] = [this.pages[maxIndex].arrData[0][0].top,this.pages[maxIndex].arrData[0][0].left,this.pages[maxIndex].arrData[0][0].num];
          return {indexP:maxIndex,data:data}
        }else if(type == 'HelloWorldTwo'){
          [this.pages[maxIndex].arrData[0][0].seletion,this.pages[maxIndex].arrData[1][0].seletion] = [true,true];
          [data.top,data.left,data.num] = [this.pages[maxIndex].arrData[0][0].top,this.pages[maxIndex].arrData[0][0].left,this.pages[maxIndex].arrData[0][0].num];
          return {indexP:maxIndex,data:data}
        }else if(type=='HelloWorldThree'){
          [
            this.pages[maxIndex].arrData[0][0].seletion,
            this.pages[maxIndex].arrData[1][0].seletion,
            this.pages[maxIndex].arrData[0][1].seletion,
            this.pages[maxIndex].arrData[1][1].seletion] = [true,true,true,true];
          [data.top,data.left,data.num] = [this.pages[maxIndex].arrData[0][0].top,this.pages[maxIndex].arrData[0][0].left,this.pages[maxIndex].arrData[0][0].num];
          return {indexP:maxIndex,data:data}
        }
      }

      if(type=='HelloWorld'){
        for(let p=0;p<this.pages.length;p++){
          for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
              if(this.pages[p].arrData[i][j].seletion == false){
                this.pages[p].arrData[i][j].seletion = true;
                [data.top,data.left,data.num] = [this.pages[p].arrData[i][j].top,this.pages[p].arrData[i][j].left,this.pages[p].arrData[i][j].num];
                return { indexP:p,data:data}
              }
            }
          }
        }
      }
      if(type=='HelloWorldTwo'){
        let num = 0
        let arr = []
        for(let p=0;p<this.pages.length;p++){
          for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
              if(i<3){
                if(this.pages[p].arrData[i][j].seletion==false&&this.pages[p].arrData[i+1][j].seletion==false){
                  num++
                  arr.push({p:p,i:i,j:j})
                }
              }
            }
          }
        }
        if(num != 0){
          let p = arr[0].p;
          let i = arr[0].i;
          let j = arr[0].j;
          [this.pages[p].arrData[i][j].seletion,this.pages[p].arrData[i+1][j].seletion] = [true,true];
          [data.top,data.left,data.num] = [this.pages[p].arrData[i][j].top,this.pages[p].arrData[i][j].left,this.pages[p].arrData[i][j].num];
          return { indexP:p,data:data}
        }else{
          this.pages.push(pageNum);
          let maxIndex = this.pages.length-1;
          [this.pages[maxIndex].arrData[0][0].seletion,this.pages[maxIndex].arrData[1][0].seletion] = [true,true];
          [data.top,data.left,data.num] = [this.pages[maxIndex].arrData[0][0].top,this.pages[maxIndex].arrData[0][0].left,this.pages[maxIndex].arrData[0][0].num];
          return {indexP:maxIndex,data:data}
        }
      }
      if(type=='HelloWorldThree'){
        let num = 0
        let arr = []
        for(let p=0;p<this.pages.length;p++){
          for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
              if(i<3&&j<3){
                if(this.pages[p].arrData[i][j].seletion==false&&this.pages[p].arrData[i+1][j].seletion==false&&this.pages[p].arrData[i][j+1].seletion==false&&this.pages[p].arrData[i+1][j+1].seletion==false){
                  num++
                  arr.push({p:p,i:i,j:j})
                }
              }
            }
          }
        }
        if(num != 0){
          let p = arr[0].p;
          let i = arr[0].i;
          let j = arr[0].j;
          [this.pages[p].arrData[i][j].seletion,this.pages[p].arrData[i+1][j].seletion,this.pages[p].arrData[i][j+1].seletion,this.pages[p].arrData[i+1][j+1].seletion] = [true,true,true,true];
          [data.top,data.left,data.num] = [this.pages[p].arrData[i][j].top,this.pages[p].arrData[i][j].left,this.pages[p].arrData[i][j].num];
          return { indexP:p,data:data}
        }else{
          this.pages.push(pageNum);
          let maxIndex = this.pages.length-1;
          [this.pages[maxIndex].arrData[0][0].seletion,this.pages[maxIndex].arrData[1][0].seletion,this.pages[maxIndex].arrData[0][1].seletion,this.pages[maxIndex].arrData[1][1].seletion] = [true,true,true,true];
          [data.top,data.left,data.num] = [this.pages[maxIndex].arrData[0][0].top,this.pages[maxIndex].arrData[0][0].left,this.pages[maxIndex].arrData[0][0].num];
          return {indexP:maxIndex,data:data}
        }
      }
      return []
    },
    addDataOnePage(){
      let _this = this
      let helloOne = { 
          type: 'HelloWorld',
          data:{
            id:_this.items.length+1,
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
      let data = this.handleItemsPage(helloOne.type,helloOne)
      
      if(Object.keys(data) == 0){
        return
      }
      this.pages[data.indexP].items = [...this.pages[data.indexP].items,data.data]
    },
    addDataTwoPage(){
      let _this = this
      let helloTwo = { 
        type: 'HelloWorldTwo',
        data:{
          id:_this.items.length+1,
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
      
      let data = this.handleItemsPage(helloTwo.type,helloTwo)
      if(Object.keys(data) == 0){
        return
      }
      this.pages[data.indexP].items = [...this.pages[data.indexP].items,data.data]
    },
    addDataThreePage(){
      let _this = this
      let helloThree = { 
            type: 'HelloWorldThree',
            data:{
              id:_this.items.length+1,
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
      let data = this.handleItemsPage(helloThree.type,helloThree)
      if(Object.keys(data) == 0){
        return
      }
      this.pages[data.indexP].items = [...this.pages[data.indexP].items,data.data]
      //this.items = [...this.items,helloThree]
    },
    //************拖拽 */
    onDragstartPage(event) {
      console.log('start:event',event)
      console.log('start:event.offsetX',event.offsetX) 
    },
    onDragendPage(event,index,item,indexPage) {
     
      //console.log('下标' + this.startExchangeIndex + ' 和 ' + this.endExchangeIndex + '进行替换')
      //this.items=this.swapArr(this.items,this.startExchangeIndex,this.endExchangeIndex)
      
      // let a = event.pageX - document.getElementById("pageId"+indexPage).offsetLeft
      // let b = event.pageY - document.getElementById("pageId"+indexPage).offsetTop
      let a = event.pageX - document.getElementById("content").offsetLeft
      let Y = event.pageY - document.getElementById("pageId"+indexPage).offsetTop
      console.log('YYYYYYYYYYYYY',Y)
      //let b = event.pageY - document.getElementById("pageId"+indexPage).offsetTop - 686*indexPage
      let b = event.pageY - document.getElementById("pageId"+indexPage).offsetTop - 10*indexPage
      // switch(indexPage){
      //   case 0: 
      //     b = event.pageY - document.getElementById("pageId"+indexPage).offsetTop
      //     break;
      //   case 1:
      //     b = event.pageY - document.getElementById("pageId"+indexPage).offsetTop - 920*indexPage
      //     break;

      // }
      
      //let b = event.pageY - document.getElementById("pageId"+indexPage).offsetTop
      //let b = event.pageY - document.getElementById("pageId"+indexPage).clientTop
      // console.log('end:event',event)
      // console.log('end:clientX',event.clientX-event.pageX)
      // console.log('end:clientY',event.clientY)
      // console.log('left',document.getElementById("pageId"+indexPage).offsetLeft)
      // console.log('top',b)
      // console.log(item)
      console.log('b',b)
      let maxTop = 0
      let maxLeft = 0
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          maxTop = parseInt(this.pages[indexPage].arrData[i][j].top) + 205
          maxLeft = parseInt(this.pages[indexPage].arrData[i][j].left) + 344
          
          if(a<=maxLeft&&b<=maxTop){
            console.log('i',i)
            console.log('j',j)
            if(this.pages[indexPage].arrData[i][j].seletion==true){
              // let dataA = this.items
              [this.pages[indexPage].items[index].data, this.pages[indexPage].items[this.endExchangeIndex].data] = [this.pages[indexPage].items[this.endExchangeIndex].data, this.pages[indexPage].items[index].data];
              return
            }else{
              if(item.type == 'HelloWorld'){
                this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top 
                this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left 
                
                this.pages[indexPage].arrData[i][j].seletion = true
                for(let a=0;a<4;a++){
                  for(let b=0;b<4;b++){
                    if(this.pages[indexPage].items[index].num == this.pages[indexPage].arrData[a][b].num){
                      this.pages[indexPage].arrData[a][b].seletion = false
                    }
                  }
                }
                this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num  
               
                return
              }else if(item.type == 'HelloWorldTwo'){
               
                if(i<3){
                  if(this.pages[indexPage].arrData[i+1][j].seletion==false){
                    this.pages[indexPage].arrData[i][j].seletion = true
                    this.pages[indexPage].arrData[i+1][j].seletion = true
                    this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top
                    this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left
                    
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.pages[indexPage].items[index].num ==this.pages[indexPage].arrData[a][b].num){
                          this.pages[indexPage].arrData[a][b].seletion = false
                          this.pages[indexPage].arrData[a+1][b].seletion = false
                        }
                      }
                    } 
                    this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num
                    return
                  }else{
                    this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top
                    this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left
                    this.pages[indexPage].arrData[i][j].seletion = true
                    this.pages[indexPage].items[index].type ='HelloWorld'
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.pages[indexPage].items[index].num ==this.pages[indexPage].arrData[a][b].num){
                          this.pages[indexPage].arrData[a][b].seletion = false
                          this.pages[indexPage].arrData[a+1][b].seletion = false
                        }
                      }
                    } 
                    this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num
                    return
                  }
                }else{
                  this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top
                  this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left
                  this.pages[indexPage].arrData[i][j].seletion = true
                  this.pages[indexPage].items[index].type ='HelloWorld'
                  for(let a=0;a<4;a++){
                    for(let b=0;b<4;b++){
                      if(this.pages[indexPage].items[index].num ==this.pages[indexPage].arrData[a][b].num){
                        this.pages[indexPage].arrData[a][b].seletion = false
                        this.pages[indexPage].arrData[a+1][b].seletion = false
                      }
                    }
                  } 
                  this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num
                  return
                }
              }else if(item.type == 'HelloWorldThree'){
                if(i<3&&j<3){
            
                  if(this.pages[indexPage].arrData[i+1][j].seletion==false&&this.pages[indexPage].arrData[i][j+1].seletion==false&&this.pages[indexPage].arrData[i+1][j+1].seletion==false){
                    
                    this.pages[indexPage].arrData[i][j].seletion = true
                    this.pages[indexPage].arrData[i+1][j].seletion = true
                    this.pages[indexPage].arrData[i][j+1].seletion = true
                    this.pages[indexPage].arrData[i+1][j+1].seletion = true
                    this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top
                    this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.pages[indexPage].items[index].num ==this.pages[indexPage].arrData[a][b].num){
                          this.pages[indexPage].arrData[a][b].seletion = false
                          this.pages[indexPage].arrData[a+1][b].seletion = false
                          this.pages[indexPage].arrData[a][b+1].seletion = false
                          this.pages[indexPage].arrData[a+1][b+1].seletion = false
                        }
                      }
                    } 
                    this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num
                    return 
                  }else{
                    
                    this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top
                    this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left
                    this.pages[indexPage].arrData[i][j].seletion = true
                    this.pages[indexPage].items[index].type ='HelloWorld'
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.pages[indexPage].items[index].num ==this.pages[indexPage].arrData[a][b].num){
                          this.pages[indexPage].arrData[a][b].seletion = false
                          this.pages[indexPage].arrData[a+1][b].seletion = false
                          this.pages[indexPage].arrData[a][b+1].seletion = false
                          this.pages[indexPage].arrData[a+1][b+1].seletion = false
                        }
                      }
                    } 
                    this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num
                   
                    return
                  }
                }else{
                  this.pages[indexPage].items[index].top = this.pages[indexPage].arrData[i][j].top
                  this.pages[indexPage].items[index].left = this.pages[indexPage].arrData[i][j].left
                  this.pages[indexPage].arrData[i][j].seletion = true
                  this.items[index].type ='HelloWorld'
                  for(let a=0;a<4;a++){
                    for(let b=0;b<4;b++){
                      if(this.pages[indexPage].items[index].num ==this.pages[indexPage].arrData[a][b].num){
                        this.pages[indexPage].arrData[a][b].seletion = false
                        this.pages[indexPage].arrData[a+1][b].seletion = false
                        this.pages[indexPage].arrData[a][b+1].seletion = false
                        this.pages[indexPage].arrData[a+1][b+1].seletion = false
                      }
                    }
                  } 
                  this.pages[indexPage].items[index].num = this.pages[indexPage].arrData[i][j].num
                  return
                }
              }
            }
          }else{
            maxTop = 0
            maxLeft = 0
          }
        }
      }
    },
    onDropPage(event) {
      console.log('*************onDropw 我是谁',event.target)
      //console.log('onDropw 我是谁',event.target.closest('[data-id]'))
      //event.target 都返回目标元素
      if (event.target.className == 'member') {
        this.endExchangeIndex = event.target.getAttribute('index')
      } else {
        this.endExchangeIndex = event.target.closest('[data-id]').getAttribute('index')
      }
      
    },
    onDragoverPage(event){
      // 阻止元素的默认行为，不然ondrop不管用
      event.preventDefault();
    },
    //88888888888
    //处理添加的问题
    handleItems(type,data){
      //let data = this.arrData
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(this.arrData[i][j].seletion==false){
            if(type=='HelloWorld'){
              this.arrData[i][j].seletion = true;
              [data.top,data.left,data.num] = [this.arrData[i][j].top,this.arrData[i][j].left,this.arrData[i][j].num];
              return data
            }else if(type=='HelloWorldTwo'){
              if(i<3){
                if(this.arrData[i+1][j].seletion==false){
                  [this.arrData[i][j].seletion,this.arrData[i+1][j].seletion] = [true,true];
                  [data.top,data.left,data.num] = [this.arrData[i][j].top,this.arrData[i][j].left,this.arrData[i][j].num];
                  return data
                }
              }
            }else if(type=='HelloWorldThree'){
              if(i<3&&j<3){
                if(this.arrData[i+1][j].seletion==false&&this.arrData[i][j+1].seletion==false&&this.arrData[i+1][j+1].seletion==false){
                  // this.arrData[i][j].seletion = true
                  // this.arrData[i+1][j].seletion = true
                  // this.arrData[i][j+1].seletion = true
                  // this.arrData[i+1][j+1].seletion = true
                  // data.top = this.arrData[i][j].top
                  // data.left = this.arrData[i][j].left
                  // data.num = this.arrData[i][j].num
                  [this.arrData[i][j].seletion, this.arrData[i+1][j].seletion,this.arrData[i][j+1].seletion,this.arrData[i+1][j+1].seletion] = [true,true,true,true];
                  [data.top,data.left,data.num] = [this.arrData[i][j].top,this.arrData[i][j].left,this.arrData[i][j].num];
                  return data
                }
              }
            }
          }
        }
      }
      return []
    },
    //************增加、删除、保存 */
    addDataOne(){
      let _this = this
      let helloOne = { 
          type: 'HelloWorld',
          data:{
            id:_this.items.length+1,
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
      let data = this.handleItems(helloOne.type,helloOne)
      if(Object.keys(data) == 0){
        return
      }
      this.items = [...this.items,data]
    },
    addDataTwo(){
      let _this = this
      let helloTwo = { 
        type: 'HelloWorldTwo',
        data:{
          id:_this.items.length+1,
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
      
      let data = this.handleItems(helloTwo.type,helloTwo)
      if(Object.keys(data) == 0){
        return
      }
      this.items = [...this.items,data]
    },
    addDataThree(){
      let _this = this
      let helloThree = { 
            type: 'HelloWorldThree',
            data:{
              id:_this.items.length+1,
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
          let data = this.handleItems(helloThree.type,helloThree)
          console.log(data)
          if(Object.keys(data) == 0){
            return
          }
          this.items = [...this.items,data]
      //this.items = [...this.items,helloThree]
    },
    addDataFour(){
      let _this = this
      let helloFour = {
        type: 'HelloWorldFour',
        data:{
          id:_this.items.length+1,
          option:{}
        }
      }
      this.items = [...this.items,helloFour]
    },
    addDataBox(index){
      console.log('index',index)
      let option = {
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
      this.items[index].data.option = option
    },
    deleteDataBox(index,num,type){
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(this.arrData[i][j].num == num){
            console.log('111111')
            if(type == 'HelloWorld'){
              this.arrData[i][j].seletion = false
              this.items.splice(index,1);
              return
            }else if(type == 'HelloWorldTwo'){
              this.arrData[i][j].seletion = false
              this.arrData[i+1][j].seletion = false
              this.items.splice(index,1);
              return
            }else if(type == 'HelloWorldThree'){
              
              this.arrData[i][j].seletion = false
              this.arrData[i+1][j].seletion = false
              this.arrData[i][j+1].seletion = false
              this.arrData[i+1][j+1].seletion = false
              this.items.splice(index,1);
              return
            }
          }
        }
      }
    },
    saveData(){
      let data = this.items
      sessionStorage.setItem("key", JSON.stringify(data));
    },
    restoreData(){
      let data = sessionStorage.getItem("key");
      this.items = JSON.parse(data)
    },
    //************拖拽 */
    onDragstart (event) {
      console.log(event)
      // event.target 都返回源元素
      //this.startExchangeIndex = event.target.getAttribute('index')
      // console.log('拖拽开始offsetX',event.offsetX)
      // console.log('拖拽开始offsetY',event.offsetY)
      // console.log('拖拽开始pageY',event.pageY)
      // console.log('拖拽开始pageX',event.pageX)
      // console.log('1111111', document.getElementById('content').offsetLeft)
      // let x = event.pageX - event.offsetX - document.getElementById('content').offsetLeft
      // let y = event.pageY - event.offsetY - document.getElementById('content').offsetTop
     
    },
    onDragend (event,index,item) {
      // event.target 都返回源元素
      //console.log('下标' + this.startExchangeIndex + ' 和 ' + this.endExchangeIndex + '进行替换')
      //this.items=this.swapArr(this.items,this.startExchangeIndex,this.endExchangeIndex)
      // console.log('拖拽结束',event.offsetX)
      // console.log('拖拽结束',event.offsetY)
      let a = event.pageX - document.getElementById('content').offsetLeft
      let b = event.pageY - document.getElementById('content').offsetTop
      // console.log('222222222222222x',a)
      // console.log('222222222222222y',b)
      console.log(item)
      let maxTop = 0
      let maxLeft = 0
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          maxTop = parseInt(this.arrData[i][j].top) + 205
          maxLeft = parseInt(this.arrData[i][j].left) + 344
          
          if(a<=maxLeft&&b<=maxTop){
            console.log('this.arrData[i][j].seletion',this.arrData[i][j].seletion)
            if(this.arrData[i][j].seletion==true){
              // let dataA = this.items
              [this.items[index].data, this.items[this.endExchangeIndex].data] = [this.items[this.endExchangeIndex].data, this.items[index].data];
              return
            }else{
              if(item.type == 'HelloWorld'){
                this.items[index].top = this.arrData[i][j].top 
                this.items[index].left = this.arrData[i][j].left 
                
                this.arrData[i][j].seletion = true
                for(let a=0;a<4;a++){
                  for(let b=0;b<4;b++){
                    if(this.items[index].num == this.arrData[a][b].num){
                      this.arrData[a][b].seletion = false
                    }
                  }
                }
                this.items[index].num = this.arrData[i][j].num  
                console.log('this.arrData',this.arrData)
                return
              }else if(item.type == 'HelloWorldTwo'){
                console.log('1')
                if(i<3){
                  if(this.arrData[i+1][j].seletion==false){
                    this.arrData[i][j].seletion = true
                    this.arrData[i+1][j].seletion = true
                    this.items[index].top = this.arrData[i][j].top
                    this.items[index].left = this.arrData[i][j].left
                    
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.items[index].num ==this.arrData[a][b].num){
                          this.arrData[a][b].seletion = false
                          this.arrData[a+1][b].seletion = false
                        }
                      }
                    } 
                    this.items[index].num = this.arrData[i][j].num
                    return
                  }else{
                    this.items[index].top = this.arrData[i][j].top
                    this.items[index].left = this.arrData[i][j].left
                    this.arrData[i][j].seletion = true
                    this.items[index].type ='HelloWorld'
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.items[index].num ==this.arrData[a][b].num){
                          this.arrData[a][b].seletion = false
                          this.arrData[a+1][b].seletion = false
                        }
                      }
                    } 
                    this.items[index].num = this.arrData[i][j].num
                    return
                  }
                }else{
                  this.items[index].top = this.arrData[i][j].top
                  this.items[index].left = this.arrData[i][j].left
                  this.arrData[i][j].seletion = true
                  this.items[index].type ='HelloWorld'
                  for(let a=0;a<4;a++){
                    for(let b=0;b<4;b++){
                      if(this.items[index].num ==this.arrData[a][b].num){
                        this.arrData[a][b].seletion = false
                        this.arrData[a+1][b].seletion = false
                      }
                    }
                  } 
                  this.items[index].num = this.arrData[i][j].num
                  return
                }
              }else if(item.type == 'HelloWorldThree'){
                if(i<3&&j<3){
            
                  if(this.arrData[i+1][j].seletion==false&&this.arrData[i][j+1].seletion==false&&this.arrData[i+1][j+1].seletion==false){
                    
                    this.arrData[i][j].seletion = true
                    this.arrData[i+1][j].seletion = true
                    this.arrData[i][j+1].seletion = true
                    this.arrData[i+1][j+1].seletion = true
                    this.items[index].top = this.arrData[i][j].top
                    this.items[index].left = this.arrData[i][j].left
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.items[index].num ==this.arrData[a][b].num){
                          this.arrData[a][b].seletion = false
                          this.arrData[a+1][b].seletion = false
                          this.arrData[a][b+1].seletion = false
                          this.arrData[a+1][b+1].seletion = false
                        }
                      }
                    } 
                    this.items[index].num = this.arrData[i][j].num
                    return 
                  }else{
                    
                    this.items[index].top = this.arrData[i][j].top
                    this.items[index].left = this.arrData[i][j].left
                    this.arrData[i][j].seletion = true
                    this.items[index].type ='HelloWorld'
                    for(let a=0;a<4;a++){
                      for(let b=0;b<4;b++){
                        if(this.items[index].num ==this.arrData[a][b].num){
                          this.arrData[a][b].seletion = false
                          this.arrData[a+1][b].seletion = false
                          this.arrData[a][b+1].seletion = false
                          this.arrData[a+1][b+1].seletion = false
                        }
                      }
                    } 
                    this.items[index].num = this.arrData[i][j].num
                   
                    return
                  }
                }else{
                  this.items[index].top = this.arrData[i][j].top
                  this.items[index].left = this.arrData[i][j].left
                  this.arrData[i][j].seletion = true
                  this.items[index].type ='HelloWorld'
                  for(let a=0;a<4;a++){
                    for(let b=0;b<4;b++){
                      if(this.items[index].num ==this.arrData[a][b].num){
                        this.arrData[a][b].seletion = false
                        this.arrData[a+1][b].seletion = false
                        this.arrData[a][b+1].seletion = false
                        this.arrData[a+1][b+1].seletion = false
                      }
                    }
                  } 
                  this.items[index].num = this.arrData[i][j].num
                  return
                }
              }
            }
          }else{
            maxTop = 0
            maxLeft = 0
          }
        }
      }
      //if(event.clientX)
      //console.log('this.items',this.items)
      
    },
    onDrop (event) {
      console.log('***********onDropw 我是谁',event.target)
      //console.log('onDropw 我是谁',event.target.closest('[data-id]'))
      //event.target 都返回目标元素
      if (event.target.className == 'member') {
        this.endExchangeIndex = event.target.getAttribute('index')
      } else {
        this.endExchangeIndex = event.target.closest('[data-id]').getAttribute('index')
      }
      
    },
    onDragover(event){
      // 阻止元素的默认行为，不然ondrop不管用
      event.preventDefault();
    },
    swapArr(arr,index1,index2){
      [arr[index1].data, arr[index2].data] = [arr[index2].data, arr[index1].data];
      return arr;
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../Excel/Export2Excel");
        const tHeader = ["用户名", "操作类型", "操作时间", '操作内容'];
        // 上面设置Excel的表格第一行的标题
        const filterVal = ["operationName", "operationType", "operationDate",'operationMsg'];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.items; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "数据");
      });
    },
    //数据还没处理20200811
    formatJson(filterVal, jsonData) {
      //return jsonData.map(v => filterVal.map(j => v[j]));
      console.log(jsonData)
      return jsonData.map(v => v.data.option.series[0].data);
    }

  },
  components: {
    HelloWorld,
    HelloWorldTwo,
    HelloWorldThree,
    HelloWorldFour
  }
}
</script>

<style scoped lang="scss">
.home{
  border: 1px solid red;
  display: flex;
  justify-content: center;
  // align-items: center;
  .content{
    position: relative;
    width:1480px;
    min-height: 920px;
    height: 100%;
    border: 1px solid yellow;
    // padding: 10px;
    display: flex;
    align-items:flex-start;
    justify-content: flex-start;
    flex-wrap:wrap;
    align-content: flex-start;
    .page{
      // display: block;
      border:1px solid black ;
      // margin-top: 10px;
      position: relative;
      height: 920px;
      width: 1480px;
    }
    .member{
      position: absolute;
      //display: inline-block;
      .addDataBox{
        font-size: 24px;
        position: absolute;
        top: 10px;
        right: 15px;
        z-index: 10;
      }
      .deleteDataBox{
        font-size: 18px;
        position: absolute;
        top: 10px;
        right: 35px;
        z-index: 10;
      }
    }
    .arr-Data{
      position: absolute;
      top: 0;
      left: 0;
      width:1480px;
      height: 920px;
      //border: 1px solid black;
      z-index: 0;
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
   
    .setOne{
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
    }
  }
}
</style>
