<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'Initialize',
    created() {
      const hash = window.location.search.slice(1)
      if (window.localStorage) {
        window.localStorage.setItem('oauth-code', hash)
      }
    },
    render: function (h) {
      return h() // avoid warning message
    }
  }</script>
