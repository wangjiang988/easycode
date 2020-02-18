/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>ServiceImpl
 * @description    服务实现类
 * @ext    java
 * @targetPath    @projectRoot/platform-domain/src/main/java/com/heji/cloud/platform/domain/service/impl
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>服务实现类|待生成文件描述
 */

package com.heji.cloud.platform.domain.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wisdomeyes.cloud.foundation.common.base.BaseServiceImpl;
import com.wisdomeyes.cloud.foundation.common.util.CommonUtils;
import com.heji.cloud.platform.domain.entity.<{root.group.model}>Entity;
import com.heji.cloud.platform.domain.mapper.<{root.group.model}>Mapper;
import com.heji.cloud.platform.domain.service.<{root.group.model}>Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @desc <{desc}>
 *
 * @author <{root.author}>
 * @datetime <{root.now_datetime}>
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class <{root.group.model}>ServiceImpl extends BaseServiceImpl<<{root.group.model}>Mapper, <{root.group.model}>Entity>
        implements <{root.group.model}>Service {

    private static final Logger logger = LoggerFactory.getLogger(<{root.group.model}>ServiceImpl.class);

}
