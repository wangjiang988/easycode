/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>ServiceImpl
 * @description    服务实现类
 * @ext    java
 * @targetPath    @projectRoot/<{root.project_name}>-domain/src/main/java/<{root.metadata.basePackagePath}>/<{root.project_name}>/domain/service/impl
 *
 * ***** 模板变量定义 ******s
 * @variable    desc|<{root.group.model_desc}>服务实现类|待生成文件描述
 */

package <{root.basePackage}>.<{root.project_name}>.domain.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wisdomeyes.cloud.foundation.common.base.BaseServiceImpl;
import com.wisdomeyes.cloud.foundation.common.util.CommonUtils;
import <{root.basePackage}>.<{root.project_name}>.domain.entity.<{root.group.model}>Entity;
import <{root.basePackage}>.<{root.project_name}>.domain.mapper.<{root.group.model}>Mapper;
import <{root.basePackage}>.<{root.project_name}>.domain.service.<{root.group.model}>Service;
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
