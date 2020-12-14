<template>
  <div class="app-container">
    <div v-for="key in options" :key="key">
      <span><i>{{key}}</i></span>
    </div>
  </div>
</template>

<script>
  import { getMvcOptions } from '@/api/diagnostic'
  export default {
    data() {
      return {
        options: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        getMvcOptions().then(result => {
          this.options = result;
          this.listLoading = false
        });
      }
    }
  }
</script>
