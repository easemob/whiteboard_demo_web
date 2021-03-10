import Vue from 'vue'
import router from '../router'
import axios from 'axios';
import { message } from "ant-design-vue";
import { getParams, getUserId } from '../utils/tools';
import config from '../config/config'
import whiteBoard from '../whiteboards'
const aa = 11;
const Login = {
    state:{
        loading: true,
        username: "",
        url:""
    },
    mutations:{
        setUrl: function(state, url){
            state.url = url
        },
        onVisiterRL: function(state, bl){
            state.loading = bl;
        }
        // onImLogin1: function(context, payload){
        //     console.log(99999);
        //     // context.commit("setUserName", payload);
        //     // axios.get()
        // },
        // setUserName: function(state, payload){
        //     console.log(payload)
        //     state.username = payload.url;
        //     router.push("/whiteboard")
        // }

    },
    actions:{
        onImLogin: function(context, payload){
            axios.post(config.restApi + "/" + config.appKey.split("#")[0] + "/" + config.appKey.split("#")[1] + "/token",{
                grant_type: "password",
                password:payload.password,
                username:payload.username
            } )
            .then((resToken)=>{
                console.log("--"+resToken.data.access_token)
                whiteBoard.join({
                    userName: payload.username,
                    roomName: payload.roomId,
                    password: payload.roomPassword,
                    token: resToken.data.access_token,   //应该为im用户登录之后的token
                    level:parseInt(payload.level),
                    layout:parseInt(payload.layout),
                    ratio:payload.ratio,
                    suc: function(res){
                        if(res.status){
                            sessionStorage.setItem("username", payload.username);
                            sessionStorage.setItem("token",resToken.data.access_token);

                            if(window.location.href.indexOf(".easemob.com/") > -1){
                                sessionStorage.setItem("whiteboardUrl",res.whiteBoardUrl);
                            }
                            else{
                                // context.commit("setUrl","http://172.17.2.6:1234/?" + res.whiteBoardUrl.split("?")[1])
                                sessionStorage.setItem("whiteboardUrl","http://whiteboards.easemob.com/?" + res.whiteBoardUrl.split("?")[1]);
                                // window.location = "./iframe.html?iframe="+ "http://172.17.3.93:1234/?" + res.whiteBoardUrl.split("?")[1]
                            }
                            router.push("/whiteboard")
                        }
                        else{
                            message.error("加入失败");
                        }
                    },
                    err: function(err){
                        message.error("加入失败" + err.error_msg);
                    }
                })
            })
            .catch((err)=>{
                message.error("IM登陆失败");
            })
        },
        onVisiterRegister: function(context){
            const username = getUserId();
            axios.post(config.restApi + "/" + config.appKey.split("#")[0] + "/" + config.appKey.split("#")[1] + "/users",{
                password:"1",
                username:username,
                nickname:""
            } )
            .then((res)=>{
                axios.post(config.restApi + "/" + config.appKey.split("#")[0] + "/" + config.appKey.split("#")[1] + "/token",{
                    grant_type: "password",
                    password:"1",
                    username:username
                } )
                .then((resToken)=>{
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("token",resToken.data.access_token);
                    context.commit("onVisiterRL", false);
                })
                .catch(()=>{
                    console.log("登陆访客失败");
                })
            })
            .catch(()=>{
                console.log("注册访客失败");
            })
        },
        onVisiterLogin: function(context, payload){
            console.log(666);
            whiteBoard.join({
                userName: sessionStorage.getItem("username"),
                roomName: payload.roomId,
                password: payload.roomPassword,
                token: sessionStorage.getItem("token"),   //应该为im用户登录之后的token
                level:parseInt(payload.level),
                layout:parseInt(payload.layout),
                ratio:payload.ratio, 
                suc: function(res){
                    console.log(33);
                    if(res.status){
                        if(window.location.href.indexOf(".easemob.com/") > -1){
                            sessionStorage.setItem("whiteboardUrl",res.whiteBoardUrl);
                        }
                        else{
                            sessionStorage.setItem("whiteboardUrl","http://172.17.2.6:1234/?" + res.whiteBoardUrl.split("?")[1]);
                        }
                        router.push("/whiteboard")
                    }
                    else{
                        message.error("加入失败");
                    }
                },
                err: function(err){
                    message.error("加入失败" + err.error_msg);
                }
            })
        }
    },
    getters:{

    }
}

export default Login;