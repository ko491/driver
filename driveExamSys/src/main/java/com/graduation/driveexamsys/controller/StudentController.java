package com.graduation.driveexamsys.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduation.driveexamsys.common.BaseResponse;
import com.graduation.driveexamsys.common.BusinessException;
import com.graduation.driveexamsys.common.ErrorCode;
import com.graduation.driveexamsys.common.ResultUtils;
import com.graduation.driveexamsys.domain.*;
import com.graduation.driveexamsys.domain.VO.*;
import com.graduation.driveexamsys.domain.request.ExamRecordRequest;
import com.graduation.driveexamsys.domain.request.UpFeedRequest;
import com.graduation.driveexamsys.mapper.StudentMapper;
import com.graduation.driveexamsys.service.*;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static com.graduation.driveexamsys.common.UserCommon.USER_LOGIN_STATE;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Resource
    AdminService adminService;

    @Resource
    UserService userService;

    @Resource
    StudentMapper studentMapper;
    @Resource
    FeedbackService feedbackService;

    @Resource
    AnnouncementService announcementService;

    @Resource
    CoachService coachService;

    @Resource
    QuestionBankService questionBankService;

    @Resource
    MistakeRecordsService mistakeRecordsService;

    @Resource
    ExamRecordsService examRecordsService;

    @Resource
    TestBankService testBankService;


    @PostMapping("/upfeed")
    public BaseResponse<Long> upFeed(@RequestBody UpFeedRequest upFeedRequest, HttpServletRequest request){
        if (upFeedRequest.getContent() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        queryWrapper.eq("password",password);
        Student student = studentMapper.selectOne(queryWrapper);
        Feedback feedback = new Feedback();
        feedback.setContent(upFeedRequest.getContent());
        Date date = new Date();
        feedback.setUpdatetime(date);
        feedback.setStudentid(student.getId());
        feedbackService.save(feedback);
        Long id = (long)feedback.getId();
        return ResultUtils.success(id);
    }
    @GetMapping("/getnotice")
    public List<NoticeVO> getNoticeList(){
        List<NoticeVO> noticeVOList = new ArrayList<>();
        // 调用NoticeMapper的selectList方法，获取所有的Notice对象
        List<Announcement> announcementList = announcementService.list();
        // 遍历Notice对象的列表
        for (Announcement announcement : announcementList) {
            // 获取Notice对象的属性
            String title = announcement.getTitle();
            String content = announcement.getContent();
            Date publishtime =announcement.getPublishtime();
            Integer adminid = announcement.getAdministratorid();
            Admin admin = adminService.getById((long)adminid);
            // 调用AdminService的方法，根据adminid获取username
            String username = admin.getUsername();
            // 创建一个NoticeVO对象，传入相应的参数
            NoticeVO noticeVO = new NoticeVO();
            noticeVO.setTitle(title);
            noticeVO.setContent(content);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            noticeVO.setPublishtime(dateFormat.format(publishtime));
            noticeVO.setUsername(username);
            // 将NoticeVO对象添加到List中
            noticeVOList.add(noticeVO);
        }
        // 返回List
        return noticeVOList;
    }
    /**
     * 获取当前用户信息
     *
     * @param request
     * @return
     */
    @GetMapping("/currentinfo")
    public BaseResponse<StudentVO> getCurrentUserInfo(HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        String username = currentUser.getUsername();
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        Student currentStudent = studentMapper.selectOne(queryWrapper);
        if (currentStudent == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN);
        }
        StudentVO studentVO = new StudentVO();
        studentVO.setFullname(currentStudent.getFullname());
        studentVO.setPhone(currentStudent.getPhone());
        studentVO.setPassword(currentStudent.getPassword());
        studentVO.setEmail(currentStudent.getEmail());
        studentVO.setUsername(currentStudent.getUsername());
        Integer coachid = currentStudent.getCoachid();
        Coach coach = coachService.getById(coachid);
        studentVO.setCoach(coach.getFullname());
        return ResultUtils.success(studentVO);
    }
    @GetMapping("/getquestion")
    public BaseResponse<List<ExamVO>> getQuestion(){
        List<QuestionBank> questionBanks = questionBankService.list();
        Collections.shuffle(questionBanks);
        ArrayList<ExamVO> examVOS = new ArrayList<>();
        for (int i = 0; i < Math.min(questionBanks.size(), 100); i++){
            QuestionBank questionBank = questionBanks.get(i);
            ExamVO examVO = new ExamVO();
            BeanUtils.copyProperties(questionBank,examVO);
            examVOS.add(examVO);
        }
        return ResultUtils.success(examVOS);
    }
    @PostMapping("examrecords")
    public BaseResponse<Boolean> saveExamRecords(@RequestBody ExamRecordRequest examRecordRequest, HttpServletRequest request){
        List<WrongAnswer> wrongAnswers = examRecordRequest.getWrongAnswers();
//        考试记录
        int timer = examRecordRequest.getTimer();
        int score = examRecordRequest.getScore();
        // 获取当前时间
        LocalDateTime currentDateTime = LocalDateTime.now();
// 定义时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
// 格式化当前时间
        String formattedDateTime = currentDateTime.format(formatter);

// 直接减去秒数
        LocalDateTime startDateTime = currentDateTime.minusSeconds(timer);
// 格式化开始时间
        String formattedStartDateTime = startDateTime.format(formatter);
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        String username = currentUser.getUsername();
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        Student currentStudent = studentMapper.selectOne(queryWrapper);
        ExamRecords examRecords = new ExamRecords();
        examRecords.setStudentid(currentStudent.getId());
        examRecords.setEndtime(formattedDateTime);
        examRecords.setStarttime(formattedStartDateTime);
        examRecords.setScore(score);
        examRecordsService.save(examRecords);

//        错题记录
        for (WrongAnswer wrongAnswer : wrongAnswers) {
            // 取出 WrongAnswer 对象中的数据
            int id = wrongAnswer.getId();
            String userSelected = wrongAnswer.getUserSelected();
            MistakeRecords mistakeRecords = new MistakeRecords();
            mistakeRecords.setStudentid(currentStudent.getId());
            mistakeRecords.setQuestionid(id);
            mistakeRecords.setSelectedanswer(userSelected);
            mistakeRecords.setScore(0);
            QuestionBank questionBankServiceById = questionBankService.getById(id);
            mistakeRecords.setAnswer(questionBankServiceById.getAnswer());
            mistakeRecordsService.save(mistakeRecords);
        }
        return ResultUtils.success(true);
    }
    @GetMapping("/getrecords")
    public BaseResponse<List<RecordsVO>> getRecords(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        String username = currentUser.getUsername();
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        Student currentStudent = studentMapper.selectOne(queryWrapper);
        if (currentStudent.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN);
        }
        ArrayList<RecordsVO> recordsVOS = new ArrayList<>();
        List<ExamRecords> list = examRecordsService.list();
        for (ExamRecords examRecords:list){
            RecordsVO recordsVO = new RecordsVO();
            if (examRecords.getStudentid().equals(currentStudent.getId())){
                recordsVO.setId(examRecords.getId());
                recordsVO.setStarttime(examRecords.getStarttime());
                recordsVO.setEndtime(examRecords.getEndtime());
                recordsVO.setScore(examRecords.getScore());
                recordsVOS.add(recordsVO);
            }
        }
        return ResultUtils.success(recordsVOS);
    }
    @GetMapping("/getpractice")
    public BaseResponse<List<TestBank>> getPractice(String id) {
        Integer sid = Integer.valueOf(id);
        // 计算起始 ID
        int startId = (sid - 1) * 10 + 1; // 假设每组十条数据，ID 从 1 开始

        List<TestBank> testBanks = new ArrayList<>();

        // 循环获取对应的数据
        for (int i = startId; i < startId + 10; i++) {
            TestBank testBank = testBankService.getById(i); // 假设您的 TestBankRepository 中有一个 getById 方法
            if (testBank != null) {
                testBanks.add(testBank);
            }
        }
        // 返回测试题数据
        return ResultUtils.success(testBanks);
    }


    @GetMapping("/gettest")
    public BaseResponse<List<TestVO>> getTest() {
        List<TestBank> testBanks = testBankService.list(); // 获取所有测试题数据
        List<TestVO> testGroups = generateTestGroups(testBanks); // 按规则生成测试题分组
        return ResultUtils.success(testGroups);
    }

    // 按照规则生成测试题分组
    private List<TestVO> generateTestGroups(List<TestBank> testBanks) {
        List<TestVO> testGroups = new ArrayList<>();
        int groupIndex = 1;

        for (int i = 0; i < testBanks.size(); i += 10) {
            List<TestBank> groupData = testBanks.subList(i, Math.min(i + 10, testBanks.size())); // 每10题为一组
            TestVO groupDTO = new TestVO();
            groupDTO.setId(groupIndex++);
            groupDTO.setTestname("练习" + groupDTO.getId());
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String format = dateFormat.format(groupData.get(0).getUploadtime());
            groupDTO.setUptime(format); // 取每组第一个题目的上传时间作为组的上传时间
            testGroups.add(groupDTO);
        }

        return testGroups;
    }
    @GetMapping("/getmistakes")
    public BaseResponse<List<MistakeVO>> getMistakes(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        String username = currentUser.getUsername();
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        Student currentStudent = studentMapper.selectOne(queryWrapper);
        if (currentStudent.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN);
        }
        ArrayList<MistakeVO> recordsVOS = new ArrayList<>();
        List<MistakeRecords> list = mistakeRecordsService.getByStudentId(currentStudent.getId());
        System.out.println(list);
        for (MistakeRecords mistakeRecords:list){
            MistakeVO mistakeVO = new MistakeVO();
            mistakeVO.setAnswer(mistakeRecords.getAnswer());
            mistakeVO.setId(mistakeRecords.getId());
            Integer questionid = mistakeRecords.getQuestionid();
            QuestionBank questionBankServiceById = questionBankService.getById(questionid);
            mistakeVO.setQuestion(questionBankServiceById.getQuestiontext());
            mistakeVO.setExplanation(questionBankServiceById.getExplanation());
            mistakeVO.setSelectAnswer(mistakeRecords.getSelectedanswer());
            recordsVOS.add(mistakeVO);
            System.out.println(mistakeVO);
        }
        return ResultUtils.success(recordsVOS);
    }
}
