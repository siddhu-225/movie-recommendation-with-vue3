<template>
  <div class="box">
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
            <label class="title is-6 is-dark">Actors:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Actors}}</span><br>
            <label class="title is-6 is-dark">Awards:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Awards}}</span><br>
            <label class="title is-6 is-dark">BoxOffice:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.BoxOffice}}</span><br>
            <label class="title is-6 is-dark">imdbRating:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.imdbRating}}</span><br>
            <label class="title is-6 is-dark">Writer:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Writer}}</span><br>
            <label class="title is-6 is-dark">Country:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Country}}</span><br>
            <label class="title is-6 is-dark">Director:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Director}}</span><br>
            <label class="title is-6 is-dark">Genre:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Genre}}</span><br>
            <label class="title is-6 is-dark">Language:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Language}}</span><br>
            <label class="title is-6 is-dark">Plot:</label>&nbsp;&nbsp;
              <span class="subtitle is-6">{{movie.Plot}}</span><br>
          </div>
        </div>
      </article>
    </div>
  
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, ref } from "vue";

export default {
  props: ['imdbId'],
  setup() {
    const route = useRoute();
    const movie = ref({});
    onMounted(() => {
      if (route.params.imdbId !== '') {
        fetch(`http://www.omdbapi.com/?apikey=1314d8b1&i=${route.params.imdbId}`)
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
}
</script>

<style scoped>
.box {
  margin: auto;
  width: 30%;
}
</style>
