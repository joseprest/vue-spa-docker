<template>
  <el-dialog title="更新信息" :visible.sync="updateFormVisible" :before-close="handleClose">
    <el-form :model="updateForm">
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="updateForm.birth" type="date" :placeholder="userInfo.birth?userInfo.birth:'请选择日期'" :default-value="userInfo.birth?userInfo.birth:'1990/02/24'"></el-date-picker>
      </el-form-item>
      <el-form-item label="个人介绍" :label-width="formLabelWidth">
        <el-input :placeholder="userInfo.brief?userInfo.brief:'赶紧写点嘛儿'" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="updateForm.brief"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="updateForm.gender">
          <el-radio label="male"></el-radio>
          <el-radio label="female"></el-radio>
          <el-radio label="other"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像图片" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="//blocks.musixise.com/api/v1/picture/uploadPic"
          name="files"
          :headers="header"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="国籍" :label-width="formLabelWidth">
        <el-select v-model="nationvalue" :placeholder="userInfo.nation?countryMap[userInfo.nation]:'请选择国家'">
          <el-option v-for="country in countries" :key="country.label" :label="country.label" :value="country.value"><flag :iso="country.iso" />{{ country.label }}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideUpdateDialog">取消</el-button>
      <el-button type="primary" @click="submitUpdateForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as Cookies from "js-cookie";
export default {
  data() {
    return {
      header: {
        processData: false,
        // "Content-Type": "multipart/form-data",
        Authorization: Cookies.get("serviceToken")
      },
      imageUrl: "",
      updateFormHeader: {
        dataType: "json",
        type: "POST"
      },
      updateForm: {
        tel: "",
        email: "",
        gender: "",
        birth: "",
        nation: "",
        smallAvatar: "",
        largeAvatar: "",
        brief: ""
      },
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
    updateFormVisible() {
      console.log("gender", this.userInfo.gender);
      this.updateForm.gender = this.userInfo.gender;
      this.imageUrl = this.userInfo.smallAvatar;
      return this.$store.state.dialog.updateuser;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  watch: {
    nationvalue(val) {
      // for no reason.... need to do this, cannot bind directly...
      this.$set(this.updateForm, "nation", val);
      console.log(this.updateForm);
    }
  },
  methods: {
    handleClose() {
      // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
      this.header = {
        processData: false,
        // "Content-Type": "multipart/form-data",
        Authorization: Cookies.get("serviceToken")
      };
      this.hideUpdateDialog();
    },
    handleUploadSuccess(res) {
      this.imageUrl = res.data;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片需为jpg或png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小需小于2MB");
      }
      return isJPG && isLt2M;
    },
    hideUpdateDialog() {
      this.$store.commit("HIDE_DIALOG", { type: "updateuser" });
    },
    submitUpdateForm() {
      const self = this;
      this.$store
        .dispatch("updateUser", {
          updateInfo: { ...this.updateForm, smallAvatar: this.imageUrl }
        })
        .then(
          () => {
            self.hideUpdateDialog();
            self.$message({ message: "更新信息成功", type: "success" });
          },
          () => {
            self.$message({ message: "更新信息失败", type: "error" });
          }
        );
    },
    imageuploaded() {}
  },
  mounted() {
    // others can use placeholder, no interference with two-way binding, but radio, v-model is annoying..
  }
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
