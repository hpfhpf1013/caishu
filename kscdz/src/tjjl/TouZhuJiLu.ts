class TouZhuJiLu extends eui.Component {
	public game:Game;
	public list:eui.List;
	public backtogame:eui.Image;
    public backtogame1:eui.Label;
	public constructor(game:Game) {
		super();
		this.skinName = "resource/myskins/tjjl/tjjl.exml";
        this.game = game;
        this.backtogame.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);
        this.backtogame1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);

		var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 603;
        myScroller.height = 591;
		myScroller.x = this.list.x;
		myScroller.y = this.list.y;
        //设置viewport
        myScroller.viewport = this.list;
		this.addChild(myScroller);
	}


	protected handlejingcaijilu():void {
        this.game.removeChild(this);
		this.game.sm.visible = false;
    }

	public addSource(list:any):void{
		var myCollection:eui.ArrayCollection = new eui.ArrayCollection(list);

		if(myCollection.length <=0){
			var nomessage = new eui.Label();
			nomessage.text = "没有历史押注信息";
			nomessage.size = 50;
			nomessage.textColor = 0xfffff;
			nomessage.x = this.list.width/2-nomessage.width/2;
			nomessage.y = this.list.height/2;
			this.list.addChild(nomessage);
		}else{
			this.list.dataProvider = myCollection;

			this.list.itemRenderer = TjjlItemRender;
		}

		
	}
}