<template>
  <transition name="fall" mode="out-in">

    <loading v-if="loadingState" key="1" pic="loading" />

    <div v-else :key="2" class="profile__wrapper">
      
      <form @submit.prevent="save(shoe)">

        <h1 v-show="getOneShoe.data">{{ formTitle }}</h1>

        <InputText v-model="shoe.title" :value="shoe.title" name="title" />

        <div class="form__item">
          <label>
            <textarea name="desc" id="desc" cols="30" rows="5" placeholder=" "
                      v-model="shoe.description"></textarea>
            <span>Description</span>
          </label>
        </div>
        
        <InputNumber v-model="shoe.price" :value="shoe.price" name="price" step="0.01" />

        <InputSelect v-model="shoe.category_id"  
                    :multi="false" :options="getAllCategories"
                    name="dd" label="Category" />
        
        <InputSelect v-model="shoe.brand_id"  
                    :multi="false" :options="getAllBrands"
                    name="dd" label="Brand" />

        <InputNumber v-model="shoe.stock" :value="shoe.stock" name="stock" step="1" />

        <ButtonsConfirmation @canceled="cancel" />

      </form>
    </div>
  </transition>
</template>

<script>
  import Loading from '@/components/utils/Loading.vue';
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  import InputText from '@/components/backend/partials/_InputText.vue';
  import InputNumber from '@/components/backend/partials/_InputNumber.vue';
  import InputSelect from '@/components/backend/partials/_InputSelect.vue';
  import { mapGetters, mapActions } from 'vuex';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'ShoeBE',

    components: {
      Loading,
      ButtonsConfirmation,
      InputText,
      InputNumber,
      InputSelect
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
          price: null,
          stock: null,
          category_id: null,
          brand_id: null
        }
      }
    },

    computed: {
      ...mapGetters([ 'getOneShoe',
                      'getAllCategories',
                      'getAllBrands']),

      formTitle: function() {
        return this.getOneShoe.data ? 'Edit' : 'Add'
      }
    },

    methods: {
      ...mapActions([ 'fetchShoe',
                      'shoeClear',
                      'shoeAdd',
                      'shoeUpdate',
                      'shoeDelete',
                      'fetchCategories',
                      'fetchBrands',
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

    async created() {
      if (this.getOneShoe.data) {
        this.shoe = this.getOneShoe.data;
      }
      await this.fetchBrands();
      
      await this.fetchCategories();
      //this.categories = this.getAllCategories;
      //await this.setLoadingState(true);
    }
  }
</script>

<style lang="scss" scoped>
  .profile__wrapper {
    display: grid;
    padding: 1em;
  }

  
</style>