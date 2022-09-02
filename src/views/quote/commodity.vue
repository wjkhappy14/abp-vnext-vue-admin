<template>
  <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="tabClickHandler">
        <el-tab-pane label="Client" 
        name="client">
          <el-table v-loading="listLoading" :data="items" 
          element-loading-text="Loading..." 
          border 
          fit 
          highlight-current-row>
            <el-table-column align="center" label="Id" width="45">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="ExchangeNo" width="180" align="left">
              <template slot-scope="scope">
                {{ scope.row.exchangeNo }}
              </template>
            </el-table-column>
            <el-table-column label="commodityType" width="180" align="left">
              <template slot-scope="scope">
                {{ scope.row.commodityType }}
              </template>
            </el-table-column>
            <el-table-column label="Symbol" width="180" align="left">
              <template slot-scope="scope">
                {{ scope.row.symbol }}
              </template>
            </el-table-column>
            <el-table-column label="Name" width="150" align="left">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="left" label="CommodityNo" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.commodityNo}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Claims" name="claims">
          <h1>Claims</h1>
        </el-tab-pane>
        <el-tab-pane label="Allowed Scopes" name="allowedScopes">
          <h1>Scopes</h1>
        </el-tab-pane>
        <el-tab-pane label="Properties" name="properties">
          <h1>properties</h1>
        </el-tab-pane>
        <el-tab-pane label="RedirectUris" name="redirectUris">
          <h1>RedirectUris</h1>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import { parseTime } from '@/utils'

  export default {
    name: 'commodity-grid',
    data() {
      return {
        listLoading: false,
        autoWidth: true,
        activeName:''
      }
    },
    computed: {
      ...mapGetters({
        items: 'quote/commodity/items'
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
        getItems: "quote/commodity/getItems"
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
