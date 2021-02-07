<template>
  <section class="products">

    <transition name="fall" mode="out-in">

      <loading v-if="loadingState" key="1" pic="loading" />

      <div v-else :key="2" class="list__container">

        <ButtonAdd @added="add" />
        
        <form @submit.prevent="save()" v-show="showForm" class="list__modify">
          <label>
            <input type="text" name="name" id="name" placeholder=" "
                  v-model="color.name" >
            <span>Color</span>
          </label>

          <ButtonsConfirmation @canceled="cancel" />

        </form>

        <ul class="list" >
          
          <li v-for="color in colors" :key="color.id">
              <!-- <img :src="getJpgUrl(shoe.image)" alt="" class="products__logo"> -->
            <div class="list__item">
              <h3 @click="selectColor(color)">{{ color.name }}</h3>
            </div>
            
            <ButtonRemove :item="color" @removed="remove(color)" />

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
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'Colors',

    props: {
      msg: String
    },

    components: {
      Loading,
      ButtonsConfirmation,
      ButtonAdd,
      ButtonRemove
    },

    mixins: [
      loadingM,
      imageUrl
    ],

    data() {
      return {
        colors: [],
        color: {
          name: ''
        },
        showForm: false,
        dataType: 'getAll' + this.msg + 's',
        currentPage: 0,
        lastPage: 0,
        nextPage: null
      }
    },

    computed: {
      ...mapGetters([ 'getAllColors', 
                      'getOneColor' ]),
    },

    methods: {
      ...mapActions([ 'fetchColors', 
                      'fetchColor',
                      'colorAdd',
                      'colorDelete',
                      'colorUpdate',
                      'colorClear',
                      'setActiveComponent' ]),

      async selectColor(item) {
        await this.fetchColor(item);
        this.color = this.getOneColor.data;
        this.showForm = true;
      },

      async save(item = this.color) {
        if (this.getOneColor.data) {
          await this.colorUpdate(item);
        } else {
          console.log(item)
          await this.colorAdd(item);
        }
        this.colors = this.getAllColors;
        this.cancel();
      },

      cancel() {
        this.colorClear();
        this.color = {};
        this.showForm = false;
      },

      add() {
        this.showForm = true;
      },

      async remove(item) {
        await this.colorDelete(item);
        //await this.colorClear();
        this.colors = this.getAllColors;
      },

      setPage() {
        this.currentPage = this.getAllShoes.current_page;
        this.lastPage = this.getAllShoes.last_page;
        this.nextPage = this.getAllShoes.next_page_url;
      }
    },

    async mounted() {
      await this.fetchColors();
      this.colors = this.getAllColors;
      //this.setPage();
      this.setLoadingState(false);
    },

    created() {
      this.setLoadingState(true);
    }
  }
</script>
