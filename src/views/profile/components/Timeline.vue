<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/4/20',
          title: '注册账号',
          content: ' committed 2019/4/20 20:46'
        },
        {
          timestamp: '2019/4/21',
          title: '登录系统',
          content: ' committed 2019/4/21 20:46'
        },
        {
          timestamp: '2019/4/22',
          title: '授权',
          content: ' committed 2019/4/22 20:46'
        },
        {
          timestamp: '2019/4/23',
          title: '升级为管理员',
          content: ' committed 2019/4/23 20:46'
        }
      ]
    }
  }
}
</script>
