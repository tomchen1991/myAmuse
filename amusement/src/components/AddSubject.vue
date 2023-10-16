<template>
  <div class="addSubject" @click.stop="">
    <label>作品名</label><input v-model="name" />
    <label>{{verb}}时间</label><div class="time">
      <input v-model="time" type="date" />
    </div>
    <label>评分</label>
    <span class="score" @mouseover="changing = true" @mouseout="changing = false">
      <template v-for="i in 10" :key="i">
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
    <label v-if="addType=='other'">类型</label><input v-if="addType=='other'" v-model="otherType" />
    <textarea v-model="article"></textarea>
    <span class="text">字数：{{article ? article.length : 0}}</span>
    <button @click="submitSubject">{{submitText}}</button>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable no-debugger */
import { PropType, ref, computed, onMounted } from "vue";
import { Subject } from "./Subject";

const emit = defineEmits(['addSubject', 'closeModal', 'editSubject'])

const props = defineProps({
  addType: {
    type: String,
    default: ''
  },
  editOrAdd: {
    type: String,
    default: 'add'
  },
  toEditSubject: Object as PropType<Subject>
})

const verb = computed(() :string =>  {
  switch(props.addType) {
    case 'game': return '游玩';
    case 'movie': 
    case 'anime': return '观看';
    case 'novel': return '阅读';
    default: return '欣赏';
  }
})

const submitText = computed(():string => {
  if(props.editOrAdd == 'edit') {
    return '确认'
  } else {
    return '提交'
  }
})

const time = ref('') //游玩时间
const getTime = ():string => {
  const now = new Date()
  return now.getFullYear().toString() + '-' 
  + (now.getMonth() + 1 >= 10 ? (now.getMonth() + 1).toString() :'0' + (now.getMonth()+1).toString()) + '-'
  + (now.getDate() >= 10 ? (now.getDate()).toString() : '0' + (now.getDate()).toString())
}
onMounted(() => {
  if (props.addType === 'add') {
    time.value = getTime()
  }
})

const name = ref('') //作品名
const platform = ref('') //平台，仅游戏
const otherType = ref('') // 作品类型，仅其它
const score = ref(5) //分数
const article = ref('') //小作文

onMounted(() => {
  if(props.editOrAdd == 'edit' && props.toEditSubject) {
    name.value = props.toEditSubject.name
    score.value = props.toEditSubject.score
    article.value = props.toEditSubject.article
    time.value = props.toEditSubject.time
    if(props.addType == 'game') {
      platform.value = props.toEditSubject.platform || ''
    }
    if(props.addType === 'other') {
      otherType.value = props.toEditSubject.otherType || ''
    }
  }
})

const changing = ref(false) //是否在修改分数
const mouseScore = ref(0)//鼠标所指的分数
const submitSubject = () => {
  if(props.editOrAdd == 'add') {
    if(name.value){
      const newSubject:Subject = {
        name: name.value,
        score: score.value,
        time: time.value,
        article: article.value,
      }
      if(platform.value) {
        newSubject.platform = platform.value
      }
      if(otherType.value) {
        newSubject.otherType = otherType.value
      }
      emit('addSubject',newSubject)
    }
  } else if (props.editOrAdd == 'edit' && props.toEditSubject) {
    const newValue:Subject = {
      name: name.value,
      score: score.value,
      time: time.value,
      article: article.value
    }
    if (platform.value) {
      newValue.platform = platform.value
    }
    if (otherType.value) {
      newValue.otherType = otherType.value
    }
    emit('editSubject', newValue)
    emit('closeModal')
  }
}
</script>

<style lang="less" scoped>
.addSubject {
  width: 800px;
  margin-top: 150px;
  margin-left: calc(50% - 400px);
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