<template>
  <div class="article">
    <Header />
    <div class="wrapper">
      <div class="content">
        <h1>Login</h1>
        <Login  />

      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/backend/Header.vue';
  import Login from '@/components/auth/Login.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Auth',

    components: {
      Header,
      Login
    },

    computed: {
      ...mapGetters([ 'getSelectedLink',
                      'getActiveComponent']),
    },
  }
</script>
