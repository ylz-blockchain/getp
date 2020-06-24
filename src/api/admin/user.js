import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/sys/"

export function queryUserByToken(data) {
  return get(prefix + 'user/queryUserByToken', data)
}

export function randomImage(data) {
  return get(prefix + 'randomImage/' + data)
}