



Vue.component('common-search',{
	props: ['searchinput'],
	template:`<div style="display:inline-block;margin-top:8px;float:left;margin-left:5px;position: relative;">
					  <el-input @keyup.native="Keyup" placeholder="输入诗词分类或描述"  class="input-with-select"
					  prefix-icon="el-icon-search" 
					   v-model="input" 
					  style="width:500px;margin-left:10px;border:2px solid #DF0101;
					  font-family: NSimSun;">
					     <el-button slot="append" @click="clicksearch" style="font-family:NSimSun;background-color:#D10101;color:white; "  >
					     搜索诗词</el-button>
					    </el-input>
					    
					    <div id="d1"  v-if="show"
			        	style="border:solid lightgrey 2px;width: 400px;position: absolute;margin-left:10px;background-color:white">
							<table style="width: 100%" >
								<tr v-for="item in message" @mouseover="MouseOver($event)" 
			        	@mouseout="MouseLeave($event)"><td :cid='item.id' @click="getpoems($event)">{{item.name}}</td></tr>
							</table>
					    </div>
					</div>`,
	data(){
		return{
			input:'',
			message:null,
			show:false,
			nameid:null
		}
	},
	methods:{
		clicksearch(){
					if(this.input==''){
						this.$alert('请输入诗词分类或描述', '警告', {
				          confirmButtonText: '确定',
				          callback: action => {
				            this.$message({
				              type: 'info',
				              message: `action: ${ action }`
				            });
				          }
				        });
					}else{
					var encodename=encodeURI(this.input);
					window.location.href='search_searchpoem.html?title='+encodename;
		}
				},
	    MouseOver(e){
	    	    console.log("moueseover");
				e.target.style.backgroundColor='lightblue'

	    },
	    MouseLeave(e){
	    	 e.target.style.backgroundColor = '';
	    },
	    Keyup(){
					 var uri='http://rap2.taobao.org:38080/app/mock/245255/api/category/name/'+encodeURI(this.input);
					 console.log(uri);
					 if(this.input!='')
					 {
					 	axios({
					 	 method: 'get',
						  url: uri,
						 })
				    .then(response =>
				      { 
				      	if(response.data.code==200)
				      	{
					        console.log(response)
					      	this.message=response.data.data
							
							this.show=true
				      	}else{
				      		this.show=false
				      	}
				      	
				      })
				      .catch(function (error) { // 请求失败处理
				        console.log(error);
				      });
					 }else{
					 	this.show=false
					 }
				},
				getpoems(e){
					console.log('youyouyou');
					window.location.href='search_poem.html?id='+e.target.getAttribute('cid');
					
				}
			},
			watch:{
				searchinput:function(val){
					this.input=val;
				}
			}

});