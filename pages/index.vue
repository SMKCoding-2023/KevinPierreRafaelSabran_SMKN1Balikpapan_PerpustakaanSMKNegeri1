<!-- <script lang="ts" setup>
    import { products } from '~/composables/constants/products';
    
    const selectedCategory = ref("");
    
    const allProducts = computed(() => {
            if (selectedCategory.value) {
                return products.filter((item) => item.category === selectedCategory.value);
        }
        return products;
    });
</script> -->

<script lang="ts" setup>
    import { useProductsStore } from "~/stores/products";

    const productStore = useProductsStore();
    const allProducts = ref([]);

    productStore.getAllProducts().then(() => {
    allProducts.value = productStore.products;
    });

    const selectedCategory = ref("");
</script>

<template>
    <section>
        <div class="container">
            <div class="py-5 text-center">
                <div class="hero mb-8">
                    <h1 class="font-bold text-3xl mb-2">Selamat Datang di Perpustakaan SMK Negeri 1 Balikpapan</h1>
                    <p class="text-lg font-light">Silahkan pilih buku yang ingin anda pinjam</p>
                </div>
                <div class="flex gap-6 flex-wrap mx-auto">
                    <template v-for="(item, index) in allProducts" :key="index">
                        <CardsCardProduct :product="item" class="w-[calc(100%/4-18px)]"/>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>