package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.common.BusinessException;
import com.graduation.driveexamsys.common.ErrorCode;
import com.graduation.driveexamsys.domain.Coach;
import com.graduation.driveexamsys.domain.Student;
import com.graduation.driveexamsys.domain.User;
import com.graduation.driveexamsys.mapper.StudentMapper;
import com.graduation.driveexamsys.service.CoachService;
import com.graduation.driveexamsys.service.StudentService;
import com.graduation.driveexamsys.service.UserService;
import com.graduation.driveexamsys.mapper.UserMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.graduation.driveexamsys.common.UserCommon.USER_LOGIN_STATE;
import static org.apache.commons.lang3.RandomStringUtils.random;

/**
* @description 针对表【user(同步用户表)】的数据库操作Service实现
* @createDate 2023-11-15 15:17:25
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

    /**
     * 盐值，混淆密码
     */
    private static final String SALT = "qwer";

    @Resource
    UserMapper userMapper;

    @Resource
    StudentMapper studentMapper;

    @Resource
    StudentService studentService;

    @Resource
    CoachService coachService;

    /**
     * 登录
     * @param username
     * @param password
     * @param request
     * @return
     */
    @Override
    public User UserLogin(String username, String password, HttpServletRequest request) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);

        if ("admin".equals(username)) {
            // 如果用户名为 "admin"，则不需要加密密码
            queryWrapper.eq("password", password);
        } else {
            // 其他用户名需要加密密码
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
            queryWrapper.eq("password", password);
        }

        User user = userMapper.selectOne(queryWrapper);
        request.getSession().setAttribute(USER_LOGIN_STATE, user);
        return user;
    }

    /**
     * 注册
     * @param username
     * @param password
     * @param checkPassword
     * @param fullname
     * @param phone
     * @param email
     * @return 默认为学员注册，直接注册在Student表
     */
    @Override
    public long userRegister(String username,String password,String checkPassword,String fullname,String phone,String email) {
        // 1. 校验
        if (StringUtils.isAnyBlank(username, password, checkPassword, fullname, phone, email)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (username.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (password.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        // 账户不能包含特殊字符
        String validPattern = "[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Matcher matcher = Pattern.compile(validPattern).matcher(username);
        if (matcher.find()) {
            return -1;
        }
        // 密码和校验密码相同
        if (!password.equals(checkPassword)) {
            return -1;
        }
        // 账户不能重复
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        long count = studentMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
        }
        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
        // 3. 插入数据
        Student student = new Student();
        student.setUsername(username);
        student.setPassword(password);
        student.setFullname(fullname);
        student.setPhone(phone);
        student.setEmail(email);
        Random random = new Random();
        student.setCoachid(random.nextInt(5));
        boolean saveResult = studentService.save(student);
        if (!saveResult) {
            return -1;
        }
        return student.getId();
    }

    @Override
    public long coachRegister(String username,String password,String checkPassword,String fullname,String phone,String email) {
        // 1. 校验
        if (StringUtils.isAnyBlank(username, password, checkPassword, fullname, phone, email)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (username.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (password.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        // 账户不能包含特殊字符
        String validPattern = "[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
        Matcher matcher = Pattern.compile(validPattern).matcher(username);
        if (matcher.find()) {
            return -1;
        }
        // 密码和校验密码相同
        if (!password.equals(checkPassword)) {
            return -1;
        }
        // 账户不能重复
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        long count = studentMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
        }
        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
        // 3. 插入数据
        Coach coach = new Coach();
        coach.setUsername(username);
        coach.setPassword(encryptPassword);
        coach.setFullname(fullname);
        coach.setPhone(phone);
        coach.setEmail(email);
        boolean saveResult = coachService.save(coach);
        if (!saveResult) {
            return -1;
        }
        return coach.getId();
    }

    /**
     * 用户注销
     *
     * @param request
     */
    @Override
    public int userLogout(HttpServletRequest request) {
        // 移除登录态
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 1;
    }

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUser(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        currentUser = this.getById(userId);
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentUser;
    }
}




