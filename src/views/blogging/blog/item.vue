<template>
  <div class="app-container">
    <label>创建时间:</label>
    <el-date-picker v-model="query.range"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
    </el-date-picker>
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click.native.prevent="handleSearch">
      搜索
    </el-button>

    <el-table key="id"
              :data="items"
              row-key="id"
              border
              fit
              highlight-current-row
              style="width: 100%;">
      <el-table-column  width="60px" align="left" type="expand">
        <template slot-scope="{row}">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="url">
              <span>{{ row.url }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ row.title }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <img :src="row.coverImage" width="100" height="100" />
            </el-form-item>
            <el-form-item label="creationTime">
              <span>{{ row.creationTime }}</span>
            </el-form-item>
            <el-form-item label="Last ModificationTime">
              <span>{{ row.lastModificationTime }}</span>
            </el-form-item>
            <el-form-item label="Comment Count">
              <span>{{ row.commentCount }}</span>
            </el-form-item>
            <el-form-item label="Read Count">
              <span>{{ row.readCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="title"  align="left">
        <template slot-scope="{row}">
          <span>{{ row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="url" align="left">
        <template slot-scope="{row}">
          <span>{{ row.url}}</span>
        </template>
      </el-table-column>

      <el-table-column label="已发布？" width="80px" align="left">
        <template slot-scope="{row}">
          <div class="item-isPublished">
            <span v-if="row.isDeleted">
              已删除
            </span>
            <span v-else>
              未发布
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="description" align="left">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="content" align="left">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.content }}</span>
        </template>
      </el-table-column>
     
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="editItem(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

  import waves from '@/directive/waves' // waves directive

  export default {
    name: 'article-list',
    components: {

    },
    directives: { waves },
    data() {
      return {
        total: 0,
        query: {
          page: 1,
          blogId: '',
          type: 2,
          range: []
        }
      }
    },
    computed: {
      ...mapState(["blogging/blog/count"]),
      ...mapGetters({
        items: 'blogging/post/items'
      })
    },
    created() {
      var id = this.$route.params.id;

      if (id != '') {
        this.query.blogId = id;
        this.getItems(this.query).then(item => {
          this.article = item;
        });
      }
    },
    methods: {
      ...mapActions({
        getItems: "blogging/post/getItems",
        deleteItem: "blogging/post/deleteItem"
      }),
      handleSearch: function () {
        this.getItems(this.query)
      },
      editItem(row) {
        this.$router.push({
          name: "create",
          params: {
            id: row.id,
            t: +(new Date())
          }
        });
      },
      handleDelete(row) {
        this.$confirm('确定要删除此内容吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteItem(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>
<style>
  .item-isPublished {
    font-weight: 100;
  }
</style>
