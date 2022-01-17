<template>
  <div class="subject">
    <div class="title">
      <div class="name">
        <span @click="editSubject">{{content.name}}</span>
        <span class="delete" @click="deleteSubject">x</span>
        <span class="platform" v-if="content.platform">（{{content.platform}}）</span>
      </div>
      <div class="time">{{content.time}}</div>
      <div class="score">
        <span class="starstop-s">
          <span class="starlight" :style="{width:content.score * 20 + 'px'}"></span>
        </span>
      </div>
    </div>
    <div class="article">&emsp;&emsp;{{content.article}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType } from "vue";
import { Subject } from "./MyRate.vue";

export default defineComponent({
  emits:['editSubject','deleteSubject'],
  props:{
    content:{
      type: Object as PropType<Subject>,
      default: {
        time: '2022-01-11',
        platform: 'PS5',
        name: 'odd taxi',
        score: 9,
        article: '好久没看番了，这部真的是相当优秀，值得推荐。最后两话疯狂回收伏线真让人知乎过瘾，结局真凶终于浮出水面也让人相当震惊。毫无疑问是小成本动画的典范之一了',
      }
    },
    index:{
      type: Number,
    }
  },
  data(){
    return {
    }
  },
  methods:{
    editSubject(){
      this.$emit('editSubject',this.content)
    },
    deleteSubject(){
      this.$emit('deleteSubject',this.index)
    }
  }
})
</script>

<style scoped lang="less">
.subject{
  width: 800px;
  padding: 20px;
  border-bottom: solid 1px #F2F2F2;
  text-align: left;
  margin-left: calc(50% - 410px);
  .title{
    position: relative;
    margin-bottom: 10px;
    .time {
      color: #1175A8;
      font-size: 20px;
    }
    .name {
      color: red;
      font-size: 22px;
      span:first-child:hover {
        text-decoration: underline;
        cursor:pointer;
      }
      .delete {
        position:absolute;
        text-align: center;
        height: 20px;
        width: 20px;
        border-radius: 10px;
        line-height: 16px;
        font-size: 20px;
        top: -10px;
        left: -10px;
        z-index: 2;
        color: white;
        background-color: red;
        cursor: pointer;
        opacity: 0.05;
        &:hover {
          opacity: 1;
        }
      }
      .platform {
        font-size: 16px;
        color: green;
        
      }
    }
    .score {
      position: absolute;
      height: 20px;
      right: 0;
      top: 0;
      .starstop-s {
        display: block;
        width: 200px;
        height: 20px;
        background: transparent url('../assets/rate_star_2x.png');
        background-size: 20px 39px;
        background-repeat: repeat-x;
        background-position: 100% 100%;
        .starlight {
          display: block;
          height: 20px;
          background: transparent url('../assets/rate_star_2x.png');
          background-size: 20px 39px;
          background-repeat: repeat-x;
          background-position: 0 0;
        }
      }
    }
  }
  .article {
    font-size: 18px;
  }
}
</style>