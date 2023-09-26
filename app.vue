<template>
  <NuxtLayout v-auto-animate>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script setup lang="ts">

const store = useAuthStore()

console.log(store.$state.user)
</script>
<style>
* {
  font-family: "Switzer";
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

html,
body {
  width: 100%;
}
</style>