<template>
	<router-view v-slot="{ Component }">
		<!-- <transition> -->
		<keep-alive>
			<component :is="Component" v-if="$route.meta.keepAlive" />
		</keep-alive>
		<!-- </transition> -->
		<!-- <transition> -->
		<component :is="Component" v-if="!$route.meta.keepAlive" />
		<!-- </transition> -->
	</router-view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	computed: {},
	watch: {},
	methods: {},
	created() {},
	mounted() {},
};
</script>

<style lang="scss">
// @import './style/config.scss'; //已经替换为全局导入了，所以不在需要单独导入
// @use "./style/test.scss"; //@use在这里又不生效，只能使用@import
// @import "./style/test.scss";
#app {
	background-color: $primaryColor;
}
</style>
