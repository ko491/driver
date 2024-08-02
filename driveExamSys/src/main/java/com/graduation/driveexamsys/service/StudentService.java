package com.graduation.driveexamsys.service;

import com.graduation.driveexamsys.domain.Student;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author LTLB
* @description 针对表【student(存储学员信息的表)】的数据库操作Service
* @createDate 2023-11-16 20:58:57
*/
public interface StudentService extends IService<Student> {
    Student getByFullname(String fullname);

}
