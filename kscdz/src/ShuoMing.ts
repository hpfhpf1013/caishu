class ShuoMing  extends eui.Component{

	public jingcaijilu:eui.Label;
   	public jingcaijilu0:eui.Label;
   	public jingcaijilu1:eui.Label;

    public game:Game;

	public constructor(game:Game) {
		super();
        this.skinName = "resource/myskins/shuoming.exml";
		this.visible = false;

		this.game = game;

		this.jingcaijilu.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);
        this.jingcaijilu0.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu0,this);
        this.jingcaijilu1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu1,this);
	}

	//个人押注记录
	protected handlejingcaijilu():void {
		this.game.sendMessage("20012;1");
    }
	public wfsm:Wfsm;
    //玩法说明
    protected handlejingcaijilu0():void {
		if(this.wfsm==null) {
			this.wfsm = new Wfsm(this.game);
			this.wfsm.x = 0;
			this.wfsm.y = 0;
		}
        this.game.addChild(this.wfsm);
    }

	//历史中奖
    protected handlejingcaijilu1():void {
		this.game.curPage = 1;
        //发个消息
		this.game.sendMessage("20011;1");
    }
}