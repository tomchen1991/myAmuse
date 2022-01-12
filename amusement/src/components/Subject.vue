<template>
  <div>测试</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props:{
    content:{
      type: Object,
      default: {
        time: '2022-01-11',
        name: 'odd taxi',
      }
    }
  },
  data(){
    return {}
  },
})
</script>