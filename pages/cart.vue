<script lang="ts" setup>
import type { Products } from '~/types/products';
import { ref, onMounted, computed } from 'vue';

definePageMeta({
        middleware: ["user-access"]
    }); 

const products = ref<Products[]>([]);

onMounted(() => {
  let localStorageData = localStorage.getItem("products");
  if (localStorageData) {
    products.value = JSON.parse(localStorageData);
  }
});

const removeCart = (id: number) => {
  products.value = products.value.filter((item) => item.id !== id);
  localStorage.setItem("products", JSON.stringify(products.value));
};

const groupedProducts = computed(() => {
  const grouped = new Map<number, Products>();
  products.value.forEach((product) => {
    if (grouped.has(product.id)) {
      // Increment the quantity if the book is already in the map
      grouped.get(product.id)!.quantity++;
    } else {
      // Add the book to the map with quantity 1
      grouped.set(product.id, { ...product, quantity: 1 });
    }
  });
  return Array.from(grouped.values());
});

const totalPrice = computed(() => {
  return products.value.reduce((total, product) => total + (product.quantity || 1), 0);
});
</script>

<template>
  <section>
    <div class="container">
      <div class="py-10 flex gap-6">
        <div class="w-[70%]">
          <div class="flex justify-between items-center pb-7 border-b border-gray-300 mb-6">
            <h1 class="text-3xl font-medium">Keranjang Buku</h1>
          </div>
          <div v-if="groupedProducts.length > 0" class="flex flex-col gap-6">
            <template v-for="(item, index) in groupedProducts" :key="index">
              <CardsCardCart :product="item" @removeCart="removeCart" />
            </template>
          </div>
          <div v-else>
            <h5 class="text-xl font-light text-center">Keranjang Kosong</h5>
          </div>
        </div>
        <div class="w-[30%] bg-white shadow-xl h-max p-6">
          <h3 class="text-xl font-medium mb-6">Total Peminjaman</h3>
          <div class="flex flex-col gap-3 border-b border-gray-300 pb-4">
            <div v-if="groupedProducts.length > 0">
              <div v-for="(item, index) in groupedProducts" :key="index" class="flex gap-4 items-center">
                <span class="text-limit limit-1 text-sm">{{ item.name }} ({{ item.quantity }})</span>
              </div>
            </div>
            <div v-else>
              <p class="text-sm text-center font-light">Tidak ada buku yang di pinjam</p>
            </div>
          </div>
          <div class="pt-4 flex items-center justify-between mb-6">
            <span class="text-base">Total</span>
            <span class="text-base font-bold">{{ totalPrice }} Buku</span>
          </div>
          <button class="bg-blue-600 text-white text-base font-bold w-full py-2 rounded-lg">Pinjam</button>
        </div>
      </div>
    </div>
  </section>
</template>
