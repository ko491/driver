package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.Feedback;
import com.graduation.driveexamsys.service.FeedbackService;
import com.graduation.driveexamsys.mapper.FeedbackMapper;
import org.springframework.stereotype.Service;

/**
* @author LTLB
* @description 针对表【feedback(存储反馈和投诉信息的表)】的数据库操作Service实现
* @createDate 2023-11-18 07:53:47
*/
@Service
public class FeedbackServiceImpl extends ServiceImpl<FeedbackMapper, Feedback>
    implements FeedbackService{

}




