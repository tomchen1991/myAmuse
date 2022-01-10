<template>
  <div class="header">
    非宅兔个人评分网站
  </div>
  <div class="mainBody">
    <div class="filterTab">
      <template v-for="item in amuseType" :key="item.name">
        <input v-model="selectedAmuse" :value="item.name" type="radio" name="amuse" :id="item.name" />
        <label :for="item.name">{{item.chinese}}</label>
      </template>
    </div>
    <div>
      <GameRank v-show="selectedAmuse === 'game'" />
      <MovieRank v-show="selectedAmuse === 'movie'" />
      <AnimeRank v-show="selectedAmuse === 'anime'" />
      <NovelRank v-show="selectedAmuse === 'novel'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameRank from "./GameRank.vue"
import MovieRank from "./MovieRank.vue"
import AnimeRank from "./AnimeRank.vue"
import NovelRank from "./NovelRank.vue"

export default defineComponent ({
  components:{
    GameRank,MovieRank,AnimeRank,NovelRank
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
          chinese:'动画'
        },{
          name:'novel',
          chinese:'小说'
        }
      ],
      selectedAmuse: 'game'
    }
  }
})
</script>

<style scoped lang="less">
.header {}

.mainBody {
  .filterTab{
    input {
      display: none;
    }
    label {
      cursor: pointer;
    }
  }
}
</style>