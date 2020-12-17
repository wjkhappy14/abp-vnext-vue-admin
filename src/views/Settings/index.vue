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
      <el-tab-pane label="Transition">
        <button @click="shuffle">
          Shuffle
        </button>
        <a href="https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-list-move-transitions?file=/style.css:0-403">list-move-transitions</a>
        <transition-group name="cell" tag="div" class="container">
          <div v-for="cell in cells" :key="cell.id" class="cell">
            {{ cell.number }}
          </div>
        </transition-group>
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import clip from '@/utils/clipboard' // use clipboard directly
  import { shuffle } from "lodash";
  import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'setting',
    directives: {
      clipboard
    },
    data() {
      return {
        cells: Array.apply(null, { length: 81 }).map(function (_, index) {
          return {
            id: index,
            number: (index % 9) + 1
          };
        }),
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
      // this.getItems();
      // this.getCategories();
      // this.gridColumns();
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
      shuffle: function () {
        this.cells = shuffle(this.cells);
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

<style type="text/css">
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 238px;
    margin-top: 10px;
  }

  .cell {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid #aaa;
    margin-right: -1px;
    margin-bottom: -1px;
  }

    .cell:nth-child(3n) {
      margin-right: 0;
    }

    .cell:nth-child(27n) {
      margin-bottom: 0;
    }

  .cell-move {
    transition: transform 1s;
  }
</style>

