package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 存储模拟考试记录的表
 * @TableName mistake_records
 */
@TableName(value ="mistake_records")
@Data
public class MistakeRecords implements Serializable {
    /**
     * 考试记录ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 关联学员
     */
    private Integer studentid;

    /**
     * 关联题库中的题目
     */
    private Integer questionid;

    /**
     * 学员选择的答案
     */
    private String selectedanswer;

    /**
     * 考试得分
     */
    private Integer score;

    /**
     * 正确答案
     */
    private String answer;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}