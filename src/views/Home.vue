<template>
  <div class="total">
    <form @submit.prevent="SearchMovies()" class="search-box">
      <div class="control">
        <input class="input is-hovered" type="text" placeholder="search your movie" v-model="search">&nbsp;&nbsp;
        <input class="button is-dark" type="submit" value="Search" />
      </div>
    </form>
    <br><br>
    <div class="box" v-for="movie in movieDetails" :key="movie.imdbID">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="getUrl(movie)" alt="Movie Poster">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <label class="title is-6 is-dark">Title:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Title}}</span><br>
            <label class="title is-6 is-dark">Year:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Year}}</span><br>
            <label class="title is-6 is-dark">Type:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Type}}</span><br>
          </div>
          <div class="buttons">
            <button class="button is-primary" @click="moreDetails(movie)">More Details</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const search = ref("");
    let movieDetails = ref([]);
    const route = useRouter();
    let showDetailsActive = ref(false);
    
    const SearchMovies = ()=> {
      if (search.value !== '') {
        fetch(`http://www.omdbapi.com/?apikey=1314d8b1&s=${search.value}`)
        .then(response => response.json())
        .then(data => {
          movieDetails.value = data.Search;
          search.value = "";
        });
      }
    }

    const getUrl = (movie)=> {
      return movie.Poster;
    }

    const moreDetails = (movie)=> {
      route.push({
        name: 'movieDetails',
        params: {
          imdbId: movie.imdbID,
        }
      });
    }
    return {
      search,
      SearchMovies,
      movieDetails,
      getUrl,
      moreDetails,
      showDetailsActive
    }
  }
}
</script>

<style scoped>
.box {

}
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
</style>
