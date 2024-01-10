 <!-- {name: 'product', params: { id: item.id }}
<template>
    <section class="pt-4" id="mobileproduct">
        <div class="container">
            <div class="row" id="mob-head">
                <div class="col-lg-4 mt-3 col-md-12 col-sm-12" id="category-head">
                    <h3>All Categories Here:</h3>
                </div>
                <div class="col-lg-7 my-3 col-md-12 col-sm-12" id="category-btns">
                    <select class="form-select form-select-md" aria-label="Default select categories"
                        v-model="selectedCategory">
                        <option disabled value="">Select a Category</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row" id="cards-wrapp">
                <div class="mb-4 d-flex" v-for="(item, index) in list" :key="item.id" id="landing-cards">
                    <div class="card d-flex flex-column" @click="item_detail(item)">
                        <img :src="item.images[0]" style="height: 250px" class="card-img-top p-4" alt="..." />
                        <hr />
                        <div class="card-body flex-grow-1">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-text">{{ item.description }}</p>
                            <div class="card-footer">
                                <span class="text-start pe-auto">Price:</span>
                                <span class="fw-bold float-end">${{ item.price }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
// import axiosInstance from "../utils/axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "Mobileprod",
    setup() {
        const list = ref([]);
        const route = useRouter();
        const categories = ref([]);
        const selectedCategory = ref("");
        function item_detail(item) {
            console.log(item);
            route.push({
                name: "product_detail",
                path: "/product_detail",
                params: { id: item.id },
            });
        }
        const fetchCategories = () => {
            axiosInstance
                .get("/products/categories")
                .then((response) => {
                    console.log("Categories:", response.data);
                    categories.value = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                    categories.value = [{ id: "", name: "Error loading categories" }];
                });
        };
        const fetchProducts = () => {
            if (selectedCategory.value) {
                axiosInstance
                    .get(`/products/category/${selectedCategory.value}`)
                    .then((response) => {
                        list.value = response.data.products;
                    })
                    .catch((error) => {
                        console.error("Error fetching products:", error);
                        // products.value = [];
                    });
            }
        };
        onMounted(async () => {
            try {
                const response = await axiosInstance.get("/products");
                list.value = response.data.products;
            } catch (error) {
                console.error(error);
            }
            fetchCategories();
        });
        watch(selectedCategory, () => {
            fetchProducts();
        });

        return {
            list,
            item_detail,
            categories,
            selectedCategory,
            fetchProducts,
        };
    },
};
</script>
  
<style scoped>
.mb-4 {
    margin-bottom: 1.5rem;
}

/* ... your existing styles ... */

@media (max-width: 768px) {
    .row.justify-content-center {
        justify-content: flex-start;
        /* Adjust alignment for small screens */
    }
}

@media screen and (min-width: 1200px) and (max-width: 1500px) {
    div#landing-cards {
        width: 25%;
    }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
    div#landing-cards {
        width: 33%;
    }

    div#category-btns {
        flex-wrap: wrap;
    }

    div#category-btns button {
        margin-top: 10px;
    }
}

@media screen and (max-width: 991px) {
    div#landing-cards {
        width: 49% !important;
    }
}

@media screen and (max-width: 767px) {
    div#category-btns {
        flex-wrap: wrap;
    }

    div#category-btns button {
        margin-top: 10px;
    }
}

@media screen and (max-width: 576px) {
    div#landing-cards {
        width: 90% !important;
        margin: auto;
    }
}

.card {
    cursor: pointer;
}

div#landing-cards {
    width: 25%;
}
</style>
   -->