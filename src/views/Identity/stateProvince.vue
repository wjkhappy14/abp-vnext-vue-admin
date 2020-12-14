<template>
  <el-row>
    <el-col :span="16">
      <div class="grid-content bg-purple">
        <el-table v-loading="stateProvince.loading"
                  :data="stateProvince.items" border fit highlight-current-row style="width: 100%" @row-click="onRowClick" @header-click="onHeaderClick">
          <el-table-column align="center" label="ID" width="60">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" align="left" prop="territory" label="Territory">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <input type="text" v-model="row.territory" class="edit-input" />
              </template>
              <span v-else>{{ row.territory }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" align="left" label="Name">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="left" label="Chinese Name ">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <input type="text" v-model="row.chineseName" class="edit-input" />
              </template>
              <span v-else>{{ row.chineseName }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="left" prop="countryCode" label="Country Code ">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <input type="text" v-model="row.countryCode" class="edit-input" />
              </template>
              <el-button v-else type="success" size="mini" round>{{ row.countryCode }}</el-button>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="Is Capital" width="120">
            <template slot-scope="{row}">
              <el-checkbox :checked="row.stateProvinceCode.length>2"></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column min-width="100px" label="Province Code" width="140">
            <template slot-scope="{row}">
              <template v-if="row.edit">
                <input type="text" v-model="row.stateProvinceCode" class="edit-input" />
              </template>
              <span v-else>{{ row.stateProvinceCode }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="{row}">
              <el-button class="cancel-btn"
                         size="small"
                         type="warning"
                         @click.stop="cancelEdit(row)">
                取消
              </el-button>
              <el-button v-if="row.edit"
                         type="success"
                         size="small"
                         icon="el-icon-circle-check-outline"
                         @click.stop="confirmEdit(row)">
                确定
              </el-button>
              <el-button v-else
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click.prevent="row.edit=!row.edit">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple-light">
        <h1>{{stateProvince.selected.item.name}}</h1>
        <el-collapse   @change="onCollapseChangeHandler" accordion>
          <el-collapse-item :title="prop"
                             v-bind:title="prop + ' | ' + items.length"
                            :name="prop"
                            :key="prop" v-for="(items, prop) in stateProvince.group.items">
            <ul>
              <li v-for="(item,index) in items">
                <i>{{index}}</i>
                <span>{{item.name}}</span>
              </li>
            </ul>
          </el-collapse-item>
          </el-collapse>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import { of } from 'rxjs';
  export default {
    name: 'StateProvince',
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 10
        }
      }
    },
    computed: {
      ...mapGetters({
        stateProvince: 'region/stateProvince',
        selectedFunc: 'region/selectedFunc',
      }),
      ...mapState({
        users: state => state
      })
    },
    created() {
      this.getStateProvinces();
      //  this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
    },
    methods: {
      ...mapMutations({
        groupBy: "region/groupBy",
      }),
      ...mapActions({
        getStateProvinces: "region/getStateProvinces",
        updateStateProvince: "region/updateStateProvince",
        getCities: "region/getCities",
        delayAction: "region/delayAction",
      }),
      cancelEdit(row) {
        row = row.original
        row.edit = false
        this.$message({
          message: 'Cancel Edit',
          type: 'warning'
        })
      },
      onRowClick(row, column, event) {
        this.delayAction(1000).then((action) => {
          Promise.all([
            this.selectedFunc({ id: row.id, type: 'province' }),
            action(of(1, 2, 3))
          ]);
        });
      },
      onCollapseChangeHandler(activeNames) {
        console.log(activeNames);
      },
      onHeaderClick(column, event) {
        let prop = column.property;
        if (prop == undefined || prop == null || prop == '') {
          return;
        }
        this.groupBy({ key: prop, type: 'province' });
      },
      confirmEdit(row) {
        row.edit = false
        row = row.original
        this.updateStateProvince(row).then(x => {
          this.$message({
            message: 'Confirm Edit',
            type: 'success'
          })
        });
      }
    }
  }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
