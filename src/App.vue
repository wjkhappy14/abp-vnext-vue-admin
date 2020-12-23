<template>
  <div id="app">
    <transition>
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>
  import stencil from 'stencil'
  import { map, filter, debounce } from "rxjs/operators";
  import { fromEvent, interval } from 'rxjs';
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'App',
    data() {
      return {
        style: document.body.style,
        route: this.$route
      };
    },
    created() {
      document.addEventListener('visibilitychange', this.onVisibilitychangeHandler)
      const clicks = fromEvent(document, 'click');
      const result = clicks.pipe(debounce(() => interval(1000)));
      result.subscribe(x => console.log(x));
    },
    computed: {
      isComponent() {
        return /^component-/.test(this.$route.name || '')
      },
    },
    watch: {
      '$route.path'() {
        this.$nextTick(() => {

        })
      },
    },
    mounted() {
      const href = location.href;
      console.log(href);
    },
    methods: {
      ...mapActions({

      }),
      onVisibilitychangeHandler() {
        this.$store.dispatch('app/onVisibilitychange', {}).then(() => {
          setTimeout(() => {
            this.$confirm('Visibilitychange ？', '提示')
              .then(() => {

              })
              .catch((err) => {
                console.error(err);
              })
          }, 0)
        });
      }
    }
  }
</script>
