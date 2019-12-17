<template>
	<div>
		<div class="container">
			<div class="solarsys">
					<div class="item-o">Hello DearFriend</div>
					<div class="item-t">If you have an account, please log in directly. 
					                    If you do not have an account, please register first.</div>
					<div class="link-o" v-if="!this.user"><router-link to="/sign-in" class="link-s">SignIn</router-link></div>
					<div class="link-t">Register</div>
				  <!--太阳-->
				  <div class='sun'></div>
				
				  <!--水星轨道-->
				  <div class='mercuryOrbit'></div>
				
				  <!--水星-->
				  <div class='mercury'></div>
				
				  <!--金星轨道-->
				  <div class='venusOrbit'></div>
				
				  <!--金星-->
				  <div class='venus'></div>
				
				  <!--地球轨道-->
				  <div class='earthOrbit'></div>
				
				  <!--地球-->
				  <div class='earth'></div>
				
				  <!--火星轨道-->
				  <div class='marsOrbit'></div>
				
				  <!--火星-->
				  <div class='mars'></div>
				
				  <!--木星轨道-->
				  <div class='jupiterOrbit'></div>
				
				  <!--木星-->
				  <div class='jupiter'></div>
				
				  <!--土星轨道-->
				  <div class='saturnOrbit'></div>
				
				  <!--土星-->
				  <div class='saturn'></div>
				
				  <!--天王星轨道-->
				  <div class='uranusOrbit'></div>
				
				  <!--天王星-->
				  <div class='uranus'></div>
				
				  <!--海王星轨道-->
				  <div class='neptuneOrbit'></div>
				
				  <!--海王星-->
				  <div class='neptune'></div>
				</div>
				<div class="router-1">
					<span><router-link to="p" class="route">Article</router-link></span>
				</div>
			    <div class="first-1"> 
			    <div class="link-th" v-for="(item,index) in articles" :key="index">
				<div class="card">
				 <img :src="item.author.avatar" class="img">
				 <button @click="show = !show" class="btn">Know more</button>
				 <transition name="slide-fade" v-if="show">
					 <p class="slide">{{item.article.title}}</p>
				 </transition>
				</div>
			</div>
		</div>
		<div class="router-2">
			<span><router-link to="c" class="route">Topic</router-link></span>
		</div>
		<div class="first-2">
			    <div class="link-th" v-for="(item,index) in articles" :key="index">
				<div class="card">
				 <img :src="item.topic.logo" class="img">
				<!-- <button @click="show = !show" class="btn">Know more</button>
				 <transition name="slide-fade" v-if="show">
				 <p class="slide">{{item.topic.topicName}}</p>
				 </transition> -->
				</div>
			</div>
		</div>
		<div class="last">
			<span class="go-top" @click="backTop"> PAGE TOP</span>
		</div>
		<div class="two">
			<div class="t-top">
				<p>A brief introduction to World Book Day:</p>
			</div>
			
			<div class="t-m">
				<ul>
				<li><img src="../assets/img/16.jpg"></li>
				<li><img src="../assets/img/17.jpg"></li>
				<li><img src="../assets/img/18.jpg"></li>
				<li><img src="../assets/img/19.jpg"></li>
				<li><img src="../assets/img/20.jpg"></li>
				<li><img src="../assets/img/21.jpg"></li>
				</ul>
			</div>
			
			<div class="t-l">
				<p>“世界读书日”全称“世界图书与版权日”，又译“世界图书日”，最初的创意来自于国际出版商协会。
				     1995年正式确定每年4月23日为“世界图书与版权日”，设立目的是推动更多的人阅读和写作。</p>
			</div>
			
			<div class="t-r">
				<p>希望散居在世界各地的人，无论你是年老还是年轻，无论你是贫穷还是富裕，无论你是患病还是健康，都能享受阅读的乐趣，
				   都能尊重和感谢为人类文明做出过巨大贡献的文学、文化、科学、思想大师们，都能保护知识产权。
				   每年的这一天，世界100多个国家都会举办各种各样的庆祝和图书宣传活动。</p>
			</div>
			<div class="t-b">
				<router-link to="u" class="text">优秀作者推荐</router-link>
			</div>
		</div>
    </div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				 articles : [],
				 show: false,
			}
		},
		
		created() {
			this.axios.get('http://localhost:8080/api/article').then(res => {
				// console.log(res.data.data);
				this.articles = res.data.data;
				for (var i = 0;i<this.articles.length;i++) {
					this.articles[i].cover = this.getImage(this.articles[i].cover);
				}
			});
			
		},
		mounted () {
		  window.addEventListener('scroll', this.scrollToTop)
		},
		destroyed () {
		  window.removeEventListener('scroll', this.scrollToTop)
		},
		
		methods: {
			getImage(url) {
				return 'https://images.weserv.nl/?url=' + url;
			},
			
			 // 点击图片回到顶部方法，加计时器是为了过渡顺滑
			  backTop () {
			      const that = this
			      let timer = setInterval(() => {
			        let ispeed = Math.floor(-that.scrollTop / 5)
			        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
			        if (that.scrollTop === 0) {
			          clearInterval(timer)
			        }
			      }, 16)
			  },
			
			  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
			  scrollToTop () {
			    const that = this
			    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			    that.scrollTop = scrollTop
			    if (that.scrollTop > 0) {
			      that.btnFlag = true
			    } else {
			      that.btnFlag = false
			    }
			  }
		},
		computed: {
			
		}
		
	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: 3000px;
		display: flex;
		flex-direction: column;
	}
	.item-o {
	    width: 400px;
	    height:45px;
		font-size: 24px;
		font-weight: 600px;
		color: #FFFFFF;
		font-family: "estrangelo edessa";
	    margin-top: 250px;
		margin-left:800px;
	}
	.item-t {
	    width: 500px;
	    height:60px;
		font-size: 15px;
		font-weight: 500px;
		color: #FFFFFF;
		font-family: "estrangelo edessa";
	    margin-top: 10px;
		margin-left:700px;
	}
	.link-o{
	    width: 100px;
	    height:40px;
		border:1px solid #333333;
		margin-top: 20px;
		margin-left: 750px;
		text-align: center;
	}
	.link-s {
		color: #FFFFFF;
	}
	.link-t{
	    width: 100px;
	    height:40px;
		border:1px solid #333333;
		color: #FFFFFF;
		margin-top:-43px;
		margin-left: 950px;
		text-align: center;
	}
	.solarsys{
	  width:100%;
	  height: 800px;;
	  position: relative;
	  margin: 0 auto;
	  background-color:#008B8B;
	  padding: 0;
	  transform: scale(1);
	  
	}
	
	/*太阳*/
	.sun {
	  left:357px;
	  top:357px;
	  height: 90px;
	  width: 90px;
	  background-color: rgb(248,107,35);
	  border-radius: 50%;
	  box-shadow: 5px 5px 10px rgb(248,107,35), -5px -5px 10px rgb(248,107,35), 5px -5px 10px rgb(248,107,35), -5px 5px 10px rgb(248,107,35);
	  position: absolute;
	  margin: 0;
	}
	
	/*水星*/
	.mercury {
	  left:337.5px;
	  top:395px;
	  height: 10px;
	  width: 10px;
	  background-color: rgb(166,138,56);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 62.5px 5px;
	  animation: rotate 1.5s infinite linear;
	}
	
	/*金星*/
	.venus {
	  left:309px;
	  top:389px;
	  height: 22px;
	  width: 22px;
	  background-color: rgb(246,157,97);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 91px 11px;
	  animation: rotate 3.84s infinite linear;
	}
	
	
	/*地球*/
	.earth {
	  left:266.5px;
	  top:391px;
	  height: 18px;
	  width: 18px;
	  background-color: rgb(115,114,174);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 134px 9px;
	  animation: rotate 6.25s infinite linear;
	}

	/*火星*/
	.mars {
	  left:222.5px;
	  top:392.5px;
	  height: 15px;
	  width: 15px;
	  background-color: rgb(140,119,63);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 177.5px 7.5px;
	  animation: rotate 11.75s infinite linear;
	}
	
	/*木星*/
	.jupiter {
	  left:134px;
	  top:379px;
	  height: 42px;
	  width: 42px;
	  background-color: rgb(156,164,143);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 266px 21px;
	  animation: rotate 74.04s infinite linear;
	}
	
	/*土星*/
	.saturn {
	  left:92px;
	  top:387px;
	  height: 26px;
	  width: 26px;
	  background-color: rgb(215,171,68);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 308px 13px;
	  animation: rotate 183.92s infinite linear;
	}
	
	/*天王星*/
	.uranus {
	  left:41.5px;
	  top:386.5px;
	  height: 27px;
	  width: 27px;
	  background-color: rgb(164,192,206);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 358.5px 13.5px;
	  animation: rotate 524.46s infinite linear;
	}
	
	/*海王星*/
	.neptune {
	  left:10px;
	  top:390px;
	  height: 20px;
	  width: 20px;
	  background-color: rgb(133,136,180);
	  border-radius: 50%;
	  position: absolute;
	  transform-origin: 390px 10px;
	  animation: rotate 1028.76s infinite linear;
	}
	
	@keyframes rotate {
	  100% {
	    transform: rotate(-360deg);
	  }
	}
	
	.router-1{
		width: 4.2%;
		/* background-color: #008B8B; */
		border: 1px solid #008B8B;
		outline: #e91e63 solid 2px;
		-webkit-animation: mymove 5s infinite; /* Chrome, Safari, Opera */
		animation: mymove 5s infinite;
		margin-top: 2%;
		margin-left: 44%;
	}
	.router-2 {
		width: 4%;
		/* background-color:#e91e63 ; */
		border: 1px solid #008B8B;
		outline: #e91e63 solid 2px;
		-webkit-animation: mymove 5s infinite; /* Chrome, Safari, Opera */
		animation: mymove 5s infinite;
		margin-top:3%;
		margin-left: 44%;
	}
	.route {
		font-size: 18px;
		font-family: "arial rounded mt bold";
		color: rgb(0, 139, 139);
		margin-left: 5px;
	}
	.first-1 {
		width:80%;
		margin-top: 2%;
		margin-left: 10%;
		display: flex;
		flex-wrap: wrap;
		outline: #008B8B solid 1px;
		border-radius: 3px;
	}
	/* Chrome, Safari, Opera */
	@-webkit-keyframes mymove {
	    50% {outline-offset: 5px;}
	}
	
	/* Standard syntax */
	@keyframes mymove {
	    50% {outline-offset: 5px;}
	}

	.first-2 {
		width:80%;
		margin-top: 2%;
		margin-left: 10%;
		display: flex;
		flex-wrap: wrap;
		outline: #008B8B solid 1px;
		border-radius: 3px;
	}
	.link-th {
		margin-top: 50px;
		display: flex;
		flex: 0 0 20%;
		/* background-color: #000000; */
	}
	.card {
		width: 200px;
		height: 240px;
		/* border: 1px solid #008B8B; */
		padding: 10px;
		margin-left: 20px;
	}
	
	.img {
		width: 100%;
		height: 80%;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.6s;/*图片放大过程的时间*/
	}
	 .img:hover{
	    transform: scale(1.1);/*鼠标经过图片放大的倍数*/
    }
	.btn {
		width: 80px;
		height: 30px;
		margin-left: 50px;
		margin-top: 13px;
		border: 1px solid #FFFFFF;
		opacity: 0.2;
	}
	
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateX(10px);
	  opacity: 0;
	}
	.slide {
		width: 200px;
		height: 80px;
		font-size: 14px;
		color: #FFFFFF;
	}
	.last {
		width: 6%;
		margin-left: 88%;
		margin-top: 4%;
		/* background-color: #AAAAAA; */
	}
	.go-top {
		color: #AAAAAA;
		cursor: pointer;
	}
	.two {
		width:100%;
		height: 900px;
		margin-top: 6%;
		background-color: rgb(0, 139, 139);
	}
	.t-top {
		width: 40%;
		margin-top: 10px;
		margin-left: 5px;
	}
	.t-top p {
	    font-family: 'Audiowide';
	    color:#2C3E50;
	    font-size: 24px;
	    -webkit-transition: all 1.5s ease;
	            transition: all 1.5s ease;
	}
	.t-top p:hover {
	    color: #fff;
	    -webkit-animation: Glow 1.5s ease infinite alternate;
	            animation: Glow 1.5s ease infinite alternate;
	
	}
	@-webkit-keyframes Glow {
	    from {
	        text-shadow: 0 0 10px #fff,
	                     0 0 20px #fff,
	                     0 0 30px #fff,
	                     0 0 40px #00a67c,
	                     0 0 70px #00a67c,
	                     0 0 80px #00a67c,
	                     0 0 100px #00a67c,
	                     0 0 150px #00a67c;
	    }
	    to {
	        text-shadow: 0 0 5px #fff,
	                     0 0 10px #fff,
	                     0 0 15px #fff,
	                     0 0 20px #00a67c,
	                     0 0 35px #00a67c,
	                     0 0 40px #00a67c,
	                     0 0 50px #00a67c,
	                     0 0 75px #00a67c;
	    }
	}
	@keyframes Glow {
	    from {
	        text-shadow: 0 0 10px #fff,
	                     0 0 20px #fff,
	                     0 0 30px #fff,
	                     0 0 40px #00a67c,
	                     0 0 70px #00a67c,
	                     0 0 80px #00a67c,
	                     0 0 100px #00a67c,
	                     0 0 150px #00a67c;
	    }
	    to {
	        text-shadow: 0 0 5px #fff,
	                     0 0 10px #fff,
	                     0 0 15px #fff,
	                     0 0 20px #00a67c,
	                     0 0 35px #00a67c,
	                     0 0 40px #00a67c,
	                     0 0 50px #00a67c,
	                     0 0 75px #00a67c;
	    }
	}
	.t-m {
		width: 70%;
		height: 500px;
		justify-content: center;
		margin-left: 180px;
	}
	.t-l {
		width: 20%;
		margin-top: -45%;
		margin-left: 15px;
	}
	
	.t-l p {
		font-size: 18px;
		font-family: "Open Sans", sans-serif;
		color: #FFFFFF;
	}
	.t-r {
		width: 15%;
		margin-top: -5%;
		margin-left: 82%;
	}
	.t-r p {
		font-size: 18px;
		font-family: "Open Sans", sans-serif;
		color: #FFFFFF;
	}
	.t-b {
		width: 10%;
		margin-top: 3%;
		margin-left: 85%;
	}
	.text {
		color:rgb(233, 30, 99);
		font-size: 22px;
	}
	ul{
	width: 400px;
	height: 400px;
	margin: 200px auto;
	position: relative;
	transform-style: preserve-3d;
	animation: lws 20s infinite linear;
	}
	ul li{
	list-style: none;
	width: 200px;
	height: 200px;
	text-align: center;
	line-height: 200px;
	position: absolute;
	}
	ul li img{
	width: 400px;
	height: 300px;
	}
	ul li:nth-child(1){
	background: red;
	transform: rotateY(60deg) translateZ(200px);
	}
	ul li:nth-child(2){
	background-color: purple;
	transform: rotateY(120deg) translateZ(200px);
	}
	ul li:nth-child(3){
	background-color: blue;
	transform: rotateY(180deg) translateZ(200px);
	}
	ul li:nth-child(4){
	background-color: orangered;
	transform: rotateY(240deg) translateZ(200px);
	}
	ul li:nth-child(5){
	background-color: yellow;
	transform: rotateY(300deg) translateZ(200px);
	}
	ul li:nth-child(6){
	background-color: cyan;
	transform: rotateY(360deg) translateZ(200px);
	}
	@keyframes lws{
	from{
	transform: rotateX(-20deg) rotateY(0deg);
	}
	to{
	transform: rotateX(-20deg) rotateY(360deg);
	}
	}
	ul:hover{
	animation-play-state: paused;
	}
	ul:hover li img{
	opacity: .8;
	}
	ul li:hover img{
	opacity: 1;
	}
</style>
