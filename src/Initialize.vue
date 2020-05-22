<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'Initialize',
    created() {
      const hash = window.location.search.slice(1);
      this.getItems({
        range: []
      });
    },
    computed: {
      ...mapState(["blogging/blog/count"]),
      ...mapGetters({
        items: 'blogging/blog/items'
      })
    },
    methods: {
      ...mapMutations({

      }),
      ...mapActions({
        getItems: "blogging/blog/getItems"
      })
    },
    render: function (h) {
      return h() // avoid warning message
    }
  }</script>
