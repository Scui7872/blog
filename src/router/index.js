import Vue from 'vue'
import VueRouter from 'vue-router'

import Nav from '@/views/Nav.vue'
import Index from '@/views/Index.vue'

import Collection from '@/views/Collection.vue'
import CollectionDetail from '@/views/CollectionDetail.vue'
import Article from '@/views/Article.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import User from '@/views/User.vue'
import UserDetail from '@/views/UserDetail.vue'
import Profile from '@/views/profile.vue'

import UserFans from '@/views/UserFans.vue'
import UserFollows from '@/views/UserFollows.vue'

import Sign from '@/views/Sign.vue'

import Search from '@/views/Search.vue'
import SearchUser from '@/views/SearchUser.vue'
import SearchTopic from '@/views/SearchTopic.vue'
import SearchArticle from '@/views/SearchArticle.vue'

Vue.use(VueRouter)
const routes = [{
		path: '/',
		component: Nav,
		children: [
			{
				path: '/',
				redirect: 'index'
			},
			{
				path: 'index',
				component: Index
			},
			{
				path: 'c',
				component: Collection
			},
			{
				path: 'c-detail',
				component: CollectionDetail
			},
			{
				path: 'p',
				component: Article
			},
			{
				path: 'p-detail/:id',
				component: ArticleDetail
			},
			{
				path: 'u-detail/:id',
				component: UserDetail
			},
			{
				path: 'me',
				component: Profile
			},
			{
				path: 'u',
				component: User,
				children: [{
						path: 'follow',
						component: UserFollows
					},
					{
						path: 'fans',
						component: UserFans
					}
				]
			},
			{
								path :'search',
								component:Search,
								children:[
									{
										path: '/',
										redirect: 'article'
									},
									{
										path: 'article',
										component: SearchArticle
									},
									{
										path: 'topic',
										component: SearchTopic
									},
									{
										path: 'user',
										component: SearchUser
									}
								]
						}
		]
	},
	{
		path: '/sign-in',
		component: Sign
	}
]

const router = new VueRouter({
	routes
})

export default router
