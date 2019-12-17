<template>
	<div>
		<div class="container">
			<div class="title">
				<p>{{article.title}}</p>
			</div>
			<div class="body">
			    <!-- 三角形 -->
			    <div class="traingle"></div>
			    <!-- star -->
			    <div class="star"></div>
				<div class="traingle-1"></div>
				<div class="star-1"></div>
				<div class="traingle-2"></div>
				</div>
				<div class="article" v-html="text"></div>
				
				<div class="icon">
				 <button class="comments">
					<i class="iconfont">&#xe603;</i>
						赞同{{article.likes}}
				</button>
				<button class="comment-link" @click="changeshow()">
					<i class="iconfont">&#xe602;</i>
						{{article.comments}}条评论
				</button>
				<button class="comments">
					<i class="iconfont">&#xe611;</i>
						分享
				</button>
				</div>
									
				<div class="bottom" v-if="!show">
					<div class="comment-card ">
					 <div class="top"><h1>个人评论</h1></div>
						<div class="card" v-for="(item, index) in comment" :key="index">
							<div class="card-first">
								<div class="card-left ">
									<img :src="item.author.avatar" class="user-avatar" />
								</div>
									<div class="card-right ">
										<div class="user-title">{{ item.author.nickname }}</div>
										<div class="user-comment">{{ item.comment.content }}</div>
									</div>
							</div>
								<div class="card-last">
									<div class="card-l-1">
										<p>
										    {{item.comment.createTime.date.year}}年
											{{item.comment.createTime.date.month}}月
											{{item.comment.createTime.date.day}}日
											{{item.comment.createTime.time.hour}}:
											{{item.comment.createTime.time.minute}}分
										</p>
									</div>
									<div class="card-l-2">
										<button class="del" @click="del(item.comment.id)">删除</button>
									</div>
								</div>
						</div>
						<div class="border">
							<textarea
								rows="10"
								cols="30"
								placeholder="发表评论:"
								v-model="writeComment.content"
								style="width: 80%;height: 200px;margin-left: 100px;margin-top: 20px;margin-bottom: 20px;
								       font-size: 18px;fontsfont-family: '楷体';"
								></textarea>
							<button
								class="comment-linka"
								@click="release"
								v-on:click="changeshow()"
							>
								发布
							</button>
				</div>
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
				 article: {},
				 author: {},
				 topic: {},
				 text: null,
				 comment: [],
				 show: 'true',
			writeComment: {
				articleId: 0,
				userId: 0,
				content: ''
			}
			}
		},
		created() {
			// 获取网页地址url
			var query = window.location.href
			// 锁定到最后一个"/"的位置
			var begin = query.lastIndexOf('/') + 1
			// 取出地址中最后的id值
			var articleId = query.substring(begin)
			this.axios.get('http://localhost:8080/api/article/' + articleId).then(res => {
				// console.log(res.data.data);
				this.article = res.data.data.article;
				this.text = this.article.content;
			});
			this.axios.get('http://localhost:8080/api/comment/' + articleId).then(res => {
				// alert("comment");
						console.log(res.data.data);
						this.comment = res.data.data;
			});
		},
		methods: {
			getImage(url) {
				return 'https://images.weserv.nl/?url=' + url;
			},
			changeshow() {
			this.show = !this.show;
		},
		//发评论
		release() {
			if (this.writeComment.content == '') {
				alert('内容不能为空');
				return;
			}
			var query = window.location.href;
			var begin = query.lastIndexOf('/') + 1;
			var articleId = query.substring(begin);
			this.writeComment.articleId = articleId;
			this.writeComment.userId = this.user.id;
			this.axios.post('http://localhost:8080/api/comment', this.writeComment).then(res => {
				this.$router.go(0);
			});
		},
		del(id) {
			alert(id);
			this.axios.delete('http://localhost:8080/api/comments/delete/' + id).then(res => {
				this.$router.go(0);
			});
			alert('删除成功');
		}
		},
		computed: {
			
		}
		
	}
</script>


<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1452728 */
	  src: url('//at.alicdn.com/t/font_1452728_xxy8ueff2yk.eot');
	  src: url('//at.alicdn.com/t/font_1452728_xxy8ueff2yk.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1452728_xxy8ueff2yk.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1452728_xxy8ueff2yk.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1452728_xxy8ueff2yk.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1452728_xxy8ueff2yk.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: 'iconfont' !important;
		font-size: 20px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.4px;
		-moz-osx-font-smoothing: grayscale;
	}
	.container {
		width: 100%;
		background: url(../assets/img/22.jpg) no-repeat center center fixed;
		            -webkit-background-size: cover;
		            -moz-background-size: cover;
		            -o-background-size: cover;
		            background-size: cover;
	}
	.title {
		width:90%;
		margin-left: 5%;
	}
	.title p {
		font-size: 5em;
		color: rgba(255, 255, 255, 0.3);
		background-image: url(../assets/img/water.png);
		text-transform: uppercase;
		letter-spacing: 8px;
		/* 注意添加私有前缀 */
		-webkit-background-clip: text;
		font-weight: 500;
		animation: wave 30s linear infinite;
	}
	@keyframes wave{
	    from{
	        background-position: 0 0;
	    }
	    to{
	        background-position: 1000px 0;
	    }
	}
	.article {
		width: 80%;
		margin-left: 10%;
		margin-top: -150%;
		font-weight: 200;
		font-size: 18px;
		border: 3px solid rgb(57, 62, 68);
		color: rgb(255, 255, 255);
	}
	.traingle {
	    width: 0;
	    height: 0;
		margin-top:100px;
		margin-left:86%;
	    border-left: 50px solid transparent;
	    border-right: 50px solid transparent;
	    border-bottom: 100px solid rgb(204, 182, 148);
	}
	.traingle-1 {
	    width: 0;
	    height: 0;
		margin-top:50%;
		margin-left:50px;
	    border-left: 50px solid transparent;
	    border-right: 50px solid transparent;
	    border-bottom: 100px solid rgb(204, 182, 148);
	}
	.traingle-2 {
	    width: 0;
	    height: 0;
		margin-top:40%;
		margin-left:86%;
	    border-left: 50px solid transparent;
	    border-right: 50px solid transparent;
	    border-bottom: 100px solid rgb(204, 182, 148);
	}
	
	.star {
	   margin-top:10%;
	   margin-left: 50px;
	   position: relative;
	   width: 0;
	   border-right: 100px solid transparent;
	   border-bottom: 70px  solid rgb(204, 182, 148);
	   border-left: 100px solid transparent;
	   transform: rotate(35deg) scale(.6);
	}
	.star:before {
	    content: '';
	    position: absolute;
	    border-bottom: 80px solid rgb(204, 182, 148);
	    border-left: 30px solid transparent;
	    border-right: 30px solid transparent;
	    top: -45px;
	    left: -65px;
	    transform: rotate(-35deg);
	}
	.star:after {
	    content: '';
	    position: absolute;
	    color: rgb(204, 182, 148);
	    top: 3px;
	    left: -105px;
	    border-right: 100px solid transparent;
	    border-bottom: 70px solid rgb(204, 182, 148);
	    border-left: 100px solid transparent;
	    transform: rotate(-70deg);
	}
	.star-1 {
	   margin-top:20%;
	   margin-left: 86%;
	   position: relative;
	   width: 0;
	   border-right: 100px solid transparent;
	   border-bottom: 70px  solid rgb(204, 182, 148);
	   border-left: 100px solid transparent;
	   transform: rotate(35deg) scale(.6);
	}
	.star-1:before {
	    content: '';
	    position: absolute;
	    border-bottom: 80px solid rgb(204, 182, 148);
	    border-left: 30px solid transparent;
	    border-right: 30px solid transparent;
	    top: -45px;
	    left: -65px;
	    transform: rotate(-35deg);
	}
	.star-1:after {
	    content: '';
	    position: absolute;
	    color: rgb(204, 182, 148);
	    top: 3px;
	    left: -105px;
	    border-right: 100px solid transparent;
	    border-bottom: 70px solid rgb(204, 182, 148);
	    border-left: 100px solid transparent;
	    transform: rotate(-70deg);
	}
	
	.bottom {
		width: 80%;
		height: 650px;
		margin-left: 10%;
		margin-top: 20px;
		border: 5px solid rgb(90, 97, 107);
		box-shadow: 2px 5px 15px rgb(204, 182, 148);
		border-radius: 10px;
	}
	.comment-card {
		width: 90%;
		margin-top: 4%;
		margin-left: 5%;
		border: 5px solid rgb(204, 182, 148);
		box-shadow: 2px 5px 15px #aaa;
		border-radius: 10px;
	}
	.top {
		width: 30%;
		color: #FFFFFF;
		/* background-color: #0000FF; */
	}
	.card {
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		/* background-color:#FF0000; */
	}
	.card-first {
		display: flex;
		width: 80%;
		/* background-color: #FF1493; */
	}
	.card-left {
		margin-left: 10px;
	}
	.user-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.card-right {
		margin-left: 20px;
	}
	.user-title {
		font-size: 20px;
		/* background-color: #FFFF00; */
	}
	.user-comment {
		font-size: 18px;
		margin-top: 10px;
		/* background-color: #0055AF; */
	}
	.card-last {
		display: flex;
		/* background-color: #007FAA; */
	}
	.card-l-1 {
		height: 20px;
		margin-left: 70%;
		/* background-color: #FFFFFF; */
	}
	.card-l-2 {
		height: 10px;
		margin-left: 80px;
		margin-top: -4px;
		background-color: #FFFFFF;
	}
	.del {
	   width: 40px;
	   border: 1px solid darkgray;
	   cursor: pointer;
	   opacity: 0.8;
	   color: #FFFFFF;
	   background-color: rgb(204, 182, 148);	
	}
	.icon {
		margin-top: 50px;
		display: flex;
		width: 100%;
		height: 45px;
		justify-content: space-around;
	}
	.comments {
		width: 100px;
		border: 1px solid darkgray;
		box-shadow: 1px 3px 5px #aaa;
		border-radius: 4px;
		color: #FFFFFF;
		background-color: rgb(204, 182, 148);
	}
	.comment-link {
		box-shadow: 1px 2px 7px 2px #1c1b18;
		background:linear-gradient(to bottom,  rgb(204, 182, 148) 5%,  rgb(204, 182, 148) 100%);
		background-color: rgb(204, 182, 148);
		border-radius:5px;
		border:1px solid #333029;
		display:inline-block;
		cursor:pointer;
		color:#FFFFFF;
		font-family:Times New Roman;
		font-size:18px;
		font-weight:400;
		padding:13px 20px;
		text-decoration:none;
		text-shadow:0px 1px 0px #ffffff;
	}
	.comment-link:hover {
		background:linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
		background-color: rgb(204, 182, 148);
		cursor: pointer;
	}
	.comment-linka {
		margin-left: 400px;
		margin-bottom: 20px;
		width: 200px;
		height: 40px;
		box-shadow: 1px 2px 7px 2px #1c1b18;
		background:linear-gradient(to bottom,  rgb(204, 182, 148) 5%,  rgb(204, 182, 148) 100%);
		background-color: rgb(204, 182, 148);
		border:1px solid #333029;
		cursor:pointer;
	}
</style>
