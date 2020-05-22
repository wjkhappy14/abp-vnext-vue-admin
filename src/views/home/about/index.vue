<template>
  <div class="columns">
    <div class="column">
      <h1>关于我们</h1>
    </div>
    <div class="column">
      <h1>1</h1>
    </div>
    <div class="column">
      <h1>2</h1>
    </div>
    <div class="column">
      <h1>3</h1>
    </div>
  </div>

</template>

<script>
  import groups from './components/groups'
  import channels from './components/channels'

  export default {
    name: 'DynamicTable',
    components: { groups, channels }
  }
</script>

