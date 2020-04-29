<template>
  <div class="app-container">
    <div slot="header">
      <router-link to="/news">ABP</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/login">登录</router-link>
    </div>
    <h1 style="text-align:center">Hello ABP VNext</h1>
    <div class="box-item">
      <span class="field-label">切换主题 </span>
      <el-switch v-model="theme" />

    </div>
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
    <div class="block">
      <el-button type="primary" icon="el-icon-edit" />
      <el-button type="primary" icon="el-icon-delete" />
      <el-button type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button type="primary">
        Upload
        <i class="el-icon-upload el-icon-right" />
      </el-button>
    </div>

    <div class="block">
      <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
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
  import '@/assets/custom-theme/index.css' // the theme changed version element-ui css
  export default {
    name: 'home',
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      next(vm => {


      });
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      next();
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      next();
    },
    data() {
      return {
        theme: false,
        tags: [
          { name: 'Tag One', type: '' },
          { name: 'Tag Two', type: 'info' },
          { name: 'Tag Three', type: 'success' },
          { name: 'Tag Four', type: 'warning' },
          { name: 'Tag Five', type: 'danger' }
        ],
        slideValue: 50,
        radio: 3
      }
    },
    beforeCreate: () => {

    },
    created: () => {

    },
    beforeMount: () => {


    },
    mounted: () => {


    },
    beforeUpdate: () => {

    },
    updated: () => {


    },
    beforeDestroy: () => {

    },
    destroyed: () => {


    },
    activated: () => {

    },
    deactivated: () => {


    },
    errorCaptured: () => {


    },
    serverPrefetch: () => {


    },
    watch: {
      theme() {
        toggleClass(document.body, 'custom-theme')
      },
      '$route'(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length
      }
    }
  }
</script>

<style scoped>

  .field-label {
    vertical-align: middle;
  }

  .box-card {
    width: 400px;
    max-width: 100%;
    margin: 20px auto;
  }

  .block {
    padding: 30px 24px;
  }

  .tag-item {
    margin-right: 15px;
  }
</style>
