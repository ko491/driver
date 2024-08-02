package com.graduation.driveexamsys.domain.VO;


import lombok.Data;

@Data
public class QuestionBankVO {
    /**
     * 题目文本
     */
    private String questiontext;

    /**
     * 选项A
     */
    private String optionA;

    /**
     * 选项B
     */
    private String optionB;

    /**
     * 选项C
     */
    private String optionC;

    /**
     * 选项D
     */
    private String optionD;

    /**
     * 答案
     */
    private String answer;

    /**
     * 答案解析
     */
    private String explanation;
}
