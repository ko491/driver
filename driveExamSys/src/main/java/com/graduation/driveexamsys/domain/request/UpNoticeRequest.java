package com.graduation.driveexamsys.domain.request;


import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class UpNoticeRequest {

    /**
     *
     */
    private String title;

    /**
     *
     */
    private String content;

    /**
     *
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date publishtime;

}
