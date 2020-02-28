package com.heji.cloud.platform.rest.controller.admin;

import com.wisdomeyes.cloud.foundation.common.object.UUidList;
import com.wisdomeyes.cloud.foundation.common.output.MPage;
import com.wisdomeyes.cloud.foundation.common.rest.ResultGenerator;
import com.wisdomeyes.cloud.foundation.common.rest.entity.Result;
import com.wisdomeyes.cloud.foundation.common.util.CommonUtils;
import com.wisdomeyes.cloud.foundation.config.annotation.LogTrack;
import com.wisdomeyes.cloud.foundation.excel.DynamicOneSheetEasyExcel;
import com.wisdomeyes.cloud.foundation.excel.OneSheetEasyExcel;
import com.heji.cloud.platform.domain.entity.<{root.group.model}>Entity;
import com.heji.cloud.platform.domain.service.<{root.group.model}>Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/** 
 * @desc <{desc}>  用户控制接口类
 *
 * @author <{root.author}>
 * @datetime <{root.now_datetime}>
 */


@RestController
@RequestMapping("<{uri}>")
@Api(value = "<{uri}>", tags = "<{desc}>")
public class <{root.group.model}>AdminController {
    private static Logger logger = LoggerFactory.getLogger(<{root.group.model}>AdminController.class);

    @Autowired
    private <{root.group.model}>Service <{root.group.model_lower}>Service;

    @GetMapping("/all")
    @LogTrack
    @ApiOperation("所有列表")
    public Result list(<{root.group.model}>Entity qo) {
        return ResultGenerator.genSuccessResult(<{root.group.model_lower}>Service.baseList());
    }

    @LogTrack
    @ApiOperation("分页列表")
    @GetMapping("")
    public Result page(
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize
    ) {
        <{root.group.model}>Entity qo = new <{root.group.model}>Entity();
        MPage<<{root.group.model}>Entity> page = <{root.group.model_lower}>Service.basePage(pageNum, pageSize, qo);
        return ResultGenerator.genSuccessResult(page);
    }

    @GetMapping("/{uuid}")
    @LogTrack
    @ApiOperation("记录ID查询")
    public Result get(@PathVariable("uuid") String uuid) {
        return ResultGenerator.genSuccessResult(<{root.group.model_lower}>Service.getById(uuid));
    }

    @PostMapping("")
    @LogTrack
    @ApiOperation("新增")
    public Result save(@RequestBody <{root.group.model}>Entity entity) {
        return ResultGenerator.genSuccessResult(<{root.group.model_lower}>Service.baseSave(entity));
    }

    @PutMapping("")
    @LogTrack
    @ApiOperation("修改")
    public Result update(@RequestBody <{root.group.model}>Entity entity) {
        return ResultGenerator.genSuccessResult(<{root.group.model_lower}>Service.baseSave(entity));
    }

    @DeleteMapping("/{uuid}")
    @LogTrack
    @ApiOperation("删除")
    public Result delete(@PathVariable("uuid") String uuid) {
        return ResultGenerator.genSuccessResult(<{root.group.model_lower}>Service.removeById(uuid));
    }

    @DeleteMapping("/batch")
    @LogTrack
    @ApiOperation("批量删除")
    public Result deleteBatch(@RequestBody UUidList uUidList) {
        return ResultGenerator.genSuccessResult(<{root.group.model_lower}>Service.baseBatchSoftRemoveByUUidList(uUidList));
    }
}
