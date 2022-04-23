<template>
	<div class="test">{{ msg }}1</div>
	<div class="test1">{{ msg }}22ssd</div>
	<!-- <div class="test2">{{ msg }}3333</div> -->
	<!-- <img src="../imgs/logo.png" alt=""/> -->
	<img src="@/imgs/logo.png" alt="" />
</template>

<script>
// import '../style/test.scss';
export default {
	components: {},
	data() {
		return {
			msg: 'hello vue',
		};
	},
	computed: {},
	watch: {},
	methods: {},
	created() {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
@import '../style/test.scss';
</style>
