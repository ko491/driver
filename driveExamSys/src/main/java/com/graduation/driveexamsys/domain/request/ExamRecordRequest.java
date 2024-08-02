package com.graduation.driveexamsys.domain.request;


import com.graduation.driveexamsys.domain.WrongAnswer;
import lombok.Data;

import java.util.List;

@Data
public class ExamRecordRequest {
    private List<WrongAnswer> wrongAnswers;
    private int score;
    private int timer;
}
