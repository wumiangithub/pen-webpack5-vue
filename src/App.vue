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
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang="scss" scoped></style>
