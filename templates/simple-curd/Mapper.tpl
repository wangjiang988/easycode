/** 
 * ***** 模板定义 ******
 * @name    Mapper
 * @filename    <{root.group.model}>Mapper
 * @description    mapper类
 * @ext    java
 * @targetPath    @projectRoot/<{root.project_name}>-domain/src/main/java/<{root.metadata.basePackagePath}>/<{root.project_name}>/domain/mapper
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>Mapper对象|待生成文件描述
 */

package <{root.basePackage}>.<{root.project_name}>.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import <{root.basePackage}>.<{root.project_name}>.domain.entity.<{root.group.model}>Entity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/** 
 * @desc <{desc}>
 *
 * @author <{root.author}>
 * @datetime <{root.now_datetime}>
 */
public interface <{root.group.model}>Mapper extends BaseMapper<<{root.group.model}>Entity> {
    // Integer batchInsert(@Param("roleMenuList") List<RoleMenuEntity> roleMenuList);

    // Integer deleteByRoleCode(@Param("roleCode") String roleCode);

    // List<String> getMenusByRoleCode(@Param("roleCode") String roleCode);
}
