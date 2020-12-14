<template>
  <div class="app-container">

    <el-button :loading="downloadLoading"
               style="margin-bottom:20px"
               type="primary"
               icon="el-icon-document"
               @click="handleDownload">导出</el-button>

    <el-table ref="multipleTable"
              v-loading="listLoading"
              :data="list"
              element-loading-text="加载"
              border
              fit
              highlight-current-row>
      <el-table-column align="center" label="Id" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="left">
        <el-table-column label="Title" width="100">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="content" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="url" width="110" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.url }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Read/Comment Count" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.row.commentCount }}/{{ scope.row.readCount }}
          </template>
        </el-table-column>
        <el-table-column label=" CoverImage" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.row.coverImage }}
          </template>
        </el-table-column>

      </el-table-column>
      <el-table-column align="center" label="Creation Time" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import { fetchList } from '@/api/identity/role'
  import { parseTime } from '@/utils'

  export default {
    name: 'MergeHeader',
    data() {
      return {
        list: null,
        listLoading: true,
        downloadLoading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.items
          this.listLoading = false
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
          const header = ['', 'Title', 'Author', 'Readings', '']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:D1', 'E1:E2']
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>
