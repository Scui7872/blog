<template>
	<div>
		<div v-for="(item, index) in users" :key="index" class="card">
				<div class="c-left">
					<img :src="item.avatar" class="avatar-lg link" />
				</div>
				<div class="c-middle">
					<div class="m-1">{{ item.nickname }}</div>
					<div class="m-2">{{ item.introduction}}</div>
					<div class="m-3">
						<div class="one">写了{{ item.articles }}篇文章</div>
						<div class="two">{{ item.fans }}个粉丝</div>
						<div class="three">关注了{{ item.follows }}人</div>
					</div>
				</div>
				<div class="c-right"><button class="myButton">关注</button></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [],
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
		console.log(this.keywords);
		this.axios
			.get('http://localhost:8080/api/user', {
				params: {
					keywords: this.keywords
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.users = res.data.data;
			});
	},
	methods: {}
};
</script>
<style scoped>
	.card {
		/* background-color: #FF0000; */
		margin-top: 10px;
		display: flex;
		border: 2px solid rgb(56, 188, 183);
		box-shadow: 2px 5px 8px #aaa;
		border-radius: 5px;
		height: 120px;
	}
	.c-left {
		margin-left: 5px;
		margin-top: 6px;
	}
	.c-left img {
		width: 90px;
		height: 90px;
		border-radius: 10px;
	}
	.c-middle {
		margin-left: 10px;
	}
	.m-1 {
		margin-top: 5px;
	}
	.m-2 {
		margin-top: 20px;
	}
	.m-3 {
		margin-top: 28px;
		display: flex;
		justify-content: space-between;
	}
	.c-right {
		margin-left: 23%;
		margin-top: 75px;
	}
	.myButton {
		box-shadow: -1px 7px 20px -6px #e67a73;
		background:linear-gradient(to bottom, #e4685d 5%, #eb675e 100%);
		background-color:#e4685d;
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
	.myButton:hover {
		background:linear-gradient(to bottom, #eb675e 5%, #e4685d 100%);
		background-color:#eb675e;
	}
	.myButton:active {
		position:relative;
		top:1px;
	}
</style>