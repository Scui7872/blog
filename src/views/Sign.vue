<template>
	<div class="full main-color">
		<div class="login-box">
			<div class="tab">
				<span class="tab-item" :class="{ active: isActive }" @click="changeTab">登 录</span>
				<span class="tab-item" :class="{ active: !isActive }" @click="changeTab">注 册</span>
			</div>

			<div class="tab-box" v-if="show && selected === 0">
				<input type="text" placeholder="请输入手机号/邮箱" v-model="userDto.mobile" />
				<input type="password" placeholder="请输入3-16位密码" minlength="3" maxlength="16" v-model="userDto.password" />
				<div class="code-box">
					<input type="text" placeholder="请输入验证码" v-model="userDto.code" />
					<div class="img"><img ref="codeImg" @click="refresh()" style="cursor: pointer;" /></div>
				</div>
				<input type="submit" class="login-btn" value="登录" @click="signIn(userDto)" />
				<span class="span-tab" @click="changeTab">没有账号，立即前往注册</span>
			</div>

			<div class="tab-box" v-if="show && selected === 1">
				<input type="text" placeholder="请设置用户名" v-model="userDto.nickname" />
				<input type="password" placeholder="请设置3-16位密码" minlength="3" maxlength="16" v-model="userDto.password" />
				<input type="password" placeholder="请确认密码" minlength="6" maxlength="16" v-model="pwd2" />
				
				<input
					
					type="tel"
					placeholder="请绑定手机号"
					minlength="11"
					maxlength="11"
					v-model="userDto.mobile"
					:disabled="yzmDisabled"
					@input.prevent="checkLength"
				/>
				<div class="code-box">
					<input type="text" placeholder="请输入验证码" v-model="userDto.code" />
					<div class="img"><img ref="codeImg" @click="refresh()" style="cursor: pointer;" /></div>
				</div>
				<input type="submit" class="regist-btn" value="注册" @click="register(userDto)" />
			</div>

			<div class="line-box" v-if="show && selected === 0">
				<span class="line"></span>
				<span class="login-3rd">第三方登录</span>
				<span class="line"></span>
			</div>

			<div class="icon-box" v-if="show && selected === 0">
				<i class="iconfont" style="color: rgb(24, 172, 252)">&#xe626;</i>
				<i class="iconfont" style="color: rgb(103, 204, 121)">&#xe6c3;</i>
			</div>

			<div>
				<div class="message" v-if="pop">
					<h1>{{ info }}</h1>
				</div>

				<div class="msg-box" v-if="popPlus">
					<p>{{ info }}</p>
				</div>
			</div>
			<router-link to="/" class="text">Demo</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userDto: {
				mobile: '',
				password: '',
				code: ''
			},
			codeDisabled: true,		
			info: '',
			isActive: true,
			show: true,
			selected: 0,			
			status: '',
			yzmDisabled: false,
			user: null,		
			token: ''
		};
	},

	created() {
		this.axios.get('http://localhost:8080/api/code', { responseType: 'blob' }).then(res => {
					// console.log(res);
					var img = this.$refs.codeImg;
					let url = window.URL.createObjectURL(res.data);
					img.src = url;
					console.log(res.headers);
					//取得后台通过响应头返回的sessionId的值
					this.token = res.headers['access-token'];
					console.log(this.token);
				});
	},
	computed: {
		// 解决403图片缓存问题
		getImages(_url) {
			if (_url) {
				let _u = _url.substring(8);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		}
	
	},

	methods: {
		signIn(userDto) {
			this.axios({
				method: 'post',
				url:  'http://localhost:8080/api/user/sign-in',
				data: JSON.stringify(this.userDto),
				headers: {
					'Access-Token': this.token  //将token放在请求头带到后端
				}
			}).then(res => {
				console.log(res.data)
				if (res.data.msg === '成功') {
					alert('登录成功');
					localStorage.setItem('user', JSON.stringify(res.data.data));
					this.$router.push('/');
				} else {
					alert(res.data.msg);
					this.userDto.code = '';
				}
			});
		},

		refresh() {
			this.axios.get('http://localhost:8080/api/code', { responseType: 'blob' }).then(res => {
				console.log(res);
				var img = this.$refs.codeImg;
				let url = window.URL.createObjectURL(res.data);
				img.src = url;
			});
		},
		changeTab: function() {
			this.isActive = !this.isActive;
			this.selected = this.selected == 0 ? 1 : 0;
		},

		checkLength() {
			if (Number(this.userDto.mobile) && this.userDto.mobile.length == 11) {
				this.codeDisabled = false;
				return true;
			} else {
				return false;
			}
		},

		clear() {
			// alert("我进入到了clear()方法中");
			this.userDto.nickname = '';
			this.userDto.mobile = '';
			this.userDto.password = '';
			this.pwd2 = '';
			this.status = '';
			this.codeDisabled = true;
		},

		register(userDto) {
			if (this.userDto.nickname == '') {
				this.info = '用户名不能为空';
				this.showMsg();
				return;
			}
			if (this.userDto.password == '' || this.pwd2 == '') {
				this.info = '密码不能为空';
				this.showMsg();
				return;
			}
			if (this.userDto.mobile == '') {
				this.info = '手机号不能为空';
				this.showMsg();
				return;
			}
			if (!/^1[34578]\d{9}$/.test(this.userDto.mobile)) {
				this.info = '手机号码格式错误';
				this.userDto.mobile = '';
				return;
			}
			// 注册信息完全符合要求则进行下面注册操作
			this.axios.post('http://localhost:8080/api/user/sign-up', JSON.stringify(this.userDto)).then(response => {
				if (response.data.msg == '成功') {
					alert('注册成功');
					// 将后台的用户信息存入本地存储
					localStorage.user = JSON.stringify(response.data.data);
					// 路由跳转
					this.$router.push('/');
				}
			});
			this.axios({
				method: 'post',
				url: 'http://localhost:8080/api/user/sign-up',
				data: JSON.stringify(this.userDto),
				headers: {
					'Access-Token': this.token
				}
			}).then(res => {
				if (res.data.msg === '成功') {
					alert('注册成功');
					localStorage.setItem('user', JSON.stringify(res.data.data));
					this.$router.push('/');
				} 
			});
		}
	}
};
</script>

<style scoped>
.back {
	position: absolute;
	top: 1%;
	right: 1%;
	background-color: #008000;
}

.full {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* 第三方图标 */
@font-face {
	font-family: 'iconfont'; /* project id 1474541 */
	src: url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.eot');
	src: url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.woff') format('woff'), url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1474541_e3yt5mn27n.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 40px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}

.login-box {
	background-image: linear-gradient(rgb(77, 182, 172),rgb(238, 110, 115),rgb(255,254,250));
	width: 400px;
	height: 550px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	padding: 10px;
}
/* 顶部div */
.tab {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 10%;
	background-color: rgb(236, 239, 241);
	border-radius: 10px;
	margin-bottom: 10px;
}
.tab-item {
	cursor: pointer;
	margin-right: 10px;
	flex: 0 0 80px;
	text-align: center;
	line-height: 38px;
}
.active {
	color: #00bbdd;
	font-weight: 600;
	border-bottom: 2px solid #00bbdd;
}
/* 中间div */
.tab-box {
	height: 78%;
	/* background-color: #00897B; */
	color: #eee;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px;
}
/* 文本框 */
input {
	margin: 5%;
	width: 87%;
	height: 40px;
	border-radius: 10px;
	font-size: 25px;
	font-weight: 600;
	font-family: '楷体';
	outline: none;
	border: none;
	background-color: #eeeeee;
}
/* 登录和注册按钮 */
.regist-btn,
.login-btn {
	background-color: rgb(179, 157, 219);
	cursor: pointer;
}
.regist-btn:hover,
.login-btn:hover {
	cursor: pointer;
	background-color: rgb(149, 117, 205);
}
/* 没有账号的情况 */
.span-tab {
	margin-top: 5%;
	cursor: pointer;
	color: rgb(113, 156, 252);
}
.span-tab:hover {
	color: #00bbdd;
}
/* 注册界面的div */
.tab-box .tel-box {
	width: 87%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-radius: 10px;
	border: 1px dashed #eeeeee;
}
/* 验证码和手机号外部的div */
/* .tel-code-box {
	display: flex;
	flex-direction: column;
}
.regist {
	background-color: rgb(227, 242, 253);
	cursor: pointer;
}
.regist:hover {
	background-color: rgb(187, 222, 251);
} */
/* 第三方登录div */
.line-box {
	width: 80%;
	margin: 0 auto;
	margin-bottom: 4%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.line {
	border-bottom: 3px solid #9b9b9b;
	flex: 0 0 33%;
}
.login-3rd {
	font-size: 20px;
	font-weight: 400px;
	font-family: '楷体';
}
/* 第三方登录的图标div */
.icon-box {
	cursor: pointer;
	width: 50%;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

/* （遮罩层）提示框 */
.message {
	background-color: rgb(255, 253, 244);
	opacity: 0.7;
	width: 280px;
	height: 10%;
	border-radius: 10px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: '楷体';
}

.msg-box {
	position: absolute;
	top: 30%;
	left: 30%;
	width: 350px;
	background-color: #f0f8ff;
	padding: 10px;
	border-radius: 10px;
	display: flex;
	align-items: center;
}

p {
	text-indent: 2em;
	font-family: '楷体';
	font-size: 30px;
	font-weight: 300;
}
.code-box {
	display: flex;
	align-items: center;
	padding-right: 20px;
	padding-left: 8px;
}
.img {
	height: 20px;
	width: 160px;
}
.text {
	    font-size: 24px;
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
</style>
