<template>
  <el-dialog title="登录" :visible.sync="loginFormVisible" :before-close="handleClose">
    <el-form :model="loginForm">
      <el-form-item label="登录名" :label-width="formLabelWidth">
        <el-input v-model="loginForm.userName" auto-complete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" placeholder="" v-model="loginForm.passWord" auto-complete="off" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideLoginDialog">取消</el-button>
      <el-button type="primary" @click="submitLoginForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        passWord: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    loginFormVisible() {
      return this.$store.state.dialog.loginuser;
    }
  },
  methods: {
    handleClose() {
      // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
      console.log(this.$store.state);
      this.hideLoginDialog();
    },
    hideLoginDialog() {
      this.$store.commit("HIDE_DIALOG", { type: "loginuser" });
    },
    submitLoginForm() {
      const self = this;
      // console.log(this.loginForm);
      this.$store
        .dispatch("loginUser", { loginInfo: this.loginForm })
        .then(
          res => {
            console.log(res);
            self.hideLoginDialog();
            self.$message({ message: "登录成功", type: "success" });
          },
          () => {
            self.$message({ message: "登录失败", type: "error" });
          }
        )
        .then(
          () => {
            const path = this.$router.history.current.fullPath;
            this.$store.dispatch("refreshPage", { path });
          },
          () => {
            // self.$message({ message: '登录失败', type: 'error' });
          }
        );
    }
  }
};
</script>

<style scoped lang="scss">
.AvatarMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .avatar {
  }
  .name {
  }
}
</style>
