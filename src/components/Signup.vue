<!-- src/components/Signup.vue -->

<template>
    <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent="signup">
            <!-- <v-select v-model="selectedUserType" label="Select user type" item-title="text" item-value="value"
                :items="userTypes"></v-select> -->
            <v-text-field v-model="image" label="Profile Image"></v-text-field>
            <v-text-field v-model="name" label="Name"></v-text-field>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-btn :loading="check" type="submit" block class="mt-2">Signup</v-btn>
        </v-form>
    </v-sheet>
</template>
  
<script>
import axios from 'axios';
export default {
    data: () => ({
        name: '',
        email: '',
        password: '',
        image: '',
        check: false,
        // selectedUserType: null,
        // userTypes: [
        //     { text: "Admin", value: true },
        //     { text: "User", value: false }
        // ],
    }),
    methods: {
        signup() {
            this.check = true;
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password,
                profile_image: this.image,
            };
            axios.post('http://m-abdullahtech.infinityfreeapp.com/public/user', formData)
                .then(response => {
                    if (response) {
                        this.check = false;
                        this.$router.push('/');
                        console.log('API Response:', response);
                    }
                    else {
                        console.log("Failed Signup");
                    }
                })
                .catch(error => {
                    this.check = false;
                    console.error('API Error:', error);
                });
        }
    }
}
</script>
  