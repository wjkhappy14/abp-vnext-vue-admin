<template>
  <div class="dashboard-container">
    <adminDashboard></adminDashboard>
  </div>
</template>

<script>
  import adminDashboard from './admin'
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
      
      })
    }
    ,
    created() {
    
    }
  }
</script>
