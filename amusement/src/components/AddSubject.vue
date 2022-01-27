<template>
  <div class="addSubject" @click.stop="">
    <label>作品名</label><input v-model="name" />
    <label>{{verb}}时间</label><div class="time">{{time}}</div>
    <label>评分</label>
    <span class="score" @mouseover="changing = true" @mouseout="changing = false">
      <template v-for="i in 10">
        <span 
          @mousemove="mouseScore = i" 
          @mouseout="mouseScore = score" 
          :class="{
            grey:(changing&&i>mouseScore)||(!changing && i>score),
            yellow:changing&&i<=mouseScore,
            red:!changing && i<=score
          }"
          @click="score = i;changing = false"
        ></span>
      </template>
    </span>
    <label v-if="addType=='game'">平台</label><input v-if="addType=='game'" v-model="platform" />
    <textarea v-model="article"></textarea>
    <span class="text">字数：{{article.length}}</span>
    <button @click="submitSubject">{{submitText}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType } from "vue";
import { Subject } from "./MyRate.vue";
// import SubjectVue from "./Subject.vue";

export default defineComponent({
  data(){
    return {
      name: '',//作品名
      platform: '', //平台，仅游戏
      time: '', //游玩时间
      score: 5, //分数
      article: '', //小作文
      changing: false, //是否在修改分数
      mouseScore: 0,//鼠标所指的分数

    }
  },
  emits:['addSubject','closeModal'],
  props:{
    addType: {
      type: String,
      default: ''
    },
    editOrAdd: {
      type: String,
      default: 'add'
    },
    toEditSubject: Object as PropType<Subject>,
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
    },
    submitText():string {
      if(this.editOrAdd == 'edit') {
        return '确认'
      } else {
        return '提交'
      }
    }
  },
  mounted(){
    this.time = this.getTime()
    if(this.editOrAdd == 'edit' && this.toEditSubject) {
      this.name = this.toEditSubject.name
      this.score = this.toEditSubject.score
      this.article = this.toEditSubject.article
      this.time = this.toEditSubject.time
      if(this.addType == 'game') {
        this.platform = this.toEditSubject.platform || ''
      }
    }
  },
  methods:{
    getTime(): string{
      const now = new Date()
      return now.getFullYear().toString() + '-' 
      + (now.getMonth()+1>10?(now.getMonth()+1).toString():'0' + (now.getMonth()+1).toString()) + '-'
      + (now.getDate()>10?(now.getDate()).toString():'0' + (now.getDate()).toString())
    },
    submitSubject(){
      if(this.editOrAdd == 'add') {
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
      } else if (this.editOrAdd == 'edit' && this.toEditSubject) {
        this.toEditSubject.name = this.name
        this.toEditSubject.score = this.score
        this.toEditSubject.time = this.time
        this.toEditSubject.article = this.article
        if(this.platform) {
          this.toEditSubject.platform = this.platform
        }
        this.$emit('closeModal')
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
  position: relative;
  label {
    display: inline-block;
    width: 30%;
    margin-top: 10px;
    margin-left: 10%;
    font-size: 20px;
    line-height: 30px;
  }
  .score {
    display: inline-block;
    cursor: pointer;
    width: 50%;
    span {
      display: inline-block;
      height: 25px;
      width: 25px;
      background: transparent url('../assets/3star_2x.png');
      background-size: 25px 73px;
    }
    .grey {
      background-position: 0 0;
    }
    .yellow {
      background-position: 0 100%;
    }
    .red {
      background-position: 0 200%;
    }
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
    resize: none;
    font-size: 16px;
  }
  .text {
    position: absolute;
    color: #BBB;
    right: 50px;
    bottom: 60px;
    font-size: 12px;
    user-select: none;
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