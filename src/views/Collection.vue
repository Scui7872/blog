<template>
	<div>
		<hgroup class="triangle2rect">
		    <div class="a"></div>
		    <div class="b"></div>
		    <div class="c"></div>
		    <div class="d"></div>
		</hgroup>
		<hgroup class="triangle3rect">
		    <div class="e"></div>
		    <div class="f"></div>
		    <div class="g"></div>
		    <div class="h"></div>
		</hgroup>
		<div class="body">
			<div class="demo" v-for="(topic,index) in topics" :key="index">
				<div class="left">
					<span><img :src="topic.logo" class="link"></span>
					<p>文章数</p>
					<span>{{topic.articles}}篇</span>
					<p>粉丝数</p>
					<span>{{topic.follows}}位</span>
					<p>更新于</p>
					<span>{{topic.createTime.date.year}}年{{topic.createTime.date.month}}月</span>
				</div>
				<div class="right">
					<div class="r-top">
						<p>{{topic.topicName}}</p>
					</div>
					<div class="r-main">
						<p>{{topic.description}}</p>
					</div>
				</div>
			</div>
			<div class="load">
				<img src="../assets/img/more.png" @click="loadMore">
			</div>
        </div>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				topics : [],
				currentPage: 1,
				count: 6
			}
		},
		created() {
			this.axios.get('http://localhost:8080/api/topic').then(res => {
				// console.log(res.data.data); 
				this.topics = res.data.data;
				for (var i = 0;i<this.topics.length;i++) {
					this.topics[i].cover = this.getImage(this.topics[i].cover);
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
							.get('http://localhost:8080/api/topic', {
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
									this.topics.splice(this.currentPage * this.count, 0, temp[i]);
								}
								console.log(this.topics.length);
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
	.triangle2rect {
	    position: absolute;
	    width: 300px;
	    height: 300px;
	    top: 10%;
	    left: 10%;
	    transform: translate(-50%, -50%);
	    animation: aniContainer 2s infinite alternate;
	}
	.triangle2rect div {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	}
	.triangle3rect {
	    position: absolute;
	    width: 300px;
	    height: 300px;
	    top:1420px;
	    left: 88%;
	    transform: translate(-50%, -50%);
	    animation: aniContainer 2s infinite alternate;
	}
	.triangle3rect div {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	}
	.a {
	    background: #008B8B;
	    clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
	    animation: a 3s infinite alternate;
	}
	.b {
	    background: #008B8B;
	    clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
	    animation: b 3s infinite alternate;
	}
	.c {
	    background: #008B8B;
	    clip-path: polygon(100% 0%, 100% 100%, 50% 50%);
	    animation: c 3s infinite alternate;
	}
	.d {
	    background: #008B8B;
	    clip-path: polygon(100% 100%, 0% 100%, 50% 50%);
	    animation: d 3s infinite alternate;
	}
	@keyframes a {
	    0%, 10% {
	        background: #008B8B;
	        clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
	    }
	    90%, 100% {
	        background: #008B8B;
	        clip-path: polygon(0% 100%, 25% 100%, 12.5% 0%);
	    }
	}
	@keyframes b {
	    0%, 10% {
	        background: #E91E63;
	        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
	    }
	    90%, 100% {
	        background: #E91E63;
	        clip-path: polygon(25% 0%, 50% 0%, 37.5% 100%);
	    }
	}
	@keyframes c {
	    0%, 10% {
	        background: #008B8B;
	        clip-path: polygon(100% 0%, 100% 100%, 50% 50%);
	    }
	    90%, 100% {
	        background: #008B8B;
	        clip-path: polygon(62.5% 0%, 75% 100%, 50% 100%);
	    }
	}
	@keyframes d {
	    0%, 10% {
	        background: #E91E63;
	        clip-path: polygon(100% 100%, 0% 100%, 50% 50%);
	    }
	    90%, 100% {
	        background: #E91E63;
	        clip-path: polygon(100% 0%, 87.5% 100%, 75% 0%);
	    }
	}
	@keyframes aniContainer {
	    0%, 10% {
	        width: 100px;
	        height: 100px;
	    }
	    90%, 100% {
	        width: 250px;
	        height: 60px;
	    }
	}
	.e {
	    background: #E91E63;
	    clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
	    animation: a 3s infinite alternate;
	}
	.f {
	    background: #E91E63;
	    clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
	    animation: b 3s infinite alternate;
	}
	.g {
	    background: #E91E63;
	    clip-path: polygon(100% 0%, 100% 100%, 50% 50%);
	    animation: c 3s infinite alternate;
	}
	.h {
	    background: #E91E63;
	    clip-path: polygon(100% 100%, 0% 100%, 50% 50%);
	    animation: d 3s infinite alternate;
	}
	@keyframes e {
	    0%, 10% {
	        background: #E91E63;
	        clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
	    }
	    90%, 100% {
	        background: #E91E63;
	        clip-path: polygon(0% 100%, 25% 100%, 12.5% 0%);
	    }
	}
	@keyframes f {
	    0%, 10% {
	        background: deeppink;
	        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
	    }
	    90%, 100% {
	        background: #E91E63;
	        clip-path: polygon(25% 0%, 50% 0%, 37.5% 100%);
	    }
	}
	@keyframes g {
	    0%, 10% {
	        background: #E91E63;
	        clip-path: polygon(100% 0%, 100% 100%, 50% 50%);
	    }
	    90%, 100% {
	        background: #E91E63;
	        clip-path: polygon(62.5% 0%, 75% 100%, 50% 100%);
	    }
	}
	@keyframes h {
	    0%, 10% {
	        background: #E91E63;
	        clip-path: polygon(100% 100%, 0% 100%, 50% 50%);
	    }
	    90%, 100% {
	        background: #E91E63;
	        clip-path: polygon(100% 0%, 87.5% 100%, 75% 0%);
	    }
	}
	
	.body {
		width: 85%;
		margin-left: 5%;
		margin-top: 2%;
		background-image: url(../assets/img/23.jpg);
		display: flex;
		flex-wrap: wrap;
	}
	.demo {
		width:400px;
		height:300px;
		margin-left: 13%;
		margin-top: 50px;
		border-radius: 5px;
		display: flex;
		background:linear-gradient(90deg,#feac5e,#c779d0,#4bc0c8);
	}
	.left {
		width: 90px;
		height: 300px;
		border-right: 1px solid #FFFFFF;
	}
	.link {
		width: 75px;
		height: 75px;
		border-radius: 50%;
		margin-left: -10px;
		margin-top: 10px;
	}
	.left p {
		color: rgb(66, 66, 66);
		margin-left: 25px;
		margin-top: 25px;
		font-size: 14px;
	}
	.left span {
		color: rgb(66, 66, 66);
		margin-left: 20px;
		margin-top: 5px;
		font-size: 12px;
	}
	.right {
		width: 290px;
		height: 180px;
		margin-left:5%;
		display: flex;
		flex-direction: column;
	}
	.r-top {
		margin-left: 20%;
		color: #2C3E50;
		font-size: 20px;
	}
	.r-main {
		margin-left: -2%;
		margin-top: 8px;
		color: #800080;
		font-size: 13px;
	}
	.load {
		margin-left: 95%;
		margin-top: 5px;
	}
	.load img {
		width: 50px;
		height: 50px;
		cursor: pointer;
	}
</style>
