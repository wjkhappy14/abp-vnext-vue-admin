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
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column label="标题" width="100px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已发布？" width="80px" align="left">
        <template slot-scope="{row}">
          <div class="item-isPublished">
            <el-checkbox :checked="row.isDeleted" :disabled=true></el-checkbox>
            <span v-if="row.isDeleted">
              已发布
            </span>
            <span v-else>
              未发布
            </span>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="发布时间" width="150px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.lastModificationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="摘要" align="left">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" width="150px" align="left">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.shortName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="配图" width="250px" align="center">
        <template slot-scope="{row}">
          <img :src="row.imageUrl" width="100" height="100" />
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
          type: 2,
          range: []
        }
      }
    },
    computed: {
      ...mapState(["docs/article/count"]),
      ...mapGetters({
        items: 'docs/article/items'
      })
    },
    created() {
      this.getItems(this.query)
    },
    methods: {
      ...mapActions({
        getItems: "docs/article/getItems",
        deleteItem: "docs/article/deleteItem"
      }),
      handleSearch: function () {
        this.getItems(this.query)
      },
      editItem(row) {
        this.$router.push({
          name: "create",
          params: {
            id:
              row.id,
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
