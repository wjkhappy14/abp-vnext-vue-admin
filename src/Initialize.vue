<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'Initialize',
    created() {
      const hash = window.location.search.slice(1);
      // this.getCountries();
    },
    computed: {
      ...mapState(["blog/index/count"]),
      ...mapGetters({
        items: 'blog/index/items'
      })
    },
    methods: {
      ...mapMutations({

      }),
      ...mapActions({
        getCountries: "region/getCountries"
      })
    },
    render: function (h) {
      return h() // avoid warning message
    }
  }</script>
