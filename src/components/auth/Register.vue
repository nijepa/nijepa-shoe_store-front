<template>
  <div class="profile__wrapper">
      
      <form @submit.prevent="logger()">

        <!-- <h1>{{ formTitle }}</h1> -->

        <InputText v-model="loginInput.email" 
                  :value="loginInput.email" 
                  name="email"
                  type="email" />

        <InputText v-model="loginInput.password" 
                  :value="loginInput.password" 
                  name="title"
                  type="password" />

        <ButtonsConfirmation @canceled="cancel" />

      </form>
    </div>
</template>

<script>
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  import InputText from '@/components/backend/partials/_InputText.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'register',

    components: {
      ButtonsConfirmation,
      InputText
    },

    computed: {
      ...mapGetters([ 'loggedUser', 
                      'getErrors',
                      'isLogged' ]),

      formTitle: function() {
        return this.loginInput.email ? 'Edit' : 'Add'
      }
    },

    data() {
      return {
        type: 'login',
        loginInput: {
          email: '',
          password: ''
        },
        user: {},
      }
    },

    methods: {
      ...mapActions([ 'login',
                      'logout',
                      'signType',
                      'clearErrors' ]),

    }
  }
</script>

<style>

</style>