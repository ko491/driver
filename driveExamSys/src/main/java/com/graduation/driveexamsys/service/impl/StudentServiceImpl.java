package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.Student;
import com.graduation.driveexamsys.domain.User;
import com.graduation.driveexamsys.service.StudentService;
import com.graduation.driveexamsys.mapper.StudentMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
* @author LTLB
* @description 针对表【student(存储学员信息的表)】的数据库操作Service实现
* @createDate 2023-11-16 20:58:57
*/
@Service
public class StudentServiceImpl extends ServiceImpl<StudentMapper, Student>
    implements StudentService{


    @Resource
    StudentMapper studentMapper;
    @Override
    public Student getByFullname(String fullname) {
        QueryWrapper<Student> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("fullname",fullname);
        Student student = studentMapper.selectOne(queryWrapper);
        return student;
    }
}




