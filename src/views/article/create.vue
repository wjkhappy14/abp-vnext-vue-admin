<template>
  <div class="components-container">
    <span class="action-text">{{actionText}}</span>
    <el-form label-position="left" label-width="80px" :model="article">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>

      <el-form-item label="摘要">
        <el-input v-model="article.digest"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker v-model="article.publishDate"
                        align="right"
                        type="datetime"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="article.isPublished"></el-switch>
      </el-form-item>

      <el-form-item label="图片">
        <el-input v-model="article.imageUrl"></el-input>
        <el-upload :multiple="false"
                   :show-file-list="false"
                   :action=uploadActionUri
                   :on-success="handleImageSuccess"
                   :headers="headers"
                   class="image-uploader"
                   drag>
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
        </el-upload>
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
  import store from '@/store'
  import Upload from '@/components/Upload/SingleImage'
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import request from '@/utils/request'
  export default {
    name: 'article-editor',
    components: { Tinymce, Upload },
    data() {
      var form = {
        headers: {
          "Authorization": "Bearer " + store.state.account.token,
        },
        actionText: '',
        uploadActionUri: "http://192.168.3.47:6543/api/contents/files/image/upload",
        article: {
          id: 0,
          title: "",
          digest: "",
          imageUrl: "",
          isPublished: true,
          publishDate: '',
          comment: "",
          scope: "",
          category: 0,
          content:
            `<h1 style="text-align: center;">灵图慧视智能!</h1><img title="灵图慧视智能" src="http://www.lintsense.com/images/slide-14-.jpg"  width="120" height="100" />`
        }
      }
      return form;
    },
    created() {
      var id = this.$route.params.id || 0;
      if (id > 0) {
        this.actionText = "修改新闻动态";
        this.getItem({ id: id }).then(item => {
          this.article = item;
        });

      }
      else {
        this.article = { id: 0 };
        this.actionText = "创建新闻动态";
      }
    },
    watch: {
      "article.id": (id, old) => {
      }
    },
    methods: {
      ...mapActions({
        updateItem: "docs/article/updateItem",
        addItem: "docs/article/addItem",
        getItem: "docs/article/getItem"
      }),
      beforeUpload: function (file) {
        request.post(this.uploadActionUri, file).then(x => {
          debugger;

        });
      },
      handleImageSuccess(httpResult, rawFile, files) {
        this.$nextTick(() => {
          this.article.imageUrl = httpResult.fileUrl;
        })
        this.$notify({
          title: '上传成功',
          message: '配图上传成功',
          type: 'success',
          duration: 3000,
          position: 'bottom-right'
        })
      },
      save: function () {
        if (this.article.id == 0) {
          this.addItem(this.article).then(x => {
            this.$notify({
              title: '新闻动态',
              message: '创建成功',
              type: 'success',
              duration: 3000,
              position: 'bottom-right'
            })
          });
        }
        else {
          this.updateItem(this.article).then(x => {
            this.$notify({
              title: '新闻动态',
              message: '修改成功',
              type: 'success',
              duration: 3000,
              position: 'bottom-right'
            })
          });
        }
        //跳回列表页面
        this.$router.push({
          name: "article",
          params: {
            t: +(new Date())
          }
        });
      }
    }
  }
</script>

<style scoped>
  .editor-content {
    margin-top: 10px;
  }

  .action-text {
    color: red;
    margin-bottom: 25px;
  }
</style>
