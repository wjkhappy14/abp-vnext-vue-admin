<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="输入文件名" style="width:300px;" prefix-icon="el-icon-document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px;" type="primary" icon="el-icon-document" @click="handleDownload">
      <span>导出Excel</span>
    </el-button>
    <el-button type="primary" icon="el-icon-plus" @click="addDeviceHandler">添加设备</el-button>
    <el-table v-loading="listLoading" :data="list" height="1250" element-loading-text="加载中" stripe border fit highlight-current-row>
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="客户名称">
              <span>{{ props.row.customer.name }}</span>
            </el-form-item>
            <el-form-item label="客户电话">
              <span>{{ props.row.customer.phoneNumber }}</span>
            </el-form-item>
            <el-form-item label="客户ID">
              <span>{{ props.row.customer.id }}</span>
            </el-form-item>
            <el-form-item label="客户网址">
              <span>{{ props.row.customer.websiteURL }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="系统编号" prop="id" width="95">
      </el-table-column>
      <el-table-column label="设备名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="设备代码" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近修改时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.lastModificationTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="售卖日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.creationTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="客户名称" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.customer.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="合同编号" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.contract.no }}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="创建人" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.creator.fullName}}/<b>{{ scope.row.creator.title}}</b></span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="最近修改人" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.customer.name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchList, create } from '@/api/sales/device'

  export default {
    name: 'device',
    data() {
      return {
        list: null,
        listLoading: true,
        downloadLoading: false,
        filename: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        fetchList().then(result => {
          this.list = result.items;
          this.listLoading = false
        })

      },
      addDeviceHandler: function () {
        create({
          comment: 'abc'
        }).then(x => {
          debugger;
        });
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/utils/Export2Zip').then(zip => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>


<style>
  .table-expand {
    font-size: 0;
  }

    .table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
</style>
