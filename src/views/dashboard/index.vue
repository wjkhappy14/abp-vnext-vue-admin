<template>
  <div class="dashboard-container">
    <adminDashboard></adminDashboard>
  </div>
</template>

<script>
  import adminDashboard from './admin'
  import { SocketAPI } from "@/utils/WsApi2";
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'Dashboard',
    components: { adminDashboard },
    data() {
      return {
      }
    },
    computed: {

    },
    methods: {
      ...mapActions({
        menus: "menu/routerMenu",
      })
    }
    ,
    created() {
   
      this.menus();
    }
  }
</script>
