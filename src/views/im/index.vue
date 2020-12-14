<template>
  <div class="app-container">
    <span>Connection State:{{connection.connectionState}}</span>
    <el-card class="box-card">
      <div slot="header">
        <a class="link-type link-title">
          IM
        </a>
      </div>
      <div>
        <span class="field-label">离线/上线 : </span>
        <el-switch v-model="theme" />
        <aside style="margin-top:15px;">
          <textarea>{{log}}</textarea>
          <el-table v-loading="loading"
                    :data="clients"
                    border
                    fit
                    highlight-current-row
                    style="width: 60%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column :label="item.text"
                             :key="item.name"
                             :prop="item.name" v-for='(item,index) in columns' align="center">
            </el-table-column>
          </el-table>
        </aside>
      </div>
    </el-card>

    <div class="block">
      <el-button type="primary" @click.native.prevent="getToken">
        getToken
      </el-button>
      <el-button type="success" @click.native.prevent="invoke">
        Invoke
      </el-button>
      <el-button type="info" @click.native.prevent="start">
        连接
      </el-button>
      <el-button type="warning" @click.native.prevent="login" icon="el-icon-search">
        Login
      </el-button>
      <el-button type="danger" @click.native.prevent="streamSubscribe">
        streamSubscribe
      </el-button>
    </div>

    <div class="block">
      <el-button type="primary">
        Search
      </el-button>
      <el-button type="primary">
        Upload
        <i class="el-icon-upload el-icon-right" />
      </el-button>
    </div>

    <div class="block">
      <el-tag v-for="tag in columns" :key="tag.type" :type="tag.type" class="tag-item">
        {{ tag.name }}
      </el-tag>
    </div>

    <div class="block">
      <el-radio-group v-model="radio">
        <el-radio :label="3">
          Option A
        </el-radio>
        <el-radio :label="6">
          Option B
        </el-radio>
        <el-radio :label="9">
          Option C
        </el-radio>
      </el-radio-group>
    </div>

    <div class="block">
      <el-slider v-model="slideValue" />
    </div>
  </div>
</template>

<script>
  import { toggleClass } from '@/utils'
  import { SocketAPI } from "@/utils/WsApi2";
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import '@/assets/custom-theme/index.css' // the theme changed version element-ui css
  export default {
    name: 'im',
    data() {
      return {
        theme: false,
        loading: false,
        columns: [
          { name: 'One', text: '名称', type: 'info' },
          { name: 'Three', text: 'Three', type: 'success' },
          { name: 'Four', text: 'Four', type: 'warning' },
          { name: 'Five', text: 'Five', type: 'danger' }
        ],
        slideValue: 50,
        radio: 3
      }
    },
    created() {
      this.start();
    },
    watch: {
      theme() {
        toggleClass(document.body, 'custom-theme')
      }
    },
    computed: {
      searchOptions: {
        get() {
          return this.$store.state.sale.report.search;
        },
        set(val) {
          console.info(val);
        }
      },
      routesData() {
        return this.routes
      },
      ...mapState(
        {
          defects: "im/clients"
        }),
      ...mapGetters({
        queryItems: 'im/select',
        group: 'im/group',
        clients: 'im/clients',
        log: 'im/log',
        connection: 'im/connection'
      })
    },
    methods: {
      ...mapActions({
        getToken: "im/getToken",
        start: "im/start",
        login: "im/login",
        streamSubscribe: "im/streamSubscribe",
        invoke: "im/invoke",
      })
    }
  }
</script>

<style scoped>
  .field-label {
    vertical-align: middle;
  }

  .box-card {
    width: 600px;
    max-width: 100%;
    margin: 10px auto;
  }

  .block {
    padding: 10px 4px;
  }

  .tag-item {
    margin-right: 15px;
  }
</style>
