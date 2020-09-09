<template>
    <div class="login">
        <div class="logo">
            <img src="../../assets/easemob.png">
        </div>
        <div>
            <a-tabs :defaultActiveKey="defaultTab" size="large" @change="tabChange">
                <a-tab-pane key="1" tab="IM账号登陆">
                    <a-form :wrapper-col="{ span: 12, offset: 5 }" :form="form" @submit="handleSubmitIM">
                        <a-form-item>
                        <a-input 
                            v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
                            placeholder="IM用户名"
                        />
                        </a-form-item>
                        <a-form-item>
                        <a-input
                            v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
                            placeholder="IM密码"
                            type="password"
                        />
                        </a-form-item>
                        <a-form-item>
                        <a-input
                            v-decorator="['roomId', { rules: [{ required: true, message: 'Please input your password!' }] }]"
                            placeholder="房间名"
                        />
                        </a-form-item>
                        <a-form-item>
                          <a-input
                              v-decorator="['roomPassword', { rules: [{ required: true, message: 'Please input your password!' }] }]"
                              placeholder="房间密码"
                              type="password"
                          />
                        </a-form-item>
                        <a-form-item>
                          <a-radio-group v-decorator="['level',{initialValue:'4'}]">
                            <a-radio-button value="4">
                              允许互动
                            </a-radio-button>
                            <a-radio-button value="1">
                              禁止互动
                            </a-radio-button>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item>
                          <a-radio-group v-decorator="['layout',{initialValue:'0'}]">
                            <a-radio-button value="0">
                              底部
                            </a-radio-button>
                            <a-radio-button value="1">
                              右侧
                            </a-radio-button>
                            <a-radio-button value="2">
                              顶部
                            </a-radio-button>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item>
                          <a-radio-group v-decorator="['ratio',{initialValue:'4:3'}]">
                            <a-radio-button value="4:3">
                              4:3
                            </a-radio-button>
                            <a-radio-button value="2:1">
                              2:1
                            </a-radio-button>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" html-type="submit">
                            创建/加入房间
                        </a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
                <a-tab-pane key="2" tab="游客登陆">
                    <a-form :wrapper-col="{ span: 12, offset: 5 }" :form="form_2" @submit="handleSubmitVisiter">
                        <a-form-item>
                        <a-input
                            v-decorator="['roomId', { rules: [{ required: true, message: 'Please input your password!' }] }]"
                            placeholder="房间名"
                        />
                        </a-form-item>
                        <a-form-item>
                        <a-input
                            v-decorator="['roomPassword', { rules: [{ required: true, message: 'Please input your password!' }] }]"
                            placeholder="房间密码"
                            type="password"
                        />
                        </a-form-item>
                        <a-form-item>
                          <a-radio-group v-decorator="['level',{initialValue:'4'}]">
                            <a-radio-button value="4">
                              允许互动
                            </a-radio-button>
                            <a-radio-button value="1">
                              禁止互动
                            </a-radio-button>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item>
                          <a-radio-group v-decorator="['layout',{initialValue:'0'}]">
                            <a-radio-button value="0">
                              底部
                            </a-radio-button>
                            <a-radio-button value="1">
                              右侧
                            </a-radio-button>
                            <a-radio-button value="2">
                              顶部
                            </a-radio-button>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item>
                          <a-radio-group v-decorator="['ratio',{initialValue:'4:3'}]">
                            <a-radio-button value="4:3">
                              4:3
                            </a-radio-button>
                            <a-radio-button value="2:1">
                              2:1
                            </a-radio-button>
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" html-type="submit" :loading="loading">
                            创建/加入房间
                        </a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script>
import './index.less';
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'imLogin' }),
      form_2: this.$form.createForm(this, { name: 'visitLogin' }),
      defaultTab: window.location.href.indexOf("whiteboard-demo.easemob.com") > -1 ? "2" : "1",
      // defaultTab:"2"
      // loading: true
    };
  },
  computed: {
		loading(){
			return this.$store.state.login.loading;
		},
  },
  mounted: function(){
    if(window.location.href.indexOf("whiteboard-demo.easemob.com") > -1){
      this.onVisiterRegister();
    }
		console.log(88);
	},
  methods:{
    ...mapActions(["onImLogin", "onVisiterRegister", "onVisiterLogin"]),
    handleSubmitIM(e) {
      e.preventDefault();
      console.log(222);
      // this.onImLogin({a:1});
      const me = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          me.onImLogin(values);
        }
      });
    },
    tabChange(e) {
      console.log(e);
      if(e == 2){
        this.onVisiterRegister();
      }
    },
    handleSubmitVisiter(e) {
      e.preventDefault();
      const me = this;
      this.form_2.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          me.onVisiterLogin(values);
        }
      });
    },
  }
}
</script>