//微信部分API的使用
import {DataStore} from './js/base/DataStore.js';


export class Tool{
  constructor(){
    //初始化数据(没有数据需要初始化,不写)
  }
  
  //手机振动的效果
  zhendong(){
    wx.vibrateLong({
      success(){
        console.log('振动了一次');
      }
    })
  }


  //播放音乐
  voice(src,loop){
    // 创建音频
    const music = wx.createInnerAudioContext();
    // 音频文件的路径
    music.src = src;
    // 设置循环播放
    music.loop = loop;
    // 返回音频对象
    // music play();
    return music;
  }


  // 获取手机信息
  getTelInfo(){
    wx.getSystemInfo({
      success(res){
        console.log(res);
      }
    })
  }


  //获取用户的信息
  getUserInfo(callback){
    //创建用户信息按钮
    const button = wx.createUserInfoButton({
      type:"text",
      text:"请授权用户信息",
      style:{
        left:50,
        top:50,
        width:150,
        height:30,
        backgroundColor:"#a2a2a3",
        borderColor:"#e34d0a",
        borderWidth:2,
        borderRadius:10,
        color:'golden',
        textAlign:'center',
        fontSize:16,
        lineHeight:30,
      }
    });


    //监听按钮的点击事件
    button.onTap(res=>{
      if(res.userInfo){
        //用户授权
        //console.log(res);
        callback();
        //销毁按钮
        button.destroy();
      }
      
    })
  }


  // 向服务器发送http请求
  send(){
    wx.request({
      url:'http://localhost:4000',
      success(res){
        console.log(res);
      }
    })
  }


  // 模拟发送多条数据


  //发送socket数据
  sendSocket(){
    //1.建立连接
    wx.connectSocket({
      url: 'ws://localhost:4000',
      success(){
        console.log('连接服务端socket成功');
      },
      fail(err){
        console.log('连接失败')
      }
    });
    //2.连接成功后,回调中可以发送数据
    wx.onSocketOpen(function () {
      // 向后台发送数据
      wx.sendSocketMessage({
        data:'微信发送的数据',
        success(){
          console.log('微信发送成功');
        }
      });
      //从后台接收数据
      wx.onSocketMessage(function(res){
        console.log(res);
      });
    });
  }


  //下载图片
  downPic(){
    wx.downloadFile({
      url: 'http://pic34.nipic.com/20131030/2455348_194508648000_2.jpg', 
      success(res) {
        console.log(res);
        //显示在手机屏幕上
        /*let img = wx.createImage();
        img.src = res.tempFilePath;
        img.onload = ()=>{
          DataStore.getInstance().ctx.drawImage(img,0,0,img.width,img.height,0,0,img.width,img.height);
        }*/


        //保存到手机相册
        /*wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res){
            console.log('成功');
          },
          fail(res){
            console.log('失败');
          }
        });*/


        //下载在线音乐并播放
        /*let path = res.tempFilePath; //获取下载音乐的临时地址
        //播放音乐
        let ctx = wx.createInnerAudioContext();
        ctx.src = path;
        ctx.autoplay = true;*/


        //
        
      }
    })
  }


  //上传文件
  upload() {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://localhost:4000',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })
      }
    })
  }


  //视频
  video(){
    let video = wx.createVideo({
      src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      poster:'',
      autoplay:true
    });
  }
  
}