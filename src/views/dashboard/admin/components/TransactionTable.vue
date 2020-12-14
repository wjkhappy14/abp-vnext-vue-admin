<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="角色" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.name | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          pending: 'danger'
        }
        return statusMap[status]
      },
      orderNoFilter(str) {
        return str
      }
    },
    data() {
      return {
        list: null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      ...mapActions({
        defectCategories: "summary/defectCategories"
      }),
      fetchData() {

      }
    }
  }
</script>
