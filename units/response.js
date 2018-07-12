const MESSAGE_OBJECT = {
  REGISTED_SUCCESS: { code: 200, message: '注册成功' },
  REGISTED_FAILED: { code: 301, message: '注册失败' },
  USER_REGISTED: { code: 301, message: '用户已存在' },
  USER_ACCOUNT_ABNORMALITY: { code: 401, message: '用户账户异常' },
  NO_USERNAME: { code: 301, message: '请输入用户名' },
  NO_PASSWORD: { code: 301, message: '请输入密码' },
  USER_NOT_REGISTERED: { code: 301, message: '用户未注册' },
  LOGIN_SUCCESS: { code: 200, message: '登录成功' },
  USERNAME_OR_PASSWORD_ERROR: { code: 301, message: '用户名或密码错误' },
  ADD_TODO_SUCCESS: { code: 200, message: '添加成功' },
  NO_TOKEN: { code: 301, message: '未获取到token值' },
  NO_COLOR: { code: 301, message: '未获取到color值' },
  NO_CONTENT: { code: 301, message: '未获取到content值' },
  NO_STATUS: { code: 301, message: '未获取到status值' },
  NO_TODOID: { code: 301, message: '未获取到todoId值' },
  SUCCESS: { code: 200, message: '操作成功' },
  UPDATE_SUCCESS: { code: 200, message: '更新成功' },
  COLOR_TYPE_ERROR: { code: 301, message: '颜色非法' },
  STATUS_TYPE_ERROR: { code: 301, message: '状态非法' },
  NO_TEMPLATE: {}
}

const response = (template = 'NO_TEMPLATE', response) => {
  return Object.assign(MESSAGE_OBJECT[template], response)
}

module.exports = response
