/** 
 * ***** 模板定义 ******
 * @name    Mapper
 * @filename    <{root.group.model}>Mapper
 * @description    MapperXml文件
 * @ext    xml
 * @targetPath    @projectRoot/<{root.project_name}>-domain/src/main/resources/mapper
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


<!--    批量插入-->
<!--    <insert id="batchInsert">-->
<!--        insert into mario_user_role(user_uuid, role_code) values-->
<!--        <foreach item="item" index="index" collection="list" separator=",">-->
<!--            (#{item.userUuid},#{item.roleCode})-->
<!--        </foreach>-->
<!--    </insert>-->

        <!--    批量删除-->
<!--    <delete id="deleteByRoleCode" parameterType="String">-->
<!--		delete from mario_role_menu where role_code=#{roleCode}-->
<!--	</delete>-->

<!--    <select id="getUserRoles" parameterType="List" resultType="com.wangjiang.mario.admin.object.user.UserRoleVo">-->
<!--        select r.*, mur.user_uuid as userUUid from mario_role as r-->
<!--            left join mario_user_role as mur on mur.role_code = r.code-->
<!--        where-->
<!--            r.del_flag = 0 and-->
<!--            mur.user_uuid in-->
<!--        <foreach collection="list" item="userId" open="(" separator="," close=")">-->
<!--            #{userId}-->
<!--        </foreach>-->
<!--    </select>-->

<!--    <select id="getRolesByUserUUid" parameterType="String" resultType="com.wangjiang.mario.admin.object.user.UserRoleVo">-->
<!--        select r.*, mur.user_uuid as userUUid-->
<!--        from mario_role as r-->
<!--        left join mario_user_role as mur on mur.role_code = r.code-->
<!--        where-->
<!--        r.del_flag = 0 and-->
<!--        mur.user_uuid = #{userUUid}-->
<!--    </select>-->

</mapper>
