<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="输入关键字" style="width:350px;" prefix-icon="el-icon-document" />
      <el-table ref="multipleTable"
                v-loading="listLoading"
                :data="list"
                height="850"
                element-loading-text="正在加载..."
                :border=true
                :stripe=true
                :fit=false
                highlight-current-row
                @selection-change="handleSelectionChange">
        <el-table-column align="center" label="#" width="50">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="File Name" align="left" width="180">
          <template slot-scope="scope">
            {{ scope.row.filename }}
          </template>
        </el-table-column>
        <el-table-column label="Title" width="180" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="torrent_url" align="left" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.torrent_url }}</span>
          </template>
        </el-table-column>
          <el-table-column label="imdb_id" align="left" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.imdb_id }}</span>
          </template>
        </el-table-column>
          <el-table-column label="episode" align="right" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.episode }}</span>
          </template>
        </el-table-column>
          <el-table-column label="season" align="left" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.season }}</span>
          </template>
        </el-table-column>
        <el-table-column label="bytes" width="100" prop="size_bytes" sortable align="center">
          <template slot-scope="scope">
            {{ scope.row.size_bytes }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="released" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{new Date(scope.row.date_released_unix)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="fetchData" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { fetchList } from '@/api/torrent'
  export default {
    name: 'eztv-torrent',
    components: { Pagination },
    data() {
      return {
        total: 0,
        list: [],
        query: {
        page: 1,
        limit: 5,
        title: undefined,
        sort: '+id'
      },
        activeName: '',
        listLoading: true,
        multipleSelection: [],
        downloadLoading: false,
        filename: ''
      }
    },
    created() {
      this.fetchData(this.query)
    },
    methods: {
      tabClickHandler() {

      },
      fetchData(query) {
        this.listLoading = true
        fetchList(query).then(response => {
          this.list = response.items;
          this.total=response.totalCount;
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
            message: '请至少选择一个',
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
