<template>
  <div class="app-container">
    <el-table :data="permission.items"
              border
              stripe
              row-key="id"
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
      <el-table-column prop="name" align="left" sortable label="租户" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.name||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Creation Time" width="180">
        <template slot-scope="scope">
          <time>{{ scope.row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</time>
        </template>
      </el-table-column>
      <el-table-column prop="publisherPhone" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTemplateRule(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteTemplateRule(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="handleRolesChange(scope.row)">用户</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import Dialog from './components/dialog'
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'Permission',
    data() {
      return {
        list: []
      }
    },
    components: { Dialog },
    computed: {
      ...mapGetters({
        permission: 'permission/permission'
      }),
      ...mapState({
        users: state => state
      })
    },
    created() {
      this.getPermissions();
    },
    methods: {
      ...mapActions({
        getPermissions: "permission/getPermissions"
      }),
      currentChangeHandler: function () {

      },
      handleRolesChange() {
        this.$router.push({ path: '/permission/user?' + +new Date() })
      }
    }
  }
</script>
