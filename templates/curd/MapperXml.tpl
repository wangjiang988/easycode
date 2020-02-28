/** 
 * ***** 模板定义 ******
 * @name    <{root.group.model}>Mapper
 * @description    MapperXml文件
 * @ext    xml
 * @targetPath    @projectRoot/<{root.project_names}>-domain/src/main/resources/mapper
 *
 * ***** 模板变量定义 ******
 * @variable    desc|<{root.group.model_desc}>Mapper对象|待生成文件描述
 */

<?<{x}>ml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="<{root.basePackage}>.<{root.project_name}>.domain.mapper.<{root.group.model}>Mapper">
    <!--<{desc}>-->

    <!-- 通用查询映射结果 -->
    <resultMap id="BaseResultMap" type="<{root.basePackage}>.<{root.project_name}>.domain.entity.<{root.group.model}>Entity">
        <id column="id" property="id" />
        <!-- <result column="no" property="no" />
        <result column="name" property="name" />
        <result column="download_url" property="downloadUrl" />
        <result column="api_url" property="apiUrl" />
        <result column="created_time" property="createdTime" /> -->
    </resultMap>

  

</mapper>
