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
  emits:['editSubject','deleteSubject'],
  props:{
    dataList: Array as PropType<Subject[]>,
    default: []
  },
  components:{
    SubjectComponent
  },
  data(){
    return {}
  },
  methods:{
    editSubject(subject:Subject){
      this.$emit('editSubject',subject)
    },
    deleteSubject(index:number){
      this.$emit('deleteSubject',index)
    }
  }
})
</script>