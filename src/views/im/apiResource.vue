<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="基本资料" name="first">
        <div>
          <upload-excel-component :on-success="uploadSuccessHandler" :before-upload="beforeUpload" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="登录账号" name="second">
        <el-select v-model="group" placeholder="群组" clearable style="width: 90px" class="filter-item">
          <el-option v-for="group in groups" :key="group.name" :label="group.name" :value="group.name" />
        </el-select>
        <el-checkbox v-model="isConnected" :border="false" label="已连接?"></el-checkbox>
        <el-select v-model="user" placeholder="用户" clearable style="width: 90px" class="filter-item">
          <el-option v-for="user in users" :key="user.connectionId" :label="user.name" :value="user.name" />
        </el-select>
        <el-input placeholder="收到的消息"
                  type="textarea"
                  v-model="log">
        </el-input>
        <el-input placeholder="输入消息"
                  type="text"
                  v-model="message">
        </el-input>
        <el-tag>{{name}}</el-tag>
        <el-tag>{{group}}</el-tag>
        <el-button @click="echo">Echo</el-button>
        <el-button @click="start">连接</el-button>
        <el-button @click="stop">断开</el-button>
        <el-button @click="broadcast">广播</el-button>
        <el-button @click="sendToOthers">发送给其他用户</el-button>
        <el-button @click="joinGroup">加入群组</el-button>
        <el-table :data="users" border highlight-current-row style="width:100%;margin-top:20px;">
          <el-table-column prop="name" label="name" width="180">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cmd" label="cmd" width="120">
            <template slot-scope="{row}">
              <span>{{ row.cmd }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="message" width="300">
            <template slot-scope="{row}">
              <span>{{ row.message }}</span>
            </template>
          </el-table-column>
          <el-table-column  align="left" label="connectionId" width="200">
            <template slot-scope="{row}">
              <span>{{ row.connectionId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="success"
                         size="small"
                         icon="el-icon-circle-check-outline"
                         @click="sendToGroup()">
                发送到群组
              </el-button>
              <el-button type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="sendToConnection(row.connectionId)">
                发送给此用户
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="账户安全" name="third">
        <div>
          <el-button @click="wsConnect">OK</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="登录日志" name="fourth">
        <div>

        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import UploadExcelComponent from '@/components/UploadExcel/index.vue'
  import * as signalR from "@aspnet/signalr";

  import { SocketAPI } from '@/utils/WsApi2'
  import store from '@/store'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'UploadExcel',
    components: { UploadExcelComponent },
    data() {
      return {
        connection: null,
        isConnected: false,
        activeName: '',
        group: 'Hello',
        hubUrl: 'http://119.23.207.130:5000/dynamic?name=',
        user: '',
        message: '你好',
        log: ''
      }
    },
    computed: {
      ...mapGetters([
        'id',
        'name',
        'avatar'
      ]),
      ...mapState({
        users: state => state.order.users,
        groups: state => state.order.groups
      })
    },
    mounted() {
      SocketAPI.on("login", token => {

      });
    },
    created() {

    },
    methods: {
      uploadSuccessHandler() {


      },
      invoke(connection, method) {
        var argsArray = Array.prototype.slice.call(arguments);
        connection.invoke.apply(connection, argsArray.slice(1))
          .then(function (result) {
            console.log("调用成功" + (result === null ? '(null)' : result));
            if (result) {
              console.log(result);
            }
          })
          .catch(function (err) {
            console.error(err);
          });
      },
      wsConnect() {
        store.dispatch('order/toggleDevice', 'mobile')
      },
      stop() {
        this.connection.stop()
          .then(() => {
            this.isConnected = false;
          });
      },
      start() {
        var url = this.hubUrl + this.name;
        console.log(url);
        var protocol = new signalR.JsonHubProtocol();
        var connectionBuilder = new signalR.HubConnectionBuilder()
          .configureLogging(signalR.LogLevel.Information)
          .withUrl(url)
          .withHubProtocol(protocol);

        this.connection = connectionBuilder.build();
        this.connection.onclose = this.closeHandler;
        this.connection.on("Echo", (name, message) => {
          const msg = name + " 说： " + message;
          console.log(msg);
        });

        this.connection.on("Send", data => {
          this.log = JSON.stringify(data);
          switch (data.cmd) {
            case "OnConnected":
              this.$store.dispatch('order/addItem', data)
              break
            case "OnDisconnected":
              break
            case "JoinGroup":
              break
            case "LeaveGroup":
              break
            case "SendToGroup":
              break
            case "SendToOthersInGroup":
              break
            case "SendToOthers":
              break
            case "SendToConnection":
              break
            default:
              console.log(data);
              break
          }
        });
        this.connection.start()
          .then(() => {
            this.isConnected = true;
          })
          .catch(err => {
            console.error(err);
          });
      },
      closeHandler(e) {

      },
      reconnectingHandler(e) {

      },
      reconnectedHandler(e) {

      },
      broadcast() {
        this.invoke(this.connection, 'Send', this.name, this.message);
      },
      joinGroup: function () {
        this.invoke(this.connection, 'JoinGroup', this.group, this.name);
      },
      leaveGroup: function () {
        this.invoke(this.connection, 'LeaveGroup', this.group, this.name);
      },
      sendToGroup: function () {
        this.invoke(this.connection, 'SendToGroup', this.group, this.name, this.message);
      },
      sendToOthersInGroup: function () {
        this.invoke(this.connection, 'SendToOthersInGroup', this.group, this.name, this.message);
      },
      sendToOthers: function () {
        this.invoke(this.connection, 'SendToOthers', this.name, this.group);
      },
      sendToConnection: function (id) {
        this.invoke(this.connection, 'SendToConnection', id, this.name, this.message);
      },
      echo: function () {
        this.invoke(this.connection, 'Echo', this.name, this.message);
      },
      addItemHandler: function () {

      },
      tabClickHandler() {

      },
      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1

        SocketAPI.request();

        if (isLt1M) {
          return true
        }

        this.$message({
          message: 'Please do not upload files larger than 1m in size.',
          type: 'warning'
        })
        return false
      },
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
      }
    }
  }
</script>
