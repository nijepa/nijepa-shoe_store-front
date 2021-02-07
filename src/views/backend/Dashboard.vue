<template>
  <section>
    <Header />
    <Sidebar />
  </section>
</template>

<script>
  import Header from '@/components/backend/Header.vue';
  import Sidebar from '@/components/backend/Sidebar.vue';

  export default {
    name: 'Das',

    components: {
      //Navigation,
      Header,
      Sidebar,
    }
  }
</script>

<style>

</style>