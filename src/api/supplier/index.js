import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/science/"

export function overview(data) {
  return get(prefix + 'node/overview', data)
}

export function nodes(data) {
  return get(prefix + 'node/nodes', data)
}

export function supplierCenter(data) {
  return get(prefix + 'user/center', data)
}

export function integralHistory(data) {
  return get(prefix + 'integral/history', data)
}

export function tasks(data) {
  return get(prefix + 'task/tasks', data)
}

export function nodeDetail(data) {
  return get(prefix + 'node/detail', data)
}