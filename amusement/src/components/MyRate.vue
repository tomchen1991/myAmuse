<template>
  <div class="header">
    <span>非宅兔个人评分网站</span>
    <div class="filterTab">
      <template v-for="item in amuseType" :key="item.name">
        <input 
          v-model="selectedAmuse" 
          :value="item.name" 
          type="radio" 
          name="amuse"
          :id="'amuseradio' + item.name" />
        <label :class="{selected:selectedAmuse==item.name}" :for="'amuseradio' + item.name">{{item.chinese}}</label>
      </template>
    </div>
    <button>下载json</button>
  </div>
  <div class="mainBody">
    <div>
      <DataList :dataList="selectedArray"/>
    </div>
  </div>
  <div class="footer">
    个人链接：
    <a target="_blank" href="https://bgm.tv/user/tomchen1991">bangumi</a>
    <a target="_blank" href="https://www.imdb.com/user/ur69395828/">IMDB</a>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataList from "./DataList.vue"
import Subject from "./Subject.vue"
import scoreData from "../assets/data.json"
export interface Subject {
  score: number;
  time: string;
  name: string;
  article: string;
  platform?: string;
}

export default defineComponent ({
  components:{
    DataList,Subject
  },
  data(){
    return {
      amuseType:[
        {
          name:'game',
          chinese:'游戏'
        },{
          name:'movie',
          chinese:'电影'
        },{
          name:'anime',
          chinese:'番剧'
        },{
          name:'novel',
          chinese:'小说'
        },{
          name:'other',
          chinese:'其它'
        }
      ],
      selectedAmuse: 'game',
    }
  },
  computed:{
    selectedArray(): Subject[]{
      if(this.selectedAmuse == 'game' || this.selectedAmuse == 'anime' || this.selectedAmuse == 'movie' || this.selectedAmuse == 'novel' || this.selectedAmuse == 'other'){ 
        return scoreData[this.selectedAmuse]
      } else {
        return []
      }
    }
  },
  methods:{

  }
})
</script>

<style scoped lang="less">
.header {
  background-color: #2571bf;
  height: 80px;
  line-height: 80px;
  text-align: left;
  span {
    float:left;
    color: white;
    font-size: 40px;
    margin-left: 50px;
  }
  .filterTab{
    display: inline-block;
    margin-left: 100px;
    height: 40px;
    line-height: 40px;
    input {
      display: none;
    }
    label {
      display: inline-block;
      cursor: pointer;
      color: white;
      margin-left: 20px;
      padding: 0 15px;
      border-radius: 10px;
      font-size: 20px;
      &.selected{
        color: #2571bf;
        background-color: white;
      }
    }
  }
  &>button {
    float:right;
    height: 40px;
    border: none;
    background-color: white;
    border-radius: 10px;
    font-size: 20px;
    margin-top: 19px;
    padding: 0 20px;
    margin-right: 40px;;
  }
}

.mainBody {
  height: calc(100vh - 130px);
  overflow-y: scroll;
}

.footer{
  height: 50px;
  line-height: 50px;
  background-color: #F5F5F5;
  a {
    margin-left: 10px;
    color: #2571bf;
  }
}
</style>