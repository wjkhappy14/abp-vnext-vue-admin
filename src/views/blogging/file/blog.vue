<template>
  <div class="app-container documentation-container">
    <div class="tab-container">
      <el-tag>mounted times ：{{ createdTimes }}</el-tag>
      <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
        <el-tab-pane label="文章">
          <dropdown-menu :items="articles" style="float:left;margin-left:50px;" title="系列文章" />
        </el-tab-pane>
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <keep-alive>
            <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-table :data="blogs"
              border
              ref="Templates"
              @current-change="currentChangeHandler"
              tooltip-effect="light"
              highlight-current-row>
      <el-table-column prop="publisherName" align="center" label="选中" width="60">
        <template slot-scope="scope">
          <span class="radio" @change.native="radio=scope.$index">{{scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{scope.row.name||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="说明" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.description||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" align="center" label="Creation Time" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.creationTime||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publisherPhone" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTemplate(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteTemplate(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="viewDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import DropdownMenu from '@/components/Share/DropdownMenu'
  import tabPane from './components/TabPane'
  import { fetchList } from '@/api/blog'

export default {
  name: 'Documentation',
  components: { DropdownMenu,tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: 'China', key: 'CN' },
        { label: 'USA', key: 'US' },
        { label: 'Japan', key: 'JP' },
        { label: 'Eurozone', key: 'EU' }
      ],
      activeName: 'CN',
      createdTimes: 0,
      blogs:[],
      articles: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
      ]
    }
    },
    created() {
      const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
      this.queryBlogs();
    },
     watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
    methods: {
       showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
      currentChangeHandler() {

      },
      queryBlogs(page = 1) {
        fetchList()
          .then(res => {
            this.blogs = res.items;
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  .document-btn {
    margin-left: 50px;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    margin-bottom: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
    .tab-container {
    margin: 30px;
  }
</style>
