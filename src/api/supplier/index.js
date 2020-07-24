import { get, post, postWithFromDate, put, del } from '@/utils/request'

const prefix = "/jeecg-boot/science/"

export function overview(data) {
  return get(prefix + 'node/overview', data)
}

export function nodes(data) {
  return get(prefix + 'node/nodes', data)
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

export function addNode(data) {
  return put(prefix + 'node/bind?uniqueId=' + data)
}

export function run(data) {
  return put(prefix + 'node/run?uniqueId=' + data)
}

export function stop(data) {
  return put(prefix + 'node/stop?uniqueId=' + data)
}

export function delNode(data) {
  return del(prefix + 'node/delete?id=' + data)
}

export function qrcode(data) {
  return get(prefix + 'qrcode/pull?content=' + data)
}