package com.graduation.driveexamsys;

import com.graduation.driveexamsys.domain.Admin;
import com.graduation.driveexamsys.domain.Announcement;
import com.graduation.driveexamsys.domain.Coach;
import com.graduation.driveexamsys.mapper.AdminMapper;
import com.graduation.driveexamsys.service.AdminService;
import com.graduation.driveexamsys.service.AnnouncementService;
import com.graduation.driveexamsys.service.CoachService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.xml.transform.Result;

import java.util.ArrayList;
import java.util.List;

import static com.sun.javafx.font.FontResource.SALT;

@SpringBootTest
class DriveExamSysApplicationTests {
    @Resource
    CoachService coachService;

    @Resource
    AnnouncementService announcementService;

    @Resource
    AdminService adminService;
    /**
     * 盐值，混淆密码
     */
    private static final String SALT = "qwer";
//    @Test
//    void contextLoads() {
//        for (int i = 1; i < 21; i++) {
//            Coach coach = new Coach();
//            coach.setUsername("coach"+i );
//            String password = "coach"+i;
//            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
//            coach.setPassword(encryptPassword);
//            coachService.save(coach);
//        }
//
//
//    }
    @Test
    void addAdmin() {
        for (int i = 1; i < 21; i++) {
            Admin admin = new Admin();
            admin.setUsername("admin"+i);
            String password = "admin"+i;
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());
            admin.setPassword(encryptPassword);
            adminService.save(admin);
        }
    }

}
