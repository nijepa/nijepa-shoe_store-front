<template>
  <transition name="fall" mode="out-in">

    <loading v-if="loadingState" key="1" pic="loading" />

    <div v-else :key="2" class="profile__wrapper">
      <form @submit.prevent="save(shoe)">
        <!-- <FormInput :inputField="shoe.title" /> -->
        <div class="form__item">
          <label>
            <input type="text" name="title" id="title" required placeholder=" "
                  v-model="shoe.title">
            <span>Title</span>
          </label>
        </div>
        <div class="form__item">
          <label>
            <textarea name="desc" id="desc" cols="30" rows="5" placeholder=" "
                      v-model="shoe.description"></textarea>
            <span>Description</span>
          </label>
        </div>
        <div class="form__item">
          <label>
            <input type="number" name="price" id="price" step="0.01" required placeholder=" "
                  v-model="shoe.price">
            <span>Price</span>
          </label>
        </div>
        <div class="form__item">
          <label>
            <input type="number" name="stock" id="stock" step="0.1" required placeholder=" "
                  v-model="shoe.stock">
            <span>Stock</span>
          </label>
        </div>

        <ButtonsConfirmation @canceled="cancel" />
  <!--       <div class="form__buttons">
          <button type="submit">
            <svg width="40px" x="0px" y="0px"
                viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <polygon fill="#51cbe9;" points="228.384,265.275 98.306,135.197 56.616,176.887 14.927,218.576 145.005,348.654 "/>
              <path style="fill:#235966;" d="M507.628,152.789L424.249,69.41c-5.829-5.829-15.282-5.829-21.11,0L228.384,244.165L108.861,124.642
                c-5.828-5.829-15.281-5.829-21.11,0L4.372,208.021c-0.354,0.354-0.687,0.722-1,1.106c-0.242,0.296-0.458,0.603-0.675,0.911
                c-0.063,0.09-0.134,0.175-0.196,0.266c-0.248,0.372-0.472,0.752-0.682,1.139c-0.021,0.037-0.045,0.072-0.066,0.11
                c-0.209,0.391-0.393,0.79-0.564,1.194c-0.018,0.042-0.04,0.082-0.058,0.125c-0.158,0.384-0.294,0.775-0.418,1.169
                c-0.022,0.07-0.052,0.139-0.073,0.21c-0.11,0.364-0.196,0.734-0.278,1.105c-0.024,0.106-0.057,0.21-0.078,0.316
                c-0.069,0.349-0.113,0.7-0.157,1.052c-0.016,0.133-0.045,0.263-0.057,0.396c-0.043,0.449-0.064,0.902-0.067,1.352
                c0,0.034-0.004,0.069-0.004,0.103c0,0.034,0.004,0.069,0.004,0.103c0.003,0.451,0.024,0.903,0.067,1.352
                c0.013,0.133,0.04,0.263,0.057,0.396c0.043,0.352,0.088,0.703,0.157,1.052c0.021,0.106,0.054,0.209,0.076,0.313
                c0.082,0.372,0.169,0.742,0.279,1.108c0.021,0.067,0.048,0.131,0.07,0.199c0.125,0.397,0.263,0.791,0.422,1.179
                c0.016,0.04,0.037,0.078,0.055,0.118c0.172,0.408,0.358,0.809,0.569,1.203c0.015,0.028,0.034,0.055,0.049,0.084
                c0.215,0.397,0.445,0.787,0.699,1.167c0.046,0.069,0.1,0.133,0.148,0.2c0.23,0.331,0.464,0.661,0.724,0.978
                c0.205,0.251,0.431,0.485,0.652,0.722c0.118,0.125,0.222,0.258,0.345,0.381l213.455,213.458c2.915,2.915,6.735,4.372,10.555,4.372
                s7.641-1.457,10.555-4.372c5.829-5.829,5.829-15.281,0-21.11l-72.824-72.824l72.824-72.824c0.003-0.003,0.004-0.006,0.007-0.007
                l174.748-174.749l62.269,62.269L301.208,338.1c-5.829,5.829-5.829,15.281,0,21.11c5.829,5.829,15.281,5.829,21.111,0
                l185.309-185.312C513.457,168.07,513.457,158.618,507.628,152.789z M98.306,156.307l108.968,108.968l-62.269,62.269L36.037,218.576
                L98.306,156.307z"/>
            </svg>
            Save
          </button>
          <button type="submit" @click.prevent="cancel()">
            <svg width="30px" x="0px" y="0px"
                viewBox="0 0 512.003 512.003" style="enable-background:new 0 0 512.003 512.003;" xml:space="preserve">
              <polygon fill="#51cbe9;" points="256.001,158.605 114.833,17.437 17.437,114.83 158.605,256 17.437,397.17 114.833,494.563 
                255.603,353.793 256.001,353.395 "/>
              <path style="fill:#235966;" d="M378.055,256l128.84-128.839c6.809-6.809,6.809-17.85,0-24.659L409.498,5.105
                c-6.807-6.807-17.85-6.807-24.659,0L256.001,133.944L127.162,5.105c-0.425-0.425-0.868-0.825-1.325-1.196
                C122.643,1.303,118.737,0,114.833,0c-2.232,0-4.462,0.425-6.561,1.276c-2.099,0.851-4.066,2.127-5.768,3.829L5.108,102.503
                c-6.809,6.809-6.809,17.85,0,24.659L133.948,256L5.108,384.839c-6.809,6.809-6.809,17.85,0,24.659l97.395,97.395
                c3.405,3.404,7.867,5.107,12.329,5.107c4.462,0,8.926-1.704,12.329-5.107l140.771-140.772l0.398-0.398
                c0.413-0.413,0.802-0.844,1.168-1.292c0.277-0.34,0.527-0.694,0.776-1.048c0.077-0.112,0.166-0.214,0.241-0.328
                c0.289-0.432,0.549-0.877,0.795-1.329c0.024-0.044,0.052-0.085,0.077-0.129c0.244-0.459,0.462-0.926,0.663-1.4
                c0.021-0.047,0.045-0.092,0.065-0.141c0.185-0.45,0.344-0.907,0.49-1.367c0.026-0.082,0.059-0.16,0.085-0.244
                c0.127-0.422,0.227-0.849,0.321-1.278c0.028-0.129,0.068-0.253,0.094-0.382c0.08-0.405,0.131-0.814,0.183-1.222
                c0.019-0.157,0.052-0.31,0.068-0.467c0.051-0.525,0.075-1.053,0.078-1.58c0-0.04,0.005-0.08,0.005-0.12V165.829L397.171,42.095
                l72.737,72.737l-128.84,128.839c-6.809,6.809-6.809,17.85,0,24.661l128.84,128.839l-72.737,72.737l-60.407-60.407
                c-6.809-6.809-17.85-6.809-24.661,0c-6.809,6.809-6.809,17.85,0,24.661l72.737,72.737c3.405,3.404,7.867,5.107,12.329,5.107
                c4.462,0,8.926-1.704,12.329-5.107l97.395-97.395c6.809-6.809,6.809-17.85,0-24.659L378.055,256z M170.937,268.329
                c6.809-6.809,6.809-17.85,0-24.661L42.096,114.83l72.737-72.737l123.732,123.733v180.345L114.833,469.905l-72.737-72.737
                L170.937,268.329z"/>
            </svg>
            Cancel
          </button>
        </div> -->
        <!-- <button type="submit" @click.prevent="remove(shoe)">
          Delete
        </button> -->
      </form>
    </div>
  </transition>
</template>

<script>
  //import FormInput from '@/components/backend/partials/_FormInput.vue';
  import Loading from '@/components/utils/Loading.vue';
  import ButtonsConfirmation from '@/components/backend/partials/_ButtonsConfirmation.vue';
  import { mapGetters, mapActions } from 'vuex';
  import loadingM from '../../mixins/loading';
  import imageUrl from '../../mixins/imageUrl';

  export default {
    name: 'ShoeBE',

    components: {
      Loading,
      ButtonsConfirmation
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

  form { 
    //background: $blue-grey;
    justify-self: center;
    //padding: 1em;
    border-radius: .2em;
    //background: linear-gradient(45deg, $blue-grey-darker, $blue-grey-dark);
    border-radius: .2em;
    color: $primary-turquoise;
    display: grid;
    justify-items: center;

    .form__item {
  /*    display: grid;
      grid-template-columns: repeat(2, auto);
      grid-template-rows: repeat(2, auto);  */
      display: flex;
      padding: .5em 1em;
      //box-shadow: 0px 1px 2px $primary-turquoise;
      //border-top: 1px solid $blue-grey-darker;
      //align-items: end;
      //grid-column-gap: .5em;
    }
  }
</style>