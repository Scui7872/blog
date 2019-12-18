<template>
	<div>
		<div v-for="(item, index) in articles" :key="index" class="article-card"  @click="toADetail(item.article.id)">
			<div class="c-top">
					<h3>{{item.article.title}}</h3>
				</div>
				<div class="c-middle">
					<div class="m-1"><img :src="item.author.avatar" /></div>
					<div class="m-2">
						<div class="name">{{item.author.nickname}}</div>
						<div class="sum">{{ item.article.summary }}</div>
					</div>
				</div>	
				<div class="c-last"><p>来自于专题:{{ item.topic.topicName }}</p></div>	
				<div class="c-right"><button class="myButton">进入阅读</button></div>
			</div>
		</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
		console.log(this.keywords);
		this.axios
			.get('http://localhost:8080/api/article', {
				params: {
					keywords: this.keywords
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.articles = res.data.data;
			});
	},
	methods: {
		toADetail(id) {
			this.$router.push('/articleDetail/' + id);
		}
	}
};
</script>
<style scoped>
	.article-card{
	    border-radius: 10px;
		border: 2px solid rgb(56, 188, 183);
		box-shadow: 2px 5px 10px #aaa;
		margin-bottom: 10px;
		height: 210px;
	}
	.c-middle {
		display: flex;
	}
	.m-1 {
		margin-left: 10px;
		margin-top: 10px;
	}
	.m-1 img {
		width: 100px;
		height: 100px;
		border-radius: 10px;
	}
	.m-2 {
		margin-left: 15px;
		margin-top: 10px;
	}
	.name {
		margin-left: 15px;
	}
	.sum {
		margin-top: 15px;
	}
	.c-right {
		margin-left: 85%;
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

