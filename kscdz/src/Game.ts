//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Game extends eui.Component {

//    public socketUrl:String = "ws://192.168.1.30:8080/paoma/websocket/";
//    public httpUrl:String = "http://192.168.1.30:8080/paoma/m";

   public socketUrl:String = "ws://139.129.15.57:9090/caishuzi/websocket/";
   public httpUrl:String = "http://139.129.15.57:9090/caishuzi/m";

   public jian_btn:eui.Button;
   public jia_btn:eui.Button;
   public yixuan:eui.Label;
   public qiid:eui.Label;//期数

   private y50:eui.Button;
   private y100:eui.Button;
   private y500:eui.Button;

   public userid:string = "73805363";
   public teamid:string = "3";
   public uuid:string = "svSyJUJu";

   public toastSkin:string = "resource/myskins/toast.exml";

   public mq:MarqueeText;
   public paomadeng:eui.Image;
   public paomagroup:eui.Group;

   public shuoming:eui.Image;
   
   public sm:ShuoMing;
   public lszj:LiShiZhongJiang;

    public constructor() {
        super();

        Toast.init(this);
        this.skinName = "resource/myskins/game.exml";

        this.jian_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onJianBtnClick,this);
        this.jia_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onJiaBtnClick,this);

        this.y50.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onYZhu50,this);
        this.y100.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onYZhu100,this);
        this.y500.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onYZhu500,this);

        this.shuoming.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onShuoming,this);
         
        this.webSocket = new egret.WebSocket();        
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClosed, this);
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        // this.webSocket.connect("echo.websocket.org", 80);
        this.sendGetRequest();
        
        //this.mq = new MarqueeText(577,120,600,38,500,20,1000);
        this.mq = new MarqueeText(100,102,50,50,500,10,100);
        this.addChild(this.mq);
    }
    public webSocket:egret.WebSocket;

    protected onJianBtnClick(e:Event): void {
        
        var nn:number = parseInt(this.yixuan.text);
        if(nn<=1){
             this.yixuan.text = "1";
        }else{
             this.yixuan.text = ""+(nn-1);
        }
    }
    protected onJiaBtnClick(e:Event): void {
        
        var nn:number = parseInt(this.yixuan.text);
        if(nn>=10){
             this.yixuan.text = "10";
        }else{
             this.yixuan.text = ""+(nn+1);
        }
    }

    private onSocketOpen():void {    
        // var cmd = "Hello Egret WebSocket";    
        console.log("连接成功，发送数据：" );    
        // this.webSocket.writeUTF(cmd);
    }

    private onSocketClosed(e:Event):void {
        console.log("连接关闭：" +e.returnValue);  
        Toast.launch("与服务器断开连接");
    }

    private onSocketError(e:Event):void {
        console.log("连接错误：" +e); 
    }
    private onReceiveMessage(e:egret.Event):void {    
        var msg = this.webSocket.readUTF();    
        console.debug(msg);
        var m = JSON.parse(msg);
        var xxh = m.xxh;
        switch(parseInt(xxh)){
            case 20000:
                this.receive20000(m);
                break;
            case 20001:
                this.receive20001(m);
                break;
            case 20002:
                this.receive20002(m);
                break;
            case 20004:
                this.receive20004(m);
                break;
            case 20005:
                this.receive20005(m);
                break;
            case 20006:
                this.receive20006(m);
                break;
            case 20007:
                this.receive20007(m);
                break;
            case 20011:
            this.receive20011(m);
            break;
            case 20012:
            this.receive20012(m);
            break;
            default:
                this.unknowmsg(m);
                break;
        }
    }
    private unknowmsg(msg:any):void{
        console.error("未识别的消息号:"+JSON.stringify(msg));
        if(msg.xxh == 259) {
            //弹出错误提示
            Toast.launch("服务器小哥犯错误了",500);
        }else if(msg.xxh == 100){
            Toast.launch("给:"+this.n+"押注:"+this.money+"成功",900);
            this.updateMyselfCoin();
        }else{
            try {
                 Toast.launch(msg.ms,500);
            } catch (error) {
                
            }
        }
    }

    private receive20007(msg:any) :void{
        this.mq.addText(msg.nr,30,0x75a0ff);
    }

    public lxjl:LiShiZhongJiang;
    public zjys:number;
    public curPage:number=1;
//历史终将
    private receive20011(msg:any) :void{
        if(this.lxjl==null){
            this.lxjl = new LiShiZhongJiang(this);
        }
        this.lxjl.addSource(msg.ls);
        this.zjys=parseInt(msg.zy);
        this.addChild(this.lxjl);
    }
//压住记录

    public tzjl:TouZhuJiLu;
    private receive20012(msg:any) :void{
        this.tzjl = new TouZhuJiLu(this);
        this.tzjl.addSource(msg.ls);
        this.addChild(this.tzjl);
    }

     private receive20006(msg:any) :void{
         var zj = msg.jb - parseInt(this.yongyoujinbi.text) ;
         Toast.launch("恭喜您本期中奖:"+zj+"币",1000);
        this.yongyoujinbi.text = msg.jb;

        // for(var i=1;i<=50;i++){
        //     if(i%2==0){
        //         this.yongyoujinbi.textColor = 0xFC0505;
        //     }else{
        //         this.yongyoujinbi.textColor = 0xFFFFFF;
        //     }
        // }
    }

    private receive20000(msg:any) :void{
        console.debug("开始新的一轮");
        this.canYaZhu = true;
        this.jsm = 180;
        this.timer.reset();
        this.startCdTime();
        this.js+=1;
        this.qiid.text = (this.js)+"期";
        Toast.launch("第"+this.js+"期开始了",800);
        this.me1.text="";
            this.me2.text="";
            this.me3.text="";
            this.me4.text="";
            this.me5.text="";
            this.me6.text="";
            this.me7.text="";
            this.me8.text="";
            this.me9.text="";
            this.me10.text="";
    }

     private receive20001(msg:any) :void{
        console.debug("结束押注");
        this.canYaZhu = false;
        //Toast.launch("结束押注了",500);
    }

     private receive20002(msg:any) :void{
        console.debug("猜数字结果");
        Toast.launch("第"+this.js+"期，中奖号码为:"+msg.sz,4000);
        //更新往期中奖数字

         this.zhongjiang1.text = this.zhongjiang2.text;
         this.zhongjiang2.text = this.zhongjiang3.text;
         this.zhongjiang3.text = msg.sz;
    }

public zhongjiang1:eui.Label;
public zhongjiang2:eui.Label;
public zhongjiang3:eui.Label;
public timesy:eui.Label;
public js:number;
public yongyoujinbi:eui.Label;
//登陆消息
    private receive20004(msg:any) :void{       
        this.jsm = msg.jsm; //结束秒数
        console.debug("收到20004:"+JSON.stringify(msg));
        var jd = msg.jd; //当前进度
        var zj1;//往期
        var zj2;
        var zj3;
        this.js =   msg.js;//局数
        var jb = msg.jb;// 有的金币
        this.yongyoujinbi.text = jb;
        try {
            zj1 = msg.sjzj[0].zs;
            zj2 = msg.sjzj[1].zs;
            zj3 = msg.sjzj[2].zs;
        } catch (error) {
            
        }

       if(zj1 != "undefind") this.zhongjiang3.text = zj1;
       if(zj2 != "undefind") this.zhongjiang2.text = zj2;
       if(zj3 != "undefind") this.zhongjiang1.text = zj3;
       
       if(this.jsm>0){
           this.startCdTime();
       }

       this.qiid.text = this.js+"期";

       //收到数据，更新数据
       try {
           this.updatezhu(this.zhu1,msg.bjyz.yi,this.zhu1n);
            this.updatezhu(this.zhu2,msg.bjyz.er,this.zhu2n);
            this.updatezhu(this.zhu3,msg.bjyz.san,this.zhu3n);
            this.updatezhu(this.zhu4,msg.bjyz.si,this.zhu4n);
            this.updatezhu(this.zhu5,msg.bjyz.wu,this.zhu5n);
            this.updatezhu(this.zhu6,msg.bjyz.liu,this.zhu6n);
            this.updatezhu(this.zhu7,msg.bjyz.qi,this.zhu7n);
            this.updatezhu(this.zhu8,msg.bjyz.ba,this.zhu8n);
            this.updatezhu(this.zhu9,msg.bjyz.jiu,this.zhu9n);
            this.updatezhu(this.zhu10,msg.bjyz.shi,this.zhu10n);
       } catch (error) {
           console.error(error);
       }
        
    }

    private zhu1:eui.Image;
    private zhu2:eui.Image;
    private zhu3:eui.Image;
    private zhu4:eui.Image;
    private zhu5:eui.Image;
    private zhu6:eui.Image;
    private zhu7:eui.Image;
    private zhu8:eui.Image;
    private zhu9:eui.Image;
    private zhu10:eui.Image;

    private zhu1n:eui.Label;
    private zhu2n:eui.Label;
    private zhu3n:eui.Label;
    private zhu4n:eui.Label;
    private zhu5n:eui.Label;
    private zhu6n:eui.Label;
    private zhu7n:eui.Label;
    private zhu8n:eui.Label;
    private zhu9n:eui.Label;
    private zhu10n:eui.Label;

    private me1:eui.Label;
    private me2:eui.Label;
    private me3:eui.Label;
    private me4:eui.Label;
    private me5:eui.Label;
    private me6:eui.Label;
    private me7:eui.Label;
    private me8:eui.Label;
    private me9:eui.Label;
    private me10:eui.Label;
    private receive20005(msg:any) :void{       
        console.debug("20005：" + msg);
        
        //收到数据，更新数据
        this.updatezhu(this.zhu1,msg.bj.yi,this.zhu1n);
        this.updatezhu(this.zhu2,msg.bj.er,this.zhu2n);
        this.updatezhu(this.zhu3,msg.bj.san,this.zhu3n);
        this.updatezhu(this.zhu4,msg.bj.si,this.zhu4n);
        this.updatezhu(this.zhu5,msg.bj.wu,this.zhu5n);
        this.updatezhu(this.zhu6,msg.bj.liu,this.zhu6n);
        this.updatezhu(this.zhu7,msg.bj.qi,this.zhu7n);
        this.updatezhu(this.zhu8,msg.bj.ba,this.zhu8n);
        this.updatezhu(this.zhu9,msg.bj.jiu,this.zhu9n);
        this.updatezhu(this.zhu10,msg.bj.shi,this.zhu10n);
       
    }

//更新柱子
    private updatezhu(zhu:eui.Image,n:number,zhun:eui.Label):void{
        if(zhu==null || typeof(n)!="number"){
            return;
        }
        var h = zhu.height;
        if(h>=54 && h<200){
            zhu.height = 54+n/80;      
            zhu.y -= zhu.height-h;   

             //更新柱子上方数字
             zhun.y-=zhu.height-h;
             if(n<10000) {
                 zhun.text = ""+n;
             }else{
                 var wan = Math.floor(n/10000);
                 zhun.text = wan+"万";
             }
        }

    }

    public sendMessage(m:string):void{
        console.debug("发送消息:"+m);
        this.webSocket.writeUTF(m);
    }

    private timer:egret.Timer = new egret.Timer(1000);
    private jsm:number;
    private startCdTime():void{
        this.timer.repeatCount = this.jsm*1000;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this); 
        this.timer.start(); 
    }

//倒计时
    private timerFunc():void{
        if(this.jsm%60==1) {
            this.jsm-=2;
        }else{
            this.jsm-=1;
        }
        
        if(this.jsm<=0){
            this.tingzhiyazhu();
        }
        this.timesy.text = this.getTimeString(this.jsm);
    }

//是否可以押注
    private canYaZhu:boolean = true;
    private tingzhiyazhu():void{
        this.canYaZhu = false;
    }

//赋值
    private getTimeString(time:number):string{
        if(time<0){
            return "00:00";
        }
        var min = Math.floor(time/60);
        var sec  = time%60;

        if(sec<10){
            return "0"+min+":0"+sec;
        }else{
            return "0"+min+":"+sec;
        }
        
    }

    //一次倒计时结束
    private timerComFunc():void{
        this.canYaZhu = false;
    }

    protected onYZhu50(e:Event): void {
        this.yazhu(50);
    }
    protected onYZhu100(e:Event): void {
        this.yazhu(100);
    }
    protected onYZhu500(e:Event): void {
        this.yazhu(500);
    }
    protected onShuoming(e:Event): void {
        if(this.sm ==null) {
            this.sm = new ShuoMing(this);
            this.sm.x = 459;
            this.sm.y = 85;
            this.addChild(this.sm);
        }
        if(this.sm.visible){
            this.sm.visible = false;
        }else{
            this.sm.visible = true;
        }
        
    }

    private n:number;
    private money:number;
    private yazhu(n:number):void{
        if(!this.canYaZhu) {
            Toast.launch("目前不能押注,请等待下一期!",900);
            return;
        }
        
        var num = parseInt(this.yixuan.text);
        //'20010;1;100'
        var msg = "20010;"+num+";"+n;
        this.sendMessage(msg);
        this.money = n;
        this.n = num;
    }

    private updateMyselfCoin():void{
        var localLable;
        if(this.n==1){
           localLable = this.me1;
        }else if(this.n==2){
            localLable = this.me2;
        }else if(this.n==3){
            localLable = this.me3;
        }else if(this.n==4){
            localLable = this.me4;
        }else if(this.n==5){
            localLable = this.me5;
        }else if(this.n==6){
            localLable = this.me6;
        }else if(this.n==7){
            localLable = this.me7;
        }else if(this.n==8){
            localLable = this.me8;
        }else if(this.n==9){
            localLable = this.me9;
        }else if(this.n==10){
            localLable = this.me10;
        }    
         if(localLable.text!="") {
                localLable.text = ""+(parseInt(localLable.text)+this.money);
         }else{
              localLable.text = ""+(this.money);
         }
        //扣掉自己的钱
        if(this.yongyoujinbi.text!=""){
            var qian = parseInt(this.yongyoujinbi.text);
            var jianhoudeqian = qian-this.money;
            if(jianhoudeqian>0){
                this.yongyoujinbi.text = ""+jianhoudeqian;
            }else{
                this.yongyoujinbi.text = "0";
            }
        }
    }

    private sendGetRequest():void {
        var uid = "hpf";
        var params = '?c={"cmd":10000,"body":{"spid":-1,"uid":"'+uid+'","fvalue":null,"zhuanhuanid":"zhuanhuanid"}}';
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.httpUrl+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
    }
    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        var result = JSON.parse(request.response);
        this.uuid = result.body.serverCode;
        this.userid = result.body.uuid;
        this.teamid = result.body.teamid;
        this.webSocket.connectByUrl(this.socketUrl+this.userid+"/"+this.teamid+"/"+this.uuid);
    }

    

}
