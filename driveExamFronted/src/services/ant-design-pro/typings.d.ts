// @ts-ignore
/* eslint-disable */

import {TableListItem} from "@/pages/admin/UserList/data";
import {updateUserInfo} from "@/services/ant-design-pro/api";

declare namespace API {
  type CurrentUser = {
    data: any;
    id: number;
    username: string;
    password: string;
    userRole: string;
  };
  type CurrentInfo = {
    fullname: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    coach: string;
  };
  type CurrentCoachInfo = {
    fullname: string;
    username: string;
    password: string;
    address: string;
    phone: string;
    email: string;
    admin: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    // 当前权限
    currentAuthority?: string;
  };
  type RegisterResult = number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };
  /**
   * 学员表格
   */
  type TableListItem = {
    username?: string;
    password?: string;
    fullname?: string;
    phone?: string;
    email?: string;
    coach?: string;
    pageSize?: number;
    currentPage?: number;
  };
  /**
   * 教练表格
   */
  type TableListItemCoach = {
    id?: string;
    fullname?: string;
    phone?: string;
    email?: string;
    address?: string;
    username?: string;
    password?: string;
    admin?: string;
  };
  type AddCoach = {
    fullname?: string;
    phone?: string;
    email?: string;
    address?: string;
    username?: string;
    password?: string;
  };
  type updateCoach = {
    id?: string;
    fullname?: string;
    phone?: string;
    email?: string;
    address?: string;
    username?: string;
    password?: string;
  };
  /**
   * 学员表格
   */
  type TableListItemStudent = {
    id?: string;
    fullname?: string;
    phone?: string;
    email?: string;
    username?: string;
    password?: string;
    coach?: string;
  };
  type AddStudent = {
    fullname?: string;
    phone?: string;
    email?: string;
    username?: string;
    password?: string;
  };
  type updateStudent = {
    id?: string;
    fullname?: string;
    phone?: string;
    email?: string;
    username?: string;
    password?: string;
  };
  /**
   * 题库表格
   */
  type TableListItemQuestion = {
    id?: string;
    questiontext?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    answer?: string;
    explanation?: string;
    fullname?: string;
    uploadtime?: string;
  };

  type AddQuestion = {
    questiontext?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    answer?: string;
    explanation?: string;
  };
  type updateQuestion = {
    id?: string;
    questiontext?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    answer?: string;
    explanation?: string;
  };
  type updateTestList = {
    questiontext?: string;
    answer?: string;
    explanation?: string;
    uptime?: string;
    creatruser?: string;
  };
  type updateUserInfo = {
    id?: string;
    questiontext?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    answer?: string;
    explanation?: string;
  };
  type TableListPagination = {
    pageSize: number;
    current: number;
  };
  type TableListData = {
    list: TableListItem[];
    pagination: Partial<TableListPagination>;
  };

  type TableListParams = {
    status?: string;
    name?: string;
    desc?: string;
    key?: number;
    pageSize?: number;
    currentPage?: number;
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };
  type NoticeParams = {
    title?: string;
    content?: string;
    publishtime?: string;
    username?: string;
  };
  type FeedParams = {
    content?: string;
    publishtime?: string;
    username?: string;
  };
  type QuestionParams = {
    id?: string;
    questiontext?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    answer?: string;
  };
  type StudentScore = {
    data: any;
    username?: string;
    score?: string;
    percent?: string;
  };
  type TableListItemExam = {
    score?: string,
    endtime?: string,
    starttime?: string;
    id?: string;
  };
  type TableListItemTest = {
    id?: string;
    testname?: string;
    uptime?: string;
    starttest?: string;
  };
  type TableListItemPractice = {
    id?: string;
    testname?: string;
    uptime?: string;
    starttest?: string;
  };
  type TableListPractice = {
    id?: string;
    testname?: string;
    uptime?: string;
    starttest?: string;
  };
  type TableListItemMistake = {
    id?: string,
    question?: string,
    selectAnswer?: string,
    answer?: string,
    explanation?: string,
  }


  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    [x: string]: any;
    code: number,
    data: T,
    message: string,
    description: string,
  }

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };


  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    // 登录方式
    type?: string;
  };

  type RegisterParams = {
    role?: string;
    username?: string;
    password?: string;
    checkPassword?: string;
    fullname?: string;
    phone?: string;
    email?: string;
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };


  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
