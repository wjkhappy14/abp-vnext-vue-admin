<template>
  <div class="app-container">
    <el-table :data="users"
              border
              ref="Options"
              row-key="id"
              element-loading-text="加载中..."
              @current-change="currentChangeHandler"
              tooltip-effect="light"
              highlight-current-row>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column type="selection"
                       width="50">
      </el-table-column>
      <el-table-column prop="name" align="center" label="选中" width="60">

        <template slot-scope="scope">
          <el-radio 　class="radio"
                    　:label="scope.$index"
                    　@change.native="radio2=scope.$index"
                    　>&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="fullName" align="left" label="全名" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.fullName||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="left" label="称呼" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.title||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" align="left" label="电话" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNumber||'--'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="faxNumber" align="left" label="传真" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.faxNumber||'--'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="emailAddress" align="left" label="Email" width="240">
        <template slot-scope="scope">
          <span>{{scope.row.emailAddress||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" align="center" label="创建时间" width="180">
        <template slot-scope="scope">
          <time>{{ scope.row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</time>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
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
            this.users = res.items;
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


