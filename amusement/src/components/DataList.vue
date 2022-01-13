<template>
  <div>
    <SubjectComponent v-for="item in dataList" :content="item"/>
  </div>
</template>
<script lang="ts">
import { defineComponent,PropType } from "vue";
import { Subject } from "./MyRate.vue";
import SubjectComponent from "./Subject.vue";
export default defineComponent({
  props:{
    dataList: Array as PropType<Subject[]>,
    default: []
  },
  components:{
    SubjectComponent
},
  data(){
    return {}
  }
})
</script>