package com.graduation.driveexamsys.service;

import com.graduation.driveexamsys.domain.Student;
import com.graduation.driveexamsys.domain.TestBank;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author LTLB
* @description 针对表【test_bank(存储练习信息的表)】的数据库操作Service
* @createDate 2024-05-13 21:35:07
*/
public interface TestBankService extends IService<TestBank> {
    TestBank getByText(String text);
}
