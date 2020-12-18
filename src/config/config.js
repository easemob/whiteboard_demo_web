 const config = {
    restApi: (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    rtcApi:(window.location.protocol === 'https:' ? 'https:' : 'http:') + '//wbrtc.easemob.com',
    appKey:"easemob-demo#chatdemoui"
}
if(window.location.href.indexOf("whiteboard-demo.easemob.com")>-1){
    config.restApi = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com';
    config.rtcApi = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//wbrtc.easemob.com';
}

export default config;