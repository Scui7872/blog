<template>
	<div>
		<div class="nav-bar back-color">
			<div class="container">
				<div class="dropdown">
					<button class="dropbtn">Menu</button>
					<div class="dropdown-content">
						  <a href="http://localhost:8888/#/p">文章主页</a>
						<a href="http://localhost:8888/#/c">专题主页</a>
						<a href="http://localhost:8888/#/u">用户主页</a>
					</div>
				</div>
				<h1 class="brand">
					<router-link to="/" class="text">Demo</router-link>
				</h1>
				<ul class="nav">
					<li class="nav-item" v-if="this.user">
						<router-link to="me"><img :src="user.avatar" class="avatar"></router-link>
					</li>
					<li class="nav-item" v-if="this.user" @click="logout" id="logout">logout</li>
				</ul>
				<li class="nav-item"><input type="text" class="input-box" placeholder="搜索" v-model="keywords" /></li>
				<li class="nav-item"><button class="btn btn-lg btn-rd dark-border" @click="search">搜索</button></li>
			</div>
		</div>
		<router-view class="main" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: JSON.parse(localStorage.getItem('user')),
				keywords: ''
			}
		},
		created() {
			if (this.user) {
				console.log(this.user)
			};
		},
		methods: {
			logout() {
				this.user = null
			},
			search() {
						let currentPath = this.$route.path;
						alert(currentPath);
						if (currentPath != '/search' || currentPath != '/search/article' || currentPath != '/search/topic' || currentPath != '/search/usere') {
							this.$router.push({ path: '/search', query: { keywords: this.keywords } });
						} else {
							this.$router.push({ path: '/empty', query: { keywords: this.keywords } });
						}
					}
		},
		computed: {

		}

	}
</script>


<style scoped>
	.nav-bar {
		height: 60px;
		margin-bottom: 10px;
	}

	.nav-bar>.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand {
		font-size: 45px;
		font-weight: 600;
		margin-left:30%;
	}

	.text {
		display: block;
		/*渐变背景*/
		background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%,
			#ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
		color: transparent;
		/*文字填充色为透明*/
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		/*背景剪裁为文字，只将文字显示为背景*/
		background-size: 200% 100%;
		/*背景图片向水平方向扩大一倍，这样background-position才有移动与变化的空间*/
		/* 动画 */
		animation: masked-animation 4s infinite linear;
	}
	 @keyframes masked-animation {
	            0% {
	                background-position: 0 0;   /*background-position 属性设置背景图像的起始位置。*/
	            }
	            100% {
	                background-position: -100% 0;
	            }
	        }

	.nav {
		flex: 0 0 30%;
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.nav-item {
		list-style: none;
		width: 80px;
		font-size: 16px;
	}

	.main {
		width: 100%;
		margin: 0 auto;
		margin-top: -0.9%;
		background-color: #FFFFFF;
	}

	#logout {
		color: rgb(235, 111, 90);
		cursor: pointer;
	}
	.dropbtn {
	    background-color: rgb(233, 30, 99);
	    color: white;
	    font-size: 14px;
	    border: none;
	    cursor: pointer;
	}
	.dropdown {
	    position: relative;
	    display: inline-block;
		margin-left:20px;
	}

	.dropdown-content {
	    display: none;
	    position: absolute;
	    background-color: #f9f9f9;
	    min-width: 100px;
	    box-shadow: 0px 8px 16px 0px rgb(0,0,0,0.2);
	}
	
	.dropdown-content a {
	    color: black;
	    padding: 12px 16px;
	    text-decoration: none;
	    display: block;
	}
	
	.dropdown-content a:hover {background-color: #f1f1f1}
	
	.dropdown:hover .dropdown-content {
	    display: block;
	}
	
	.dropdown:hover .dropbtn {
	    background-color: rgb(0, 139, 139);
	}
</style>
