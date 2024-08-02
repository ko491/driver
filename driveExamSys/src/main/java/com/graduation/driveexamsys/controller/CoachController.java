package com.graduation.driveexamsys.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduation.driveexamsys.common.BaseResponse;
import com.graduation.driveexamsys.common.BusinessException;
import com.graduation.driveexamsys.common.ErrorCode;
import com.graduation.driveexamsys.common.ResultUtils;
import com.graduation.driveexamsys.domain.*;
import com.graduation.driveexamsys.domain.VO.*;
import com.graduation.driveexamsys.domain.request.AddQuestionRequest;
import com.graduation.driveexamsys.mapper.AdminMapper;
import com.graduation.driveexamsys.mapper.CoachMapper;
import com.graduation.driveexamsys.mapper.QuestionBankMapper;
import com.graduation.driveexamsys.service.*;
import com.graduation.driveexamsys.utils.ExamPoi;
import com.graduation.driveexamsys.utils.TestPoi;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static com.graduation.driveexamsys.common.UserCommon.USER_LOGIN_STATE;

@RestController
@RequestMapping("/coach")
public class CoachController {

    @Resource
    UserService userService;

    @Resource
    AdminService adminService;
    @Resource
    QuestionBankService questionBankService;

    @Resource
    CoachService coachService;

    @Resource
    CoachMapper coachMapper;

    @Resource
    TestBankService testBankService;
    @Resource
    ExamRecordsService examRecordsService;

    @Resource
    StudentService studentService;

    @PostMapping("/upexam")
    public Integer upExam(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {
        if (file.isEmpty()){
            return -1;
        }
        User loginUser = userService.getLoginUser(request);
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();
        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        queryWrapper.eq("password",password);
        Coach coach = coachMapper.selectOne(queryWrapper);
        ArrayList<QuestionBank> questionBanks = new ArrayList<>();
        List<QuestionBankVO> questionBankVOs = ExamPoi.POIUtil(file);
        for (QuestionBankVO questionBankVO : questionBankVOs) {
            QuestionBank questionBank = new QuestionBank();
            questionBank.setQuestiontext(questionBankVO.getQuestiontext());
            questionBank.setOptionA(questionBankVO.getOptionA());
            questionBank.setOptionB(questionBankVO.getOptionB());
            questionBank.setOptionC(questionBankVO.getOptionC());
            questionBank.setOptionD(questionBankVO.getOptionD());
            questionBank.setExplanation(questionBankVO.getExplanation());
            questionBank.setAnswer(questionBankVO.getAnswer());
            questionBank.setCoachid(coach.getId());
            questionBanks.add(questionBank);
        }
        for (QuestionBank questionBank : questionBanks) {
            questionBankService.save(questionBank);
        }
        return 0;
    }

    @PostMapping("/uptest")
    public Integer upTest(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {
        if (file.isEmpty()){
            return -1;
        }
        User loginUser = userService.getLoginUser(request);
        String username = loginUser.getUsername();
        String password = loginUser.getPassword();
        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        queryWrapper.eq("password",password);
        Coach coach = coachMapper.selectOne(queryWrapper);
        ArrayList<TestBank> testBanks = new ArrayList<>();
        List<TestBankVO> testBankVOS = TestPoi.POIUtil(file);
        for (TestBankVO testBankVO : testBankVOS) {
            TestBank testBank = new TestBank();
            testBank.setQuestiontext(testBankVO.getQuestiontext());
            testBank.setExplanation(testBankVO.getExplanation());
            testBank.setAnswer(testBankVO.getAnswer());
            testBank.setCoachid(coach.getId());
            testBanks.add(testBank);
        }
        for (TestBank testBank : testBanks) {
            testBankService.save(testBank);
        }
        return 0;
    }

    @GetMapping("/getexam")
    public BaseResponse<List<QuestionBankVI>> getExam(){
        ArrayList<QuestionBankVI> questionBankVIS = new ArrayList<>();
        List<QuestionBank> list = questionBankService.list();
        for (QuestionBank questionBank :list){
            QuestionBankVI questionBankVI = new QuestionBankVI();
            questionBankVI.setId(questionBank.getId());
            questionBankVI.setQuestiontext(questionBank.getQuestiontext());
            questionBankVI.setOptionA(questionBank.getOptionA());
            questionBankVI.setOptionB(questionBank.getOptionB());
            questionBankVI.setOptionC(questionBank.getOptionC());
            questionBankVI.setOptionD(questionBank.getOptionD());
            questionBankVI.setAnswer(questionBank.getAnswer());
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date uploadtime = questionBank.getUploadtime();
            questionBankVI.setUploadtime(dateFormat.format(uploadtime));
            questionBankVI.setExplanation(questionBank.getExplanation());
            Integer coachid = questionBank.getCoachid();
            Coach coach = coachService.getById(coachid);
            questionBankVI.setFullname(coach.getFullname());
            questionBankVIS.add(questionBankVI);
        }
        return ResultUtils.success(questionBankVIS);
    }
    @GetMapping("/gettest")
    public BaseResponse<List<TestBankVI>> getTest(){
        ArrayList<TestBankVI> testBankVIS = new ArrayList<>();
        List<TestBank> list = testBankService.list();
        for (TestBank testBank :list){
            TestBankVI testBankVI = new TestBankVI();
            testBankVI.setQuestiontext(testBank.getQuestiontext());
            testBankVI.setAnswer(testBank.getAnswer());
            testBankVI.setExplanation(testBank.getExplanation());
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date uploadtime = testBank.getUploadtime();
            testBankVI.setUptime(dateFormat.format(uploadtime));
            Integer coachid = testBank.getCoachid();
            Coach coach = coachService.getById(coachid);
            testBankVI.setCreateuser(coach.getFullname());
            testBankVIS.add(testBankVI);
        }
        return ResultUtils.success(testBankVIS);
    }
    @PostMapping("/addquestion")
    public BaseResponse<Long> addQuestion(@RequestBody AddQuestionRequest addQuestionRequest,HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        String username = currentUser.getUsername();
        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        Integer coachid = coachMapper.selectCount(queryWrapper);
        QuestionBank questionBank = new QuestionBank();
        questionBank.setAnswer(addQuestionRequest.getAnswer());
        questionBank.setOptionA(addQuestionRequest.getOptionA());
        questionBank.setOptionB(addQuestionRequest.getOptionB());
        questionBank.setOptionC(addQuestionRequest.getOptionC());
        questionBank.setOptionD(addQuestionRequest.getOptionD());
        questionBank.setExplanation(addQuestionRequest.getExplanation());
        questionBank.setQuestiontext(addQuestionRequest.getQuestiontext());
        questionBank.setCoachid(coachid);
        questionBankService.save(questionBank);
        return ResultUtils.success((long)questionBank.getId());
    }
    @DeleteMapping("/removequestion")
    public BaseResponse<Boolean> removequestion(@RequestBody Map<String, List<Integer>> requestMap){
        List<Integer> ids = requestMap.get("id");
        for (Integer id : ids) {
            questionBankService.removeById(id);
        }
        return ResultUtils.success(true);
    }
    @PostMapping("/updatequestion")
    public BaseResponse<Boolean> updateQuestion(@RequestBody QuestionBankV questionBankV){
        QuestionBank questionBank = new QuestionBank();
        questionBank.setId(questionBankV.getId());
        questionBank.setAnswer(questionBankV.getAnswer());
        questionBank.setExplanation(questionBankV.getExplanation());
        questionBank.setOptionA(questionBankV.getOptionA());
        questionBank.setOptionB(questionBankV.getOptionB());
        questionBank.setOptionC(questionBankV.getOptionC());
        questionBank.setOptionD(questionBankV.getOptionD());
        questionBank.setQuestiontext(questionBankV.getQuestiontext());
        questionBankService.updateById(questionBank);
        return ResultUtils.success(true);
    }
    @PostMapping("/updatetest")
    public BaseResponse<Boolean> updateTest(@RequestBody TestBankVI testBankVI){
        QueryWrapper<TestBank> testBankQueryWrapper = new QueryWrapper<>();
        testBankQueryWrapper.eq("questiontext",testBankVI.getQuestiontext());
        TestBank one = testBankService.getOne(testBankQueryWrapper);
        one.setExplanation(testBankVI.getExplanation());
        one.setAnswer(testBankVI.getAnswer());
        testBankService.updateById(one);
        return ResultUtils.success(true);
    }
    @GetMapping("/currentinfo")
    public BaseResponse<CoachVO> getCurrentUserInfo(HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        String username = currentUser.getUsername();
        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        Coach currentCoach = coachMapper.selectOne(queryWrapper);
        if (currentCoach == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN);
        }
        CoachVO coachVO = new CoachVO();
        coachVO.setAddress(currentCoach.getAddress());
        coachVO.setFullname(currentCoach.getFullname());
        coachVO.setPhone(currentCoach.getPhone());
        coachVO.setPassword(currentCoach.getPassword());
        coachVO.setEmail(currentCoach.getEmail());
        coachVO.setUsername(currentCoach.getUsername());
        Integer adminid = currentCoach.getAdminid();
        Admin admin = adminService.getById(adminid);
        coachVO.setAdmin(admin.getUsername());
        return ResultUtils.success(coachVO);
    }
    @GetMapping("/getscore")
    public BaseResponse<List<StudentScoreVO>> getScore() {
        List<ExamRecords> examRecordsList = examRecordsService.list();

        // 按学生id进行分组，并获取每个学生的最高分
        Map<Integer, Double> maxScoresByStudentId = new HashMap<>();
        for (ExamRecords record : examRecordsList) {
            int studentId = record.getStudentid();
            double score = Double.parseDouble(String.valueOf(record.getScore()));
            if (!maxScoresByStudentId.containsKey(studentId) || score > maxScoresByStudentId.get(studentId)) {
                maxScoresByStudentId.put(studentId, score);
            }
        }

        // 计算总分数
        double totalScore = 0.0;
        for (double score : maxScoresByStudentId.values()) {
            totalScore += score;
        }

        // 将分组结果转换为饼图所需的数据结构，并计算百分比
        List<StudentScoreVO> pieChartDataList = new ArrayList<>();
        for (Map.Entry<Integer, Double> entry : maxScoresByStudentId.entrySet()) {
            int studentId = entry.getKey();
            double score = entry.getValue();
            Student student = studentService.getById(studentId);
            String fullname = student.getFullname();
            double percentage = (score / totalScore) * 100; // 计算百分比
            pieChartDataList.add(new StudentScoreVO(fullname, String.valueOf(score), percentage));
        }

        return ResultUtils.success(pieChartDataList);
    }



}
