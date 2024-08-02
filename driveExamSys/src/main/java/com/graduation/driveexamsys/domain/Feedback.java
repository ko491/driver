package com.graduation.driveexamsys.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 存储反馈和投诉信息的表
 * @TableName feedback
 */
@TableName(value ="feedback")
@Data
public class Feedback implements Serializable {
    /**
     * 反馈/投诉ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 关联学员
     */
    private Integer studentid;

    /**
     * 反馈或投诉内容
     */
    private String content;

    /**
     * 时间戳
     */
    private Date updatetime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}