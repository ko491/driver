import {API} from "@/services/ant-design-pro/typings";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?:  API.CurrentUser} | undefined) {
  const { currentUser } = initialState ?? {};
  // @ts-ignore
  const  { data } = currentUser ?? {};
  return {
    canAdmin: currentUser && data.userRole === 'ADMIN',
    canStudent: currentUser && data.userRole === 'STUDENT',
    canCoach: currentUser && data.userRole === 'COACH',
  };
}
