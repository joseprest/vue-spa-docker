<template>
<div class="">
  <div class="" v-if="!userInfo.userId">
    <el-popover ref="user-popover" placement="bottom" title="" width="200" trigger="hover" v-model="popoverVisible">
      <el-menu>
        <el-menu-item @click="login" index="1">
          <i class="el-icon-menu"></i><span>登录</span>
        </el-menu-item>
        <el-menu-item @click="register" index="2">
          <i class="el-icon-menu"></i><span>注册</span>
        </el-menu-item>
      </el-menu>
    </el-popover>
    <div class="AvatarMenu">
      <img class="avatar" v-popover:user-popover src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX6+vrU1NT5+fn29vbV1dXZ2dnR0dHc3Nzz8/Pu7u7h4eHl5eXp6ene3t709PT9/f2cvFNtAAAFj0lEQVR4nO2d2bLiIBCGDQQSCJH3f9uJSgMu4zEBTMf6v6upKY00vbJ0zukEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAFx/YexwtWKQajZvmC3Zy5vxbcgpprNJad8Tyb60mI8XeI6uDdIt43SuUNXLv0RXjpVUvpbvRq+l0bGsd59faS+huGvce5Xak7f+Q7yqjcke1Vfdknzrw+P/DeERTlcO9IEoNS5a44Jwd1L129XQ8NZpcgVpZN8oUU/xJGmf7fArmg3mjd5mO9PAy84nR5VlEHcpSxZSG3s/n/w7dmzmbCffNIZYhpqQ/a95/NLPm3h1Fi37KBv1nYSbTpztzEBFdNNFZfjBkP0Y19u8VzgUTXWv6sLI+zynctB1bFZJGPo8cwpLaVcOR1SJqcI1TeRsjU7uRVSLmiXWBUZCI7F0xOuG08ouCfFHxrt/kEIxtrYALiuyUdcpwpIgN+xOkfn2uP656kI1uciZK/ZyDDeX6DTZ6Sq7IONiIoSxYjDRBbPfggifprYsEXzhDzYk5bXMwHLuyKWqNVCFTbJaQPFExTRjm5kZ9QfUcso3maaY+KMAWxAkyA55m6lcvKV48I7jyXG1UNZE3Iy1b4oWMyjOahsENRclM1JimRtDuTFnh7Hu+ZU0INIVBgsIVx1ATSjZdNvtkCdsq27ZQoC+MEcGbS1JOK85BwsKhhbJhZihh2GPThQVXWF/MDNMFJPz0MfwlLHyM4Svh70ea388Wv5/xK1VtA9+q7fcrb4oRW7a7E1UWma2ougJmGGiigZW5kK1h6q2IeywF+YLKBpZuuDjiTcIau4ksjTTm/K58R3hgaaSneDy2XQMhHG87nPsGdMa5tSBhfzKTTtc2eqIpOn78CjTEbXUz+bHifMxNt4WKTrkZqzApsS+5qcA0VdyIh6Tr9/Zl+ObKq0ZfJ95qW3sWTzdxWK7u74hXL9fl/ePc+ooHD51eo0VBF/s1cxu9IOPty89FlPH2Jc+j0QfSDdoPh+tH8kHeqTDiTRcH/IlTiXRr+hgC3jVb9H9aqh9tnJCSddeXcXHQ3fBWjT5vjuIfRhM++WKn1f/bKOWUdQYdq73L37U9DdMonkbvhZnyriCOJxVv8Cfb5airkKG5+dLNLYwd7tvXtu8M7IF03RNad4Od3MJkVffcg7hYM/d6LeLN8CxglPNZtmSoB4mlYvqkN/YliuNxxRPmrjVdvevkvtAPd62YA/t4I3IP1LOT0s2PQmUf6K15bLRknhRFFkIpdIhxyQovnE9fmrivn5AuS4u8uxBlpg2V+p68v7xXIWtu7pUaFu0lUXxW2mjL11LHrAJ7bM72Yrx0cU8Lzpnx/PgqhXPWWMs2+ScB9ZYd06zSY9qjN+qkwC3f9zI5Mctd7xq9rimTMjTUtHlRcgiccs3MLaIKElAXzb6XpEVuzaSpkbd0u3NLG/E3cFU0eCWKyGrJb6KAFRZA0VA7PtEmOmGdIB/3B/hcbqNypNZeWYyoXFyRipFqjuNpB5XJ/mlJ//b/oE0CFjeHfOzfrvjQkVNft6jshDdo2sq6qOrQ5vSdUV/3mS5QVE5etFLZ/0iY7kHVnuv4oqK9lRjvwFR/MgWbve+4mUYqPCXr2Ld286qdt1AJvu8FonDzuU15ZdvEsFVQtm9TXYVwumvCoEVFm+LKMzBTupbd6MworFn2PMug2qrR48OLQLr9Dt3olKLV8a2s0mhUNILWvQMhJe63sxisqG+2xCEv2E3C5v2eY52exs207xUUO7fQtH/DQ52exoLfV81rjio9jdsJr9xp2SsYNt12C6a6YVF6I8Syod0vvEUOV1oeu9NP7LWV8YW/OPLDf9QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABM+QfRoCifZCZDZQAAAABJRU5ErkJggg=="
        alt="]v[">
    </div>
  </div>
  <div class="" v-else>
    <el-popover ref="user-popover" placement="bottom" title="" width="200" trigger="hover">
      <el-menu>
        <el-menu-item @click="checkMe" index="1-1">
          <i class="el-icon-menu"></i><span>查看个人</span>
        </el-menu-item>
        <el-menu-item @click="update" index="2-1">
          <i class="el-icon-menu"></i><span>更新信息</span>
        </el-menu-item>
        <el-menu-item @click="logout" index="2-2">
          <i class="el-icon-menu"></i><span>登出</span>
        </el-menu-item>
      </el-menu>
    </el-popover>
    <div class="AvatarMenu">
      <span class="name">Hi, {{userInfo.realname}}</span>
      <img class="avatar" v-popover:user-popover :src="userInfo.smallAvatar" alt="]v[">
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      popoverVisible: false
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    hidePopOver() {
      this.popoverVisible = false;
    },
    register() {
      this.hidePopOver();
      // pop register dialog (this is a sync, no need for dispatch)
      this.$store.commit("SHOW_DIALOG", {
        type: "registeruser"
      });
    },
    login() {
      this.hidePopOver();
      // pop login dialog
      this.$store.commit("SHOW_DIALOG", {
        type: "loginuser"
      });
    },
    update() {
      this.hidePopOver();
      // pop update dialog
      this.$store.commit("SHOW_DIALOG", {
        type: "updateuser"
      });
    },
    logout() {
      this.hidePopOver();
      // directly logout
      this.$store.dispatch("logoutUser").then(() => {
        const path = this.$router.history.current.fullPath;
        this.$store.dispatch("refreshPage", {
          path
        });
      });
    },
    checkMe() {
      const url = `/user/${this.userInfo.userId}`;
      this.redirectTo(url);
    },
    redirectTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped lang="scss">
.AvatarMenu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: white;
    cursor: pointer;
  }
  .name {
    padding: 0px 16px;
    font-size: 13px;
  }
}
</style>
