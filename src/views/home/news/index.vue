<template>
  <div class="columns">
    <div class="column">
      <h1>新闻动态</h1>
    </div>
    <div class="column">
      <h1>1</h1>
    </div>
    <div class="column">
      <h1>2</h1>
    </div>
    <div class="column">
      <h1>3</h1>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'news',
    filters: {

    },
    data() {
      return {
        list: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        }
      }
    },
    created() {

    },
    methods: {
      async getList() {
        this.listLoading = true
      },
      cancelEdit(row) {
        row.title = row.originalTitle
        row.edit = false
        this.$message({
          message: 'The title has been restored to the original value',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.originalTitle = row.title
        this.$message({
          message: 'The title has been edited',
          type: 'success'
        })
      }
    }
  }
</script>

<style scoped>

  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
