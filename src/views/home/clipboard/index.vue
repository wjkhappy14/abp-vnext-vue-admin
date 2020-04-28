<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          复制
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import clip from '@/utils/clipboard' // use clipboard directly
  import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

  export default {
    name: 'ClipboardDemo',
    directives: {
      clipboard
    },
    data() {
      return {
        activeName: 'directly',
        inputData: 'Hellow Kitty'
      }
    },
    methods: {
      handleCopy(text, event) {
        clip(text, event)
      },
      clipboardSuccess() {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        })
      }
    }
  }
</script>

