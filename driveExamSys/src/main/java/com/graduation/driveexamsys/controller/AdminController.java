package com.graduation.driveexamsys.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduation.driveexamsys.common.BaseResponse;
import com.graduation.driveexamsys.common.BusinessException;
import com.graduation.driveexamsys.common.ErrorCode;
import com.graduation.driveexamsys.common.ResultUtils;
import com.graduation.driveexamsys.domain.*;
import com.graduation.driveexamsys.domain.VO.CoachVO;
import com.graduation.driveexamsys.domain.VO.FeedVO;
import com.graduation.driveexamsys.domain.VO.StudentVO;
import com.graduation.driveexamsys.domain.request.*;
import com.graduation.driveexamsys.mapper.AdminMapper;
import com.graduation.driveexamsys.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.sun.javafx.font.FontResource.SALT;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Resource
    StudentService studentService;
    @Resource
    CoachService coachService;

    @Resource
    UserService userService;

    @Resource
    AnnouncementService announcementService;

    @Resource
    AdminMapper adminMapper;

    @Resource
    FeedbackService feedbackService;

    @Resource
    AdminService adminService;


    /**
     * 获取所有学员
     * @return
     */
    @GetMapping("/allstudent")
    public BaseResponse<List<StudentVO>> selectAllStudent(){
        ArrayList<StudentVO> studentVOS = new ArrayList<>();
        List<Student> list = studentService.list();
        for (Student student : list) {
            String fullname = student.getFullname();
            String username = student.getUsername();
            String password = student.getPassword();
            String phone = student.getPhone();
            String email = student.getEmail();
            Integer coachid = student.getCoachid();
            Coach coach = coachService.getById(coachid);
            StudentVO studentVO = new StudentVO();
            studentVO.setId(student.getId());
            studentVO.setCoach(coach.getFullname());
            studentVO.setFullname(fullname);
            studentVO.setPhone(phone);
            studentVO.setPassword(password);
            studentVO.setEmail(email);
            studentVO.setUsername(username);
            studentVOS.add(studentVO);
        }
        return ResultUtils.success(studentVOS);
    }

    /**
     * 获取所有教练
     * @return
     */
    @GetMapping("/allcoach")
    public BaseResponse<List<CoachVO>> selectAllCoach(){
        ArrayList<CoachVO> coachVOS = new ArrayList<>();
        List<Coach> list = coachService.list();
        for (Coach coach : list) {
            Integer id = coach.getId();
            String fullname = coach.getFullname();
            String address = coach.getAddress();
            String password = coach.getPassword();
            String email = coach.getEmail();
            String phone = coach.getPhone();
            String username = coach.getUsername();
            Integer adminid = coach.getAdminid();
            Admin admin = adminService.getById(adminid);
            String adminUsername = admin.getUsername();
            CoachVO coachVO = new CoachVO();
            coachVO.setId(id);
            coachVO.setUsername(username);
            coachVO.setAdmin(adminUsername);
            coachVO.setEmail(email);
            coachVO.setPassword(password);
            coachVO.setFullname(fullname);
            coachVO.setAddress(address);
            coachVO.setPhone(phone);
            coachVOS.add(coachVO);
        }
        return ResultUtils.success(coachVOS);
    }

    /**
     * 上传公告（管理员）
     * @param upNoticeRequest
     * @param request
     * @return
     */
    @PostMapping("/upnotice")
    public BaseResponse<Long> upNotice(@RequestBody UpNoticeRequest upNoticeRequest, HttpServletRequest request){

        if (upNoticeRequest.getTitle() == null || upNoticeRequest.getContent()==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        queryWrapper.eq("password",password);
        Admin admin = adminMapper.selectOne(queryWrapper);
        Announcement announcement = new Announcement();
        announcement.setTitle(upNoticeRequest.getTitle());
        announcement.setContent(upNoticeRequest.getContent());
        announcement.setPublishtime(upNoticeRequest.getPublishtime());
        announcement.setAdministratorid(admin.getId());
        announcementService.save(announcement);
        Long id = (long)announcement.getId();
        return ResultUtils.success(id);
    }

    @GetMapping("/getfeed")
    public List<FeedVO> getFeedList(){
        List<FeedVO> feedVOS = new ArrayList<>();
        List<Feedback> feedbacks = feedbackService.list();
        for (Feedback feedback : feedbacks) {
            String content = feedback.getContent();
            Date publishtime =feedback.getUpdatetime();
            Integer studentid = feedback.getStudentid();
            Student student = studentService.getById((long)studentid);
            String username = student.getFullname();
            FeedVO feedVO = new FeedVO();
            feedVO.setContent(content);
            feedVO.setUsername(username);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            feedVO.setPublishtime(dateFormat.format(publishtime));
            feedVOS.add(feedVO);
        }
        // 返回List
        return feedVOS;
    }
    /**
     * 创建学员
     *
     * @return
     */
    @PostMapping("/addstudent")
    public BaseResponse<Long> addStudent(@RequestBody AddStudentRequest addStudentRequest) {
        System.out.println(addStudentRequest);
        if (addStudentRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Student student = new Student();
        BeanUtils.copyProperties(addStudentRequest,student);
        Random random = new Random();
        student.setCoachid(random.nextInt(1));
        studentService.save(student);
        return ResultUtils.success((long)student.getId());
    }

    /**
     * 创建教练
     *
     * @param addCoachRequest
     * @param request
     * @return
     */
    @PostMapping("/addcoach")
    public BaseResponse<Long> addCoach(@RequestBody AddCoachRequest addCoachRequest, HttpServletRequest request) {
        if (addCoachRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();
        QueryWrapper<Admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        queryWrapper.eq("password",password);
        Admin admin = adminMapper.selectOne(queryWrapper);
        Coach coach = new Coach();
        coach.setUsername(addCoachRequest.getUsername());
        String CoachencryptPassword = DigestUtils.md5DigestAsHex((SALT + addCoachRequest.getPassword()).getBytes());
        coach.setPassword(CoachencryptPassword);
        coach.setFullname(addCoachRequest.getFullname());
        coach.setPhone(addCoachRequest.getPhone());
        coach.setAddress(addCoachRequest.getAddress());
        coach.setEmail(addCoachRequest.getEmail());
        coach.setAdminid(admin.getId());
        coachService.save(coach);
        return ResultUtils.success((long)coach.getId());
    }

    /**
     * 删除用户
     *
     * @return
     */
    @DeleteMapping("/deletestudent")
    public BaseResponse<Boolean> deleteStudent(@RequestBody Map<String, List<Integer>> requestMap) {
        List<Integer> ids = requestMap.get("id");
        if (ids.isEmpty()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        for (Integer id : ids) {
            studentService.removeById(id);
        }
        return ResultUtils.success(true);
    }

    /**
     * 删除用户
     *
     * @return
     */
    @DeleteMapping("/deletecoach")
    public BaseResponse<Boolean> deleteCoach(@RequestBody Map<String, List<Integer>> requestMap) {
        List<Integer> ids = requestMap.get("id");
        if (ids.isEmpty()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        for (Integer id : ids) {
            coachService.removeById(id);
        }
        return ResultUtils.success(true);
    }

    /**
     * 更新用户
     *
     * @param studentUpdateRequest
     * @return
     */
    @PostMapping("/updatestudent")
    public BaseResponse<Boolean> updateStudent(@RequestBody StudentUpdateRequest studentUpdateRequest) {
        System.out.println(studentUpdateRequest);
        Student byFullname = studentService.getByFullname(studentUpdateRequest.getFullname());
        byFullname.setUsername(studentUpdateRequest.getUsername());
        byFullname.setPassword(studentUpdateRequest.getPassword());
        byFullname.setPhone(studentUpdateRequest.getPhone());
        byFullname.setEmail(studentUpdateRequest.getEmail());
        System.out.println("ful:"+ byFullname);
        studentService.updateById(byFullname);
        return ResultUtils.success(true);
    }
    /**
     * 更新用户
     *
     * @param coachUpdateRequest
     * @return
     */
    @PostMapping("/updatecoach")
    public BaseResponse<Boolean> updateCoach(@RequestBody CoachUpdateRequest coachUpdateRequest) {
        Coach byFullname = coachService.getByFullname(coachUpdateRequest.getFullname());
        Coach coach = new Coach();
        byFullname.setUsername(coachUpdateRequest.getUsername());
        byFullname.setPassword(coachUpdateRequest.getPassword());
        byFullname.setPhone(coachUpdateRequest.getPhone());
        byFullname.setEmail(coachUpdateRequest.getEmail());
        byFullname.setAddress(coachUpdateRequest.getAddress());
        coachService.updateById(byFullname);
        return ResultUtils.success(true);
    }

}
