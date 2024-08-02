package com.graduation.driveexamsys.domain.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentScoreVO {
    private String username;
    private String score;
    private Double percent;
}
