<template>
  <div class="components-container">
    <el-form label-position="left" label-width="80px" :model="article">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>

      <el-form-item label="摘要">
        <el-input v-model="article.digest"></el-input>
      </el-form-item>

      <el-form-item label="图片">
        <el-input v-model="article.imageUrl"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="article.comment"></el-input>
      </el-form-item>

      <el-form-item label="详细内容">
        <tinymce v-model="article.content" :height="300">
        </tinymce>
      </el-form-item>

      <el-form-item label="预览">
        <div class="editor-content" v-html="article.content">
        </div>
      </el-form-item>
      <el-button type="primary" @click="save">
        保存
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { create } from '@/api/Blogging/article'
  import bus from '@/utils/bus'
  export default {
    name: 'rich-editor',
    components: { Tinymce },
    data() {
      var form = {
        article: {
          title: "",
          digest: "",
          imageUrl: "",
          isPublished: true,
          comment: "",
          scope: "",
          category: 0,
          content:
            `<h1 style="text-align: center;">灵图慧视智能验布机!</h1><p style="text-align: center; font-size: 15px;"><img title="灵图慧视" src="http://www.lintsense.com/images/slide-14-.jpg" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>灵图慧视</li><li>灵图慧视</a>.</li><li> 灵图慧视 </a>.</li>
      </ul>`
        }
      }
      return form;
    },
    created() {
      bus.$on("edit-article", function (data) {
        alert(data);
      })
    },
    methods: {
      save: function () {
        create(this.article).then(x => {
          this.$notify({
            title: 'Success',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })

        });

      }
    }
  }
</script>

<style scoped>
  .editor-content {
    margin-top: 10px;
  }
</style>
