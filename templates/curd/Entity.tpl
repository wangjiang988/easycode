/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>Entity
 * @description    <{root.group.model}>实体类
 * @ext    java
 * @targetPath    @projectRoot/platform-domain/src/main/java/com/heji/cloud/platform/domain/entity
 * @javaFieldParser <{root.group.table_name}>
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>实体类|待生成文件描述
 */

package com.heji.cloud.platform.domain.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.wisdomeyes.cloud.foundation.common.base.BaseEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;


/** 
 * @desc <{desc}>
 *
 * @author <{root.author}>
 * @datetime <{root.now_datetime}>
 */


@Data
@TableName(value = "<{root.group.table_name}>")
@ApiModel(value = "<{desc}>")
public class <{root.group.model}>Entity extends BaseEntity {

      <{root.group.table_fields}>

//    @TableField(value = "company_name")
//    @ApiModelProperty(value = "企业名称")
//    private String companyName;

}
