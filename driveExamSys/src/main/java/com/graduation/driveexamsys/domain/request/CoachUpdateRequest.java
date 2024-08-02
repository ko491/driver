package com.graduation.driveexamsys.domain.request;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

@Data
public class CoachUpdateRequest {

    /**
     * 教练ID
     */
    private Integer id;

    /**
     * 教练姓名
     */
    private String fullname;

    /**
     * 联系方式
     */
    private String phone;

    /**
     * 常住地址
     */
    private String address;

    /**
     * 教练用户名
     */
    private String username;

    /**
     * 加密后的密码
     */
    private String password;

    /**
     * 教练电子邮件
     */
    private String email;



    /**
     * 关联管理员
     */
    private Integer adminid;


    private static final long serialVersionUID = 1L;
}
