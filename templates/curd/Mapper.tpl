/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>Mapper
 * @description    mapper类
 * @ext    java
 * @targetPath    @projectRoot/platform-domain/src/main/java/com/heji/cloud/platform/domain/mapper
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>Mapper对象|待生成文件描述
 */

package com.heji.cloud.platform.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.heji.cloud.platform.domain.entity.<{root.group.model}>Entity;

/** 
 * @desc <{desc}>
 *
 * @author <{root.author}>
 * @datetime <{root.now_datetime}>
 */


public interface <{root.group.model}>Mapper extends BaseMapper<<{root.group.model}>Entity> {
}
