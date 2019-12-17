<template>
	<div>
		<div class="container">
				<body class="middle" v-for="(user, index) in users" :key="index">
				  <div class="wrap">
				    <div class="front">
					<img :src="user.avatar"/>
					<div class="f-1">
						<p>{{user.nickname}}</p>
					</div>
					<div class="f-2">
						<h>{{user.gender}}</h>
					</div>
					<div class="f-3">
						<p>创建于</p>
						<p class="big">{{user.birthday.year}}年</p>
					</div>
					<div class="f-4">
						<p>{{user.introduction}}</p>
					</div>
					<div class="f-5">
						<p>More >>></p>
					</div>
				    </div>
				
				    <div class="back">
				      <div class="list">
				          <div class="cc rowup">
				             <div class="item"></div>
							 <div class="item"><h>一位可爱或者帅气的{{user.gender}}生</h></div>
							 <div class="item"><h>出生于一个美丽的城市</h></div>
							 <div class="item"><h>创建这个账号的时间是{{user.birthday.year}}年{{user.birthday.month}}月{{user.birthday.day}}日</h></div>
							 <div class="item"><h>家庭住址是{{user.address}},欢迎你来旅游</h></div>
							 <div class="item"><h>欢迎大家搜索我的昵称-{{user.nickname}}-看我的作品</h></div>
							 <div class="item"><h>我关注了{{user.follows}}个大神和文章</h></div>
							 <div class="item"><h>目前我的粉丝有{{user.fans}}个,感谢这些小可爱们的关注</h></div>
							 <div class="item"><h>截止到目前，我发布了{{user.articles}}篇文章，会继续写出更好的作品，不负大家的期望！</h></div>
							 <div class="item"><h>我的status的值为{{user.status}}</h></div>
			                 <div class="item"><h>对图书的简介-------
							                            图书，是一堆带有和主题相关内容的纸张，带有文字或图像。 书通常由墨水、纸张、羊皮纸或者其他材料固定在书脊上组成。
							 							组成书的一张纸称为一张，一面称为一页。在图书馆信息学中， 书被称为专著，以区别于杂志、学术期刊、报纸等连载期刊。
							 							所有的书面作品的主体是文学。在小说和一些类型（如传记）中， 书可能还要分成卷。对书特别喜爱的人被称为爱书者或藏书家，
							 							更随意的称呼是书虫或者书呆子。2010年，谷歌公司估计， 从印刷术发明至今，大概出版了一亿三千万本不同书名的书籍.
														---------
														世界读书日，让我们热爱阅读！
														
							 </h></div>
				          </div>
				      </div>
					  <div class="follow">
						  <a href="#" class="myButton">+</a>
					  </div>
				    </div>
				  </div>
				</body>
				</div>
				<div class="load">
					<img src="../assets/img/more.png" @click="loadMore">
				</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				 users : [],
				 currentPage: 1,
				 count: 6
			}
		},
		created() {
			this.axios.get('http://localhost:8080/api/user').then(res => {
				// console.log(res.data.data);
				this.users = res.data.data;
				for (var i = 0;i<this.users.length;i++) {
					this.users[i].cover = this.getImage(this.users[i].cover);
				}
			});
		},
		methods: {
			getImage(url) {
				return 'https://images.weserv.nl/?url=' + url;
			},
			loadMore() {
						this.currentPage = this.currentPage + 1;
						this.axios
							.get('http://localhost:8080/api/user', {
								params: {
									page: this.currentPage,
									count: this.count
								}
							})
							.then(res => {
								console.log(res.data.data.length);
								let temp = [];
								temp = res.data.data;
								for (var i = 0; i < temp.length; i++) {
									this.users.splice(this.currentPage * this.count, 0, temp[i]);
								}
								console.log(this.users.length);
							});
					},
					go(page) {
						window.location.href = page;
					}
		},
		computed: {
			
		}
		
	}
</script>

<style scoped>
 
 body {
   height: 100vh;
   border-radius: 10px;
   background-image: url(../assets/img/13.jpg);
 }
 .container {
	 width: 100%;
	 display: flex;
	 flex-wrap: wrap;
	 /* background-color: #7FFFD4; */
 }
 .middle{
   width:30%;
   display: flex;
   margin-left: 2%;
   margin-top: 2%;
   justify-content: center;
   align-items: center;
   /* background-color: #E91E63; */
 }
 .wrap {
   width: 300px;
   height: 450px;
   position: relative;
 }
 .f-1 {
	 width: 100%;
	 align-content: center;
 }
 .f-2 {
	 width: 80%;
	 margin-top: 5%;
	 margin-left: 5%;
	 /* background-color: #3498DB; */
 }
 .f-3 {
	 width: 100%;
	 display: flex;
	 margin-top: 10%;
	 margin-left: 29%;
 }
 .f-4 {
	width: 100%;
	margin-top: 20%;
 }
 .f-5 {
	 width: 28%;
	 margin-top: 10%;
	 margin-left: 70%;
	 /* background-color: #3498DB; */
 }
 .front img {
	width: 130px;
	height: 130px;
	border-radius:50%;
	margin-top: -60px;
	margin-left: 80px;
}
 .f-1 p {
	font-size: 20px;
	font-weight: 600px;
	margin-top: 50px;
	margin-left:120px;
	color: #333333;
}
.f-2 h {
	font-size: 18px;
	margin-left:120px;
}
.f-3 p {
	font-size: 18px;
	font-weight: 600;
	margin-top: 50px;
	
}
.f-4 p {
   font-family: "edwardian script itc";
}
.f-5 p {
	color: #AAAAAA;
}
.big {
	color: #FFFFFF;
}
 .front, .back {
   width: 100%;
   height: 100%;
   position: absolute;
   background-size: cover;
   backface-visibility: hidden;
   box-shadow: 0 0 10px #2c3e50;
   transition: .8s;
 }
 .front {
   transform: perspective(900px) rotateY(0deg);
 }
 .back {
   transform: perspective(900px) rotateY(180deg);
 }
 .back .contact-info a {
   display: inline-flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   font-size: 20px;
   text-decoration: none;
   color: #2c3e50;
   border-radius: 50%;
 }
 .back .contact-info a:hover {
   color: white;
   background-color: #2c3e50;
 }
 .wrap:hover .front {
   transform: perspective(900px) rotateY(-180deg);
 }
 .wrap:hover .back {
   transform: perspective(900px) rotateY(00deg);
 }
 
 @keyframes rowup {
     0% {
         -webkit-transform: translate3d(0, 0, 0);
         transform: translate3d(0, 0, 0);
     }
     100% {
         -webkit-transform: translate3d(0, -307px, 0);
         transform: translate3d(0, -307px, 0);
     }
 }
 .list{
     width: 90%;
     margin: 20px auto;
     position: relative;
     height: 70%;
     overflow: hidden;
 }
 
 .list .rowup{
     -webkit-animation: 20s rowup linear infinite normal;
     animation: 20s rowup linear infinite normal;
     position: relative;
 }
 .follow {
	 margin-left: 35%;
 }
 .myButton {
 	box-shadow: 1px 1px 17px -5px #f5978e;
 	background:linear-gradient(to bottom, #f24537 5%, #c62d1f 100%);
 	background-color:#f24537;
 	border-radius:42px;
 	display:inline-block;
 	cursor:pointer;
 	color:#ffffff;
 	font-family:Georgia;
 	font-size:28px;
 	font-weight:bold;
 	font-style:italic;
 	padding:23px 29px;
 	text-decoration:none;
 	text-shadow:0px -1px 18px #810e05;
 }
 .myButton:hover {
 	background:linear-gradient(to bottom, #c62d1f 5%, #f24537 100%);
 	background-color:#c62d1f;
 }
 .myButton:active {
 	position:relative;
 	top:1px;
 }
.load {
	margin-left: 90%;
	margin-top: 5px;
}
.load img {
	width: 50px;
	height: 50px;
	cursor: pointer;
}
</style>
