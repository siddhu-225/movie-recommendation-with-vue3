<template>
  <div class="login">
    <h1 class="title is-1" style="color: Black">Login</h1>
    <form class="box">
      <p v-if="wrongCreds" style="color: red"> Please Enter Both Email and Password</p>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="e.g. alex@example.com" v-model="email">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="********" v-model="password">
        </div>
    </div>

    <button class="button is-primary" @click="SignIn()">Sign in</button>
    
    </form>
  </div>
  
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

export default ({
  setup() {
    let email = ref('');
    let password = ref('');
    const store = useStore();
    const route = useRouter();
    const wrongCreds = computed(()=> {
      return !email.value || !password.value;
    });
    onMounted(() => {
      window.localStorage.clear();
    });

    const SignIn = ()=> {
      if (email.value !== '' && password.value !== '') {
        store.commit('login', { email: email.value });
        route.push({
          name: 'Home'
        });
      }
    }
    return {
      email,
      password,
      wrongCreds,
      SignIn

    }
  },
})
</script>

<style scoped>
  .box {
    width: 25%;
    text-align: center;
    margin: auto;
  }
  .login {
    margin-top: 200px;
  }

</style>
