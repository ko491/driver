package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.QuestionBank;
import com.graduation.driveexamsys.service.QuestionBankService;
import com.graduation.driveexamsys.mapper.QuestionBankMapper;
import org.springframework.stereotype.Service;

/**
* @author LTLB
* @description 针对表【question_bank(存储题库信息的表)】的数据库操作Service实现
* @createDate 2023-11-18 06:18:19
*/
@Service
public class QuestionBankServiceImpl extends ServiceImpl<QuestionBankMapper, QuestionBank>
    implements QuestionBankService{

}




