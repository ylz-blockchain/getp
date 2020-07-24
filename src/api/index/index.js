import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/science/"

export function info(data) {
  return get(prefix + 'monitor/info', data)
}

export function center(data) {
  return get(prefix + 'user/center', data)
}