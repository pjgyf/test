var vm = new Vue({
	el:'#app',
	data:{
		title:"购物车",
		totalMoney:0,
		checkAllFlag:false,
		productList:[]
	},
	mounted:function(){
		this.cartView();
	},
	filters:{
		formatMoney:function(v){
			return  "￥ " + v.toFixed(2);
		}
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get('data/products.json').then(function(res){
				_this.productList = res.body.result.list;
			});
		},
		changNum:function(flag,item){
			if(flag > 0){
				item.number++;
				
			}else{
				if( item.number > 1) {
					item.number--;
				} else{
					item.number = 1 ;
				}
			}
			this.countTotalMoney();
		},
		selectItem:function(item){
			
			if(typeof item.checked === 'undefined'){
				Vue.set(item,"checked",true);
			}else{
				item.checked = !item.checked;
			}
			this.countTotalMoney();
			
		},
		selectAll:function(){
			var _this = this;
			this.checkAllFlag = !this.checkAllFlag;
			this.productList.forEach(function(v,i){
				_this.selectItem(v);
			})
		},
		countTotalMoney:function(){
			var _this = this;
			this.totalMoney = 0
			this.productList.forEach(function(v,i){
				if(v.checked){
					_this.totalMoney += v.prince * v.number; 
				}
			})
		},
		deleteItem:function(item){
			var index = this.productList.indexOf(item);
			this.productList.splice(index,1);
		}
	}
});
