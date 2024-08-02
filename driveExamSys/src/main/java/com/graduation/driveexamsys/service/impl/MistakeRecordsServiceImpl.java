package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.Coach;
import com.graduation.driveexamsys.domain.MistakeRecords;
import com.graduation.driveexamsys.mapper.CoachMapper;
import com.graduation.driveexamsys.service.MistakeRecordsService;
import com.graduation.driveexamsys.mapper.MistakeRecordsMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
* @author LTLB
* @description 针对表【mistake_records(存储模拟考试记录的表)】的数据库操作Service实现
* @createDate 2023-12-09 05:32:10
*/
@Service
public class MistakeRecordsServiceImpl extends ServiceImpl<MistakeRecordsMapper, MistakeRecords>
    implements MistakeRecordsService{
    @Resource
    MistakeRecordsMapper mistakeRecordsMapper;
    @Override
    public List<MistakeRecords> getByStudentId(Integer id) {
        List<MistakeRecords> list = mistakeRecordsMapper.selectList(null);
        ArrayList<MistakeRecords> objects = new ArrayList<>();
        for (MistakeRecords mistakeRecords:list) {
            if (mistakeRecords.getStudentid().equals(id)){
                objects.add(mistakeRecords);
            }
        }
        return objects;
    }

}




