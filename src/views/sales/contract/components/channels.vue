<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox label="apple">
          apple
        </el-checkbox>
        <el-checkbox label="banana">
          banana
        </el-checkbox>
        <el-checkbox label="orange">
          orange
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="name" width="180" />
      <el-table-column prop="comment" label="comment" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList } from '@/api/sales/order'
  export default {
    data() {
      return {
        list: [],
        formThead: ['apple', 'banana']
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(result => {
          this.list = result.items;
          this.listLoading = false
        });
      }
    }
  }
</script>
