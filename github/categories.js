 Vue.component('categories-component',{
			template:`
			<div class="rightkuang">
				<div style="font-size:23px;font-family:NSimSun;font-weight:bold;color:#19537D;margin-top:10px;margin-left:30px">诗词分类</div>
		          <div style="height:10px"></div>
		          <div style="margin-left:15px;">
				 <el-button size="small" round  v-if="message"  v-for="(item,index) in message"  :key="item.id" style="color:#19537D;backgroundColor:transparent;
				 margin-left:25px;margin-top:10px" :buttonid="item.id" @click="toSortPage($event)">{{item.name}}</el-button></div>
				
				<div style="height:20px"></div>


			</div>
			`,
			data(){
				return{
					message:null
				}
			},
			methods:{
				toSortPage(e){
					window.location.href='sort.html?bid='+e.target.getAttribute('buttonid');
				},
				jumppoem(){
	
						axios({
						 	 method: 'get',
							  url: 'http://rap2.taobao.org:38080/app/mock/245255/api/categories',
							 })
					    .then(response =>
					      { 
					      	if(response.data.code==200)
					      	{
					      		this.message=response.data.data;
						      	
					       	}
					      })
					      .catch(function (error) { // 请求失败处理
					        console.log(error);
					      });
				   	}
			   
				  },
				
			mounted:function(){
				this.jumppoem();
			}
		})