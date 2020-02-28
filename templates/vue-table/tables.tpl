/** 
 * ***** 模板定义 ******
 * @name    tables
 * @description    <{root.group.model}>列表vue
 * @ext    vue
 * @targetPath    @projectRoot/src/view/heji/<{root.group.model}>/
 *
 * ***** 模板变量定义 ******
 */

<template>
  <div class="table_container">
    <!-- 简单查询 -->
      <Row class="simple">
        <Col span="8">
          <SimpleSearch
            :columns="columns"
            v-model="searchCondition"
            @dosearch='getList'
          ></SimpleSearch>
        </Col>
        <Col span="8">
          <a class="plus-search btn" href="javascript:void(0);" @click="togglePlusSearch">高级查询</a>
        </Col>
        <Col span="8" class="btn-group">
          <Button class="right" type="success" @click="doExport()">导出</Button>
          <Button class="right primary" type="primary" @click="showAddEntity()">新增</Button>
        </Col>
      </Row>
    <!-- 高级查询 -->
    <div class="search" v-if="plusSearch">
      <Row>
        <Col :xs="2" :sm="4" :md="6" :lg="8">
          <InputSearch
          title="原料名称"
          placeholder="请输入"
          v-model="searchCondition.name"
          ></InputSearch>
        </Col>
        <Col :xs="20" :sm="16" :md="12" :lg="8">
          <!-- <InputSearch
          title="条件2"
          placeholder="请输入"
          v-model="searchCondition.condition2"
          ></InputSearch> -->
        </Col>
        <Col :xs="2" :sm="4" :md="6" :lg="8">
          <!-- <InputSearch
          title="条件3"
          placeholder="请输入"
          v-model="searchCondition.condition3"
          ></InputSearch> -->
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="form-item search-btn-group">
            <Button class="form-btn" type="primary" @click="getList">搜索</Button>
            <Button class="form-btn" @click="resetPlusSearch">清空</Button>
          </div>
        </Col>
      </Row>
    </div>

    <!-- 表单 -->
    <div class="table">
      <Table
      :columns="columns"
      :data="data"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancle="onSelectAllCancel"
      @on-selection-change="onSelectionChange"
      >
        <template slot-scope="{ row, index }" slot="action">
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">查看</Button> -->
            <Button type="primary" size="small" style="margin-right: 5px" @click="showEditEntity(row)">编辑</Button>
            <Poptip
            confirm
            title="确认批量删除么"
            @on-ok="remove(row, index)"
            @on-cancel="batchdelcancel">
            <Button type="error" size="small">删除</Button>
          </Poptip>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
          <Poptip
            confirm
            title="确认批量删除么"
            @on-ok="batchdel"
            @on-cancel="batchdelcancel">
            <ButtonGroup size="small">
                <Button type="error">批量删除</Button>
            </ButtonGroup>
          </Poptip>
        <div class="right">
            <Page :total="page_total"
            :current="page_current"
            show-sizer
            @on-page-size-change="changePageSize"
            @on-change="changePage"></Page>
        </div>
      </div>
    </div>

    <!-- 新增 或 编辑-->
    <EntityCompo
    v-model="entity"
    :showable="entityShowable"
    @closeEntityCompo="closeEntityCompo"
    @refreshList="refreshList"
    ></EntityCompo>
  </div>
</template>

<script>
import api from '@/api/heji/<{root.group.model}>'
import SimpleSearch from '_c/table/search/simple-search'
import InputSearch from '_c/table/search/input-search'
import EntityCompo from './entity-compo'

export default {
  name: 'tables_page',
  components: {
    InputSearch,
    SimpleSearch,
    EntityCompo
  },
  data () {
    return {
      // 查询条件
      searchCondition: {
        // name: ''
      },
      // 是否显示高级查询
      plusSearch: false,
      // 字段
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        // {
        //   title: '名称',
        //   key: 'name',
        //   searchable: true // 在simple-search 组件中使用
        // },
        {
          title: '创建时间',
          key: 'createdTime',
          searchable: false
        },
        {
          title: '创建人',
          key: 'createdByName',
          searchable: false
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      // 数据
      data: [],
      // 分页数据
      page_total: 0,
      page_current: 1,
      page_size: 10,
      // 批量操作
      selectedIdList: [],
      // 实体对象, 新增，编辑时使用
      entity: {},
      entityShowable: false
    }
  },
  methods: {
    // 高级查询
    togglePlusSearch () {
      this.plusSearch = !this.plusSearch
    },
    // 重置高级查询
    resetPlusSearch () {
      this.searchCondition.name = ''
      this.getList()
    },
    // 接口方法
    getList () {
      api.list(this.searchCondition, this.page_current, this.page_size).then(res => {
        // console.log(res)
        this.data = res.data.data.content
        this.page_total = res.data.data.totalNumber
        this.page_current = res.data.data.pageNum
      }).catch(e => {
        console.log(e)
      })
    },
    refreshList () {
      this.getList()
    },
    // 删除
    remove (row, inex) {
      api.del(row.uuid).then(res => {
        this.$Message.success('删除成功')
        this.refreshList()
      }).catch(e => {
        console.log(e)
        this.$Message.error('删除失败')
      })
    },
    // 批量删除
    batchdelcancel () {
    },
    batchdel () {
      api.batchDel(this.selectedIdList).then(res => {
        console.log('res:', res)
        this.$Message.success('删除成功')
        this.getList()
      }).catch(e => {
        console.log(e)
        this.$Message.error('删除失败')
      })
    },
    // 导出
    doExport () {
      console.log('expor', api.exportUrl())
      // eslint-disable-next-line no-unused-expressions
      window.open(api.exportUrl(), '_blank').location
    },
    // page方法
    changePage (current) {
      this.page_current = current
      this.getList()
    },
    changePageSize (size) {
      this.page_size = size
      this.getList()
    },
    // 选择框方法
    onSelect (selection, row) {
      console.log('onSelect', selection, row)
    },
    onSelectCancel (selection, row) {
      console.log('onSelectCancel', selection, row)
    },
    onSelectAll (selection) {
      console.log('onSelectAll', selection)
    },
    onSelectAllCancel (selection) {
      console.log('onSelectAllCancel', selection)
    },
    // 只用这个就可以了
    onSelectionChange (selections) {
      console.log('onSelectionChange', selections)
      this.selectedIdList = []
      if (selections.length > 0) {
        selections.map(selection => {
          console.log('selection map', selection)
          this.selectedIdList.push(selection.uuid)
        })
      }
    },
    // 显示新增页面
    showAddEntity () {
      this.entityShowable = true
    },
    closeEntityCompo () {
      this.entityShowable = false
    },
    // 显示编辑
    showEditEntity (row) {
      this.entity = row
      this.entityShowable = true
    }
  },
  watch: {
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="less" type="text/less">
.simple {
  padding: 0 1rem;
}
.table_container {
  box-sizing: border-box;
  background-color: white;
  padding-top: 0.5rem;
}
.table_container .search {
  margin-bottom: 10px;
  border-radius: 4px;
}
.table {
  padding: 0.2rem 1.5rem;
  background-color: white;
  border-radius: 4px;
}
.ivu-table-wrapper {
  overflow: inherit;
  .ivu-poptip-popper {
    position: absolute;
    will-change: top, left;
    top: -8px;
    left: 1402px!important;
  }
  .ivu-poptip-popper[x-placement="top"] .ivu-poptip-arrow {
    left: 50%;
    margin-left: 36px;
  }
  .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
    left:25px;
  }
}

</style>
