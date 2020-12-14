<template>
  <section class="app-main">
    <transition name="fade-transform"
                mode="out-in"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-on:enter-cancelled="enterCancelled"
                v-on:before-leave="beforeLeave"
                v-on:leave="leave"
                v-on:after-leave="afterLeave"
                v-on:leave-cancelled="leaveCancelled">
      <keep-alive :include="cachedViews">
        <router-view :key="key">
        </router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    },
    mounted: function () {
       this.$nextTick(function () { })
    },
    updated: function () {
    },
    created: function () {
      //箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止
      const s = Symbol();
    },
    destroyed() {

    },
    methods: {
      beforeEnter(el) {
        el.style.opacity = 1;
      },
      enter(el, done) {
        var vm = this;
        done();
      },
      afterEnter(el) {

      },
      enterCancelled(el) {

      },
      beforeLeave(el) {

      },
      leave(el, done) {
        var vm = this;
        done();
      },
      afterLeave(el) {

      },
      leaveCancelled(el) {

      },
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main

  {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header

  {
    padding-right: 15px;
  }
  }
</style>
