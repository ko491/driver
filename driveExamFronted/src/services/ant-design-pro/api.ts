// @ts-ignore
/* eslint-disable */
// @ts-ignore
import { request } from 'umi';
import {API} from "@/services/ant-design-pro/typings";

/** 获取当前的用户权限 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/login/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/user/current */
export async function currentUserInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentInfo>>('/api/student/currentinfo', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function currentCoachInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentCoachInfo>>('/api/coach/currentinfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/login/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function userRegister(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/login/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
// 定义一个前端接口函数，用来上传文件
export async function uploadExam(file: File) {
  // 使用 request 方法，发送 POST 请求，传入后端接口地址和文件
  return request('/api/coach/upexam', {
    method: 'POST',
    data: file,
  });
}
export async function upNotice(body: API.NoticeParams, options?: { [key: string]: any }) {
  return request('/api/admin/upnotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function upFeed(body: API.NoticeParams, options?: { [key: string]: any }) {
  return request('/api/student/upfeed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeParams>('/api/student/getnotice', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getFeed(options?: { [key: string]: any }) {
  return request<API.FeedParams>('/api/admin/getfeed', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */
export async function allquestion(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: API.TableListItemQuestion[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/coach/getexam', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function alltest(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: API.updateTestList[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/coach/gettest', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateQuestion(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.updateQuestion>('/api/coach/updatequestion', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
export async function updateTest(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.updateTestList>('/api/coach/updatetest', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateUserInfo(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.updateUserInfo>('/api/student/updatequestion', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function addQuestion(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.TableListItemQuestion>('/api/coach/addquestion', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeQuestion(data: { id: string[] }, options?: { [p: string]: any }) {
  return request<Record<string, any>>('/api/coach/removequestion', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function allCoach(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: API.TableListItemCoach[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/admin/allcoach', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateCoach(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.updateCoach>('/api/admin/updatecoach', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function addCoach(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.AddCoach>('/api/admin/addcoach', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeCoach(data: { id: string[] }, options?: { [p: string]: any }) {
  return request<Record<string, any>>('/api/admin/deletecoach', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function allStudent(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: API.TableListItemStudent[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/admin/allstudent', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateStudent(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.updateStudent>('/api/admin/updatestudent', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addStudent(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.AddStudent>('/api/admin/addstudent', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeStudent(data: { id: string[] }, options?: { [p: string]: any }) {
  return request<Record<string, any>>('/api/admin/deletestudent', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function getExamQuestions(options?: { [key: string]: any }) {
  return request<API.QuestionParams>('/api/student/getquestion', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getStudentScores(options?: { [key: string]: any }) {
  return request<API.StudentScore>('/api/coach/getscore', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function examRecord(wrongAnswers: { [key: string]: any }[], score: number, timer: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<any>>('/api/student/examrecords', {
    data: {
      wrongAnswers, // 将 wrongAnswers 添加到请求数据中
      score, // 将 score 添加到请求数据中
      timer,
    },
    method: 'POST',
    ...(options || {}),
  });
}
export async function getRecords(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
},options?: { [key: string]: any },
  ) {
  return request<{
    data: API.TableListItemExam[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/student/getrecords', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getPractice(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: API.TableListPractice[];
    total?: number;
    success?: boolean;
  }>('/api/student/getpractice', {
    method: 'GET',
    params: params, // 直接传递 params 对象
    ...(options || {}),
  });
}

export async function getTest(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },options?: { [key: string]: any },
) {
  return request<{
    data: API.TableListItemTest[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/student/gettest', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function allMistake(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },options?: { [key: string]: any },
) {
  return request<{
    data: API.TableListItemMistake[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/student/getmistakes', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

