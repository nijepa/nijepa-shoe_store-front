<template>
  <section class="products">

    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="list__container">

        <ButtonAdd v-if="!showForm" @added="add" />
        
        <form @submit.prevent="save()" v-show="showForm" class="list__modify">
          <h3>{{ formTitle }}</h3>

          <InputText v-model="size.number" :value="size.number" name="size" />

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <ul class="list" >
          
          <li v-for="size in sizes" :key="size.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectSize(size)">{{ size.number }}</h3>
            </div>

            <ButtonRemove :item="size" @removed="remove(size)" />

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
    name: 'Sizes',

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
      imageUrl,
      ButtonsConfirmation
    ],

    data() {
      return {
        sizes: [],
        size: {
          number: ''
        },
        showForm: false,
        currentPage: 0,
        lastPage: 0,
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllSizes', 
                      'getOneSize' ]),

      formTitle: function () { 
        return this.size.number ? 'Edit' : 'Add'
      }
    },

    methods: {
      ...mapActions([ 'fetchSizes', 
                      'fetchSize',
                      'sizeAdd',
                      'sizeDelete',
                      'sizeUpdate',
                      'sizeClear',
                      'setActiveComponent' ]),

      async selectSize(item) {
        await this.fetchSize(item);
        this.size = this.getOneSize.data;
        this.showForm = true;
      },

      async save(item = this.size) {
        if (this.getOneSize.data) {
          await this.sizeUpdate(item);
        } else {
          console.log(item)
          await this.sizeAdd(item);
        }
        this.sizes = this.getAllSizes;
        this.cancel();
      },

      cancel() {
        this.sizeClear();
        this.size = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.sizeDelete(item);
        //await this.sizeClear();
        this.sizes = this.getAllSizes;
      },

      setPage() {
        this.currentPage = this.getAllShoes.current_page;
        this.lastPage = this.getAllShoes.last_page;
        this.nextPage = this.getAllShoes.next_page_url;
      }
    },

    async mounted() {
      await this.fetchSizes();
      this.sizes = this.getAllSizes;
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
