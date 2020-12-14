<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" width="180" label="Url">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="UserName">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="Tenant">
        <template slot-scope="{row}">
          <span>{{ row.tenantName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="Application">
        <template slot-scope="{row}">
          <span>{{ row.applicationName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="ExecutionTime">
        <template slot-scope="{row}">
          <span>{{ row.executionTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140" align="left" label="Client IP">
        <template slot-scope="{row}">
          <span>{{ row.clientIpAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="left" label="Browser Info">
        <template slot-scope="{row}">
          <span>{{ row.browserInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="left" label="Http Method ">
        <template slot-scope="{row}">
          <span>{{ row.httpMethod }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="left" label="Duration">
        <template slot-scope="{row}">
          <span>{{ row.executionDuration }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="Exceptions">
        <template slot-scope="{row}">
          <button>View Exceptions</button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList } from '@/api/AuditLogging/index'
  export default {
    name: 'AuditLogging',
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
          this.list = result;
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
