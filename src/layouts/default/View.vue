<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <div style="padding: 0 15px;">
        <div v-show="userType === 'admin' || userType === 'user'" class="my-3">
          <div class="mr-3">
            <v-img :src="userImageUrl" alt="Profile Image" />
          </div>
          <div>
            <h3>{{ username }}</h3>
            <p>{{ email }}</p>
          </div>
        </div>
        <v-divider></v-divider>
        <v-spacer vertical></v-spacer>
        <div>
          <v-list density="compact">
            <div class="navigation">
              <div class="lists">
                <v-list-item color="primary">
                  <template v-slot:prepend>
                    <v-icon>
                      mdi-home
                    </v-icon>
                  </template>

                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
              </div>
              <div class="lists">
                <v-list-item color="primary">
                  <template v-slot:prepend>
                    <i class="fa-solid fa-list"></i>
                  </template>

                  <v-list-item-title style="margin-left: 37px;">Catogries</v-list-item-title>
                </v-list-item>
              </div>
              <div class="lists">
                <v-list-item color="primary">
                  <template v-slot:prepend>
                    <i class="fa-solid fa-question"></i>
                  </template>

                  <v-list-item-title style="margin-left: 45px;">FAQ's</v-list-item-title>
                </v-list-item>
              </div>
              <div class="lists">
                <v-list-item color="primary">
                  <template v-slot:prepend>
                    <v-icon>
                      mdi-account
                    </v-icon>
                  </template>

                  <v-list-item-title>About Us</v-list-item-title>
                </v-list-item>
              </div>
              <div class="lists">
                <v-list-item color="primary">
                  <template v-slot:prepend>
                    <v-icon>
                      mdi-share
                    </v-icon>
                  </template>

                  <v-list-item-title>Links</v-list-item-title>
                </v-list-item>
              </div>
            </div>
          </v-list>
        </div>
        <v-spacer></v-spacer>
        <div v-if="userType === 'admin' || userType === 'user'">
          <v-btn @click="logout">Log Out</v-btn>
        </div>
      </div>

    </v-navigation-drawer>

    <v-app-bar app color="#3853D8" dark>
      <div style="width: 100%;" class="d-flex justify-space-between align-center">

        <div class="d-flex justify-space-between align-center">
          <div>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </div>
          <div>
            <v-app-bar-title>Application</v-app-bar-title>
          </div>
        </div>

        <div class="mt-2" style="width: 30%;height: 66px;">
          <div class="search-suggestions-container">
            <v-text-field label="Enter your Search" type="search" v-model="searchQuery" @input="searchProducts" />
            <!-- Display suggestions below the search field -->
            <v-menu class="suggestion-menu v-menu" v-model="isSuggestionOpen" :close-on-content-click="false"
              transition="scale-transition" offset-x style="top: 12%; width: 30%; left: 43.3%;">
              <v-list id="suggested">
                <!-- Iterate through suggestions and display them -->
                <v-list-item v-for="(suggestion, index) in suggestions" :key="index"
                  @click="selectSuggestion(suggestion)">
                  <!-- Display suggestion titles and thumbnails -->
                  <v-list-item-avatar>
                    <v-img :src="suggestion.thumbnail" alt="Suggestion Thumbnail"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ suggestion.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>


        <div style="position: relative; display: flex; align-items: center;" class="mr-5">
          <div v-if="userType === 'admin'" style="border-right: 1px solid #fff;">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <div class="text-end">
                  <v-btn class="my-3 mr-2" v-bind="props" text="Add Products"> </v-btn>
                </div>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title> Add Products</v-card-title>
                  <v-divider></v-divider>
                  <div style="overflow-y: scroll;">
                    <v-text-field style="padding: 20px;" v-model="newImage" label="Images" @keyup.enter="addImage"
                      multiple></v-text-field>
                    <v-chip v-for="(image, index) in images" :key="index" @click="removeImage(index)"
                      class="mr-2 mt-2 text-start"
                      style="max-width: 30%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      {{ image }}
                      <v-icon small>mdi-close</v-icon>
                    </v-chip>
                    <v-text-field style="padding: 20px;" v-model="thumbnail" multiple label="Thumbnail"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="name" label="Name"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="description" label="description"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="price" label="Price"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="category" label="Category"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="discountPercentage"
                      label="DiscountPercentage"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="brand" label="Brand"></v-text-field>
                    <v-text-field style="padding: 20px;" v-model="stock" label="stock"></v-text-field>
                  </div>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn @click="addUsers" type="submit" block class="mt-2">Add Users</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
          <v-divider></v-divider>
          <div @click="toggleCartDrawer" style="cursor: pointer; padding-top: 10px; padding-left: 12px;">
            <i class="fa-solid fa-2x fa-cart-shopping"></i>
            <span style="top: 12px; left: 101%;" class="position-absolute translate-middle badge rounded-pill bg-success">
              {{ getCartItems.length }}
            </span>
          </div>
        </div>

      </div>
    </v-app-bar>
    <transition name="fade">
      <v-navigation-drawer v-model="drawer1" location="right" temporary>
        <v-list>
          <v-subheader class="pl-3">Product Cart:</v-subheader>
          <v-divider></v-divider>
          <v-list-item v-for="(item, index) in getCartItems" :key="index" class="pa-2">
            <v-row>
              <v-col cols="6">
                <v-avatar size="100">
                  <v-img :src="item.thumbnail" cover></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.price }}$</v-list-item-subtitle>
                  <v-list-item-subtitle> {{ item.quantity }} * {{ item.price }}</v-list-item-subtitle>

                </v-list-item-content>

                <v-btn @click="removeFromCart(item)" class="my-3">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider class=""></v-divider>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </transition>


    <v-main class="body">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      userType: '',
      drawer: false,
      drawer1: false,
      username: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      searchQuery: '',
      isSuggestionOpen: false,
      suggestions: [],
      name: '',
      description: '',
      price: null,
      images: [],
      newImage: '',
      category: '',
      thumbnail: '',
      discountPercentage: '',
      brand: '',
      stock: '',
    }
  },
  computed: {
    ...mapGetters(['getCartItems']),
    userImageUrl() {
      return localStorage.getItem('image');
    },
  },
  mounted() {
    this.userType = localStorage.getItem("user_type");
  },
  methods: {
    toggleCartDrawer() {
      this.drawer1 = !this.drawer;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("image");
      localStorage.removeItem("email");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_type");
      this.$router.push("/");
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goToHome() {
      this.$router.push("/home/dashboard");
    },
    async searchProducts() {
      try {
        // Check if searchQuery is empty or undefined
        if (!this.searchQuery || this.searchQuery.trim() === '') {
          this.suggestions = []; // Clear suggestions if the search query is empty
          this.isSuggestionOpen = false;
          return;
        }

        const apiUrl = `http://127.0.0.1:8000/api/products/search?q=${this.searchQuery}`;
        console.log('API URL:', apiUrl);

        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data);

        // Filter products that match the user's input
        this.suggestions = response.data.products.filter((product) => {
          // Check if product.title is defined before accessing it
          if (product.name) {
            return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          }
          return false; // If product.title is undefined, exclude it from the suggestions
        });

        this.isSuggestionOpen = this.suggestions.length > 0;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    selectSuggestion(suggestion) {
      this.$router.push({
        name: "product_detail",
        path: "/product_detail",
        params: { id: suggestion.id },
      });
    },
    addUsers() {
      const token = localStorage.getItem("token");
      const formData = {
        name: this.name,
        description: this.description,
        price: parseFloat(this.price),
        thumbnail: this.thumbnail,
        category: this.category,
        images: this.images,
        discountPercentage: parseFloat(this.discountPercentage),
        brand: this.brand,
        stock: parseFloat(this.stock)
      };

      console.log("Check Values", formData);
      console.log("Check Token", token);
      axios.post('http://127.0.0.1:8000/api/products', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          console.log('Request Headers:', response.config.headers);
          // this.getUsers();
          console.log('API Response:', response);
        })
        .catch(error => {
          console.error('API Error:', error);
        });
    },
    addImage() {
      // Add the new image text to the images array
      if (this.newImage.trim() !== '') {
        this.images.push(this.newImage.trim());
        this.newImage = ''; // Clear the input field after adding the image
      }
    },
    removeImage(index) {
      // Remove the image at the specified index
      this.images.splice(index, 1);
    },
  },
}
</script>
<style scoped>
.body {
  background-color: #f5f5f5;
}

.navigation .lists {
  border-bottom: 2.2px dotted lightslategray;
  margin-bottom: 15px;
}


.navigation .lists:last-child {
  border-bottom: none;
}

.search-suggestions-container {
  position: relative;
}

.v-menu>.v-overlay__content {
  width: 45%;
}
</style>