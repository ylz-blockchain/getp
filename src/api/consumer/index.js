import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/science/"

export function overview(data) {
  return get(prefix + 'task/overview', data)
}

export function queryBalance(data) {
  return get(prefix + 'wallet/queryBalance', data)
}

export function create(data) {
  return post(prefix + 'task/create', data)
}

export function tasksByUser(data) {
  return get(prefix + 'task/tasksByUser?' + data)
}