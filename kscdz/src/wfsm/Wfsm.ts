class Wfsm  extends eui.Component{

    public backtogame:eui.Image;
    public backtogame1:eui.Label;
    public game:Game;
	public constructor(game:Game) {
		super();
        this.skinName = "resource/myskins/wfsm.exml";
        this.game = game;
        this.backtogame.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);
        this.backtogame1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);
	}


	protected handlejingcaijilu():void {
        this.game.removeChild(this);
        this.game.sm.visible = false;
    }
    
}