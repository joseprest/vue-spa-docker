<template>
  <el-dialog title="加入Musixise" :visible.sync="registerFormVisible" :before-close="handleClose">
    <el-form :model="registerForm">
      <el-form-item label="登录名" :label-width="formLabelWidth">
        <el-input placeholder="仅限英文数字字符" v-model="registerForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input placeholder="可中文" v-model="registerForm.realname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" :label-width="formLabelWidth">
        <el-input placeholder="email" v-model="registerForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" :label-width="formLabelWidth">
        <el-input type="password" placeholder="请确认密码" v-model="verifypassword" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="国籍" :label-width="formLabelWidth">
        <el-select v-model="nationvalue" placeholder="请选择国家">
          <el-option v-for="country in countries" :label="country.label" :value="country.value"><flag :iso="country.iso" />{{ country.label }}</el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideRegisterDialog">取消</el-button>
      <el-button type="primary" @click="submitRegisterForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        realname: "",
        tel: null,
        email: "",
        gender: null,
        birth: null,
        nation: null,
        smallAvatar: "",
        largeAvatar: "",
        brief: null
      },
      verifypassword: "",
      formLabelWidth: "120px",
      countryMap: {
        Japan: "日本",
        America: "美国",
        China: "中国",
        Germany: "德国"
      },
      countries: [
        {
          value: "China",
          label: "中国",
          iso: "cn"
        },
        {
          value: "Japan",
          label: "日本",
          iso: "jp"
        },
        {
          value: "America",
          label: "美国",
          iso: "us"
        },
        {
          value: "Germany",
          label: "德国",
          iso: "de"
        }
      ],
      nationvalue: ""
    };
  },
  computed: {
    registerFormVisible() {
      return this.$store.state.dialog.registeruser;
    }
  },
  methods: {
    handleClose() {
      // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
      this.hideRegisterDialog();
    },
    hideRegisterDialog() {
      this.$store.commit("HIDE_DIALOG", { type: "registeruser" });
    },
    submitRegisterForm() {
      const self = this;
      if (
        !self.registerForm.username ||
        !self.registerForm.password ||
        !self.verifypassword ||
        !self.registerForm.realname ||
        !self.registerForm.email
      ) {
        self.$message({ message: "请填入必要信息", type: "error" });
        return;
      }
      if (!self.registerForm.username.match(/^[\w\.@]{6,20}$/)) {
        self.$message({ message: "用户名为6-20位数字字母", type: "error" });
        return;
      }
      if (self.verifypassword != self.registerForm.password) {
        self.$message({ message: "两次密码输入不一致", type: "error" });
        return;
      }
      // if (!self.nationvalue) {
      //   self.$message({ message: "请选择国籍", type: "error" });
      //   return;
      // }
      // self.registerForm.nation = self.nationvalue;
      console.log("here");
      this.$store
        .dispatch("registerUser", { registerInfo: this.registerForm })
        .then(
          () => {
            self.hideRegisterDialog();
            self.$message({ message: "注册账号成功", type: "success" });
          },
          errmsg => {
            console.log("fail");
            self.$message({ message: errmsg || "注册账号失败", type: "error" });
          }
        );
    }
  }
};
</script>

<style scoped lang="scss">
</style>
