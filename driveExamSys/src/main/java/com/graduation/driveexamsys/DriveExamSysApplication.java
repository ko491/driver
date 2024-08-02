package com.graduation.driveexamsys;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@MapperScan("com.graduation.driveexamsys.mapper")
@SpringBootApplication
public class DriveExamSysApplication {

    public static void main(String[] args) {
        SpringApplication.run(DriveExamSysApplication.class, args);
    }

}
