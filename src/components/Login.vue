<!-- src/components/Login.vue -->

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-btn :loading="check" type="submit" block class="mt-2">Login</v-btn>
    </v-form>
    <v-divider class="my-4"></v-divider>
    <router-link to="/signup">
      <v-btn block color="primary">Don't have an account? Sign up</v-btn>
    </router-link>
  </v-sheet>
</template>
  
<script>
import axios from 'axios';
export default {
  data: () => ({
    email: '',
    password: '',
    check: false,
  }),
  methods: {
    login() {
      this.check = true;
      const formData = {
        email: this.email,
        password: this.password,
      };
      axios.post('http://127.0.0.1:8000/api/login', formData)
        .then(response => {
          if (response) {
            this.check = false;
            const token = response.data.access_token;
            const type = response.data.user_type;
            const name = response.data.user.name;
            const image = response.data.user.profile_image;
            const email = response.data.user.email;
            localStorage.setItem("token", token);
            localStorage.setItem("user_type", type);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("image", image);
            this.$router.push('/home/dashboard');
            console.log('API Response:', response.data);
          }
          else {
            console.log("Failed Login");
            this.check = false;
          }
        })
        .catch(error => {
          console.error('API Error:', error);
          this.check = false;
        });
    }
  }
}
</script>
  