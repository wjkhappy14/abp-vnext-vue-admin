<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="creationTime">
        <template slot-scope="{row}">
          <span>{{ row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="left" label="account">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="left" label="name">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="left" label="Notify Domain">
        <template slot-scope="{row}">
          <span>{{ row.notifyDomain }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="left" label="Post Domain">
        <template slot-scope="{row}">
          <span>{{ row.postDomain }}</span>
        </template>
      </el-table-column>


      <el-table-column class-name="status-col" label="isSkipvt" width="100">
        <template slot-scope="{row}">
          <el-checkbox :checked="row.isSkipvt"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="signKey">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button class="cancel-btn"
                       size="small"
                       icon="el-icon-refresh"
                       type="warning"
                       @click="cancelEdit(row)">
              取消
            </el-button>
          </template>
          <span v-else>{{ row.signKey }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{row}">
          <el-button v-if="row.edit"
                     type="success"
                     size="small"
                     icon="el-icon-circle-check-outline"
                     @click="confirmEdit(row)">
            确定
          </el-button>
          <el-button v-else
                     type="primary"
                     size="small"
                     icon="el-icon-edit"
                     @click="row.edit=!row.edit">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList } from '@/api/sales/order'

  export default {
    name: 'InlineEditTable',
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
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
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(result => {
          this.list = result.items.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            v.originalTitle = v.title //  will be used when user click the cancel botton
            return v
          })
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
