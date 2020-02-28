/** 
 * ***** 模板定义 ******
 * @name    entity-compo
 * @description    <{root.group.model}>实体新增编辑vue
 * @ext    vue
 * @targetPath    @projectRoot/src/view/heji/<{root.group.model}>/
 *
 * ***** 模板变量定义 ******
 */

<template>
  <div>
    <Drawer :title="operationTitle"
    :closable="false"
    width="35%"
    v-model="myShowable">
      <Form ref="<{root.group.model}>FormRef" :label-width="80" :model="myEntity" :rules="ruleValidate">
            <Row :gutter="32">
                <Col span="24">
                    <FormItem label="原料名称" label-position="top" prop="name">
                        <Input v-model="myEntity.name" placeholder="请输入" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                  <FormItem label="原料含税价/KG" label-position="top" prop="priceKg">
                      <Input v-model="myEntity.priceKg" placeholder="请输入"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="原料不含税价/KG" label-position="top" prop="priceKgNotax">
                      <Input v-model="myEntity.priceKgNotax" placeholder="请输入"/>
                  </FormItem>
                </Col>
            </Row>
            <FormItem label="描述" label-position="top" prop="description">
                <Input type="textarea" v-model="myEntity.description" :rows="4" placeholder="请输入" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" type="primary" v-if="operation === 'create'" @click="doCreate">新增</Button>
            <Button style="margin-right: 8px" type="primary" v-if="operation === 'edit'" @click="doUpdate">更新</Button>
            <Button style="margin-right: 8px" @click="handleReset('materalFormRef')">重置</Button>
            <Button style="margin-left: 8px" @click="onFormCancle">取消</Button>
        </div>
    </Drawer>
  </div>
</template>
<script>
import api from '@/api/heji/<{root.group.model}>'
import StringUtil from '@/libs/string-util'

export default {
  name: 'EntityCompo',
  props: {
    // 查询条件
    showable: {
      type: [Boolean],
      default () {
        return false
      }
    },
    // 实体对象
    value: {
      type: [Object],
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      myShowable: false,
      // 当前操作
      operation: 'create',
      operationTitle: '新增',
      // 实体类
      myEntity: {
        // name: '',
        // priceKg: 0,
        // priceKgNotax: 0
      },
      // 验证类
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        priceKg: [
          { required: true, message: 'The priceKg cannot be empty', trigger: 'blur' },
          { type: 'string', pattern: /^(([1-9]\d{0,5})|0)(\.\d{0,2})?$/, message: '数量应为正浮点数且不超过999999.99', trigger: 'blur' }
        ],
        priceKgNotax: [
          { required: true, message: 'priceKgNotax cannot be empty', trigger: 'blur' },
          { type: 'string', pattern: /^(([1-9]\d{0,5})|0)(\.\d{0,2})?$/, message: '数量应为正浮点数且不超过999999.99', trigger: 'blur' }
        ],
        description: [
          { type: 'string', min: 1, message: 'description no less than 1 words', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.myShowable = this.showable
    console.log(this.value)
    this.myEntity = this.value
  },
  methods: {
    onFormCancle () {
      this.hide()
    },
    // 重置为初始状态
    reset () {
      this.myEntity = {
        // name: '',
        // priceKg: 0,
        // priceKgNotax: 0
      }
      this.$emit('input', this.myEntity)
    },
    doCreate () {
      this.$refs['materalFormRef'].validate((valid) => {
        if (valid) {
          api.add(this.myEntity).then(res => {
            console.log(res)
            this.$Message.success('新增成功!')
            this.handleReset('materalFormRef')
            this.$emit('refreshList')
          }).catch(e => {
            console.log(e)
            this.$Message.error('新增失败!')
          })
        }
      })
    },
    doUpdate () {
      this.$refs['materalFormRef'].validate((valid) => {
        if (valid) {
          api.edit(this.myEntity).then(res => {
            this.$Message.success('更新成功!')
            this.handleReset('materalFormRef')
            this.$emit('refreshList')
            this.hide()
          }).catch(e => {
            console.log(e)
            this.$Message.error('更新失败!')
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.reset()
    },
    hide () {
      this.myShowable = false
    }
  },
  watch: {
    showable (val) {
      if (val) {
        this.myShowable = true
      }
    },
    myShowable (val) {
      if (val === false) {
        this.$emit('closeEntityCompo', val)
      }
    },
    'value.uuid': function (val) {
      if (StringUtil.isNotBlank(val)) {
        this.operationTitle = '编辑'
        this.operation = 'edit'
        this.myEntity = this.value
      }
    }
  }
}
</script>
<style lang="less">

</style>
