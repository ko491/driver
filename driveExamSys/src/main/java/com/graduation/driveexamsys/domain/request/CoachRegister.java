package com.graduation.driveexamsys.domain.request;


import lombok.Data;

import java.io.Serializable;

@Data
public class CoachRegister implements Serializable {
    private static final long serialVersionUID = 3191241716373120793L;
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
     * 关联管理员
     */
    private Integer adminid;
}
