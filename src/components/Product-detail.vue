<template>
    <div v-if="product" style="position: relative;" class="container m-auto mt-2 custom-card-lg ">
        <v-card :loading="loading" class="mx-auto my-12" style="margin-top: 7% !important;">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>
            <div v-if="product.images && product.images.length > 0">
                <v-row class="align-center py-5">
                    <v-col cols="6">
                        <v-carousel cycle height="400" hide-delimiters hide-delimiter-background show-arrows="hover">
                            <div v-for="(image, index) in product.images" :key="index">
                                <v-carousel-item contain :src="image"></v-carousel-item>
                            </div>
                        </v-carousel>
                    </v-col>
                    <v-col cols="6">
                        <v-card-item>
                            <v-card-title>{{ product.name }}</v-card-title>
                        </v-card-item>

                        <v-card-subtitle>
                            <h2>Price: {{ product.price }}$</h2>
                        </v-card-subtitle>

                        <v-card-text>
                            <v-row align="center" class="mx-0 my-4" v-if="userType === user">
                                <v-rating v-model="rating" hover half-increments></v-rating>
                                <v-btn @click="submitRating" color="deep-purple-lighten-2">Submit Rating</v-btn>
                            </v-row>

                            <v-row align="center" class="mx-0 my-4" v-else>
                                Rating:
                                <v-rating :model-value="product.rating" color="amber" density="compact" half-increments
                                    readonly size="small"></v-rating>
                            </v-row>

                            <div>
                                <span>Description:</span>
                                {{ product.description }}
                            </div>
                        </v-card-text>
                        <v-divider vertical class="mx-4 mb-2"></v-divider>
                        <div class="px-4">
                            <h2>Tags:</h2>
                            <v-chip-group v-model="selection">
                                <v-chip>Product Brand: {{ product.brand }}</v-chip>
                                <v-chip>Product Stock: {{ product.stock }} Pieces</v-chip>
                                <v-chip>Discount Percentage: {{ product.discountPercentage }} %</v-chip>
                            </v-chip-group>
                        </div>
                        <v-divider class="mx-4 mb-1"></v-divider>
                        <v-card-actions>
                            <v-btn color="deep-purple-lighten-2" variant="text" @click="addToCart(product, quantity)">
                                Add to Cart
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </div>
        </v-card>
        <div style="position: absolute; top: 0; right: 16px;">
            <div>
                <v-icon v-if="userType === 'admin'" icon color="primary" @click="openEditDialog">
                    mdi-pencil</v-icon>
            </div>
            <div>
                <v-icon v-if="userType === 'admin'" color="danger" @click="openDeleteProduct"> mdi-delete</v-icon>
            </div>
        </div>
        <v-dialog v-model="dialog" max-width="800px">
            <v-card>
                <v-card-title>Edit Product</v-card-title>
                <div style="overflow-y: scroll;">
                    <v-card-text>
                        <v-text-field v-model="editedProduct.name" label="Product Name"></v-text-field>
                        <v-text-field v-model="editedProduct.description" label="Product Description"></v-text-field>
                        <v-text-field v-model="editedProduct.price" label="Product Price"></v-text-field>
                        <v-text-field v-model="editedProduct.category" label="Product Category"></v-text-field>
                        <div>
                            <v-text-field v-model="newImage" label="Add New Image"
                                @keydown.enter="addNewImage"></v-text-field>
                            <v-row v-if="editedProduct.images && editedProduct.images.length > 0">
                                <v-col v-for="(image, index) in editedProduct.images" :key="index" cols="12">
                                    <v-chip class="chips" @click="editImage(index)">{{ image }}</v-chip>
                                </v-col>
                            </v-row>
                        </div>
                        <v-text-field v-model="editedProduct.discountPercentage"
                            label="Product DiscountPercentage"></v-text-field>
                        <v-text-field v-model="editedProduct.brand" label="Product Brand"></v-text-field>
                        <v-text-field v-model="editedProduct.stock" label="Product Stock"></v-text-field>
                        <v-text-field v-model="editedProduct.thumbnail" label="Product Thumbnail"></v-text-field>
                    </v-card-text>
                </div>
                <v-card-actions>
                    <v-btn @click="dialog = false">Cancel</v-btn>
                    <v-btn @click="submitEdit">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="400px">
            <v-card>
                <v-card-title>Confirmation</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="confirmDelete">Yes</v-btn>
                    <v-btn @click="dialogDelete = false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
    <div v-else>Loading...</div>
    <!-- <Footer /> -->
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            userType: localStorage.getItem("user_type"),
            loading: false,
            quantity: 1,
            product: [],
            prodcutImages: [],
            rating: null,
            userRating: null,
            token: localStorage.getItem("token"),
            editedProduct: {
                name: "",
                description: "",
                price: "",
                category: "",
                images: [],
                discountPercentage: "",
                brand: "",
                stock: 0,
                thumbnail: "",
            },
            dialog: false,
            dialogDelete: false,
            newImage: "",
            productId: this.$route.params.id,

        };
    },
    computed: {
        ...mapGetters(['getCartItems']),
    },
    methods: {
        addToCart() {
            const cartItems = this.getCartItems;
            console.log("My Store", cartItems);
            const existingCartItem = cartItems.find(item => item.id === this.product.id);
            console.log('Adding to cart:', this.product);
            if (!existingCartItem) {
                this.$store.commit('addToCart', { ...this.product, quantity: this.quantity });
            } else {
                this.$store.commit('updateCartItemQuantity', { id: this.product.id, quantity: this.quantity });
            }
        },
        fetchProductDetails(productId) {
            try {
                this.loading = true;
                axios.get(`http://127.0.0.1:8000/api/products/${productId}`)
                    .then(response => {
                        // Parse the images field from JSON to an array
                        response.data.product.images = JSON.parse(response.data.product.images);
                        // Assign the entire response data to the product
                        Object.assign(this.product, response.data.product);

                        // Check if the user has already rated the product. If not, set userRating to null to display the rating input
                        const currentUserRating = response.data.userRating;
                        this.userRating = currentUserRating !== null ? currentUserRating : null;
                    })
                    .catch(error => {
                        console.error('Error fetching product details:', error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },
        submitRating() {
            // Ensure that a rating has been selected
            if (this.rating !== null) {
                // Make a POST request to submit the user's rating
                axios.post(`http://127.0.0.1:8000/api/products/${this.product.id}/rate`, { rating: this.rating }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                    .then(response => {
                        // Handle the response if needed
                        console.log('Rating submitted successfully:', response);
                        // Set userRating to the submitted rating to hide the input and display the rating
                        this.userRating = this.rating;
                    })
                    .catch(error => {
                        // Handle the error if needed
                        console.error('Error submitting rating:', error);
                    });
            }
        },
        openEditDialog() {
            // Set the editedProduct to the current product data
            this.editedProduct = { ...this.product };
            // Open the dialog
            this.dialog = true;
        },
        openDeleteProduct() {
            this.dialogDelete = true;
        },
        editImage(index) {
            // Set the selected image in the newImage field
            this.newImage = this.editedProduct.images[index];
            // Remove the selected image from the images array
            this.editedProduct.images.splice(index, 1);
        },
        addNewImage() {
            // Add the new image to the images array
            if (this.newImage.trim() !== "") {
                this.editedProduct.images.push(this.newImage.trim());
                this.newImage = "";
            }
        },
        removeImage(index) {
            // Remove the image at the specified index from the images array
            this.editedProduct.images.splice(index, 1);
        },
        submitEdit() {
            // Make a PUT request to update the product data
            axios.put(`http://127.0.0.1:8000/api/products/${this.productId}`, this.editedProduct, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
                .then(response => {
                    // Handle the response if needed
                    console.log('Product updated successfully:', response);
                    // Close the dialog
                    this.dialog = false;
                    // Refetch the product details to display updated data
                    this.fetchProductDetails(this.productId)
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Error updating product:', error);
                });
        },
        confirmDelete() {
            // console.log("Check ID first", this.productId);
            axios.delete(`http://127.0.0.1:8000/api/products/${this.productId}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
                .then(response => {
                    // Handle the response if needed
                    console.log('Product updated successfully:', response.data);
                    // Close the dialog
                    this.dialogDelete = false;
                    this.$router.push('/home/dashboard');
                    // Refetch the product details to display updated data
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Error updating product:', error);
                });
        },
    },
    mounted() {
        const productId = this.$route.params.id;
        this.fetchProductDetails(productId);
    },
};
</script>

<style scoped>
.chips:last-of-type {
    margin-bottom: 10px;
}

/* Add custom styling if needed */
#back-btn {
    padding: 12px 0;
}

#back-btn button {
    background-color: #fff;
    border: none;
}

#back-btn button i {
    font-size: 2rem;
}

.input-group {
    width: 50% !important;
    margin: auto !important;
    ;

}

.control-width {
    width: 70%;
    margin: auto;
}

.product-image {
    position: relative;
}

.social-icons i {
    text-align: end;
    display: block;
    color: #002f34;
    font-size: 30px;
    padding-right: 20px;
}

.over-btn {
    position: absolute;
    z-index: 9;
    margin-top: 4%;
    top: 2%;
    right: 5%;
}

.size-img {
    padding-top: 20px;
    width: 70%;
    height: 350px;
}

@media (min-width: 992px) {

    /* Large screens and up */
    .custom-card-lg {
        width: 50%;
    }
}

@media (min-width: 768px) and (max-width: 991.98px) {

    /* Medium screens */
    .custom-card-md {
        width: 75%;
    }
}
</style>
