<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column v-loading="loading"
                     align="center"
                     label="ID"
                     width="65"
                     element-loading-text="正在加载！">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="Title">
      <template slot-scope="{row}">
        <span>{{ row.name }}</span>
        <el-tag>{{ row.name }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="120px" label="Importance">
      <template slot-scope="scope">
        <!--<svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />-->
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
  import { fetchList } from '@/api/article'

  export default {
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
    props: {
      type: {
        type: String,
        default: 'CN'
      }
    },
    data() {
      return {
        list: null,
        listQuery: {
          page: 1,
          limit: 5,
          type: this.type,
          sort: '+id'
        },
        loading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.$emit('create') // for test
        fetchList(this.listQuery).then(response => {
          this.list = response.items
          this.loading = false
        })
      }
    }
  }
</script>

