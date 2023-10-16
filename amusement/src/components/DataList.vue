<!--
 * @Date: 2022-03-22 21:13:44
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-16 14:56:31
 * @FilePath: /amusement/src/components/DataList.vue
-->
<template>
  <div>
    <SubjectItem
      @editSubject="editSubject"
      @deleteSubject="deleteSubject"
      v-for="(item,index) in dataList"
      :key="index"
      :content="item"
      :index="index"/>
  </div>
</template>

<script lang="ts" setup>
import { Subject } from "./Subject";
import SubjectItem from "./SubjectItem.vue";
const props = defineProps<{
  dataList: Subject[]
}>()

const emit = defineEmits(['editSubject', 'deleteSubject'])
const editSubject = function(subject:Subject){
  emit('editSubject', subject)
}
const deleteSubject = function(subject:Subject){
  emit('deleteSubject', subject.id)
}
</script>