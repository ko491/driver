package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName exam_records
 */
@TableName(value ="exam_records")
@Data
public class ExamRecords implements Serializable {
    /**
     * 自增ID字段从1开始
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 答题学生的id
     */
    private Integer studentid;

    /**
     * 考试开始时间
     */
    private String starttime;

    /**
     * 考试结束时间
     */
    private String endtime;

    /**
     * 考试得分
     */
    private Integer score;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}