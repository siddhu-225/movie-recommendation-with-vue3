<template>
  <navBar />
  <div class="is-flex total" v-if="getTodos.length">
      <div class="card" v-for="movie in getTodos" :key="movie.imdbID">
      <header class="card-header">
        <p class="card-header-title title is-6">
          {{ movie.Title }}
        </p>
      </header>
      <div class="card-content">
        <div class="media-left">
          <figure class="image is-96X96">
            <img :src="getUrl(movie)" alt="Movie Poster">
          </figure>
        </div>
      </div>
      <footer class="card-footer">
        <button class="card-footer-item" @click="moreDetails(movie)">More Details</button>
        <button class="card-footer-item" @click="removeFromFav(movie)">Remove From Fav</button>
      </footer>
    </div>
  </div>
  <div v-else>
    <p class="no-fav">There are No favourites Added.Please add Your Favourite Movies.</p>
  </div>
  
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import navBar from '../components/navBar.vue';
import { useRouter } from 'vue-router';

export default ({
  setup() {
    const store = useStore();
    const route = useRouter();

    const getTodos = computed(() => {
      return store.getters.getFavourites;
    });

    const removeFromFav = (movie)=> {
      store.commit('removeFromFavourites', movie);
    };

    const moreDetails = (movie)=> {
      route.push({
        name: 'movieDetails',
        params: {
          imdbId: movie.imdbID,
        }
      });
    }

    const getUrl = (movie)=> {
      return movie.Poster;
    }

    return {
      getTodos,
      getUrl,
      removeFromFav,
      moreDetails
    }
    
  },
  components: { navBar },
})
</script>

<style scoped>
.input {
  width: 20%
}
.control {
  text-align: center;
}
.box {
  margin: auto;
  width: 30%;
}
.total {
  margin-top: 50px;
}
.card {
  width: 30%;
  margin: auto;
}
.is-flex {
  flex-wrap: wrap;
}
.no-fav{
  font-size: 70px;
  margin-top: 120px;
}

</style>
