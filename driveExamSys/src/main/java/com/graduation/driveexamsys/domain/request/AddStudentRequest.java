package com.graduation.driveexamsys.domain.request;


import lombok.Data;

@Data
public class AddStudentRequest {
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

}
