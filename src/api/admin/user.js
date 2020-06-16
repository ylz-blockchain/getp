import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/sys/user/"

export function queryUserByToken(data) {
  return get(prefix + 'queryUserByToken', data)
}