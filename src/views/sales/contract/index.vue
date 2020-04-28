<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="groups">
        <groups />
      </el-tab-pane>
      <el-tab-pane label="channels">
        <channels />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import groups from './components/groups'
  import channels from './components/channels'

  export default {
    name: 'DynamicTable',
    components: { groups, channels }
  }
</script>

