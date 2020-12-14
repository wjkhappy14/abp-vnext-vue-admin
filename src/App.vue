<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import stencil from 'stencil'

  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'App',
    created() {
      console.log(stencil);
      document.addEventListener('visibilitychange', this.onVisibilitychangeHandler)
    },
    methods: {
      ...mapActions({

      }),
      onVisibilitychangeHandler() {
        this.$store.dispatch('app/onVisibilitychange', {}).then(() => {


        });
      }
    }
  }
</script>
