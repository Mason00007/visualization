<template>
  <div class="about">
    <div class="box">
      <div v-masonry="containerId"  transition-duration="0.3s" item-selector=".item">
        <!-- <div v-masonry-tile :class="item.type" v-for="(item, index) in items" :key="item.type+index"> -->
        <div 
          v-masonry-tile class="item" 
          :data-id='item.id'
          :class="item.type" 
          :index="index"
          v-for="(item, index) in items" 
          :key="item.type+index"
          draggable="true" 
          @dragstart="onDragstart($event)" 
          @dragend="onDragend($event)" 
          @dragover="onDragover($event)"
          @drop="onDrop($event)"
        >
          <!-- block item markup -->
          {{item.op}}
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

export default {
  data() {
    return {
      startExchangeIndex: '',
      endExchangeIndex: '',
      containerId:'adas',
      items:[
        {type:'a1',id:'0',op:'数据1'},
        {type:'a4',id:'1',op:'数据2'},
        {type:'a2',id:'2',op:'数据3'},
        {type:'a3',id:'3',op:'数据4'},
        {type:'a2',id:'4',op:'数据5'},
        {type:'a4',id:'5',op:'数据6'},
        {type:'a1',id:'6',op:'数据7'},
        {type:'a2',id:'7',op:'数据8'},
        {type:'a1',id:'8',op:'数据9'},
        {type:'a4',id:'9',op:'数据10'},
        {type:'a1',id:'10',op:'数据11'},
        {type:'a1',id:'11',op:'数据12'},
        {type:'a1',id:'12',op:'数据13'},
        {type:'a1 ',id:'13',op:'数据13'},
      ]
    }
  },
  methods: {
    onDragstart (event) {
      // event.target 都返回源元素
      this.startExchangeIndex = event.target.getAttribute('index')
      console.log('拖拽开始',event)
    },
    onDragend (event) {
      // event.target 都返回源元素
      console.log('下标' + this.startExchangeIndex + ' 和 ' + this.endExchangeIndex + '进行替换')
      this.items=this.swapArr(this.items,this.startExchangeIndex,this.endExchangeIndex)
      console.log('拖拽结束',event)
      console.log('this.items',this.items)
      
    },
    onDrop (event) {
      console.log('onDropw 我是谁',event.target)
      console.log('onDropw 我是谁',event.target.closest('[data-id]'))
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
      let arrData = arr;
      [arrData[index1].op, arrData[index2].op] = [arrData[index2].op,arrData[index1].op];
      
      return arrData;
    }
  },
 
}
</script>

<style lang="scss" scoped>
.box{
  width: 1480px;
  height: 880px;
}
.item{
  // height: 200px;
  // width: 200px;
  border: 1px solid red;
  margin: 10px;
}
.a1{
  width: 344px;
  height: 205px;
  // border: 1px solid blue;
  // margin: 10px;
}
.a2{
  width: 344px;
  height: 430px;
  // border: 1px solid black;
  // margin: 10px;
}
.a3{
  width:708px;
  height: 205px;
}
.a4{
  width:708px;
  height: 430px;
  // border: 1px solid red;
  // margin: 10px;
}
</style>