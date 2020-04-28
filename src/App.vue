<template>
  <div id="app">
    <router-view />
    <InitializeVue></InitializeVue>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import InitializeVue from './Initialize.vue';
  export default {
    name: 'App',
    components: {
      InitializeVue
    },
    created() {
      console.log(stencil);
    },
    methods: {
      ...mapActions({

      })
    }
  }
</script>
