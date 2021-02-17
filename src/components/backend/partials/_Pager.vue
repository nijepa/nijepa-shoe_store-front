<template>
  <div class="pager">
    <a @click="goToPage(firstPage)"
      :class="Number(getPageNr(firstPage)) === currentPage ? 'disabled' : ''">
      <svg width="25px" x="0px" y="0px"
        viewBox="0 0 51.532 51.532" style="enable-background:new 0 0 51.532 51.532;" xml:space="preserve">
        <path fill="red" d="M6.631,1.963c3.662,0,6.631,2.969,6.631,6.631V23.81c0.284-0.324,0.616-0.609,1-0.831l31.27-18.053
          c1.238-0.715,2.762-0.715,4,0c1.236,0.714,2,2.035,2,3.464v36.105c0,1.429-0.764,2.75-2,3.463c-0.619,0.357-1.311,0.537-2,0.537
          c-0.69,0-1.381-0.18-2-0.537l-31.27-18.053c-0.384-0.221-0.716-0.506-1-0.83v13.863c0,3.662-2.969,6.631-6.631,6.631
          S0,46.6,0,42.938V8.594C0,4.932,2.969,1.963,6.631,1.963z"/>
      </svg>
    </a>
    <ul>
      <li v-for="link in links" 
          :key="link.label" 
          v-html="linkLabel(link.label)"
          @click="goToPage(link.url)"
          :class="link.active === true || !link.url ? 'disabled' : ''"> 
      </li>
    </ul>
    <a @click="goToPage(lastPage)"
      :class="Number(getPageNr(lastPage)) === currentPage ? 'disabled' : ''">
      <svg width="25px" x="0px" y="0px"
        viewBox="0 0 55.752 55.752" style="enable-background:new 0 0 55.752 55.752;" xml:space="preserve">
        <path d="M44.9,1.963c-3.662,0-6.631,2.969-6.631,6.631V23.81c-0.285-0.324-0.617-0.609-1-0.831L6,4.926
          c-1.238-0.715-2.762-0.715-4,0C0.763,5.64,0,6.961,0,8.39v36.104c0,1.43,0.763,2.75,2,3.465c0.619,0.356,1.311,0.535,2,0.535
          c0.691,0,1.381-0.179,2-0.535l31.269-18.053c0.383-0.223,0.715-0.508,1-0.832v13.863c0,3.662,2.969,6.631,6.631,6.631
          s6.631-2.969,6.631-6.631V8.594C51.531,4.932,48.562,1.963,44.9,1.963z"/>
      </svg>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Pager',

    props: {
      links: Array,
      firstPage: String,
      lastPage: String,
      currentPage: Number
    },

    data() {
      return {
        navLinks: this.links
      }
    },

    methods: {
      goToPage(page) {
        if (!page || Number(this.getPageNr(page)) !== this.currentPage ) {
          this.$emit("pageChanged", page);
        }
      },

      getPageNr(url) {
        const start = url.indexOf('=');
        const duz = url.length;

        return url.slice(start + 1, duz);
      },

      linkLabel(lab) {
        return lab === "&laquo; Previous"  ?
          `<svg width="25px" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <path fill="#FFC61B;" d="M403.568,512c-7.426,0-14.791-2.377-21.019-7.034L87.343,284.148
              c-8.959-6.701-14.097-16.961-14.097-28.147c0-11.187,5.137-21.446,14.097-28.146L382.549,7.035
              c10.723-8.021,24.821-9.277,36.795-3.282c11.973,5.995,19.41,18.04,19.41,31.429v57.144c0,7.642-6.196,13.836-13.836,13.836
              s-13.836-6.195-13.836-13.836V35.182c0-4.168-2.888-6.063-4.129-6.686c-1.241-0.621-4.49-1.799-7.826,0.699L103.919,250.013
              c-2.608,1.951-2.998,4.588-2.998,5.987s0.39,4.036,2.998,5.988l295.206,220.818c3.336,2.497,6.585,1.32,7.826,0.699
              c1.241-0.623,4.129-2.518,4.129-6.686V199.195c0-7.642,6.196-13.836,13.836-13.836s13.836,6.195,13.836,13.836v277.624
              c0,13.39-7.437,25.433-19.41,31.429C414.324,510.762,408.929,512,403.568,512z"/>
            <polygon fill="#FEE187;" points="361.011,120.234 361.011,391.766 179.508,256 "/>
            <path fill="#FFC61B;" d="M361.012,405.604c-2.935,0-5.851-0.933-8.289-2.756L171.221,267.08
              c-3.492-2.612-5.548-6.719-5.548-11.08s2.056-8.468,5.548-11.08l181.502-135.767c4.197-3.138,9.804-3.635,14.484-1.292
              c4.684,2.345,7.64,7.134,7.64,12.371v271.533c0,5.238-2.958,10.027-7.64,12.371C365.246,405.119,363.124,405.604,361.012,405.604z
              M202.607,256l144.567,108.137V147.863L202.607,256z"/>
          </svg>` :
          lab === "Next &raquo;" ? 
          `<svg width="25px" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <path fill="#FFC61B;" d="M108.432,512c-5.363,0-10.754-1.238-15.775-3.752c-11.973-5.995-19.41-18.04-19.41-31.429V199.195
              c0-7.642,6.196-13.836,13.836-13.836c7.64,0,13.836,6.195,13.836,13.836v277.624c0,4.168,2.888,6.063,4.129,6.686
              c1.241,0.621,4.49,1.799,7.826-0.699L408.08,261.987c2.61-1.951,2.998-4.588,2.998-5.987s-0.389-4.036-2.998-5.988L112.875,29.195
              c-3.335-2.497-6.586-1.32-7.826-0.699c-1.241,0.623-4.129,2.518-4.129,6.686v57.144c0,7.642-6.196,13.836-13.836,13.836
              s-13.836-6.195-13.836-13.836V35.182c0-13.389,7.437-25.433,19.41-31.429c11.97-5.995,26.069-4.739,36.795,3.282l295.206,220.818
              c8.958,6.701,14.095,16.961,14.095,28.147c0,11.187-5.137,21.446-14.095,28.146l-295.207,220.82
              C123.224,509.623,115.857,512,108.432,512z"/>
            <polygon fill="#FEE187;" points="150.989,120.234 150.989,391.766 332.492,256 "/>
            <path fill="#FFC61B;" d="M150.987,405.604c-2.113,0-4.235-0.483-6.195-1.465c-4.684-2.345-7.64-7.134-7.64-12.371V120.233
              c0-5.238,2.958-10.027,7.64-12.371c4.682-2.345,10.292-1.844,14.484,1.292L340.78,244.921c3.491,2.612,5.548,6.719,5.548,11.08
              c0,4.361-2.056,8.468-5.548,11.08L159.277,402.849C156.839,404.671,153.922,405.604,150.987,405.604z M164.825,147.863v216.276
              l144.566-108.137L164.825,147.863z"/>
          </svg>` : lab
        }
    }
  }
</script>

<style lang="scss" scoped>
  .pager {
    display: flex;
    column-gap: 1em;
    //display: flex;
    justify-self: center;
    //align-items: center;
    font-size: 1.2em;
    font-weight: 600;
    //border: 1px solid $primary-turquoise;
    border-radius: .3em;
    padding: .2em;
    margin-top: .5em;
    //background-color: $primary-turquoise;

    ul {
      display: flex;
      column-gap: 1em;

      li {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      li:hover {
        color: $secondary-cyclamen;
      }
    }

    a {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    a:hover {
      color: $secondary-cyclamen;
    }
  }

  .disabled {
    pointer-events:none; //This makes it not clickable
    opacity:0.6;         //This grays it out to look disabled
  }
</style>
