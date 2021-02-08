<template>
  <transition name="fall" mode="out-in">

    <loading v-if="loadingState" key="1" pic="loading" />

    <div v-else :key="2" class="profile__wrapper">
      <form @submit.prevent="save(shoe)">
        <!-- <FormInput :inputField="shoe.title" /> -->
        <h3></h3>
        <InputText v-model="shoe.title" :value="shoe.title" name="title" />
<!--         <div class="form__item">
          <label>
            <input type="text" name="title" id="title" required placeholder=" "
                  v-model="shoe.title">
            <span>Title</span>
          </label> 
        </div> -->
        <div class="form__item">
          <label>
            <textarea name="desc" id="desc" cols="30" rows="5" placeholder=" "
                      v-model="shoe.description"></textarea>
            <span>Description</span>
          </label>
        </div>
        <InputNumber v-model="shoe.price" :value="shoe.price" name="price" step="0.01" />
<!--         <div class="form__item">
          <label>
            <input type="number" name="price" id="price" step="0.01" required placeholder=" "
                  v-model="shoe.price">
            <span>Price</span>
          </label>
        </div> -->
        <InputNumber v-model="shoe.stock" :value="shoe.stock" name="stock" step="1" />
  <!--       <div class="form__item">
          <label>
            <input type="number" name="stock" id="stock" step="0.1" required placeholder=" "
                  v-model="shoe.stock">
            <span>Stock</span>
          </label>
        </div> -->
        <ButtonsConfirmation @canceled="cancel" />

      </form>
    </div>
  </transition>
</template>

<script>
  //import FormInput from '@/components/backend/partials/_FormInput.vue';
  import Loading from '@/components/utils/Loading.vue';
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  import InputText from '@/components/backend/partials/_InputText.vue';
  import InputNumber from '@/components/backend/partials/_InputNumber.vue';
  import { mapGetters, mapActions } from 'vuex';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'ShoeBE',

    components: {
      Loading,
      ButtonsConfirmation,
      InputText,
      InputNumber
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    props: {
      newShoe: Boolean,
    },

    data () {
      return {
        shoe: {
          title: '',
          description: '',
          price: '',
          stock: ''
        }
      }
    },

    computed: {
      ...mapGetters([ 'getOneShoe']),
    },

    methods: {
      ...mapActions([ 'fetchShoe',
                      'shoeClear',
                      'shoeAdd',
                      'shoeUpdate',
                      'shoeDelete',
                      'setActiveComponent' ]),

      async save(shoe) {
        if (this.getOneShoe.data) {
          await this.shoeUpdate(shoe);
          //this.shoeClear();
        } else {
          this.shoeAdd(shoe);
        }
        this.cancel();
      },

      cancel() {
        this.shoeClear();
        this.setActiveComponent(false);
      },

      async remove(shoe) {
        await this.shoeDelete(shoe);
        this.shoeClear();
      }
    },
    
    mounted() {
      this.setLoadingState(false);
    },

    created() {
      if (this.getOneShoe.data) {
        this.shoe = this.getOneShoe.data;
      }
      this.setLoadingState(true);
    }
  }
</script>

<style lang="scss" scoped>
  .profile__wrapper {
    display: grid;
    padding: 1em;
  }

  
</style>