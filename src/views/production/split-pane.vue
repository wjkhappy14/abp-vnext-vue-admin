<template>
  <div class="components-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container">
          <h2>Hello</h2>
        </div>
      </template>
      <template slot="paneR">
        <div>
          <h2>Hello</h2>
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane'

  export default {
    name: 'splitPane',
    components: { splitPane },
    methods: {
      resize() {
        console.log('resize')
      }
    }
  }
</script>

<style scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>
