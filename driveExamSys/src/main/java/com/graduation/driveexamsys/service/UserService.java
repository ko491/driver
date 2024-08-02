package com.graduation.driveexamsys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.graduation.driveexamsys.domain.User;

import javax.servlet.http.HttpServletRequest;

/**
* @author LTLB
* @description 针对表【user(同步用户表)】的数据库操作Service
* @createDate 2023-11-15 15:17:25
*/
public interface UserService extends IService<User> {

    /**
     * 用户登录
     * @param username
     * @param password
     * @param request
     * @return 用户信息
     */
    User UserLogin(String username, String password, HttpServletRequest request);

    /**
     * 用户注册
     * @param username
     * @param password
     * @param checkPassword
     * @param fullname
     * @param phone
     * @param email
     * @return 新用户id
     */
    long userRegister(String username,String password,String checkPassword,String fullname,String phone,String email);

    long coachRegister(String username,String password,String checkPassword,String fullname,String phone,String email);


    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    int userLogout(HttpServletRequest request);


    /**
     * 获取当前用户
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);
}
