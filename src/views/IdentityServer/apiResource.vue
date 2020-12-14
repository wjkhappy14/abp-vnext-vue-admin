<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="Client" name="client">
        <el-table v-loading="listLoading" :data="apiResource.items" element-loading-text="Loading..." border fit highlight-current-row>
          <el-table-column align="center" label="Id" width="45">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="Name" width="180" align="left">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="Description" width="180" align="left">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.description }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Enabled" width="80" align="left">
            <template slot-scope="scope">
              {{ scope.row.enabled }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="DisplayName" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.displayName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作" width="120">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <button><span>编辑</span></button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="User Claims" name="userClaims">
        <h1>Claims</h1>
      </el-tab-pane>
      <el-tab-pane label="Properties " name="properties">
        <h1>Scopes</h1>
      </el-tab-pane>
      <el-tab-pane label="Secrets" name="secrets">
        <h1>Origins</h1>
      </el-tab-pane>
      <el-tab-pane label="Scopes" name="scopes">
        <h1>GrantTypes</h1>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import { parseTime } from '@/utils'

  export default {
    name: 'ExportExcel',
    data() {
      return {
        listLoading: false,
        autoWidth: true,
        activeName: ''
      }
    },
    computed: {
      ...mapGetters({
        apiResource: 'identityServer/apiResource/apiResource'
      }),
      ...mapState({
        users: state => state
      })
    },
    created() {
      this.getApiResources()
    },
    methods: {
      ...mapActions({
        getApiResources: "identityServer/apiResource/getApiResources"
      }),
      tabClickHandler() {

      },
      handleDownload() {
        this.downloadLoading = true
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
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
