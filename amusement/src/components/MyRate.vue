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
  </div>
  <div class="mainBody">
    
    <div>
      <GameRank v-show="selectedAmuse === 'game'" />
      <MovieRank v-show="selectedAmuse === 'movie'" />
      <AnimeRank v-show="selectedAmuse === 'anime'" />
      <NovelRank v-show="selectedAmuse === 'novel'" />
      <OtherRank v-show="selectedAmuse === 'other'" />
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
import GameRank from "./GameRank.vue"
import MovieRank from "./MovieRank.vue"
import AnimeRank from "./AnimeRank.vue"
import NovelRank from "./NovelRank.vue"
import OtherRank from "./OtherRank.vue"

export default defineComponent ({
  components:{
    GameRank,MovieRank,AnimeRank,NovelRank,OtherRank
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
      selectedAmuse: 'game'
    }
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
}

.mainBody {
  height: calc(100vh - 130px);
  
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