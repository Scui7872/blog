<template>
	<div>
		<div class="container">
			<div class="top">
				<div class="t-l">
					<img :src="userVo.user.avatar">
				</div>
				<div class="t-r">
					<div class="t-r-1">
						<p>{{userVo.user.nickname}}</p>
					</div>
					<div class="t-r-2">
						<div class="f">
							<p>{{userVo.user.follows}}</p>
							<h>关注</h>
						</div>
						<div class="t">
							<p>{{userVo.user.fans}}</p>
							<h>粉丝</h>
						</div>
						<div class="th">
							<p>{{userVo.user.articles}}</p>
							<h>文章</h>
						</div>
						<div class="four">
							<p>{{userVo.user.follows}}</p>
							<h>字数</h>
						</div>
						<div class="five">
							<p>{{userVo.user.status}}</p>
							<h>收获喜欢</h>
						</div>
					</div>
				</div>
			</div>
            <div class="left">
				<div class="article">
					<i class="iconfont">&#xe615;</i>
					<p>相关文章</p>
				</div>
				<div class="topic">
					<i class="iconfont">&#xe600;</i>
					<p>相关专题</p>
				</div>
				<div class="follow">
					<i class="iconfont">&#xe604;</i>
					<p>我的关注</p>
				</div>
			</div>
			<div class="body" v-for="(item, index) in userVo.articleList" :key="index">
				<div class="b-1">
						<p>{{item.article.title}}</p>
				</div>
				<div class="b-2">
					<h>{{item.article.summary}}</h>
				</div>
				<div class="b-3">
					<img :src="item.author.avatar">
					<p>{{item.author.nickname}}</p>
				</div>
				
			</div>
			
			</div>
	</div>
</template>
 
<script>
	export default {
		data() {
			return {
                userVo: {}
				
			}
		},
		created() {
             var query = window.location.href
			 var begin = query.lastIndexOf('/') + 1
			 var userId = query.substring(begin)
			 this.axios.get('http://localhost:8080/api/user/' + userId).then(res => {
				 this.userVo = res.data.data;
				 console.log(this.userVo);
			 });
			  autosize(document.querySelector('#textarea'));
			 
		},
		methods: {
             getImage(url) {
				 return 'http://images.weserv.nl/?url=' + url;
			 }
		},
		computed: {

		}

	}
</script>

<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1452728 */
	  src: url('//at.alicdn.com/t/font_1452728_n4fg2z4c00e.eot');
	  src: url('//at.alicdn.com/t/font_1452728_n4fg2z4c00e.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1452728_n4fg2z4c00e.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1452728_n4fg2z4c00e.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1452728_n4fg2z4c00e.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1452728_n4fg2z4c00e.svg#iconfont') format('svg');
	}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:30px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;}
.container {
	width: 100%;
	background: url(../assets/img/27.jpg) no-repeat center center fixed;
	            -webkit-background-size: cover;
	            -moz-background-size: cover;
	            -o-background-size: cover;
	            background-size: cover;
	font-size: 12px;
}	
.top {
	width: 60%;
	margin-top: 3%;
	margin-left: 33%;
	display: flex;
	/* background-color: #000066; */
}
.t-l {
	width: 15%;
	margin-left: 5%;
	/* background-color: #0000FF; */
}
.t-l img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin-left: 20%;
}
.t-r {
	width: 75%;
	display: flex;
	flex-direction: column;
	/* background-color: #FF55FF; */
}
.t-r-1 {
	width: 50%;
	height: 40%;
	/* background-color: #008000; */
}
.t-r-1 p {
	font-size: 24px;
	font-weight: 600;
	color: #FFFFFF;
}
.t-r-2 {
	width: 90%;
	height: 55%;
	display: flex;
	/* background-color:#FFFF00; */
}
.f {
	width: 10%;
	margin-top: 2%;
	color: #FFFFFF;
	/* background-color: #FF0000; */
}
.t {
	width: 10%;
	margin-top: 2%;
	color: #FFFFFF;
	/* background-color: #FF0000; */
}
.th {
	width: 10%;
	margin-top: 2%;
	color: #FFFFFF;
	/* background-color: #FF0000; */
}
.four {
	width: 10%;
	margin-top: 2%;
	color: #FFFFFF;
	/* background-color: #FF0000; */
}
.five {
	width: 10%;
	margin-top: 2%;
	color: #FFFFFF;
	/* background-color: #FF0000; */
}

.left {
	width: 15%;
	margin-left: 5%;
	margin-top: 5%;
	border: 2px solid rgb(228, 83, 119);
	/* background-color: #F06431; */
}
.article {
	width: 100%;
	display: flex; 
}
.article p {
	margin-left:20%;
	margin-top: 4px;
	font-size: 18px;
	font-weight: 400;
	color: #FFFFFF;
}
.topic {
	width: 100%;
	display: flex;
	margin-top: 5%;
}
.topic p {
	margin-left:20%;
	margin-top: 4px;
	font-size: 18px;
	font-weight: 400;
	color: #FFFFFF;
}
.follow {
	width: 100%;
	display: flex;
	margin-top: 5%;
}
.follow p {
	margin-left:20%;
	margin-top: 4px;
	font-size: 18px;
	font-weight: 400;
	color: #FFFFFF;
}

.body {
	width: 50%;
	display: flex;
	flex-wrap: wrap;
	margin-top:30px;
	margin-left: 28%;
	border: 1.5px solid rgb(228, 83, 119);
	border-radius: 5px;
	/* background-color: #FFFFB6; */
}
.b-1 {
	width: 90%;
	display: flex;
	/* background-color: #FF5555; */
}
.b-1 p {
	font-size: 18px;
	font-weight: 600;
	color: #FFFFFF;
}
.b-2 {
	width: 100%;
	display: flex;
	/* background-color: #000066; */
}
.b-2 h {
	font-size: 14px;
	font-weight: 400;
	color: #FFFFFF;
}
.b-3 {
	width: 20%;
	display: flex;
	margin-top: 10px;
	margin-left: 10px;
	/* background-color:#004444; */
}
.b-3 img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}
.b-3 p {
	margin-top: 5px;
	margin-left: 15px;
	font-weight: 400;
	color: darkgray;
}
</style>
