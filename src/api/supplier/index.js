import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/science/"

export function overview(data) {
  return get(prefix + 'node/overview', data)
}