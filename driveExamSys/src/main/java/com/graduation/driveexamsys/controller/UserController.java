package com.graduation.driveexamsys.controller;


import com.graduation.driveexamsys.common.BaseResponse;
import com.graduation.driveexamsys.common.BusinessException;
import com.graduation.driveexamsys.common.ErrorCode;
import com.graduation.driveexamsys.common.ResultUtils;
import com.graduation.driveexamsys.domain.User;
import com.graduation.driveexamsys.domain.request.UserLoginRequest;
import com.graduation.driveexamsys.domain.request.UserRegisterRequest;
import com.graduation.driveexamsys.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


import static com.graduation.driveexamsys.common.UserCommon.USER_LOGIN_STATE;

@RestController
@RequestMapping("/login")
public class UserController {

    @Resource
    UserService userService;


    @RequestMapping("/account")
    public BaseResponse<User> login(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if (userLoginRequest == null) {
            return ResultUtils.error(ErrorCode.PARAMS_ERROR);
        }
        String username = userLoginRequest.getUsername();
        String password = userLoginRequest.getPassword();
        if (StringUtils.isAnyBlank(username, password)) {
            return ResultUtils.error(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.UserLogin(username,password,request);
        //查询不到用户
        if (user == null) {
            return ResultUtils.error(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(user);
    }

    /**
     * 用户注册
     *
     * @param userRegisterRequest
     * @return
     */
    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {
        System.out.println(userRegisterRequest);
        // 校验
        if (userRegisterRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String role = userRegisterRequest.getRole();
        String username = userRegisterRequest.getUsername();
        String password = userRegisterRequest.getPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        String fullname = userRegisterRequest.getFullname();
        String phone = userRegisterRequest.getPhone();
        String email = userRegisterRequest.getEmail();
        if (StringUtils.isAnyBlank(username,password,checkPassword,fullname,phone,email)) {
            return null;
        }
        if (role.equals("coach")){
            long result = userService.coachRegister(username,password,checkPassword,fullname,phone,email);
            return ResultUtils.success(result);
        }else {
            long result = userService.userRegister(username,password,checkPassword,fullname,phone,email);
            return ResultUtils.success(result);
        }
    }
    /**
     * 获取当前用户
     *
     * @param request
     * @return
     */
    @GetMapping("/current")
    public BaseResponse<User> getCurrentUser(HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN);
        }
        long userId = currentUser.getId();
        User user = userService.getById(userId);
        return ResultUtils.success(user);
    }
    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    @PostMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request) {
        if (request == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        int result = userService.userLogout(request);
        return ResultUtils.success(result);
    }
}
