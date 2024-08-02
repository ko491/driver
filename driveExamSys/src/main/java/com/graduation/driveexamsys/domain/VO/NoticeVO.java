package com.graduation.driveexamsys.domain.VO;

import lombok.Data;

import java.sql.Time;
import java.util.Date;


@Data
public class NoticeVO {
    private String title;
    private String content;
    private String publishtime;
    private String username;
}
