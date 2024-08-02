package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

import javax.persistence.Column;

/**
 * 存储题库信息的表
 * @TableName question_bank
 */
@TableName(value ="question_bank")
@Data
public class QuestionBank implements Serializable {
    /**
     * 题目ID
     */
    @TableId(type = IdType.AUTO)
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
    private Integer coachid;

    /**
     * 上传时间
     */
    private Date uploadtime;
    /**
     * 是否删除，FALSE 表示未删除，TRUE 表示已删除
     */
    @TableLogic
    private Integer isdeleted;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}