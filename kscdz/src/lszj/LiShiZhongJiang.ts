class LiShiZhongJiang extends eui.Component {
	public game:Game;
	public list:eui.List;
	public backtogame:eui.Image;
    public backtogame1:eui.Label;
	private myScroller: eui.Scroller;
	public constructor(game:Game) {
		super();
		this.skinName = "resource/myskins/lszj/lszj.exml";
        this.game = game;
        this.backtogame.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);
        this.backtogame1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlejingcaijilu,this);

		this.myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        this.myScroller.width = 603;
       this. myScroller.height = 591;
		this.myScroller.x = this.list.x;
		this.myScroller.y = this.list.y;
        //设置viewport
        this.myScroller.viewport = this.list;
		this.addChild(this.myScroller);

		this.list.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.moveScroller,this);
	}

	private moveScroller():void{
        //点击按钮后改变滚动的位置
        var sc = this.myScroller;
        sc.viewport.scrollV += 10;
        if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
          console.log("滚动到底部了");
		  if(this.game.curPage>=this.game.zjys){
			  return ;
		  }else{
			  this.game.curPage+=1;
		 	 this.game.sendMessage("20011;"+(this.game.curPage>this.game.zjys?this.game.zjys:this.game.curPage));
		  }
        }
    }


	protected handlejingcaijilu():void {
        this.game.removeChild(this);
		this.game.sm.visible = false;
		this.myCollection = null;
    }

	private myCollection:eui.ArrayCollection;
	public addSource(list:any):void{
		if(this.myCollection == null){
			this.myCollection = new eui.ArrayCollection(list);
			this.list.dataProvider = this.myCollection;
			this.list.itemRenderer = LszjItemRender;
		}else{
			for(var i=0;i<list.length;i++){
				this.myCollection.addItem(list[i]);
			}
			this.myCollection.refresh;
		}
		
		
		

		
	}
}