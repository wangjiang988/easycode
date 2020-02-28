package com.heji.cloud.platform.rest.controller.admin;

import com.wisdomeyes.cloud.foundation.common.object.UUidList;
import com.wisdomeyes.cloud.foundation.common.output.MPage;
import com.wisdomeyes.cloud.foundation.common.rest.ResultGenerator;
import com.wisdomeyes.cloud.foundation.common.rest.entity.Result;
import com.wisdomeyes.cloud.foundation.common.util.CommonUtils;
import com.wisdomeyes.cloud.foundation.config.annotation.LogTrack;
import com.wisdomeyes.cloud.foundation.excel.DynamicOneSheetEasyExcel;
import com.wisdomeyes.cloud.foundation.excel.OneSheetEasyExcel;
import com.heji.cloud.platform.domain.entity.UserEntity;
import com.heji.cloud.platform.domain.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/** 
 * @desc 用户控制接口类
 *
 * @author wangjiang
 * @datetime 2020-02-28 13:47:13
 */


@RestController
@RequestMapping("/v1/xx")
@Api(value = "/v1/xx", tags = "用户控制接口类")
public class UserAdminController {
    private static Logger logger = LoggerFactory.getLogger(UserAdminController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    @LogTrack
    @ApiOperation("所有列表")
    public Result list(UserEntity qo) {
        return ResultGenerator.genSuccessResult(userService.baseList());
    }

    @LogTrack
    @ApiOperation("分页列表")
    @GetMapping("")
    public Result page(
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize
    ) {
        UserEntity qo = new UserEntity();
        MPage<UserEntity> page = userService.basePage(pageNum, pageSize, qo);
        return ResultGenerator.genSuccessResult(page);
    }

    @GetMapping("/{uuid}")
    @LogTrack
    @ApiOperation("记录ID查询")
    public Result get(@PathVariable("uuid") String uuid) {
        return ResultGenerator.genSuccessResult(userService.getById(uuid));
    }

    @PostMapping("")
    @LogTrack
    @ApiOperation("新增")
    public Result save(@RequestBody UserEntity entity) {
        return ResultGenerator.genSuccessResult(userService.baseSave(entity));
    }

    @PutMapping("")
    @LogTrack
    @ApiOperation("修改")
    public Result update(@RequestBody UserEntity entity) {
        return ResultGenerator.genSuccessResult(userService.baseSave(entity));
    }

    @DeleteMapping("/{uuid}")
    @LogTrack
    @ApiOperation("删除")
    public Result delete(@PathVariable("uuid") String uuid) {
        return ResultGenerator.genSuccessResult(userService.removeById(uuid));
    }

    @DeleteMapping("/batch")
    @LogTrack
    @ApiOperation("批量删除")
    public Result deleteBatch(@RequestBody UUidList uUidList) {
        return ResultGenerator.genSuccessResult(userService.baseBatchSoftRemoveByUUidList(uUidList));
    }
}
