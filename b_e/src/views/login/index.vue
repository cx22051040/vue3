<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <div class="jump-link"> 
        <el-link type="primary" @click="handleChange">{{
          formType ? "返回登录" : "注册帐号"
        }}</el-link>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        style="max-width: 600px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="手机号"
            :prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="formType" prop="validCode">
          <el-input
            v-model="loginForm.validCode"
            placeholder="验证码"
            :prefix-icon="Lock"
          >
            <template #append>
              <span @click="countdownChange">{{ countdown.validText }}</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :style="{ width: '100%' }"
            @click="submitForm(loginFormRef)"
          >
            {{ formType ? "注册" : "登录" }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
<script setup>
import { ref, reactive } from "vue";
import { getCode, userAuthentication, login } from "../../api";
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
const imgUrl = new URL("../../../public/vite.svg", import.meta.url).href;
const loginForm = reactive({
  userName: "",
  passWord: "",
  validCode: "",
});
const formType = ref(0);
const handleChange = () => {
  formType.value = formType.value ? 0 : 1;
};
const validateUser = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    const phoneReg =
      /^1(3[0-9]|4[01456789]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    phoneReg.test(value)
      ? callback()
      : callback(new Error("请输入正确的手机号"));
  }
};
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/;
    reg.test(value)
      ? callback()
      : callback(new Error("密码格式不正确,需要4-16位字符"));
  }
};
const rules = reactive({
  userName: [{ validator: validateUser, trigger: "blur" }],
  Password: [{ validator: validatePass, trigger: "blur" }],
});
const countdown = reactive({
  validText: "获取验证码",
  time: 60,
});
let flag = false;
const countdownChange = () => {
  if (flag) return;
  const phoneReg =
    /^1(3[0-9]|4[01456789]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
  if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
    return ElMessage({
      message: "请检查手机号是否正确",
      type: "warning",
    });
  }
  const time = setInterval(() => {
    if (countdown.time <= 0) {
      countdown.time = 60;
      countdown.validText = "获取验证码";
      flag = false;
      clearInterval(time);
    } else {
      countdown.time-=1;
      countdown.validText = `${countdown.time}秒后重新获取`;
    }
  }, 1000);
  flag = true;
  console.log("Sending getCode request...")
  getCode({ tel: loginForm.userName }).then((data) => {
    if (data.code === 10000) {
      ElMessage.success("验证码发送成功");
    }
  });
};
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formType.value) {
        userAuthentication(loginForm).then(({ data }) => {
          if (data.code === 10000) {
            ElMessage.success("注册成功");
            formType.value = 0;
          }
        });
      } else {
        login(loginForm).then(({ data }) => {
          if (data.code === 10000) {
            ElMessage.success("登录成功");
            //将token和用户信息缓存到浏览器
            localStorage.setItem("pz_token", data.data.token);
            localStorage.setItem(
              "pz_userInfo",
              JSON.stringify(data.data.userInfo)
            );
            router.push({ path: "/" });
          }
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const router = useRouter();
const loginFormRef = ref();
</script>
<style lang="less" scoped>
:deep(.el-card_header) {
  padding: 0;
}
.login-container {
  height: 100%;
  .card-header {
    background-color: #899fe1;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
