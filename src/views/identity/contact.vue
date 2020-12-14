<template>
  <div class="app-container">
    <el-table :data="users"
              border
              ref="Options"
              height="850"
              row-key="id"
              element-loading-text="Loading..."
              @current-change="currentChangeHandler"
              tooltip-effect="light"
              highlight-current-row>
      <el-table-column type="index"
                       width="40">
      </el-table-column>
      <el-table-column type="selection"
                       width="45">
      </el-table-column>
      <el-table-column prop="fullName" align="left" label="More..." width="80" type="expand">
        <template slot-scope="props">
          <el-radio 　class="radio"
                    　:label="props.row.fullName||'--'"
                    　@change.native="radio2=props.$index"
                    　>
          </el-radio>
          <ul>
            <li v-for="(address,index) in props.row.address">
              <i>{{index}}</i>
              <span>{{address.name}}</span>
              <div v-if="address.addressType===1">
                <i>Family</i>
              </div>
              <div v-else-if="address.addressType===2">
                <i>Office</i>
              </div>
              <div v-else>
                <i>Unknown</i>
              </div>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="left" label="Name" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.name||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="left" label="Title" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.title||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="languages" align="left" label="Languages" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.languages||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" align="left" label="Phone Number" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNumber||'--'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="faxNumber" align="left" label="Fax Number" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.faxNumber||'--'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="emailAddress" align="left" label="Email" width="240">
        <template slot-scope="scope">
          <span>{{scope.row.email||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isBlocked" align="center" label="Blocked" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.isBlocked">
            <i>Yes</i>
          </div>
          <div v-else>
            <i>No</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gender" align="center" label="Gender" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.gender">
            <i>Female</i>
          </div>
          <div v-else>
            <i>Male</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" align="center" label="Birthday" width="120">
        <template slot-scope="scope">
          <time>{{ scope.row.birthday | parseTime('{y}-{m}-{d}') }}</time>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="200">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search"
                    size="mini"
                    placeholder="keyword" />
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">Edit</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import { fetchList } from '@/api/contact'

  export default {
    name: 'DirectivePermission',
    components: {

    },
    directives: { permission },
    data() {
      return {
        users: [],
        search: '',
        key: 1 // 为了能每次切换权限的时候重新初始化指令
      }
    },
    created() {
      this.queryUsers();
    },
    methods: {
      deleteItem: function (item) {


      },
      editItem: function (item) {

      },
      currentChangeHandler: function () {


      },
      queryUsers(page = 1) {
        fetchList()
          .then(res => {
            this.users = res;
          });
      },
      checkPermission,
      handleRolesChange() {
        this.key++
      }
    }
  }
</script>

<style lang="scss" scoped>

  .app-container {
    /deep/ .permission-alert

  {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }

  /deep/ .permission-sourceCode {
    margin-left: 15px;
  }

  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
  }
</style>


