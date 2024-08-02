package com.graduation.driveexamsys.domain.VO;

import lombok.Data;

@Data
public class TestBankVO {
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
}
