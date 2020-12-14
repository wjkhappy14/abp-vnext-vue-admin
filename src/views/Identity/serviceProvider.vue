<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>
      <a href="" target="_blank" style="margin-left:15px;">
        <el-tag type="info">Help?</el-tag>
      </a>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在加载..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="45">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="descriptions" align="left">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.descriptions[0] }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList } from '@/api/serviceProvider'
  import { parseTime } from '@/utils'
  import FilenameOption from './components/FilenameOption'
  import AutoWidthOption from './components/AutoWidthOption'
  import BookTypeOption from './components/BookTypeOption'

  export default {
    name: 'address',
    components: {
      FilenameOption,
      AutoWidthOption,
      BookTypeOption
    },
    data() {
      return {
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        fetchList().then(response => {
          this.list = response
          this.listLoading = false
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/utils/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
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

<style>

  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
