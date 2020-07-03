import config from './config/config'
// const whiteBoards = require('../static/wbSDK')
const whiteBoards = require('./sdk/whiteboardsSdk');
const whiteBoard = new whiteBoards({
    restApi: config.rtcApi,
      appKey: config.appKey
  })

export default whiteBoard;