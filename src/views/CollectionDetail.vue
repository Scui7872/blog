<template>
	<div>
	<h2>专题详情页</h2>
	<div class="title">
		<p>{{topic.topicName}}</p>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				topic:{},
				admin:{},
				articleList:[]
			}
		},
		created() {
			// 获取网页地址url
			var query = window.location.href
			// 锁定到最后一个"/"的位置
			var begin = query.lastIndexOf('/') + 1
			// 取出地址中最后的id值
			var topicId = query.substring(begin)
			this.axios.get('http://localhost:8080/api/topic/' + topicId).then(res => {
				// console.log(res.data.data);
			});
		},
		methods: {
			getImage(url) {
				return 'https://images.weserv.nl/?url=' + url;
			}
		},
		computed: {
			
		}
		
	}
</script>


<style scoped>
</style>
