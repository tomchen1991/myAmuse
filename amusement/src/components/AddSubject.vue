<template>
  <div class="addSubject" @click.stop="">
    <label>作品名</label><input v-model="name" />
    <label>{{verb}}时间</label><div class="time">{{time}}</div>
    <label>打分</label><input v-model="score" />
    <label>平台</label><input v-model="platform" />
    <textarea v-model="article"></textarea>
    <button @click="submitSubject">提交</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Subject } from "./MyRate.vue";

export default defineComponent({
  data(){
    return {
      name: '',//作品名
      platform: '', //平台，仅游戏
      time: '', //游玩时间
      score: 0, //分数
      article: '', //小作文
    }
  },
  emits:['addSubject'],
  props:{
    addType: {
      type: String,
      default: ''
    },
  },
  computed:{
    verb():string {
      switch(this.addType) {
        case 'game': return '游玩';break;
        case 'movie': 
        case 'anime': return '观看';break;
        case 'novel': return '阅读';break;
        default: return '欣赏';break;
      }
    }
  },
  mounted(){
    this.time = this.getTime()
  },
  methods:{
    getTime(): string{
      const now = new Date()
      return now.getFullYear().toString() + '-' 
      + (now.getMonth()+1>10?(now.getMonth()+1).toString():'0' + (now.getMonth()+1).toString()) + '-'
      + (now.getDate()>10?(now.getDate()).toString():'0' + (now.getDate()).toString())
    },
    submitSubject(){
      if(this.name){
        const newSubject:Subject = {
          name: this.name,
          score: this.score,
          time: this.time,
          article: this.article,
        }
        if(this.platform) {
          newSubject.platform = this.platform
        }
        this.$emit('addSubject',newSubject)
      }
    }
  }
})
</script>

<style lang="less" scoped>
.addSubject {
  width: 500px;
  margin-top: 150px;
  margin-left: calc(50% - 250px);
  padding-top: 20px;
  padding-bottom: 20px;;
  background-color: white;
  text-align: left;
  label {
    display: inline-block;
    width: 30%;
    margin-top: 10px;
    margin-left: 10%;
    font-size: 20px;
    line-height: 30px;
  }
  input,.time {
    font-size: 20px;
    text-align: left;
    display: inline-block;
    margin-top: 10px;
    width: 50%;
    line-height: 30px;
  }
  textarea {
    margin-top: 20px;
    margin-left: 10%;
    height: 100px;
    width: calc(80% + 2px);
  }
  button {
    border: none;
    width: 20%;
    background-color: #2571bf;
    color: white;
    padding: 10px 0;
    margin-top: 20px;
    margin-left: 40%;
    cursor: pointer;
    &:hover {
      background-color: #2060b0;
    }
    &:active {
      background-color: #1555a5;
    }
  }
}
</style>