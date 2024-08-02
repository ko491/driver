package com.graduation.driveexamsys.service;

import com.graduation.driveexamsys.domain.Coach;
import com.baomidou.mybatisplus.extension.service.IService;
import com.graduation.driveexamsys.domain.Student;

/**
* @author LTLB
* @description 针对表【coach(存储教练信息的表)】的数据库操作Service
* @createDate 2023-11-16 22:52:07
*/
public interface CoachService extends IService<Coach> {
    Coach getByFullname(String fullname);
}
