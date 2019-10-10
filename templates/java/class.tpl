/**
 * ***** 模板定义                         *****
 * @name class
 * @description java通用class
 * @ext java
 * @targetPath  @projectRoot/templates/src/class
 *
 * ***** 模板内变量: 变量名称|默认值|变量描述 *****
 * @variable       desc|默认java类文件|文件描述
 * @variable   package_path|com.wangjiang.mario.admin.test|java包名
 */

package <{package_path}>;

/**
 * @author <{root.author}>
 * @description <{desc}>
 * @date <{root.now_datetime}>
 */
public class <{root.filename_withno_ext}> {
    private static Logger logger = LoggerFactory.getLogger(<{root.filename_withno_ext}>.class);

}
