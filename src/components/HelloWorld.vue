<template>
  <div>
    <div class="">
      <div style="margin-top: 2px;" class="">
        <v-carousel cycle hide-delimiter-background show-arrows="hover">

          <v-carousel-item v-for="(image, index) in imageItems" :key="index" :src="image.src" cover></v-carousel-item>

        </v-carousel>
      </div>
      <div class="mt-6">
        <v-container>
          <div class="mb-7">
            <h2>Categories:</h2>
            <v-row>
              <v-col cols="2" v-for="(product, index) in products" :key="index">
                <v-card>
                  <div class="text-center">
                    <v-img :src="product.thumbnail" alt="Product Thumbnail"></v-img>
                    <strong>{{ product.category }}</strong>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <v-divider class="mb-3"></v-divider>
          <div>
            <h2>Products:</h2>
            <v-row>
              <v-col cols="2" v-for="(product, index) in products" :key="index">
                <v-card @click="item_detail(product)">
                  <v-img :src="product.thumbnail" alt="Product Thumbnail"></v-img>
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-subtitle>{{ product.price }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </div>

        </v-container>
      </div>
    </div>


    <Footer />

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      allUsers: [],
      allPermissions: [],
      imageItems: [
        { src: 'https://icms-image.slatic.net/images/ims-web/3da523f7-40c7-4bb2-b785-d8eec4bfcd4e.jpg_1200x1200.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/beb71d65-81ba-42d0-89b0-57d9ef4cd43c.jpeg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/d9de0dae-36d8-43f8-a9be-d1440568cc2d.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/f6a8fc35-e92a-4c02-8721-cffef910a14d.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/ebdbc196-8ff6-4082-b460-9fdcfa41804c.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/6565b6d3-2aa5-4884-9596-a608f349bb66.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/42b332b6-ccec-4d1b-960b-ce155ac6918b.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/fa949388-26c4-477b-a9d6-064260fd479b.jpg' },
        { src: 'https://icms-image.slatic.net/images/ims-web/361f8b6a-6a23-4ee0-9cb7-4f06adfd15e7.png' },
      ],
      products: [],
      productImage: [],

    };
  },
  mounted() {
    this.allProducts();
  },
  methods: {
    item_detail(item) {
      console.log(item);
      this.$router.push({
        name: "product_detail",
        path: "/product_detail",
        params: { id: item.id },
      });
    },
    allProducts() {
      axios.get('http://127.0.0.1:8000/api/products')
        .then(response => {
          this.products = response.data.products;
          productImage = response.data.products.map(product => {
            // product.images = JSON.parse(product.images);
            return product;
          });
          console.log("All Products", response);
        })
        .catch(error => {
          console.error('API Error:', error);
        });
    }

  }
}
</script>