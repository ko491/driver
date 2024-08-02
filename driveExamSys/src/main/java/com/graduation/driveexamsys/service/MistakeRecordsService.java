package com.graduation.driveexamsys.service;

import com.graduation.driveexamsys.domain.MistakeRecords;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
* @author LTLB
* @description 针对表【mistake_records(存储模拟考试记录的表)】的数据库操作Service
* @createDate 2023-12-09 05:32:10
*/
public interface MistakeRecordsService extends IService<MistakeRecords> {
    List<MistakeRecords> getByStudentId(Integer id);
}
