<template>
  <ul>
  <li><a href="/home">Movie Recommendation</a></li>
  <li><a href="/home">Home</a></li>
  <li><a href="/favourites">Favourites</a></li>
  <li style="float: right"><a href="/" @click="logout()">LogOut</a></li>
</ul>
  
</template>

<script>

export default ({
  setup() {
    const logout = ()=> {
      window.localStorage.clear();
    };

    return {
      logout
    }
    
  },
})
</script>



<style scoped>
  ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  font-size: 24px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}



</style>