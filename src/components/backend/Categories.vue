<template>
  <section class="products">

    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="list__container">

        <ButtonAdd @added="add" />
        
        <form @submit.prevent="save()" v-show="showForm" class="list__modify">

          <InputText v-model="category.name" :value="category.name" name="category" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <ul class="list" >
          
          <li v-for="category in categories" :key="category.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectCategory(category)">{{ category.name }}</h3>
            </div>

            <ButtonRemove :item="category" @removed="remove(category)" />

          </li>
        </ul>

      </div>
    </transition>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/utils/Loading.vue';
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  import ButtonAdd from '@/components/backend/partials/_ButtonAdd.vue';
  import ButtonRemove from '@/components/backend/partials/_ButtonRemove.vue';
  import InputText from '@/components/backend/partials/_InputText.vue';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'Categories',

    props: {
      msg: String
    },

    components: {
      Loading,
      ButtonsConfirmation,
      ButtonAdd,
      ButtonRemove,
      InputText
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    data() {
      return {
        categories: [],
        category: {
          name: ''
        },
        showForm: false,
        currentPage: 0,
        lastPage: 0,
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllCategories', 
                      'getOneCategory' ]),
    },

    methods: {
      ...mapActions([ 'fetchCategories', 
                      'fetchCategory',
                      'categoryAdd',
                      'categoryDelete',
                      'categoryUpdate',
                      'categoryClear',
                      'setActiveComponent' ]),

      async selectCategory(item) {
        await this.fetchCategory(item);
        this.category = this.getOneCategory.data;
        this.showForm = true;
      },

      async save(item = this.category) {
        if (this.getOneCategory.data) {
          await this.categoryUpdate(item);
        } else {
          console.log(item)
          await this.categoryAdd(item);
        }
        this.categories = this.getAllCategories;
        this.cancel();
      },

      cancel() {
        this.categoryClear();
        this.category = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.categoryDelete(item);
        //await this.categoryClear();
        this.categories = this.getAllCategories;
      },

      setPage() {
        this.currentPage = this.getAllShoes.current_page;
        this.lastPage = this.getAllShoes.last_page;
        this.nextPage = this.getAllShoes.next_page_url;
      }
    },

    async mounted() {
      await this.fetchCategories();
      this.categories = this.getAllCategories;
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
