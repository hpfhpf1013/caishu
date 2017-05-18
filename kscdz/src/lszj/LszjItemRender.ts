class LszjItemRender  extends eui.ItemRenderer{

    public lszjqi:eui.Label;
    public zhongjiangshuzi:eui.Label;
  
	public constructor() {
		super();
        this.skinName = "resource/myskins/lszj/lszjItemRender.exml";
	}

    protected dataChanged():void{
         this.lszjqi.text = this.data.qh+"期";
         this.zhongjiangshuzi.text =    this.data.gj; 
    } 
    
}