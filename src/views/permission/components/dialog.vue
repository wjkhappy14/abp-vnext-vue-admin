<template>
  <div>
    <el-dialog title="使用微信/QQ/支付宝" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <social-sign />
    </el-dialog>
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
    <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
      使用微信/QQ/支付宝
    </el-button>
  </div>
</template>

<script>
  export default {
    computed: {
      roles() {
        return this.$store.getters.roles
      },
      switchRoles: {
        get() {
          return this.roles[0]
        },
        set(val) {
          this.$store.dispatch('user/changeRoles', val).then(() => {
            this.$emit('change')
          })
        }
      }
    }
  }
</script>
