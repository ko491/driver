package com.graduation.driveexamsys.domain.request;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

@Data
public class StudentUpdateRequest {

    /**
     * 学员ID
     */
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
     * 关联主教练
     */
    private Integer coachid;

    private static final long serialVersionUID = 1L;
}
