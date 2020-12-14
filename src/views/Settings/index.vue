<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="运行参数" name="directly">
        <div v-for='(item,index) in items'>
          <span>{{item.name}}</span>
          <el-input v-model="item.value" placeholder="Please input" style="width:400px;max-width:100%;" />
          <span>{{item.description}}</span>
          <el-button type="primary" icon="el-icon-document" @click="handleCopy(item.value,$event)">
            复制
          </el-button>
          <el-button type="primary" icon="el-icon-document" @click="updateItem($event)">
            保存
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="疵点设置" name="v-directive">
        <ul>
          <li v-for="(value,key,index) in categories">
            <div>
              <span>
                {{index}}-{{key}}
              </span>
              <ul>
                <li v-for="(item) in value">
                  <span>{{item.id}}</span>
                  <span>{{item.name}}</span>
                  <span>{{item.customerCode}}</span>
                  <span>{{item.isVisiable}}</span>
                  <span>{{item.zIndex}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="查询设置" name="grid">
        <el-table :data="grid.columns"
                  row-key="id"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;">
          <el-table-column type="index"
                           width="50">
          </el-table-column>
          <el-table-column type="selection"
                           width="50">
          </el-table-column>
          <el-table-column label="name"  width="200px" align="left">
            <template slot-scope="{row}">
              <span>{{ row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="source" width="200px" align="left">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleUpdate(row)">{{ row.source }}</span>
            </template>
          </el-table-column>
          <el-table-column label="text" width="150px" align="left">
            <template slot-scope="{row}">
              <span>{{ row.text }}</span>
            </template>
          </el-table-column>
          <el-table-column label="type" width="80px" align="left">
            <template slot-scope="{row}">
              <span style="color:red;">{{ row.type }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import clip from '@/utils/clipboard' // use clipboard directly
  import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'setting',
    directives: {
      clipboard
    },
    data() {
      return {
        activeName: 'directly',
        inputData: 'Hellow Kitty',
        item: {
          name: '',
          value: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        items: 'settings/appSettings/items',
        grid: 'settings/appSettings/grid',
        categories: 'settings/defect/categories',
      })
    },
    created() {
      this.getItems();
      this.getCategories();
      this.gridColumns();
    },
    methods: {
      ...mapActions({
        getItems: "settings/appSettings/getItems",
        updateItem: "settings/appSettings/updateItem",
        gridColumns: "settings/appSettings/gridColumns",
        getCategories: "settings/defect/getCategories"
      }),
      handleCopy(text, event) {
        clip(text, event)
      },
      clipboardSuccess() {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        })
      }
    }
  }
</script>

