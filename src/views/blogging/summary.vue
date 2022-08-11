<template>
  <hot-table :data="items"
             colHeaders="true"
             rowHeaders="true"
             width="100%"
             licenseKey="non-commercial-and-evaluation"
             height="1200">
  </hot-table>
</template>

<script>
  import { HotTable } from '@handsontable/vue';
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/Blogging/summary'

  export default {
    name: 'ComplexTable',
    components: {
      HotTable
    },
    data() {
      return {
        listQuery: {
          page: 1,
          MaxResultCount: 120,
        },
        items:[],
        hotSettings: {
          colHeaders: true,
          rowHeaders: true,
          readOnly: false,
          //width: "600",
          height: "800",
         
        }
      }
    },
    created() {
      console.log(HotTable);
      this.getList()
    },
    methods: {
      getList() {
        fetchList(this.listQuery).then(response => {
          this.items = response.items;
          this.total = 100;//response.total
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sortChange(data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }, handleDelete(row) {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      }
    }
  }
</script>
<style>
  @import '~handsontable/dist/handsontable.full.css';
</style>
