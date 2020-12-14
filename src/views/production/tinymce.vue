<template>
  <div class="components-container">
    <aside>
      <el-input v-model="name" placeholder="输入标题">
        <template slot="prepend">
          标题
        </template>
      </el-input>
      <el-input v-model="shortName" placeholder="输入简要描述信息">
        <template slot="prepend">
          简要描述
        </template>
      </el-input>
      <el-button @click="save">
        保存
      </el-button>
    </aside>
    <div>
      <tinymce v-model="description" :height="300" />
    </div>
    <div class="editor-content" v-html="description" />
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  export default {
    name: 'TinymceDemo',
    components: { Tinymce },
    data() {
      return {
        name: '',
        shortName: '',
        description:
          `<h1 style="text-align: center;">Hello AngkorW!</h1><p style="text-align: center; font-size: 15px;">
            <img title="TinyMCE Logo" src="http://119.23.207.130/assets/AngkorW-WeChat.jpg" alt="TinyMCE Logo" width="110" height="97" />
          <ul></ul>`
      }
    },
    methods: {
      save: function () {
        create({
          name: this.name,
          shortName: this.shortName,
          description: this.description
        }).then(result => {
          this.$message({
            message: result.name + '创建成功',
            type: 'success',
            duration: 5000
          })

        });
      }
    }
  }
</script>

<style scoped>
  .editor-content {
    margin-top: 20px;
  }
</style>

