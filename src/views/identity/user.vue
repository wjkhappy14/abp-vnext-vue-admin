<template>
  <div class="app-container">

    <el-table :data="users"
              border
              ref="Options"
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
      <el-table-column prop="name" align="left" label="登录账号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.name||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" align="left" label="email" width="240">
        <template slot-scope="scope">
          <span>{{scope.row.email||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" align="left" label="手机号码" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNumber||'--'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="emailConfirmed" align="left" label="邮件确认" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.emailConfirmed||'--'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="creationTime" align="center" label="Creation Time" width="180">
        <template slot-scope="scope">
          <time>{{ scope.row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</time>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="editItem(scope.row)">权限</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'DirectivePermission',
    components: {

    },
    directives: { permission },
    data() {
      return {
        key: 1 // 为了能每次切换权限的时候重新初始化指令
      }
    },
    computed: {
      ...mapState({
        users: state => state.identity.user.items
      })
    },
    created() {
      this.getUsers();
    },
    methods: {
      ...mapActions({
        addUser: "identity/user/addUser",
        getUsers: "identity/user/getUsers"
      }),
      deleteItem: function (item) {


      },
      editItem: function (item) {

      },
      currentChangeHandler: function () {


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


