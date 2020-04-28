<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="国家地区" name="country">
        <el-table :data="countries" border highlight-current-row style="width:100%;margin-top:20px;">
          <el-table-column prop="name" label="name" width="180">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cmd" label="cmd" width="120">
            <template slot-scope="{row}">
              <span>{{ row.cmd }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="message" width="100">
            <template slot-scope="{row}">
              <span>{{ row.message }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="connectionId" width="200">
            <template slot-scope="{row}">
              <span>{{ row.connectionId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="success"
                         size="small"
                         icon="el-icon-circle-check-outline"
                         @click="sendToGroup()">
                发送到群组
              </el-button>
              <el-button type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="sendToConnection(row.connectionId)">
                发送给此用户
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="州省" name="stateProvince">
        <el-table :data="stateProvinces" border highlight-current-row style="width:100%;margin-top:20px;">
          <el-table-column prop="name" label="name" width="180">
            <template slot-scope="{row}">
              <span>{{ row.stateProvinceName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cmd" label="cmd" width="120">
            <template slot-scope="{row}">
              <span>{{ row.countryId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="message" width="200">
            <template slot-scope="{row}">
              <span>{{ row.chineseName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="connectionId" width="200">
            <template slot-scope="{row}">
              <span>{{ row.stateProvinceCode }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="success"
                         size="small"
                         icon="el-icon-circle-check-outline"
                         @click="sendToGroup()">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="城市" name="city">
        <el-table :data="cities" border highlight-current-row style="width:100%;margin-top:20px;">
          <el-table-column prop="name" label="城市名称" width="180">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cmd" label="Id" width="120">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="中文名称" width="200">
            <template slot-scope="{row}">
              <span>{{ row.chineseName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="所属省" width="200">
            <template slot-scope="{row}">
              <span>{{ row.stateProvinceId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="success"
                         size="small"
                         icon="el-icon-circle-check-outline"
                         @click="sendToGroup()">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

  export default {
    name: 'region',
    components: {
    },
    data() {
      return {
        activeName: '',
        countries: [],
        stateProvinces: [],
        cities: [],
      }
    },
    computed: {
      ...mapGetters([
      ]),
      ...mapState({
        users: state => state
      })
    },
    mounted() {

    },
    created() {
      this.getStateProvinces().then(x => {
        this.stateProvinces = x.items;
      });
      this.getCities().then(x => {
        this.cities = x.items;
      });
      this.getCountries().then(x => {
        this.countries = x.items;

        this.$message({
          message: '加载成功.',
          type: 'warning'
        })
      });
    },
    methods: {
      ...mapActions({
        getCountries: "region/getCountries",
        getStateProvinces: "region/getStateProvinces",
        getCities: "region/getCities",
      }),
      uploadSuccessHandler() {


      },
      tabClickHandler(evt) {
        if (evt.paneName == 'country') {
          this.getCountries();
        }
        else if (evt.paneName == 'stateProvince') {
          this.getStateProvinces();
        }
        else if (evt.paneName == 'city') {
          this.getCities();
        }
      },
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
      }
    }
  }
</script>
