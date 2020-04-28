<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="email" />
    </el-form-item>
    <el-form-item label="Token">
      <el-input type="textarea" style="height:400px;" :rows="10" v-model.trim="token"  />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {


      };
    },
    computed: {
      ...mapGetters([
        'id',
        'email',
        'avatar'
      ]),
      ...mapState({
        name: state => state.user.name,
        token: state => state.user.token
      })
    },
    methods: {
      submit() {
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })
      }
    }
  }
</script>
