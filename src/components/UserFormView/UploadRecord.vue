<template>
  <el-dialog title="上传作品" :visible.sync="UploadRecordFormVisible" :before-close="handleClose">
    <el-form :model="uploadRecordForm">
      <!-- <el-form-item label="头像更新" :label-width="formLabelWidth">
        <vue-core-image-upload :class="['btn', 'btn-primary']" inputOfFile="file" :crop="false" :header="updateFormHeader" @imageuploaded="imageuploaded" :max-file-size="5242880" url="//api.musixise.com/api/picture/uploadPic" ></vue-core-image-upload>
      </el-form-item> -->
      <el-form-item label="作品名称" :label-width="formLabelWidth">
        <el-input placeholder="为你的作品起个名..." v-model="uploadRecordForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作品图片" :label-width="formLabelWidth">
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
      <el-form-item label="作品介绍" :label-width="formLabelWidth">
        <el-input placeholder="为你的作品加点介绍..." type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="uploadRecordForm.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideUploadRecordDialog">取消</el-button>
      <el-button type="primary" @click="submitUploadRecordForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as Cookies from "js-cookie";
import Blockly from "node-blockly/browser"; // import Blockly

export default {
  data() {
    return {
      // updateFormHeader: {
      //   dataType: 'json',
      //   type: 'POST',
      // },
      imageUrl: "",
      uploadRecordForm: {
        title: "",
        content: ""
      },
      header: {
        processData: false,
        // "Content-Type": "multipart/form-data",
        Authorization: Cookies.get("serviceToken")
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    UploadRecordFormVisible() {
      return this.$store.state.dialog.uploadrecord;
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
      this.hideUploadRecordDialog();
    },
    hideUploadRecordDialog() {
      this.$store.commit("HIDE_DIALOG", { type: "uploadrecord" });
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
    submitUploadRecordForm() {
      const self = this;
      const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()); // 当前workspace的block转成xml dom
      const record = Blockly.Xml.domToText(xml);
      this.$store
        .dispatch("uploadRecord", {
          record,
          info: { ...this.uploadRecordForm, cover: this.imageUrl }
        })
        .then(
          () => {
            self.hideUploadRecordDialog();
            self.$message({ message: "上传作品成功", type: "success" });
          },
          () => {
            self.$message({ message: "上传作品失败", type: "error" });
          }
        );
    },
    imageuploaded() {}
  },
  mounted() {}
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
