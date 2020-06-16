import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/science/"

export function login(data) {
  return post(prefix + 'login', data)
}

export function sms(data) {
  return get(prefix + 'sms', data)
}

export function changePassword(data) {
  return post(prefix + 'changePassword', data)
}

export function register(data) {
  return post(prefix + 'register', data)
}