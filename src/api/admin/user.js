import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/sys/"

export function queryUserByToken(data) {
  return get(prefix + 'user/queryUserByToken', data)
}

export function randomImage(data) {
  return get(prefix + 'randomImage/' + data)
}

export function checkCaptcha(data) {
  return post(prefix + 'checkCaptcha', data)
}

export function changeUserInfo(data) {
  return put(prefix + 'user/changeUserInfo', data)
}