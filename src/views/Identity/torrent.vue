<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="输入文件名" style="width:350px;" prefix-icon="el-icon-document" />
    <div>
      <el-table ref="multipleTable"
                v-loading="listLoading"
                :data="list"
                height="850"
                element-loading-text="Loading..."
                :border=true
                :stripe=true
                :fit=false
                highlight-current-row
                @selection-change="handleSelectionChange">
        <el-table-column align="center" label="#" width="50">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="File Name" align="left">
          <template slot-scope="scope">
            {{ scope.row.filename }}
          </template>
        </el-table-column>
        <el-table-column label="Title" width="180" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="torrent_url" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.torrent_url }}</span>
          </template>
        </el-table-column>
        <el-table-column label="MB" width="60" prop="size_mb" sortable align="center">
          <template slot-scope="scope">
            {{ scope.row.size_mb }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Creation Time" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { fetchList } from '@/api/torrent'
  export default {
    name: 'SelectExcel',
    data() {
      return {
        list: null,
        activeName: '',
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
        fetchList().then(response => {
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
