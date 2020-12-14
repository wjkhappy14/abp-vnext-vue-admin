<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Settings</h3>
      <div class="drawer-item">
        <span>Theme</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>
  import ThemePicker from '@/components/ThemePicker'

  export default {
    components: { ThemePicker },
    data() {
      return {
      }
    },
    computed: {
      fixedHeader: {
        get() {
          return this.$store.state.app.settings.fixedHeader
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            key: 'fixedHeader',
            value: val
          })
        }
      },
      tagsView: {
        get() {
          return this.$store.state.app.settings.tagsView
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            key: 'tagsView',
            value: val
          })
        }
      },
      sidebarLogo: {
        get() {
          return this.$store.state.app.settings.sidebarLogo
        },
        set(val) {
          this.$store.dispatch('app/changeSetting', {
            key: 'sidebarLogo',
            value: val
          })
        }
      }
    },
    methods: {
      themeChange(val) {
        this.$store.dispatch('app/changeSetting', {
          key: 'theme',
          value: val
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    .drawer-title

  {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
  }
</style>
