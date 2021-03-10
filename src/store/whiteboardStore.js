import Vue from 'vue'
import router from '../router'
import axios from 'axios';
import { message } from "ant-design-vue";
import config from '../config/config'
import whiteBoard from '../whiteboards'
import { getParams } from '../utils/tools';

const WhiteboardStore = {
    state:{

    },
    mutations:{

    },
    actions:{
        allowOprate(context, payload){
            const iframeUrl = sessionStorage.getItem('whiteboardUrl');
            console.log(getParams("roomId",iframeUrl));
            whiteBoard.oprateAuthority({
                userName: sessionStorage.getItem("username"),
				roomId: getParams("roomId",iframeUrl),
				leval: 4,
				members:[],
				isAll: true,
				token: sessionStorage.getItem("token"),
				suc: function(res){
					message.success("操作成功");
                },
                err: function(err){
                    if(err.error_code == 10){
                        message.error("白板不存在");
                    }
                    else{
                        message.error("操作失败");
                    }
                }
            })

        },
        forbiteOprate(context, payload){
            const iframeUrl = sessionStorage.getItem('whiteboardUrl');
            whiteBoard.oprateAuthority({
                userName: sessionStorage.getItem("username"),
				roomId: getParams("roomId",iframeUrl),
				leval: 1,
				members:[],
				isAll: true,
				token: sessionStorage.getItem("token"),
				suc: function(res){
					message.success("操作成功");
                },
                err: function(err){
                    if(err.error_code == 10){
                        message.error("白板不存在");
                    }
                    else{
                        message.error("操作失败");
                    }
                }
            })
        },
        deleteWhiteboard(context, payload){
            const iframeUrl = sessionStorage.getItem('whiteboardUrl');
            whiteBoard.destroy({
				userName: sessionStorage.getItem("username"),
				roomId: getParams("roomId",iframeUrl),
				token: sessionStorage.getItem("token"),
				suc: function(res){
					message.success("删除成功");
                    router.push("/login")
                },
                err: function(err){
                    message.error("删除失败");
                }
			})
        }
    },
    getters:{

    }
}

export default WhiteboardStore