package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.Coach;
import com.graduation.driveexamsys.domain.Student;
import com.graduation.driveexamsys.mapper.StudentMapper;
import com.graduation.driveexamsys.service.CoachService;
import com.graduation.driveexamsys.mapper.CoachMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author LTLB
* @description 针对表【coach(存储教练信息的表)】的数据库操作Service实现
* @createDate 2023-11-16 22:52:07
*/
@Service
public class CoachServiceImpl extends ServiceImpl<CoachMapper, Coach>
    implements CoachService{
    @Resource
    CoachMapper coachMapper;
    @Override
    public Coach getByFullname(String fullname) {
        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("fullname",fullname);
        Coach coach = coachMapper.selectOne(queryWrapper);
        return coach;
    }
}




