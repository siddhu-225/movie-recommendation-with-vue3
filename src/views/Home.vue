<template>
  <navBar />
  <div class="total">
    <p v-if="searchCheck" style="color: red"> Please Enter Movie name</p>
    <form @submit.prevent="SearchMovies()" class="search-box">
      <div class="control">
        <input class="input is-hovered" type="text" placeholder="search your movie" v-model="search">&nbsp;&nbsp;
        <input class="button is-dark" type="submit" value="Search" />
      </div>
    </form>
    <br><br>
    <div class="is-flex">
      <div class="card" v-for="movie in movieDetails" :key="movie.imdbID">
      <header class="card-header">
        <p class="card-header-title title is-3">
          {{ movie.Title }}
        </p>
      </header>
      <div class="card-content">
        <div class="media-left">
          <figure class="image is-126x126">
            <img :src="getUrl(movie)" alt="Movie Poster">
          </figure>
        </div>
      </div>
      <footer class="card-footer">
        <button class="card-footer-item" @click="moreDetails(movie)">More Details</button>
        <button class="card-footer-item" @click="addToFavourites(movie)">Add To favourites</button>
      </footer>
    </div>
    </div>
  </div>
  <o-modal v-model:active.sync="showDetailsActive" :canCancel="true" :closeIconSize="medium" :width="1960" scroll="clip">
    <div class="modal-box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-44x64">
            <img :src="getUrl(selectedMovie)" alt="Movie Poster">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <label class="title is-4 is-dark">Title:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Title}}</span><br>
            <label class="title is-4 is-dark">Year:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Year}}</span><br>
            <label class="title is-4 is-dark">Type:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Type}}</span><br>
            <label class="title is-4 is-dark">Actors:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Actors}}</span><br>
            <label class="title is-4 is-dark">Awards:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Awards}}</span><br>
            <label class="title is-4 is-dark">BoxOffice:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.BoxOffice}}</span><br>
            <label class="title is-4 is-dark">imdbRating:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.imdbRating}}</span><br>
            <label class="title is-4 is-dark">Writer:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Writer}}</span><br>
            <label class="title is-4 is-dark">Country:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Country}}</span><br>
            <label class="title is-4 is-dark">Director:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Director}}</span><br>
            <label class="title is-4 is-dark">Genre:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Genre}}</span><br>
            <label class="title is-4 is-dark">Language:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Language}}</span><br>
            <label class="title is-4 is-dark">Plot:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{selectedMovie.Plot}}</span><br>
          </div>
        </div>
      </article>
    </div>
  </o-modal>
  <o-loading :full-page="isFullPage" v-model:active.sync="isLoading" :can-cancel="true">
    <o-icon pack="fas" icon="sync-alt" size="large" spin> </o-icon>
  </o-loading>
</template>

<script>
import { ref, computed } from 'vue';
import navBar from '../components/navBar.vue';
import { useStore } from 'vuex';

export default {
  setup() {
    let movieDetails = ref([]);
    let showDetailsActive = ref(false);
    const search = ref("");
    const store = useStore();
    const isFullPage = ref(true);
    const selectedMovie = ref({});
    const isLoading = ref(false);
    const searchCheck = computed(()=> {
      return !search.value;
    });

    const addToFavourites = (movie)=> {
      store.commit('addToFavourites', movie);
    };

    const SearchMovies = ()=> {
      isLoading.value = true;
      if (search.value !== '') {
        fetch(`https://www.omdbapi.com/?apikey=1314d8b1&s=${search.value}`)
        .then(response => response.json())
        .then(data => {
          movieDetails.value = data.Search;
          search.value = "";
        });
      }
      isLoading.value = false;
    }

    const getUrl = (movie)=> {
      return movie.Poster;
    }

    const moreDetails = (movie)=> {
      isLoading.value = true;
      fetch(`https://www.omdbapi.com/?apikey=1314d8b1&i=${movie.imdbID}`)
        .then(response => response.json())
        .then(data => {
          selectedMovie.value = data;
        });
      showDetailsActive.value = true;
      isLoading.value = false;
    }
    return {
      search,
      SearchMovies,
      movieDetails,
      getUrl,
      moreDetails,
      showDetailsActive,
      searchCheck,
      addToFavourites,
      isFullPage,
      selectedMovie,
      isLoading,
    }
  },
  components: { navBar },
}
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
</style>
