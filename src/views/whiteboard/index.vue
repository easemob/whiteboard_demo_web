<template>
    <div class="whiteboard">
        <div v-if="getAdmin" class="whiteboardTool">
            <a-button type="primary" @click="allowClick">
                允许互动
            </a-button>
            <a-button type="primary" @click="forbitClick">
                禁止互动
            </a-button>
            <a-button type="danger" @click="deleteWd">
                删除白板
            </a-button>
        </div>
        <div class="iframeContent">
            <iframe :src="getUrl"></iframe>
        </div>
    </div>
</template>
<script>
import './index.less';
import { mapState, mapActions } from "vuex";
import { getParams } from '@/utils/tools';
export default {
    data(){
        return{
            
        }
    },
    computed: {
		getUrl(){
            // return this.$store.state.login.url
            return sessionStorage.getItem("whiteboardUrl");
        },
        getAdmin(){
            return getParams("isCreater",sessionStorage.getItem("whiteboardUrl")) == "true";
        }
    },
    methods:{
        ...mapActions(["allowOprate", "forbiteOprate", "deleteWhiteboard"]),
        allowClick(e) {
            this.allowOprate();
        },
        forbitClick(e){
			this.forbiteOprate();
        },
        deleteWd(e){
			this.deleteWhiteboard();
        }
    }
}
</script>
