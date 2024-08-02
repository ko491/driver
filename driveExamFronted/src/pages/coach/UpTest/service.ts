// @ts-ignore
import { request } from 'umi';

export async function SubmitForm(params: any) {
  return request('/api/coach/uploadFile', {
    method: 'POST',
    data: params,
  });
}
