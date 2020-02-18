/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>Service
 * @description    服务接口类
 * @ext    java
 * @targetPath    @projectRoot/platform-domain/src/main/java/com/heji/cloud/platform/domain/service
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>服务接口|待生成文件描述
 */

package com.heji.cloud.platform.domain.service;

import com.wisdomeyes.cloud.foundation.common.base.BaseService;
import com.heji.cloud.platform.domain.entity.<{root.group.model}>Entity;

import java.util.List;

/** 
 * @desc <{desc}>
 *
 * @author <{root.author}>
 * @datetime <{root.now_datetime}>
 */

public interface <{root.group.model}>Service extends BaseService<<{root.group.model}>Entity> {

}
