export const QUERY_FAILED = {code: 10001, msg: '参数错误'}
export const REQUEST_FAILED = {code: 10002, msg: '请求海纳失败'}

export function setError(ctx, msgData) {
  ctx.status = 400
  ctx.body = msgData
}