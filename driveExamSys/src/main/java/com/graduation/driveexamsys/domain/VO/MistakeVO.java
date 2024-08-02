package com.graduation.driveexamsys.domain.VO;


import lombok.Data;

@Data
public class MistakeVO {
    private Integer id;
    private String question;
    private String selectAnswer;
    private String answer;
    private String explanation;
}
