package com.heji.cloud.platform.domain.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.wisdomeyes.cloud.foundation.common.base.BaseEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;


/** 
 * @desc 用户实体类
 *
 * @author wangjiang
 * @datetime 2020-02-28 13:47:13
 */


@Data
@TableName(value = "carrier_park")
@ApiModel(value = "用户实体类")
public class UserEntity extends BaseEntity {


    @TableField(value = "no")
    @ApiModelProperty(value = "编号")
    private String no;


    @TableField(value = "name")
    @ApiModelProperty(value = "园区名称")
    private String name;


    @TableField(value = "street_id")
    @ApiModelProperty(value = "")
    private Integer streetId;


    @TableField(value = "location")
    @ApiModelProperty(value = "园区位置")
    private String location;


    @TableField(value = "area")
    @ApiModelProperty(value = "园区面积")
    private String area;


    @TableField(value = "rest_area")
    @ApiModelProperty(value = "可用剩余面积")
    private String restArea;


    @TableField(value = "contact")
    @ApiModelProperty(value = "联系人")
    private String contact;


    @TableField(value = "phone")
    @ApiModelProperty(value = "联系方式")
    private String phone;


    @TableField(value = "build_area")
    @ApiModelProperty(value = "园区建筑总面积")
    private Double buildArea;


    @TableField(value = "build_num")
    @ApiModelProperty(value = "厂房栋数")
    private Integer buildNum;


    @TableField(value = "ground_bearing")
    @ApiModelProperty(value = " 地面承重")
    private Double groundBearing;


    @TableField(value = "load_weight")
    @ApiModelProperty(value = "行车负载重量")
    private Double loadWeight;


    @TableField(value = "is_con")
    @ApiModelProperty(value = "大型车辆是否出入方便")
    private Boolean isCon;


    @TableField(value = "kva_compensate")
    @ApiModelProperty(value = "kva是否可以增容")
    private Boolean kvaCompensate;


    @TableField(value = "transformer")
    @ApiModelProperty(value = "有无变压器")
    private Boolean transformer;


    @TableField(value = "content")
    @ApiModelProperty(value = "内容（园内特色服务）")
    private String content;


    @TableField(value = "overview")
    @ApiModelProperty(value = "园区概况介绍")
    private String overview;


    @TableField(value = "transformer_capacity")
    @ApiModelProperty(value = "变压器容量")
    private String transformerCapacity;


    @TableField(value = "rest_rent_area")
    @ApiModelProperty(value = "剩余可租用总面积")
    private Double restRentArea;


    @TableField(value = "special_service")
    @ApiModelProperty(value = "特色服务")
    private String specialService;


    @TableField(value = "investment_offer")
    @ApiModelProperty(value = "招商优惠")
    private String investmentOffer;


    @TableField(value = "is_property")
    @ApiModelProperty(value = "是否有物业")
    private Boolean isProperty;


    @TableField(value = "property_fee")
    @ApiModelProperty(value = "物业管理费")
    private Double propertyFee;


    @TableField(value = "is_security")
    @ApiModelProperty(value = "是否有保安")
    private Boolean isSecurity;


    @TableField(value = "is_greening")
    @ApiModelProperty(value = "是否有小区绿化")
    private Boolean isGreening;


    @TableField(value = "power_manage")
    @ApiModelProperty(value = "电力管理1:企业管理、2:物业管理")
    private Integer powerManage;


    @TableField(value = "is_gc")
    @ApiModelProperty(value = "是否有垃圾清运")
    private Boolean isGc;


    @TableField(value = "is_pm")
    @ApiModelProperty(value = "是否有管道维护")
    private Boolean isPm;


    @TableField(value = "cell_location")
    @ApiModelProperty(value = "小区定位")
    private String cellLocation;


    @TableField(value = "renting_category")
    @ApiModelProperty(value = "招租门类")
    private String rentingCategory;


    @TableField(value = "no_renting_categpry")
    @ApiModelProperty(value = "不招租门类")
    private String noRentingCategpry;


    @TableField(value = "is_busstop")
    @ApiModelProperty(value = "是否有公交站台")
    private Boolean isBusstop;


    @TableField(value = "busstop_distance")
    @ApiModelProperty(value = "里公交站台距离")
    private Double busstopDistance;


    @TableField(value = "is_tram_station")
    @ApiModelProperty(value = "是否有有轨电车站台")
    private Boolean isTramStation;


    @TableField(value = "tram_station_distance")
    @ApiModelProperty(value = "里有轨电车距离")
    private Double tramStationDistance;


    @TableField(value = "is_bicycle_point")
    @ApiModelProperty(value = "是否有公共自行车服务点")
    private Boolean isBicyclePoint;


    @TableField(value = "bicycle_point_distance")
    @ApiModelProperty(value = "里公共自行车服务点距离")
    private Double bicyclePointDistance;


    @TableField(value = "is_cp")
    @ApiModelProperty(value = "是否有商业配套")
    private Boolean isCp;


    @TableField(value = "cp_content")
    @ApiModelProperty(value = "商业配套内容（例如与美团合作、与丽华合作等）")
    private String cpContent;


    @TableField(value = "is_logistics_center")
    @ApiModelProperty(value = "是否有物流中心")
    private Boolean isLogisticsCenter;


    @TableField(value = "is_hospital")
    @ApiModelProperty(value = "是否有医院")
    private Boolean isHospital;


    @TableField(value = "is_onestop_service")
    @ApiModelProperty(value = "是否一站式服务")
    private Boolean isOnestopService;


    @TableField(value = "service_content")
    @ApiModelProperty(value = "服务内容（例如营业执照代办等）")
    private String serviceContent;


    @TableField(value = "is_free_rent")
    @ApiModelProperty(value = "是否有装修免租期(1-3月)")
    private Boolean isFreeRent;


    @TableField(value = "is_preferential_policy")
    @ApiModelProperty(value = "是否有优惠政策")
    private Boolean isPreferentialPolicy;


    @TableField(value = "precondition")
    @ApiModelProperty(value = "享受优惠政策前提条件（例如税收、产出等）")
    private String precondition;


    @TableField(value = "min_invest")
    @ApiModelProperty(value = "最低投资额度")
    private Double minInvest;


    @TableField(value = "tax_request")
    @ApiModelProperty(value = "税收要求")
    private String taxRequest;


    @TableField(value = "standard_rent")
    @ApiModelProperty(value = "标准租金")
    private Double standardRent;


    @TableField(value = "manager_offer")
    @ApiModelProperty(value = "小区总经理优惠力度")
    private String managerOffer;


    @TableField(value = "mayor_offer")
    @ApiModelProperty(value = "镇长优惠力度")
    private String mayorOffer;


    @TableField(value = "national_honor")
    @ApiModelProperty(value = "国家级荣誉")
    private String nationalHonor;


    @TableField(value = "provincial_title")
    @ApiModelProperty(value = "省级称号")
    private String provincialTitle;


    @TableField(value = "other_title")
    @ApiModelProperty(value = "其他荣誉")
    private String otherTitle;


    @TableField(value = "industry_direction")
    @ApiModelProperty(value = "产业方向")
    private String industryDirection;


    @TableField(value = "industry_planning")
    @ApiModelProperty(value = "产业规划")
    private String industryPlanning;


    @TableField(value = "planning_company")
    @ApiModelProperty(value = "规模以上企业（家）")
    private Integer planningCompany;


    @TableField(value = "over_hundred_million_company")
    @ApiModelProperty(value = "年产值过亿企业（家）")
    private Integer overHundredMillionCompany;


    @TableField(value = "listed_company")
    @ApiModelProperty(value = "上市企业（家）")
    private Integer listedCompany;


    @TableField(value = "is_start")
    @ApiModelProperty(value = "是否启用")
    private Boolean isStart;


    @TableField(value = "other_info")
    @ApiModelProperty(value = "其他信息")
    private String otherInfo;


    @TableField(value = "type")
    @ApiModelProperty(value = "园区类型描述")
    private Integer type;


    @TableField(value = "is_power")
    @ApiModelProperty(value = "通电")
    private Boolean isPower;


    @TableField(value = "is_water")
    @ApiModelProperty(value = "通水")
    private Boolean isWater;


    @TableField(value = "is_drain")
    @ApiModelProperty(value = "通排水")
    private Boolean isDrain;


    @TableField(value = "is_load")
    @ApiModelProperty(value = "通路")
    private Boolean isLoad;


    @TableField(value = "is_newsletter")
    @ApiModelProperty(value = "通讯")
    private Boolean isNewsletter;


    @TableField(value = "is_gas")
    @ApiModelProperty(value = "通燃气")
    private Boolean isGas;


    @TableField(value = "is_heat")
    @ApiModelProperty(value = "通热力")
    private Boolean isHeat;


    @TableField(value = "is_cable_television")
    @ApiModelProperty(value = "通有线电视")
    private Boolean isCableTelevision;


    @TableField(value = "is_draft")
    @ApiModelProperty(value = "0：草稿、1:保存")
    private Boolean isDraft;


    @TableField(value = "is_system_data")
    @ApiModelProperty(value = "是否系统数据 1 是, 0 不是")
    private Boolean isSystemData;


}
