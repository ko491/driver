package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 存储练习信息的表
 * @TableName test_bank
 */
@TableName(value ="test_bank")
@Data
public class TestBank implements Serializable {
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
    private Integer isdeleted;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
