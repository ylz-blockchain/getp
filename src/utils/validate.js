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

export let validateEmail = (rule, value, callback) => {
  if (value == undefined || value === '') {
    callback(new Error("邮箱号不能为空"));
    return;
  }

  var emailVaildate = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!emailVaildate.test(value)) {
    callback(new Error('邮箱格式不正确'));
  }
  callback();
}