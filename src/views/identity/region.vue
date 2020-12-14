<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="All" name="All" value="All">
        <Country :items="country.items"></Country>
      </el-tab-pane>
      <el-tab-pane :label="continent" :name="continent" :key="continent" v-for="(continent, i) in country.continents">
        <Country :items="items"></Country>
      </el-tab-pane>
      <el-tab-pane  label="Chart" name="Chart" value="Chart">
        <Population></Population>
      </el-tab-pane>
    </el-tabs>
    <DetailDialog></DetailDialog>
    <el-tooltip placement="top" content="Back To Top">
      <back-to-top :custom-style="BackToTop" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import Country from './components/Country'
  import BackToTop from '@/components/BackToTop'
  import DetailDialog from './components/DetailDialog'
  import Population from './components/Population'
  export default {
    name: 'region',
    components: {
      Country,
      DetailDialog,
      BackToTop,
      Population
    },
    data() {
      return {
        activeName: 'All',
        items: [],
        BackToTop: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // Please keep consistent with height to center vertically
          background: '#e7eaf1'//The background color of the button
        }

      }
    },
    computed: {
      ...mapGetters({
        country: 'region/country'
      }),
      ...mapState({
        users: state => state
      })
    },
    mounted() {

    },
    beforeRouteEnter(to, from, next) {
      next();
    },
    created() {
      this.getCountries().then(() => {
        this.$message({
          message: '加载成功.',
          type: 'warning'
        })
      });
    },
    methods: {
      ...mapMutations({
        groupByContinent: "region/groupByContinent",
      }),
      ...mapActions({
        getCountries: "region/getCountries",
        delay: "region/delay"
      }),
      uploadSuccessHandler() {
      },
      tabClickHandler(evt) {
        this.items = this.country.groups[evt.name];
      },
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
      }
    }
  }
</script>
