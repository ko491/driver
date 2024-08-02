package com.graduation.driveexamsys.domain.VO;


import lombok.Data;

@Data
public class ExamVO {

    private Integer id;
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

    private String answer;
}
