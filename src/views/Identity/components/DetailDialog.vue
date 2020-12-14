<template>
  <el-dialog v-el-drag-dialog :visible.sync="visible" title="item.chineseName"
             :destroy-on-close=true
             :close-on-click-modal=false
             :close-on-press-escape=false
             @dragDialog="handleDrag" :before-close="beforeCloseHandler" width="40%" center>
    <div>
      <h1>{{now}}</h1>
    </div>
  </el-dialog>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
  import { fromEvent, interval } from 'rxjs';
  import { debounce } from 'rxjs/operators';
  import busVue from "@/utils/bus";
  import { date } from 'jszip/lib/defaults';
  export default {
    name: 'DragDialog',
    data() {
      return {
        visible: true,
        now: new Date(),
        item: {
          chineseName: 'hello'
        }
      };
    },
    directives: { elDragDialog },
    created() {
      busVue.$on("OpenDialog", function (option) {
        this.visible = true;
        this.item = option.item;
        this.visible = option.show;
      });
      setInterval(() => {
        this.now = new Date();
      }, 1000);
    },
    methods: {
      beforeCloseHandler(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.visible = false;
            done();
          })
          .catch(_ => { });
      },
      handleDrag($event) {
        const clicks = fromEvent(this.$el, 'click');
        const result = clicks.pipe(debounce(() => interval(5000)));
        result.subscribe(x => {
          console.log(x);
        });
      }
    }
  }
</script>
