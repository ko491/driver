create table admin
(
    id       int auto_increment comment '管理员ID'
        primary key,
    username varchar(50)                 not null comment '管理员用户名',
    password varchar(255)                not null comment '加密后的密码',
    userRole varchar(20) default 'ADMIN' null comment '角色：ADMIN（管理员）'
)
    comment '存储管理员信息的表';

create definer = root@localhost trigger sync_admin
    after insert
    on admin
    for each row
    INSERT INTO user (username, password, userRole) VALUES (NEW.username, NEW.password, NEW.userRole);
CREATE DEFINER = root@localhost TRIGGER update_sync_admin
    AFTER UPDATE
    ON admin
    FOR EACH ROW
BEGIN
    UPDATE user
    SET username = NEW.username,
        password = NEW.password,
        userRole = NEW.userRole
    WHERE username = OLD.username; -- 假设 username 是用作关联的字段
END;

create table announcement
(
    id              int auto_increment
        primary key,
    title           varchar(255)                        not null,
    content         text                                not null,
    publishTime     timestamp default CURRENT_TIMESTAMP not null,
    administratorId int                                 null,
    constraint announcement_ibfk_1
        foreign key (administratorId) references admin (id)
);

create index administratorId
    on announcement (administratorId);

create table coach
(
    id        int auto_increment comment '教练ID'
        primary key,
    fullname  varchar(100)                null comment '教练姓名',
    phone     varchar(20)                 null comment '联系方式',
    address   varchar(255)                null comment '常住地址',
    username  varchar(50)                 not null comment '教练用户名',
    password  varchar(255)                not null comment '加密后的密码',
    email     varchar(100)                null comment '教练电子邮件',
    userRole  varchar(20) default 'COACH' null comment '角色：COACH（教练）',
    isDeleted tinyint(1)  default 0       null comment '是否删除，FALSE 表示未删除，TRUE 表示已删除',
    adminId   int                         null comment '关联管理员',
    constraint coach_ibfk_1
        foreign key (adminId) references admin (id)
)
    comment '存储教练信息的表';

create index adminId
    on coach (adminId);

create definer = root@localhost trigger sync_coach
    after insert
    on coach
    for each row
    INSERT INTO user (username, password, userRole) VALUES (NEW.username, NEW.password, NEW.userRole);
CREATE DEFINER = root@localhost TRIGGER update_sync_coach
    AFTER UPDATE
    ON coach
    FOR EACH ROW
BEGIN
    UPDATE user
    SET username = NEW.username,
        password = NEW.password,
        userRole = NEW.userRole
    WHERE username = OLD.username; -- 假设 username 是用作关联的字段
END;

create table exam_records
(
    id        int auto_increment comment '自增ID字段从1开始'
        primary key,
    studentId int      not null comment '答题学生的id',
    startTime datetime not null comment '考试开始时间',
    endTime   datetime not null comment '考试结束时间',
    score     int      not null comment '考试得分'
);

create table question_bank
(
    id           int auto_increment comment '题目ID'
        primary key,
    questiontext text                                 not null comment '题目文本',
    optionA      varchar(255)                         not null comment '选项A',
    optionB      varchar(255)                         not null comment '选项B',
    optionC      varchar(255)                         not null comment '选项C',
    optionD      varchar(255)                         not null comment '选项D',
    answer       varchar(255)                         not null comment '答案',
    explanation  text                                 null comment '答案解析',
    coachId      int                                  null comment '关联教练',
    uploadTime   timestamp  default CURRENT_TIMESTAMP not null comment '上传时间',
    isDeleted    tinyint(1) default 0                 null comment '是否删除，FALSE 表示未删除，TRUE 表示已删除',
    constraint question_bank_ibfk_1
        foreign key (coachId) references coach (id)
)
    comment '存储题库信息的表';

create table test_bank
(
    id           int auto_increment comment '题目ID'
        primary key,
    questiontext text                                 not null comment '题目文本',
    answer       varchar(255)                         not null comment '答案',
    explanation  text                                 null comment '答案解析',
    coachId      int                                  null comment '关联教练',
    uploadTime   timestamp  default CURRENT_TIMESTAMP not null comment '上传时间',
    isDeleted    tinyint(1) default 0                 null comment '是否删除，FALSE 表示未删除，TRUE 表示已删除',
    constraint test_bank_ibfk_1
        foreign key (coachId) references coach (id)
)
    comment '存储练习信息的表';
create index coachId
    on question_bank (coachId);

create table student
(
    id        int auto_increment comment '学员ID'
        primary key,
    fullname  varchar(100)                  null comment '学员姓名',
    phone     varchar(20)                   null comment '联系方式',
    username  varchar(50)                   not null comment '学员用户名',
    password  varchar(255)                  not null comment '加密后的密码',
    email     varchar(100)                  null comment '学员电子邮件',
    userRole  varchar(20) default 'STUDENT' null comment '角色：STUDENT（学员）',
    isDeleted tinyint(1)  default 0         null comment '是否删除，FALSE 表示未删除，TRUE 表示已删除',
    coachId   int                           null comment '关联主教练',
    constraint student_ibfk_1
        foreign key (coachId) references coach (id)
)
    comment '存储学员信息的表';

create table feedback
(
    id         int auto_increment comment '反馈/投诉ID'
        primary key,
    studentId  int                                 null comment '关联学员',
    content    text                                not null comment '反馈或投诉内容',
    updateTime timestamp default CURRENT_TIMESTAMP not null comment '时间戳',
    constraint feedback_ibfk_1
        foreign key (studentId) references student (id)
)
    comment '存储反馈和投诉信息的表';

create index studentId
    on feedback (studentId);

create table mistake_records
(
    id             int auto_increment comment '考试记录ID'
        primary key,
    studentId      int          null comment '关联学员',
    questionId     int          null comment '关联题库中的题目',
    selectedAnswer varchar(255) null comment '学员选择的答案',
    score          int          null comment '考试得分',
    answer         varchar(10)  null comment '正确答案',
    constraint mistake_records_ibfk_1
        foreign key (studentId) references student (id),
    constraint mistake_records_ibfk_2
        foreign key (questionId) references question_bank (id)
)
    comment '存储模拟考试记录的表';

create index questionId
    on mistake_records (questionId);

create index studentId
    on mistake_records (studentId);

create index coachId
    on student (coachId);

create definer = root@localhost trigger sync_student
    after insert
    on student
    for each row
    INSERT INTO user (username, password, userRole) VALUES (NEW.username, NEW.password, NEW.userRole);
CREATE DEFINER = root@localhost TRIGGER update_sync_student
    AFTER UPDATE
    ON student
    FOR EACH ROW
BEGIN
    UPDATE user
    SET username = NEW.username,
        password = NEW.password,
        userRole = NEW.userRole
    WHERE username = OLD.username; -- 假设 username 是用作关联的字段
END;
create table user
(
    id       int auto_increment comment 'ID'
        primary key,
    username varchar(50)  not null comment '用户名',
    password varchar(255) not null comment '密码',
    userRole varchar(20)  null comment '用户角色'
)
    comment '同步用户表';
INSERT INTO admin (username, password) VALUES ('admin1','admin1');
INSERT INTO coach (fullname, phone, address, username, password, email, userRole, isDeleted, adminId) VALUES
                                                                                                          ('John Smith', '123-456-7890', '123 Main St, Cityville', 'coach1', 'hashed_password_1', 'john.smith@example.com', 'COACH', 0, 1),
                                                                                                          ('Ava King', '654-789-0123', '159 Poplar St, Fieldtown', 'coach11', 'hashed_password_10', 'ava.king@example.com', 'COACH', 0, 1),
                                                                                                          ('Emily Johnson', '456-789-0123', '456 Oak St, Townsville', 'coach3', 'hashed_password_2', 'emily.johnson@example.com', 'COACH', 0, 1),
                                                                                                          ('Michael Williams', '789-012-3456', '789 Elm St, Villageton', 'coach4', 'hashed_password_3', 'michael.williams@example.com', 'COACH', 0, 1),
                                                                                                          ('Emma Brown', '321-654-9870', '321 Pine St, Hamletville', 'coach5', 'hashed_password_4', 'emma.brown@example.com', 'COACH', 0, 1),
                                                                                                          ('Daniel Miller', '654-987-0123', '654 Cedar St, Countryville', 'coach6', 'hashed_password_5', 'daniel.miller@example.com', 'COACH', 0, 1),
                                                                                                          ('Olivia Garcia', '987-012-3456', '987 Birch St, Seaville', 'coach7', 'hashed_password_6', 'olivia.garcia@example.com', 'COACH', 0, 1),
                                                                                                          ('James Martinez', '789-456-1230', '741 Maple St, Mountainville', 'coach8', 'hashed_password_7', 'james.martinez@example.com', 'COACH', 0, 1),
                                                                                                          ('Sophia Hernandez', '123-789-4560', '852 Walnut St, Rivertown', 'coach9', 'hashed_password_8', 'sophia.hernandez@example.com', 'COACH', 0, 1),
                                                                                                          ('Benjamin Young', '456-012-7890', '963 Cherry St, Lakeside', 'coach10', 'hashed_password_9', 'benjamin.young@example.com', 'COACH', 0, 1);


