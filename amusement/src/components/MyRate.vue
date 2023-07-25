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
        <label :class="{selected:selectedAmuse===item.name}" :for="'amuseradio' + item.name">{{item.chinese}}</label>
      </template>
    </div>
    <button @click="downloadJSON">下载json</button>
  </div>
  <div class="mainBody">
    <div class="sort">
      <select v-model="sortType" @change="changeSortType">
        <option value="timeDescend">时间由新到旧</option>
        <option value="timeAscend">时间由旧到新</option>
        <option value="scoreDescend">分数由高到低</option>
        <option value="scoreAscend">分数由低到高</option>
      </select>
    </div>
    <DataList @edit-subject="getEditSubject" @delete-subject="deleteSubject" :dataList="selectedArray" />
    <div class="addSubject" @click="openAddModal">+</div>
  </div>
  <input v-model="id" />
  <button @click="getById">获取</button>
  <span>{{ getResult }}</span>
  <div class="footer">
    个人链接：
    <a target="_blank" href="https://bgm.tv/user/tomchen1991">bangumi</a>
    <a target="_blank" href="https://www.imdb.com/user/ur69395828/">IMDB</a>

  </div>

  <div class="modal" @click="showModal = false" v-if="showModal">
    <AddSubject
      @add-subject="addSubject"
      @close-modal="changeSortType();showModal = false;"
      :add-type="selectedAmuse"
      :edit-or-add="editOrAdd"
      :to-edit-subject="toEditSubject"
      @edit-subject="editSubject"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import DataList from "./DataList.vue"
import AddSubject from './AddSubject.vue'
import { Subject } from "./Subject";
import { getDataById, getAllData } from '../api/score'

interface dataType {
  game: Subject[]
  anime: Subject[]
  movie: Subject[]
  novel: Subject[]
  other: Subject[]
}

const getResult = ref('')
const id = ref('')
const getById = ()=> {
  getDataById(id.value)
  .then((res:any) => {
    if (res && res.code === 0) {
      getResult.value = res.data
    }
  })
}

const dataList = ref<dataType>({
  game: [],
  anime: [],
  movie: [],
  novel: [],
  other: []
})
onMounted(() => {
  getAllData()
  .then((res:any) => {
    if (res.code === 0) {
      dataList.value = res.data
    }
  })
})

const amuseType = ref([
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
])

const selectedAmuse = ref<keyof dataType>('game')
const selectedArray = computed(():Subject[] => {
  return dataList.value[selectedAmuse.value]
})
const downloadJSON = function (){
  const aElement = document.createElement('a')
  aElement.download = '我的娱乐.json'
  aElement.style.display = 'none'
  const amuseJSON = new Blob([JSON.stringify(dataList.value)])
  aElement.href = URL.createObjectURL(amuseJSON)
  document.body.appendChild(aElement)
  aElement.click()
  document.body.removeChild(aElement)
}

const editOrAdd = ref('add') //默认时间降序
const showModal = ref(false) //遮罩层显示
const toEditSubject = ref<Subject>({
  score: 0,
  time: '',
  name: '',
  article: ''
})
const openAddModal = function (){
  editOrAdd.value = 'add'
  showModal.value = true
}
const addSubject = function (newSubject:Subject){
  dataList.value[selectedAmuse.value].unshift(newSubject)
  changeSortType()
  showModal.value = false
}
const getEditSubject = function (oldSubject:Subject){
  editOrAdd.value = 'edit'
  toEditSubject.value = oldSubject
  showModal.value = true
}
const editSubject = function (newSubject:Subject) {
  Object.assign(toEditSubject.value, newSubject)
}
const deleteSubject = function (index:number) {
  dataList.value[selectedAmuse.value].splice(index,1)
}

const sortType = ref('timeDescend') //默认时间降序
const changeSortType = function (){
  if(sortType.value == 'timeAscend') {
    dataList.value[selectedAmuse.value].sort((a:Subject,b:Subject):number=>{
      return parseInt(a.time.replace(/-/g,'')) - parseInt(b.time.replace(/-/g,''))
    })
  } else if(sortType.value == 'timeDescend') {
    dataList.value[selectedAmuse.value].sort((a:Subject,b:Subject):number=>{
      return parseInt(b.time.replace(/-/g,'')) - parseInt(a.time.replace(/-/g,''))
    })
  } else if(sortType.value == 'scoreDescend') {
    dataList.value[selectedAmuse.value].sort((a:Subject,b:Subject):number=>{
      return b.score-a.score
    })
  } else if(sortType.value == 'scoreAscend') {
    dataList.value[selectedAmuse.value].sort((a:Subject,b:Subject):number=>{
      return a.score-b.score
    })
  }
}
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
    margin-right: 40px;
    cursor: pointer;
    &:hover {
      background-color: #F5F5F5;
    }
    &:active {
      background-color: #E5E5E5;
    }
  }
}

.mainBody {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  .sort {
    position: absolute;
    right: 25px;
    top: 100px;
  }
  .addSubject {
    position: fixed;
    right: 40px;
    bottom: 100px;
    height: 60px;
    line-height: 60px;
    width: 60px;
    background-color: #2571bf;
    border-radius: 30px;
    font-size: 50px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #2060b0;
    }
    &:active {
      background-color: #1555a5;
    }
  }
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

.modal {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0,0,0,0.3);
}
</style>