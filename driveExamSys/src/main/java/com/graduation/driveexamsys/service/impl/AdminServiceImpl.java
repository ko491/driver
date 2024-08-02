package com.graduation.driveexamsys.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graduation.driveexamsys.domain.Admin;
import com.graduation.driveexamsys.service.AdminService;
import com.graduation.driveexamsys.mapper.AdminMapper;
import org.springframework.stereotype.Service;

/**
* @author LTLB
* @description 针对表【admin(存储管理员信息的表)】的数据库操作Service实现
* @createDate 2023-11-18 23:56:21
*/
@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin>
    implements AdminService{

}




