<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: $font-code;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-turquoise-dark;
}
</style>
