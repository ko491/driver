package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 存储管理员信息的表
 * @TableName admin
 */
@TableName(value ="admin")
@Data
public class Admin implements Serializable {
    /**
     * 管理员ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 管理员用户名
     */
    private String username;

    /**
     * 加密后的密码
     */
    private String password;

    /**
     * 角色：ADMIN（管理员）
     */
    private String userrole;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}