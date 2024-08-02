package com.graduation.driveexamsys.domain.request;


import lombok.Data;

import java.io.Serializable;
import java.util.Random;

/**
 * 用户注册请求体
 *
 */
@Data
public class UserRegisterRequest implements Serializable {


    private static final long serialVersionUID = 3191241716373120793L;


    private String role;
    /**
     * 用户账号
     */
    private String username;

    /**
     * 用户密码
     */
    private String password;

    /**
     * 校验密码
     */
    private String checkPassword;

    /**
     * 用户真名
     */
    private String fullname;

    /**
     * 用户邮箱
     */
    private String email;

    /**
     * 用户联系方式
     */
    private String phone;


}
