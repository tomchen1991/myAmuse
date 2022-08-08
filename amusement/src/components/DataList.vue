<!--
 * @Date: 2022-03-22 21:13:44
 * @LastEditors: 陈子健
 * @LastEditTime: 2022-03-30 17:35:27
 * @FilePath: /amusement/src/components/DataList.vue
-->
<template>
  <div>
    <SubjectComponent @editSubject="editSubject" @deleteSubject="deleteSubject" v-for="(item,index) in dataList" :content="item" :index="index"/>
  </div>
</template>
<script lang="ts">
import { defineComponent,PropType } from "vue";
import { Subject } from "./MyRate.vue";
import SubjectComponent from "./Subject.vue";
export default defineComponent({
  // emits:['editSubject','deleteSubject'],
  props:{
    dataList: Array as PropType<Subject[]>,
    default: []
  },
  setup(props, context){
    const emit = context.emit
    const editSubject = function(subject:Subject){
      emit('editSubject',subject)
    }
    const deleteSubject = function(index:number){
      emit('deleteSubject',index)
    }
    return {
      editSubject,deleteSubject
    }
  },
  components:{
    SubjectComponent
  },
  data(){
    return {}
  },
})
</script>