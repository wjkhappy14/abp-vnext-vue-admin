<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label=" Authentication">
        <div v-for="(vulue, key) in options.authentication" :key="key">
          <span><i>{{key}}</i></span>
          <span>{{options.authentication[key]}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Input Length Restrictions">
        <div v-for="(vulue, key) in options.inputLengthRestrictions" :key="key">
          <span><i>{{key}}</i></span>
          <span>{{options.inputLengthRestrictions[key]}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Cors">
        <span>{{options.cors.corsPolicyName}}</span>
        <div v-for="vulue in options.cors.corsPaths" :key="key">
          <span><i>{{vulue}}</i></span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getIdentityServerOptions } from '@/api/diagnostic'
  export default {
    data() {
      return {
        options: {},
        key: 1, // table key
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        getIdentityServerOptions().then(result => {
          this.options = result;
          this.listLoading = false
        });
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
    },
    watch: {
      checkboxVal(valArr) {
        this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
      }
    }
  }
</script>

