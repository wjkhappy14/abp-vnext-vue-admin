<template>
  <div class="components-container">
    <div class="editor-container">
      <dnd-list :list1="grid.columns" :list2="list2" list1-title="默认参数" list2-title="已选择项" />
    </div>
  </div>
</template>

<script>
  import DndList from '@/components/DndList'
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  export default {
    name: 'item-draggable',
    components: { DndList },
    data() {
      return {
        list2: []
      }
    },
    computed: {
      ...mapGetters({
        grid: 'settings/appSettings/grid'
      })
    },
    created() {
    },
    methods: {
    }
  }
</script>

