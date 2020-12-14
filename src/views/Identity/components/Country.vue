<template>
  <div>
    <el-autocomplete v-model="name"
                     :fetch-suggestions="autocompleteHandler"
                     placeholder="input  name "
                     :trigger-on-focus="false"
                     @select="selectHandler">
      <template v-slot="{ item }">
        <span>{{country.autocomplete.count}}</span>
      </template>
    </el-autocomplete>
    <el-button type="primary" @click="onFind">Find</el-button>
    <el-table :data="items" border highlight-current-row style="width:100%;margin-top:20px;" @row-click="onRowClick">
      <el-table-column prop="name" align="left" label="Name" width="180">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="chineseName" label="Chinese Name" width="180">
        <template slot-scope="{row}">
          <span>{{ row.chineseName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="capital" sortable  label="Capital" width="180">
        <template slot-scope="{row}">
          <span>{{ row.capital }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  prop="region" sortable label="Region" width="80">
        <template slot-scope="{row}">
          <span>{{ row.region }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="Subregion" width="150">
        <template slot-scope="{row}">
          <span>{{ row.subregion }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left"  prop="phoneCode" sortable label="PhoneCode" width="120">
        <template slot-scope="{row}">
          <span>{{ row.phoneCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="FormalName" width="180">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" :content="row.formalName" placement="top-start">
            <span>{{ row.formalName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Currency" width="100">
        <template slot-scope="{row}">
          <span>{{ row.currency }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="population" sortable label="Population" width="100">
        <template slot-scope="{row}">
          <span>{{ row.population }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="National Flag"  width="120">
        <template slot-scope="{row}">
          <img :src="row.nationalFlagUrl" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions">
        <template slot-scope="{row}">
          <el-button type="success"
                     size="small"
                     icon="el-icon-circle-check-outline"
                     @click="viewItem(row)">
            Edit
          </el-button>
          <el-button type="primary"
                     size="small"
                     icon="el-icon-edit"
                     @click="onRowClick(row)">
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible"
               :title="item.name"
               :destroy-on-close=true
               :close-on-click-modal=false
               :close-on-press-escape=false>
      <el-form :model="item">
        <el-form-item v-for="(vulue, key) in item" :key="key" label-width="25" :label="key">
          <el-input v-model="item[key]" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false;updateCountry(item)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
  import { throttleTime } from 'rxjs/operators';
  import { fromEvent, asyncScheduler } from 'rxjs';
  import busVue from "@/utils/bus";

  export default {
    name: 'Country',
    components: {
    },
    data() {
      return {
        visible: false,
        item: {},
        name: ''
      }
    },
    props: {
      items: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapGetters({
        country: 'region/country',
        autocompleteFunc: "region/autocompleteFunc",
        findFunc: "region/findFunc"
      }),
      ...mapState({
        state: state => state
      })
    },
    mounted() {

    },
    created() {
    },
    methods: {
      ...mapMutations({
        groupBy: "region/groupBy",
      }),
      ...mapActions({
        updateCountry: "region/updateCountry"
      }),
      uploadSuccessHandler() {
      },
      viewItem(item) {
        this.visible = !this.visible;
      },
      updateItem() {

      },
      autocompleteHandler() {
        const click = fromEvent(document, 'click');
        const throttleConfig = {
          leading: false,
          trailing: true
        }
        const result = click.pipe(throttleTime(2000, asyncScheduler, throttleConfig));
        result.subscribe(x =>
          this.autocompleteFunc({
            name: this.name
          })
        );
      },
      onRowClick(row) {
        this.item = row;
        busVue.$emit("OpenDialog", { show: true, item: this.item });
      },
      onFind() {
        this.findFunc(
          {
            name: this.name
          });
      },
      selectHandler() {

      },
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
      }
    }
  }
</script>
