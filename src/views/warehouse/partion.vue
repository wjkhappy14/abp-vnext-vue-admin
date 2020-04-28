<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="分区管理" name="first">
        <el-input v-model="filename" placeholder="输入文件名" style="width:350px;" prefix-icon="el-icon-document" />
        <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
          导出选中的行
        </el-button>
        <div>
          <el-table ref="multipleTable"
                    v-loading="listLoading"
                    :data="list"
                    element-loading-text="加载中"
                    border
                    fit
                    highlight-current-row
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <el-table-column align="center" label="Id" width="95">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="text" width="150" align="left">
              <template slot-scope="scope">
                {{ scope.row.comment.text }}
              </template>
            </el-table-column>
            <el-table-column label="email" width="180" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.comment.writer.email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Readings" width="115" align="center">
              <template slot-scope="scope">
                {{ scope.row.pageviews }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="Creation Time" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{scope.row.comment.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>

          </el-table>

        </div>
      </el-tab-pane>
      <el-tab-pane label="模板管理" name="second">

      </el-tab-pane>
      <el-tab-pane label="分组管理" name="third">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { fetchList } from '@/api/comment'

  export default {
    name: 'SelectExcel',
    data() {
      return {
        list: null,
        activeName:'',
        listLoading: true,
        multipleSelection: [],
        downloadLoading: false,
        filename: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      
      tabClickHandler() {


      },
      fetchData() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDownload() {
        if (this.multipleSelection.length) {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
            const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
            const list = this.multipleSelection
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename
            })
            this.$refs.multipleTable.clearSelection()
            this.downloadLoading = false
          })
        } else {
          this.$message({
            message: 'Please select at least one item',
            type: 'warning'
          })
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>
