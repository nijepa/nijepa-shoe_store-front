<template>
  <transition name="fall" mode="out-in">

    <loading v-if="loadingState" key="1" pic="loading" />

    <div v-else :key="2" class="profile__wrapper">
      
      <form @submit.prevent="save(specific)">

        <h1>{{ formTitle }}</h1>
        
        <h4>{{ selectedShoe.title }}</h4>
        <!-- <InputText v-model="selectedShoe.title" :value="selectedShoe.title" name="title" disabled />  -->

<!--         <InputSelect v-model="specific.shoe_id"  
                    :multi="false" :options="getAllShoes.data"
                    name="dd" label="Shoe" /> -->

        <div class="form__item">
          <label>
            <textarea name="desc" id="desc" cols="30" rows="5" placeholder=" "
                      v-model="specific.details"></textarea>
            <span>Description</span>
          </label>
        </div>
        
        <InputNumber v-model="specific.price" :value="specific.price" name="price" step="0.01" />

        <InputSelect v-model="specific.color_id"  
                    :multi="false" :options="getAllColors"
                    name="dd" label="Color" />
        
        <InputSelect v-model="specific.size_id"  
                    :multi="false" :options="getAllSizes"
                    name="dd" label="Size" />

        <InputNumber v-model="specific.stock" :value="specific.stock" name="stock" step="1" />

        <ButtonsConfirmation @canceled="cancel" />

      </form>
    </div>
  </transition>
</template>

<script>
  import Loading from '@/components/utils/Loading.vue';
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  //import InputText from '@/components/backend/partials/_InputText.vue';
  import InputNumber from '@/components/backend/partials/_InputNumber.vue';
  import InputSelect from '@/components/backend/partials/_InputSelect.vue';
  import { mapGetters, mapActions } from 'vuex';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'SpecificBE',

    components: {
      Loading,
      ButtonsConfirmation,
      //InputText,
      InputNumber,
      InputSelect
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    props: {
      newSpecific: Boolean,
    },

    data () {
      return {
        specific: {
          details: '',
          shoe_id: null,
          color_id: null,
          size_id: null,
          price: null,
          stock: null,
        },
        selectedShoe: {}
      }
    },

    computed: {
      ...mapGetters([ 'getOneSpecific',
                      'getAllShoes',
                      'getOneShoe',
                      'getAllColors',
                      'getAllSizes']),

      formTitle: function() {
        return this.getOneSpecific.data ? 'Edit' : 'Add';
      }
    },

    methods: {
      ...mapActions([ 'fetchSpecific',
                      'specificClear',
                      'specificAdd',
                      'specificUpdate',
                      'specificDelete',
                      'fetchShoes',
                      'fetchColors',
                      'fetchSizes',
                      'setActiveComponent' ]),

      async save(specific) {
        if (this.getOneSpecific.data) {
          await this.specificUpdate(specific);
          //this.specificClear();
        } else {
          this.specificAdd(specific);
        }
        this.cancel();
      },

      cancel() {
        this.specificClear();
        this.setActiveComponent(false);
      },

      async remove(specific) {
        await this.specificDelete(specific);
        this.specificClear();
      }
    },
    
    mounted() {
      this.setLoadingState(false);
    },

    async created() {
      if (this.getOneSpecific.data) {
        this.specific = this.getOneSpecific.data;
      }
      this.selectedShoe = this.getOneShoe.data;
      this.specific.shoe_id = this.getOneShoe.data.id

      //await this.fetchShoes();
      await this.fetchSizes();
      await this.fetchColors();
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