package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import lombok.Data;

/**
 * 存储学员信息的表
 * @TableName student
 */
@TableName(value ="student")
@Data
public class Student implements Serializable {
    /**
     * 学员ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 学员姓名
     */
    private String fullname;

    /**
     * 联系方式
     */
    private String phone;

    /**
     * 学员用户名
     */
    private String username;

    /**
     * 加密后的密码
     */
    private String password;

    /**
     * 学员电子邮件
     */
    private String email;

    /**
     * 角色：STUDENT（学员）
     */
    private String userRole;

    /**
     * 是否删除，FALSE 表示未删除，TRUE 表示已删除
     */
    @TableLogic
    private Integer isdeleted;

    /**
     * 关联主教练
     */
    private Integer coachid;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}