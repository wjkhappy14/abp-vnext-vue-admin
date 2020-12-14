<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="addRoleHandler">新建角色</el-button>
    <el-button type="primary" icon="el-icon-delete" @click="deleteRoleHandler">批量删除</el-button>
    <el-table :data="roles"
              row-key="id"
              element-loading-text="加载中..."
              style="width: 100%;margin-top:30px;" border>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column type="selection"
                       width="50">
      </el-table-column>
      <el-table-column align="left" label="Name" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
          <el-tag v-if="scope.row.isDefault" color="green" size="small">默认</el-tag>
          <el-tag v-if="scope.row.isPublic" color="pink" size="small">公开</el-tag>
          <el-tag v-if="scope.row.isStatic" color="blue" size="small">静态</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">管理权限</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改角色':'创建角色'">
      <div>
        <el-tree :data="permissions"
                 show-checkbox
                 node-key="name"
                 accordion
                 ref="tree"
                 :props="props">
        </el-tree>
      </div>

      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="updateRoleHandler">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { deepClone } from '@/utils'
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

  export default {
    data() {
      return {
        props: {
          label: 'displayName',
          disabled: 'isGranted',
          children: 'permissions'
        },
        permissions: [],
        form: {},
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false
      }
    },
    computed: {
      routesData() {
        return this.routes
      },
      //...mapState(["identity/role/token"]),
      ...mapGetters({
        roles: 'identity/role/roles'
      })

    },
    created() {
    
      this.getRoles();
    },
    methods: {
      ...mapActions({
        
        getRoles: "identity/role/getRoles",
        deleteRole: "identity/role/deleteRole",
        addRole: "identity/role/addRole",
        updateRole: "identity/role/updateRole",
        getPermissions: "identity/grant/getPermissions",
      }),
      ...mapMutations({
        toggleUserFlag: "role/toggleUserFlag"
      }),

      addRoleHandler() {
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      deleteRoleHandler() {

      },
      handleEdit(row) {
        this.getPermissions({
          providerName: "R",
          providerKey: 'admin'
        }).then(result => {
          this.permissions = result.groups;
        });
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.checkStrictly = true
        this.form = row;
        this.role = deepClone(row)
        this.$nextTick(() => {
          this.checkStrictly = false
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('Confirm to remove the role?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(async () => {
            await this.deleteRole(row.key)
            this.rolesList.splice($index, 1)
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async updateRoleHandler() {
        var checkedNodes = this.$refs.tree.getCheckedNodes();
        debugger;
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          await this.updateRole(this.form)
        } else {
          await this.addRole(this.role)
        }

        const { description, key, name } = this.role
        this.dialogVisible = false
        this.$notify({
          title: '操作成功',
          dangerouslyUseHTMLString: true,
          message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
          type: 'success'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .app-container {
    .roles-table

  {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
  }
</style>
