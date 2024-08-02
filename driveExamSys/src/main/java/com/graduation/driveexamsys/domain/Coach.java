package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 存储教练信息的表
 * @TableName coach
 */
@TableName(value ="coach")
@Data
public class Coach implements Serializable {
    /**
     * 教练ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 教练姓名
     */
    private String fullname;

    /**
     * 联系方式
     */
    private String phone;

    /**
     * 常住地址
     */
    private String address;

    /**
     * 教练用户名
     */
    private String username;

    /**
     * 加密后的密码
     */
    private String password;

    /**
     * 教练电子邮件
     */
    private String email;

    /**
     * 角色：COACH（教练）
     */
    private String userRole;

    /**
     * 是否删除，FALSE 表示未删除，TRUE 表示已删除
     */
    @TableLogic
    private Integer isdeleted;

    /**
     * 关联管理员
     */
    private Integer adminid;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

}