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
		
		<div class="write">
			<img src="../assets/img/feather.png" @click="changeshow()">
		</div>
		</div>
		<div class="writearticle" v-if="!show">
				<span style="color: white;">作者ID: {{this.user.id}} </span>		
				<div class="wr">
					<div class="wr-top">
						<input type="text" placeholder="标题:" v-model="writeArticle.title">
						<input type="text" placeholder="简介:" v-model="writeArticle.content">
						<input type="text" placeholder="专题ID::" v-model="writeArticle.topicId">
						<input type="text" placeholder="输入图片地址:" v-model="writeArticle.cover">
					</div>
					<div class="wr-body">				
						<textarea rows="10" cols="30" placeholder="内容:" v-model="writeArticle.text"></textarea>
						<button @click="changeshow()" v-on:click="release">发布</button>
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
		margin-top: -80%;
	}
	
	.write img{
		width: 80px;
		height: 80px;
	}
</style>

