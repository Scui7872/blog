<template>
	<div>
		<div class="key">
			<div class="left">
				<ul>
					<li><router-link :to="{ path: '/search/article', query: { keywords: this.keywords } }">文章</router-link></li>
					<li><router-link :to="{ path: '/search/topic', query: { keywords: this.keywords } }">专题</router-link></li>
					<li><router-link :to="{ path: '/search/user', query: { keywords: this.keywords } }">用户</router-link></li>
				</ul>
			</div>
			<div class="right"><router-view /></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
	},
	computed: {},
	methods: {}
};
</script>

<style scoped>
	.key {
		display: flex;
	}
	
	.left {
		width: 20%;
		margin-top: 8%;
		margin-left: 3%;
		height: 200px;
		position: sticky;
		top:200px;
		/* background-color: #000066; */
	}
	ul {
		list-style: none;
	}
	li {
		width: 100%;
		margin-bottom: 10px;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		letter-spacing: 5px;
	}
	li a {
		display: block;
		color: rgb(51, 51, 51);
		height: 50px;
		width: 70%;
		margin: 0 auto;
	}
	li a:hover {
		background-color: rgb(240, 240, 240);
	}
	.router-link-active {
		background-color: rgb(240, 240, 240);
	}
	.right {
		margin-left: 8%;
		margin-top: 5%;
		width: 60%;
		/* background-color: #0086B3; */
	}
</style>