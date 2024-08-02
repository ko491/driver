package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.Student;
import com.graduation.driveexamsys.domain.TestBank;
import com.graduation.driveexamsys.mapper.StudentMapper;
import com.graduation.driveexamsys.service.TestBankService;
import com.graduation.driveexamsys.mapper.TestBankMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author LTLB
* @description 针对表【test_bank(存储练习信息的表)】的数据库操作Service实现
* @createDate 2024-05-13 21:35:07
*/
@Service
public class TestBankServiceImpl extends ServiceImpl<TestBankMapper, TestBank>
    implements TestBankService{
    @Resource
    TestBankMapper testBankMapper;
    @Override
    public TestBank getByText(String text) {
        QueryWrapper<TestBank> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("questiontext",text);
        TestBank testBank = testBankMapper.selectOne(queryWrapper);
        return testBank;
    }

}




