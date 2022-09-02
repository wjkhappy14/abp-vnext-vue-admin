<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="Client" name="client">
        <el-table v-loading="isLoading" :data="items" element-loading-text="Loading..." border fit highlight-current-row>
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
          <el-table-column label="commodityNo" width="150" align="left">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.commodityNo }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="contractNo" width="80" align="left">
            <template slot-scope="scope">
              {{ scope.row.contractNo }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="Symbol" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.symbol}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="highPrice" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.highPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="lowPrice" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.lowPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="openPrice" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.openPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="volume" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.volume}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="lastPrice" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.lastPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="totalQty" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.totalQty}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="askSize" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.askSize}}</span>
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
    name: 'contract-grid',
    data() {
      return {
        listLoading: false,
        autoWidth: true,
        activeName: ''
      }
    },
    computed: {
      ...mapGetters({
        items: 'quote/contract/items',
        query: 'quote/contract/query',
      }),
      ...mapState({
        isLoading: state => state.quote.contract.isLoading,
      })
    },
    created() {
      this.getItems()
    },
    methods: {
      ...mapActions({
        getItems: "quote/contract/getItems"
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
