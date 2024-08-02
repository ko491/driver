package com.graduation.driveexamsys.domain.VO;

import lombok.Data;

import java.util.Date;

@Data
public class TestBankVI {
    /**
     * 题目文本
     */
    private String questiontext;

    /**
     * 答案
     */
    private String answer;

    /**
     * 答案解析
     */
    private String explanation;

    /**
     * 关联教练
     */
    private String createuser;

    /**
     * 上传时间
     */
    private String uptime;
}
