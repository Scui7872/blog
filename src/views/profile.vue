<template>
	<div>
		<div class="top">
			<img src="../assets/img/29.jpg">
		</div>
		<div class="left">
			<div class="body">
				<img :src="user.avatar">
				<div class="l-1">
					<p>{{user.nickname}}</p>
				</div>
				<div class="l-2">
					<p>Signature:</p>
				    <h>{{user.introduction.substring(0,17)}}</h>
				</div>
				<div class="l-3">
					<p>注册于{{user.createTime.date.year}}.{{user.createTime.date.month}}.{{user.createTime.date.day}}</p>
				</div>
				<div class="l-4">
					<p>Articles Published</p>
					<h>{{user.articles}}</h>
				</div>
				<div class="l-5">
					<p>Number of fans</p>
					<h>{{user.fans}}</h>
				</div>
				<div class="l-6">
					<p>Followers</p>
					<h>{{user.follows}}</h>
				</div>
				<div class="l-list">
					<h1>Will's Winter To-Do List</h1>
					  <div class="items">
					    <input id="item1" type="checkbox" checked>
					    <label for="item1">Create a to-do list</label>
					
					    <input id="item2" type="checkbox">
					    <label for="item2">Preparing for the CET-6</label>
					
					    <input id="item3" type="checkbox">
					    <label for="item3">Learn cooking skills</label>
					
					    <input id="item4" type="checkbox">
					    <label for="item4">Prepare for related computer professional exams</label>
					
					    <input id="item5" type="checkbox">
					    <label for="item5">Exercise and reduce excess fat</label>
					
					    <input id="item6" type="checkbox">
					    <label for="item6">Watch a movie "Chinese Women's Volleyball" with family</label>
					
					    <h2 class="done" aria-hidden="true">Done</h2>
					    <h2 class="undone" aria-hidden="true">Not Done</h2>
					  </div>
				</div>
				
			</div>
		</div>
		
		<div class="music">
			
		</div>
		
		<div class="change" v-if="show">
			<img src="../assets/img/change.png" @click="changeshow()">
		</div>
		<div class="right" v-if="!show">
			<div class="r">
				<h>Modification of personal information:</h>
			</div>
			<div class="r-1">
				<p>Nickname:</p>
				<input type="text" placeholder="新昵称" class="text">
			</div>
			<div class="r-2">
				<p>Address:</p>
				<input type="text" placeholder="新住址" class="text">
			</div>
			<div class="r-3">
				<p>Personal profile:</p>
				<textarea id="textarea" rows="1" placeholder="让更多人了解你吧" maxlength="500"></textarea>
			</div>
			<div class="r-4">
				<p>Phone Number：</p>
				<input type="text" placeholder="手机号" class="text">
			</div>
			<div class="r-5">
				<p>MailBox：</p>
				<input type="text" placeholder="邮箱" class="text">
			</div>
			<div class="r-6">
				<button v-on:click="update()">确定</button>
			</div>
			
		</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				user: JSON.parse(localStorage.user),
				show:'true',
				watch:'true',
							
				updateuser:{
					nickname: '',
					gender : '',
					birthday : '',
					address : '',
					introduction: '',
					homepage: '',
					id: ''
				}
			}
		},
		created() {
	     
		},
		methods: {
	         getImage(url) {
				 return 'http://images.weserv.nl/?url=' + url;
			 },
			 update(){
			 	this.updateuser.id = this.user.id;
	     		alert(this.user.id)
			 	 this.axios.put('http://localhost:8080/api//user/update' , this.updateuser)
			 	.then(res => {
			 			this.$router.go(0);
			 				});
			 		alert("成功")
			 },
			 changeshow(){			
			 	this.show=!this.show;
			}    
		},
		computed: {
	
		}
	
	}
	
</script>

<style scoped>
	.top {
		width: 100%;
		margin-top: 15px;
		background-color: #000066;
	}
	.top img {
		width: 100%;
		height: 600px;
	}
	.left {
		width: 40%;
		/* background-color: #FF55FF; */
	}
	.body img {
		width: 100%;
		margin-top: -40%;
		border-radius: 15px;
	}
	.body {
		width: 60%;
		margin-left: 15%;
		/* border: 5px solid #FFCB8B; */
	}
	.l-1 {
		width:100%;
		margin-top: 20%;
		/* background-color: #000080; */
	}
	.l-1 p {
		font-size: 20px;
	}
	.l-2 {
		width:100%;
		/* background-color: #002B36; */
	}
	.l-2 p {
		font-size: 16px;
		margin-top: 2px;
	}
	.l-2 h {
		font-size: 16px;
		color: #333333;
	}
	.l-3 {
		width:100%;
		/* background-color: #000080; */
	}
	.l-3 p {
		font-size: 14px;
		color: #darkgray;
		margin-top: 2px;
	}
	.l-4 {
		width:100%;
		margin-top:25px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #F1EFEE;
		/* background-color: #002B36; */
	}
	.l-4 p {
		font-size: 18px;
		color: darkgray;
	}
	.l-5 {
		width:100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #F1EFEE;
		/* background-color: #000080; */
	}
	.l-5 p {
		font-size: 18px;
		color: darkgray;
	}
	.l-6 {
		width:100%;
		display: flex;
		justify-content: space-between;
		/* background-color: #002B36; */
	}
	.l-6 p {
		font-size: 18px;
		color: darkgray;
	}

	.l-list {
	  width: 100%;
	  margin-top: 10px;
	  border-radius: 5px;
	  background-color:rgb(0, 121, 107);
	}
	
	h1 {
	  margin: 0;
	  padding: 20px;
	  background-color: rgba(255, 255, 255, .4);
	  font-size: 24px;
	  text-align: center;
	}
	
	.items {
	  display: flex;
	  flex-direction: column;
	  padding: 20px;
	}
	
	h2 {
	  position: relative;
	  margin: 0;
	  padding: 10px 0;
	  font-size: 1.2em;
	}
	
	h2::before {
	  content: '';
	  position: absolute;
	  top: 10px;
	  bottom: 10px;
	  left: -20px;
	  width: 5px;
	  background-color: #435757;
	}
	
	h2::after {
	  display: block;
	  float: right;
	  font-weight: normal;
	}
	
	.done {
	  order: 1;
	}
	
	.done::after {
	  content: ' (' counter(done-items) ')';
	}
	
	.undone {
	  order: 3;
	}
	
	.undone::after {
	  content: ' (' counter(undone-items) ')';
	}
	
	input {
	  display: block;
	  height: 53px;
	  margin: 0 0 -53px -9999px;
	  order: 4;
	  counter-increment: undone-items;
	}
	
	input:checked {
	  order: 2;
	  counter-increment: done-items;  
	}
	
	label {
	  position: relative;
	  padding: 15px 0 15px 45px;
	  border-top: 1px dashed #fff;
	  order: 4;
	  cursor: pointer;
	  animation: undone .5s;
	}
	
	label::before {
	  content: '\2718';
	  display: block;
	  position: absolute;
	  top: 11px;
	  left: 10px;
	  font: 1.5em 'FontAwesome';
	}
	
	label:hover, input:focus + label {
	  background-color: rgba(255, 255, 255, .2);
	}
	
	input:checked + label {
	  order: 2;
	  animation: done .5s;
	}
	
	input:checked + label::before {
	  content: '\2714'; 
	}
	
	@keyframes done {
	  0% {
	    opacity: 0;
	    background-color: rgba(255, 255, 255, .4);
	    transform: translateY(20px);
	  }
	  50% {
	    opacity: 1;
	    background-color: rgba(255, 255, 255, .4);
	  }
	}
	
	@keyframes undone {
	  0% {
	    opacity: 0;
	    background-color: rgba(255, 255, 255, .4);
	    transform: translateY(-20px);
	  }
	  50% {
	    opacity: 1;
	    background-color: rgba(255, 255, 255, .4);
	  }
	}
	
	.music {
		width: 50%;
		height: 200px;
		margin-left: 40%;
		margin-top: -65%;
		background-color: #000000;
	}
	.change {
		margin-left: 35%;
		margin-top: 50px;
	}
	.change img {
		width: 100px;
		height: 100px;
		cursor: pointer;
	}
	.right {
		width: 60%;
		display: flex;
		flex-direction: column;
		margin-left: 35%;
		margin-top:5%;
		background-color: #FFFF00;
	}
	.r {
		font-size: 26px;
		font-family: Helvetica, Tahoma, Arial;
	}
	.r-1 {
		display: flex;
		margin-top: 20px;
	}
	.r-1 p {
		font-size: 22px;
		font-family: Helvetica, Tahoma, Arial;
	}
	.r-2 {
		display: flex;
		margin-top: 20px;
	}
	.r-2 p {
		font-size: 22px;
		font-family: Helvetica, Tahoma, Arial;
	}
	.text {
		width: 200px;
		height: 20px;
		margin-left: 20px;
		font-family: STXihei;
	}
	.r-3 {
		display: flex;
		margin-top: 20px;
	}
	.r-3 p {
		font-size: 22px;
		font-family: Helvetica, Tahoma, Arial;
	}
	textarea {
		resize: none;
		width: 80%;
		height: 150px;
		margin-top: 5px;
		font-size: 18px;
		font-family: STXihei;
		border-radius: 4px;
		margin-left: 20px;
	}
	.r-4 {
		display: flex;
		margin-top: 20px;
	}
	.r-4 p {
		font-size: 20px;
	}
	.r-5 {
		display: flex;
		margin-top: 20px;
	}
	.r-5 p {
		font-size: 20px;
	}
	.r-6 {
		display: flex;
		margin-top: 20px;
	}
	.r-6 p {
		font-size: 20px;
	}
</style>
