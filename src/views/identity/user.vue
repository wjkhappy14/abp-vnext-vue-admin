<template>
  <div>
      <split-pane split="vertical" class="components-container">
      <template slot="paneL" class="left-container">
      <div class="filter-container">
      <el-input v-model="pagination.title" placeholder="Title" style="width: 300px;" class="filter-item" @keyup.enter.native="search" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="search">
        新建
      </el-button>
      <el-button :loading=true class="filter-item" type="primary" icon="el-icon-download" @click="search">
        导出
      </el-button>
    </div>
    <el-table :data="items"
              border
              fit
              style="width: 100%;"
              @row-click="itemSelected"
              tooltip-effect="light"
              highlight-current-row>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column type="selection"
                       width="50">
      </el-table-column>
      <el-table-column prop="name" align="center" label="选中" width="50">
        <template slot-scope="scope">
          <el-radio class="radio"
                    :label="scope.$index"
                    @change.native="radio2=scope.$index"
                    >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="left" label="账号" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.name||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" align="left" label="Email" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.email||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" align="left" label="手机号码" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNumber||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination 
    v-show="pagination.total>0" 
    :total="pagination.total" 
    :page.sync="pagination.SkipCount" 
    :limit.sync="pagination.MaxResultCount" 
    @pagination="getItems" />
      </template>
      <template slot="paneR" class="right-container">
         <el-form ref="user-form" :rules="rules" :model="selected" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="User Name" prop="userName">
          <el-input v-model="selected.userName" />
        </el-form-item>
       <el-form-item label="Roles" prop="role">
         <el-button type="button" size="small" @click="viewRoles(selected)">查看角色</el-button>
         <el-button type="button" size="small" @click="viewPermissions(selected)">查看权限</el-button>
        </el-form-item>
        <el-form-item label="Email" prop="email">
           <el-input v-model="selected.email" />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="selected.name" />
        </el-form-item>
           <el-form-item label="Phone Number" prop="phoneNumber">
          <el-input v-model="selected.phoneNumber" />
        </el-form-item>
        <el-form-item prop="emailConfirmed" align="left" label="是否邮件确认" width="60">
          <span>{{selected.emailConfirmed?'是':'否'}}</span>
        </el-form-item>
        <el-form-item prop="isDeleted" align="left" label="是否删除" width="60">
          <span>{{selected.isDeleted?'是':'否'}}</span>
        </el-form-item>
        <el-form-item prop="phoneNumberConfirmed" align="left" label="是否电话验证" width="60">
          <span>{{selected.phoneNumberConfirmed?'是':'否'}}</span>
        </el-form-item>
        <el-form-item label="Is Active">
          <span>{{selected.isActive?'是':'否'}}</span>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="selected.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="selected.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      <el-form-item prop="creationTime" align="left" label="Creation Time" width="120">
          <time>{{ selected.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</time>
      </el-form-item>
      <el-form-item>
         <el-button type="button" size="small" @click="updateItem(selected)">保存</el-button>
      </el-form-item>
      </el-form>
      </template>
  </split-pane>
  <el-dialog title="查看权限" :visible="permission.visible" @close="changeVisible(false)">
      <el-form ref="permission-form"  :model="selected" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label=selected.email prop="permissions">
          <ul  v-for="group in permission.groups" :key="group.name" >
            <li>
              {{group.name}}
              <ul  v-for="permission in group.permissions" :key="permission.name" >
            <li>
              <el-checkbox v-model="permission.isGranted">{{permission.name}}</el-checkbox>
            </li>
          </ul> 
            </li>
          </ul> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisible(false)">取 消</el-button>
        <el-button type="primary"  @click="setPermissions()">保存</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import SplitPane from 'vue-splitpane'
  import Pagination from '@/components/Pagination'
  export default {
    name: 'identity-grid',
    components: {
      Pagination,
      SplitPane
    },
    directives: { permission },
    data() {
      return {
        key: 1, // 为了能每次切换权限的时候重新初始化指令,
        rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      }
    },
    computed: {
      ...mapState({
        items: state => state.identity.user.items,
        permission: state => state.permission,
        roles: state => state.identity.user.roles,
        pagination: state => state.identity.user.pagination,
        editable: state => state.identity.user.editable,
        selected:state => state.identity.user.selected,
      }),
      ...mapGetters({
      count: "identity/user/count"
    })
    },
    created() {
      this.getItems();
    },
    methods: {
      ...mapActions({
        getItems: "identity/user/getItems",
        itemClick: "identity/user/itemClick",
        addItem: "identity/user/addItem",
        updateItem: "identity/user/updateItem",
        deleteItem: "identity/user/deleteItem",
        setPermissions:"permission/setPermissions",
        viewPermissions:"identity/user/viewPermissions",
      }),
      ...mapMutations({
      itemSelected: "identity/user/itemSelected",
      isEditable:"identity/user/isEditable",
      changeVisible:"permission/changeVisible"
    }),
      close: function (evt) {


      },
      search:function(){


      },
      viewRoles:(evt)=>{


      },
      checkPermission,
      handleRolesChange() {
        this.key++
      }
    }
  }
</script>

<style lang="scss" scoped>
 .components-container {
    position: relative;
    height: 100vh;
  }
   .left-container {
    background-color: #F38181;
     width: 100%;
  }
  .right-container {
    background-color: #FCE38A;
     width: 30%;
  }
</style>


