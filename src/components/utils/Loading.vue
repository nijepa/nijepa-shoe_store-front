<template>
  <div class="">
    <img :src="getGifUrl()" alt="" class="loading">
    <p class="loading__text">loading ...</p> 
  </div>
</template>

<script>
  export default {
    name: 'Loading',

    props: {
      pic: String
    },

    methods: {
      getGifUrl() {
        return require('../../assets/loading.gif')
      },
    }
  }
</script>

<style>
  .loading {
    width: 300px;
    margin: 0 auto;
  }
  .loading__text {
    text-align: center;
  }
</style>
