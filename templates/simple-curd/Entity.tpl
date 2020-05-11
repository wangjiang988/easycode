/** 
 * ***** 模板定义 ******
 * @name    Entity
 * @filename    <{root.group.model}>Entity
 * @description    实体类
 * @ext    java
 * @targetPath    @projectRoot/<{root.project_name}>-domain/src/main/java/<{root.metadata.basePackagePath}>/<{root.project_name}>/domain/entity
 * @javaFieldParser <{root.group.table_name}>
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>实体类|待生成文件描述
 */

package <{root.basePackage}>.<{root.project_name}>.domain.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
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
public class <{root.group.model}>Entity{

    <{#root.group.table_fields}>
    @TableField(value = "<{COLUMN_NAME}>")
    @ApiModelProperty(value = "<{COLUMN_COMMENT}>")
    private <{COLUMN_TYPE}> <{COLUMN_FIELD}>;

    <{/root.group.table_fields}>

}
