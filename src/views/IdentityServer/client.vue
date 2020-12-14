<template>
  <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="tabClickHandler">
        <el-tab-pane label="Client" name="client">
          <el-table v-loading="listLoading" :data="client.items" element-loading-text="Loading..." border fit highlight-current-row>
            <el-table-column align="center" label="Id" width="45">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="clientId" width="180" align="left">
              <template slot-scope="scope">
                {{ scope.row.clientId }}
              </template>
            </el-table-column>
            <el-table-column label="clientName" width="150" align="left">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.clientName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Enabled" width="80" align="left">
              <template slot-scope="scope">
                {{ scope.row.enabled }}
              </template>
            </el-table-column>
            <el-table-column label="identityTokenLifetime" width="180" align="left">
              <template slot-scope="scope">
                {{ scope.row.identityTokenLifetime }}
              </template>
            </el-table-column>
            <el-table-column align="left" label="protocolType" width="80">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.protocolType}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="Access Token Lifetime" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.accessTokenLifetime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="Enable LocalLogin" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.enableLocalLogin}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="Access Token Lifetime" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.accessTokenLifetime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="includeJwtId" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.includeJwtId}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="requireClientSecret" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.requireClientSecret}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="requirePkce" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.requirePkce}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" label="slidingRefreshTokenLifetime" width="120">
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.slidingRefreshTokenLifetime}}</span>
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
        <el-tab-pane label="Allowed Cors Origins" name="allowedCorsOrigins">
          <h1>Origins</h1>
        </el-tab-pane>
        <el-tab-pane label="Allowed Grant Types" name="allowedGrantTypes">
          <h1>GrantTypes</h1>
        </el-tab-pane>
        <el-tab-pane label="Client Secrets " name="clientSecrets">
          <h1>Secrets</h1>
        </el-tab-pane>
        <el-tab-pane label="Identity Provider Restrictions" name="identityProviderRestrictions">
          <h1>identityProviderRestrictions</h1>
        </el-tab-pane>
        <el-tab-pane label="PostLogoutRedirectUris" name="postLogoutRedirectUris">
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
    name: 'ExportExcel',
    data() {
      return {
        listLoading: false,
        autoWidth: true,
        activeName:''
      }
    },
    computed: {
      ...mapGetters({
        client: 'identityServer/client/client'
      }),
      ...mapState({
        users: state => state
      })
    },
    created() {
      this.getClients()
    },
    methods: {
      ...mapActions({
        getClients: "identityServer/client/getClients"
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
