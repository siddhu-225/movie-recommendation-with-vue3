<template>
  <navBar />
  <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-44x64">
            <img :src="getUrl(movie)" alt="Movie Poster">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <label class="title is-4 is-dark">Title:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Title}}</span><br>
            <label class="title is-4 is-dark">Year:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Year}}</span><br>
            <label class="title is-4 is-dark">Type:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Type}}</span><br>
            <label class="title is-4 is-dark">Actors:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Actors}}</span><br>
            <label class="title is-4 is-dark">Awards:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Awards}}</span><br>
            <label class="title is-4 is-dark">BoxOffice:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.BoxOffice}}</span><br>
            <label class="title is-4 is-dark">imdbRating:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.imdbRating}}</span><br>
            <label class="title is-4 is-dark">Writer:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Writer}}</span><br>
            <label class="title is-4 is-dark">Country:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Country}}</span><br>
            <label class="title is-4 is-dark">Director:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Director}}</span><br>
            <label class="title is-4 is-dark">Genre:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Genre}}</span><br>
            <label class="title is-4 is-dark">Language:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Language}}</span><br>
            <label class="title is-4 is-dark">Plot:</label>&nbsp;&nbsp;
              <span class="subtitle is-4">{{movie.Plot}}</span><br>
          </div>
        </div>
      </article>
    </div>
  
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, ref } from "vue";
import navBar from '../components/navBar.vue';

export default {
  props: ['imdbId'],
  setup() {
    const route = useRoute();
    const movie = ref({});
    onMounted(() => {
      if (route.params.imdbId !== '') {
        fetch(`https://www.omdbapi.com/?apikey=1314d8b1&i=${route.params.imdbId}`)
        .then(response => response.json())
        .then(data => {
          movie.value = data;
        });
      }
    });
    const getUrl = (movie)=> {
      return movie.Poster;
    }
    return {
      movie,
      getUrl
    }
  },
   components: { navBar },
}
</script>

<style scoped>
.box {
  margin: auto;
  width: 50%;
  margin-top: 100px;
}
</style>
