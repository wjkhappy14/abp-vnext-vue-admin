<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="IdentityServer Options">
        <IdentityServerOptions />
      </el-tab-pane>
      <el-tab-pane label="KestrelServer Options">
        <KestrelServerOptions />
      </el-tab-pane>
      <el-tab-pane label="Mvc Options">
        <MvcOptions />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import IdentityServerOptions from './components/IdentityServerOptions'
  import KestrelServerOptions from './components/KestrelServerOptions'
  import MvcOptions from './components/MvcOptions'

  export default {
    name: 'Options',
    components: { IdentityServerOptions, KestrelServerOptions, MvcOptions }
  }
</script>

