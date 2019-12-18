<template>
	<div>
		<div v-if="show">
		<div class="carousel">
			<transition-group tag="ul" class="slide-ul" name="slide">
				<li v-for="(item,index) in slideList"
				 :key="index"
				  v-show="index===currentIndex" 
				  @mouseenter="stop"
				   @mouseleave="go">
					<a :href="item.url">
						<img :src="item.image" :alt="item.description">
					</a>
				</li>
			</transition-group>
			<div class="carousel-items">
				<span v-for="(item,index) in slideList" 
				:class="{active:index===currentIndex}"
				 @mouseover="change(index)"></span>
			</div>
		</div>
		
		<div class="write">
			<img src="../assets/img/feather.png" @click="changeshow()">
		</div>
		
		<div class="container" v-for="(item,index) in articles" :key="index">
			<div class="card">
				<div class="left">
					<div class="left-top">
						<h><router-link :to="{path: 'p-detail/' + item.article.id}" class="link-t">{{item.article.title}}</router-link></h>
					</div>
					<div class="left-main">
						<p>{{item.article.summary.substring(0,120)}}</p>
					</div>
					<div class="left-bottom">
						<div class="b-1">
							<i class="iconfont" style="color: rgb(251, 9, 39);">&#xe601;</i>
						</div>
						<div class="b-2">
							<span><router-link :to="{path: 'u-detail/' + item.article.userId}" class="link-n"> {{item.author.nickname}} </router-link></span>
						</div>
						<div class="b-2">
							<i class="iconfont" style="color: rgb(234, 79, 22);">&#xe602;</i>
							<span>{{item.article.comments}}</span>
						</div>
						<div class="b-2">
							<i class="iconfont" style="color: rgb(216, 30, 6);">&#xe603;</i>
							<span>{{item.article.likes}}</span>
						</div>
					</div>
				</div>
				<div class="right">
					<img :src="item.topic.logo">
				</div>
			</div>
		</div>
		<div class="load">
			<img src="../assets/img/more.png" @click="loadMore">
		</div>
</div>
		<div class="writearticle" v-if="!show">
				<span style="margin-left: 10%; color: #005C5F;font-size:18px;">我的ID: {{this.user.id}} </span>		
				<div class="wr">
					<div class="wr-top">
						<div class="t-1">
							<div class="t-a">
								<p>文章标题:</p>
								<input type="text" placeholder="给你的文章想一个名字吧" v-model="writeArticle.title" class="one">
							</div>
							<div class="t-b">
								<p>文章简介:</p>
								<textarea rows="4" cols="80" placeholder="简单介绍一下你的文章吧" v-model="writeArticle.content" class="intro"></textarea>
							</div>
						</div>
						<div class="t-2">
							<input type="text" placeholder="专题ID" v-model="writeArticle.topicId" class="two">
							<input type="text" placeholder="图片地址" v-model="writeArticle.cover" class="three">
						</div>
					</div>
					<div class="wr-body">
						<div class="b-1">
							<p>文章内容:</p>
							<textarea rows="20" cols="120" placeholder="把你的想法写在这里吧" v-model="writeArticle.text"></textarea>
						</div>
						<button @click="changeshow()" v-on:click="release" class="myButton">发布</button>
					</div>
				</div>       						
			</div>
			
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')),
				 articles : [],
				 slideList: [
				 	{
				 		"url": "#",
				 		"description": "one",
				 		"image": "https://cdn.dribbble.com/users/329207/screenshots/7824170/media/cc77353e67ca46a4da78553330209a72.jpg"
				 	},
				 	{
				 		"url": "#",
				 		"description": "two",
				 		"image": "https://cdn.dribbble.com/users/63407/screenshots/7825858/media/547d13eb0522eabcbbaa6683c82bfe40.png"
				 	},
				 	{
				 		"url": "#",
				 		"description": "three",
				 		"image": "https://cdn.dribbble.com/users/1018201/screenshots/7816965/media/2ed92a6a7ee0017e28f3bbcaf88b8138.png"
				 	}
				 ],
				 currentIndex: 0,
				 timer: null,
				 currentPage: 1,
				 count: 20,
				 writeArticle: {
					            userId: '',
				 				topicId:'',
				 				title:'',
								summary:'',
								thumbnail:'',
				 				content: '',
								likes:0,
				 				comments:0
				 			},
				show:'true',
				watch:'true'
			}
		},
		created() {
			this.$nextTick(() => {
				this.timer = setInterval(() => {this.autoPlay()}, 3000)
			}),
			
			this.axios.get('http://localhost:8080/api/article').then(res => {
				// console.log(res.data.data); 
				this.articles = res.data.data;
				for (var i = 0;i<this.articles.length;i++) {
					this.articles[i].cover = this.getImage(this.articles[i].cover);
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
							.get('http://localhost:8080/api/article', {
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
									this.articles.splice(this.currentPage * this.count, 0, temp[i]);
								}
								console.log(this.articles.length);
							});
					},
			go() {
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 3000)
			},
			stop() {
				clearInterval(this.timer)
				this.timer = null
			},
			change(index) {
				this.currentIndex = index
			},
			autoPlay() {
				this.currentIndex++
				if (this.currentIndex > this.slideList.length - 1) {
					this.currentIndex = 0
				}
			},
			
			//发文章
			release() {
						if(this.writeArticle.text==''||this.writeArticle.text==''||this.writeArticle.content==''||this.writeArticle.topicId==''){
							alert("内容不能为空")
							return;
						}			
						this.writeArticle.userId= this.user.id;
						//alert(this.user.id);
						// alert(this.comment.content);
						this.axios.post('http://localhost:8080/api/article/new', this.writeArticle)
						.then(res => {
							// alert(res.data.msg);
							this.$router.go(0);
						});
						
						alert("发布成功")
						
					},
					
			changeshow(){			
						this.show=!this.show;
					},  
			
		},
		computed: {
			
		}
		
	}
</script>

<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1452728 */
	  src: url('//at.alicdn.com/t/font_1452728_a6ls2dif2v6.eot');
	  src: url('//at.alicdn.com/t/font_1452728_a6ls2dif2v6.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1452728_a6ls2dif2v6.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1452728_a6ls2dif2v6.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1452728_a6ls2dif2v6.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1452728_a6ls2dif2v6.svg#iconfont') format('svg');
	}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:16px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;
	}

	.carousel {
		position: relative;
		width: 800px;
		height: 300px;
		margin-left: 355px;
		border-radius: 10px;
		overflow: hidden;
	}
	
	.slide-ul {
		width: 100%;
		height: 100%;
	}
	
	.slide-ul li {
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
	}
	
	.slide-ul li img {
		width: 100%;
		height: 100%;
	}
	
	.carousel-items {
		z-index: 100;
		position: relative;
		top: -80px;
		text-align: center;
		font-size: 0;
	}
	
	.carousel-items span {
		display: inline-block;
		width: 50px;
		height: 6px;
		margin: 40px 20px;
		background-color:#AAAAAA;
		cursor: pointer;
	}
	
	.carousel-items .active {
		background-color: #008B8B;
	}
	
	/* 动画 */
	.slide-enter-to {
		transition: all 1s ease;
		transform: translateX(0);
	}
	
	.slide-leave-active {
		transition: all 1s ease;
		transform: translateX(-100%)
	}
	
	.slide-enter {
		transform: translateX(100%)
	}
	
	.slide-leave {
		transform: translateX(0)
	}
	.container {
		display: flex;
		justify-content: center;
		background-color: #FFFFFF;
	}
	.card {
		width: 800px;
		height: 150px;
		/* background-color: #FF4500; */
		display: flex;
		flex-wrap: wrap;
		margin-top: 5px;
		border-bottom: 1px solid #AAAAAA;
	}
	.left {
		width: 75%;
		height: 80%;
		display: flex;
		flex-direction: column;
		margin-top: 15px;
		/* background-color: #008B8B; */
	}
	.left-top {
		width: 75%;
		height: 30%;
		display: flex;
		/* background-color: #333333; */
	}
	.left-top h {
		font-size: 20px;
		font-weight: 600;
	}
	.left-main {
		width: 100%;
		height: 38%;
		margin-top: 2px;
		display: flex;
		/* background-color: #42B983; */
	}
	.left-main p {
		font-size: 14px;
		font-weight: 500;
		color: #AAAAAA;
	}
	.left-bottom {
		width: 75%;
		height: 25%;
		margin-top: 4px;
		display: flex;
		/* background-color: #F57F17; */
	}
	.b-2 {
		margin-left: 15px;
	}
	.left-bottom span {
		font-size: 12px;
		color: #AAAAAA;
	}
	.right {
		width: 23%;
		height: 80%;
		margin-left: 10px;
		margin-top: 10px;
		/* background-color: aquamarine; */
	}
	.right img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	.link-t {
		color:#000000;
	}
	.link-n {
		color: #AAAAAA;
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
	.write {
		margin-left: 88%;
		position: sticky;
		top:250px;
		cursor: pointer;
	}
	
	.write img{
		width: 80px;
		height: 80px;
	}
	
	.writearticle {
		height: 800px;
	}
	.wr {
		width: 90%;
		margin-left: 5%;
		margin-top: 20px;
		border: 2px solid rgb(235, 111, 90);
		box-shadow: 2px 5px 8px #aaa;
		border-radius: 5px;
		height: 700px;
		background-color:rgb(235, 111, 90);
	}
	.wr-top {
		width: 90%;
		margin-left: 5%;
		display: flex;
		flex-direction: column;
		/* background-color: #F1FA8C; */
	}
	.t-1 {
		display: flex;
		flex-direction: column;
	}
	.t-a {
		display: flex;
	}
	.t-a p {
		margin-top: 20px;
		font-size: 18px;
		color: #002B36;
	}
	.one {
		width: 20%;
		margin-top: 20px;
		margin-left: 10px;
		height: 20px;
		border: 1px solid rgb(56, 188, 183);
		padding: 2px 0px;
		border-radius: 2px;
		padding-left:5px;
		color: #008B8B;
		font-weight: 500;
		font-size: 15px;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
	}
	.one:focus{
	    outline: 0;
	    box-shadow: inset 0 1px 1px #F0F0F0,0 0 8px #F0F0F0;
	}
	.t-b {
		display: flex;
	}
	.t-b p {
		margin-top:20px;
		font-size: 18px;
		color: #002B36;
	}
	.intro {
		width: 80%;
		margin-left: 1%;
		margin-top: 20px;
		border: 1px solid rgb(56, 188, 183);
		padding: 2px 0px;
		border-radius: 2px;
		padding-left:5px;
		color: #008B8B;
		font-weight: 500;
		font-size: 15px;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
	}
	.intro:focus {
		outline: 0;
		box-shadow: inset 0 1px 1px #F0F0F0,0 0 8px #F0F0F0;
	}
	.t-2 {
		justify-content: space-around;
	}
	.two {
		margin-top: 10px;
		margin-left: 20%;
		height: 20px;
		width: 100px;
		border: 1px solid rgb(56, 188, 183);
		padding: 2px 0px;
		border-radius: 2px;
		padding-left:5px;
		color: #008B8B;
		font-weight: 500;
		font-size: 15px;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
	}
	.two:focus {
		outline: 0;
		box-shadow: inset 0 1px 1px #F0F0F0,0 0 8px #F0F0F0;
	}
	.three {
		margin-left: 10%;
		height: 20px;
		width: 300px;
		border: 1px solid rgb(56, 188, 183);
		padding: 2px 0px;
		border-radius: 2px;
		padding-left:5px;
		color: #008B8B;
		font-weight: 500;
		font-size: 15px;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
	}
	.three:focus {
		outline: 0;
	    box-shadow: inset 0 1px 1px #F0F0F0,0 0 8px #F0F0F0;
    }
	.wr-body {
		width: 90%;
		display: flex;
		flex-direction: column;
		margin-left: 5%;
		/* background-color: #F22C40; */
	}
	.b-1 {
		display: flex;
	}
	.b-1 p {
		margin-top: 20px;
		font-size: 18px;
		color: #002B36;
	}
	textarea {
		width: 80%;
		margin-left: 5%;
		margin-top: 20px;
		border: 1px solid rgb(56, 188, 183);
		padding: 2px 0px;
		border-radius: 2px;
		padding-left:5px;
		color: #008B8B;
		font-weight: 500;
		font-size: 18px;
		font-family:Times New Roman;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
	}
	textarea:focus {
		outline: 0;
		box-shadow: inset 0 1px 1px #F0F0F0,0 0 8px #F0F0F0;
	}
	.myButton {
		width: 10%;
		margin-left: 42%;
		margin-top: 20px;
		box-shadow: -1px 7px 20px -6px rgb(55, 188, 183);
		background:linear-gradient(to bottom, rgb(55, 188, 183) 5%, rgb(55, 188, 183) 100%);
		background-color:rgb(55, 188, 183);
		border-radius:9px;
		border:1px solid #ffffff;
		display:inline-block;
		cursor:pointer;
		color:#ffffff;
		font-family:Times New Roman;
		font-size:12px;
		font-weight:bold;
		padding:10px 22px;
		text-decoration:none;
		text-shadow:0px 0px 6px #b23e35;
	}
</style>

