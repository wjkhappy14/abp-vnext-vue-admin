<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'identity-init',
    created() {
      const hash = window.location.search.slice(1)
      this.getUsers();
      this.getRoles();
    },
    computed: {
      ...mapState(["docs/article/count"]),
      ...mapGetters({
        items: 'docs/article/items'
      })
    },
    methods: {
      ...mapMutations({

      }),
      ...mapActions({
        getUsers: "identity/user/getUsers",
        getRoles: "identity/role/getRoles",
      })
    },
    render: function (h) {
      return h() // avoid warning message
    }
  }</script>
