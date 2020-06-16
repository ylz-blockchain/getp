export let validatePhoneNumber = (rule, value, callback) => {
  if (value == undefined || value === '') {
    callback(new Error("手机号不能为空"));
    return;
  }
  let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(value)) {
    callback(new Error("手机格式输入不正确"));
  } else {
    callback();
  }
};

export let validatePass = (rule, value, callback) => {
  let reg = /^[0-9a-zA-Z]\w{5,17}$/
  if (!reg.test(value)) {
    callback(new Error('密码以数字或字母开头,不得包含非法字符,长度在6-18之间'))
  } else {
    callback()
  }
};