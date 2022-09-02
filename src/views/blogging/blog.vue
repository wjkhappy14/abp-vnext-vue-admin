<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="搜 索" style="width:300px;" prefix-icon="el-icon-document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px;" type="primary" icon="el-icon-document" @click="handleDownload">
      搜 索
    </el-button>
    <el-table v-loading="isLoading" 
    :data="items" 
    @row-click="itemSelected"
    element-loading-text="加载中" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="95" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewPosts(scope.row)">View Post</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

  export default {
    name: 'blog-grid',
    data() {
      return {
        listLoading: true,
        downloadLoading: false,
        filename: ''
      }
    },
    computed:{
      ...mapState({
        items: state => state.blogging.blog.items,
        isLoading: state => state.blogging.blog.isLoading,
      }),
      ...mapGetters({


      })



    },
    created() {
      this.getItems({})
    },
    methods: {
      ...mapActions({
        getItems: "blogging/blog/getItems",
        viewPosts: "blogging/blog/viewPosts",
      }),
      ...mapMutations({
        itemSelected: "blogging/blog/itemSelected",

      }),

      handleDownload() {
        this.downloadLoading = true
       
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>
