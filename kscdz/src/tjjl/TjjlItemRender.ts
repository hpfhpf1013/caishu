class TjjlItemRender  extends eui.ItemRenderer{

    public lszjqi:eui.Label;
    public shijian:eui.Label;
    public zhuangtai:eui.Label;
    public yazhujine:eui.Label;
  
	public constructor() {
		super();
        this.skinName = "resource/myskins/tjjl/tjjlItemRender.exml";
	}

    protected dataChanged():void{
         this.lszjqi.text = this.data.qh+"期";
         this.shijian.text =    this.data.sj; 
         this.yazhujine.text = "押"+this.data.yz+"  "+this.data.je;
         if(parseInt(this.data.fl)>0){
            //中奖,显示中奖
            this.zhuangtai.text = "获得"+this.data.fl+"K币";
            this.zhuangtai.textColor = 0xfff476;
            this.zhuangtai.size = 24;
         }else{
             //没中奖，显示中奖号码
             this.zhuangtai.text = "中奖号码:"+this.data.gj;
         }
    } 
    
}