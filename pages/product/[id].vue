<script setup lang="ts">
import { ref } from 'vue';

const { baseUrl, apikey, secretKey } = useAppConfig();
const status = ref(false);
const message = ref('');
const products = ref([]);



const getFilterProduct = async (id: number) => {
  const { data, error } = await useFetch(`/rest/v1/books?id=eq.${id}&select=*`, {
    baseURL: baseUrl,
    method: 'GET',
    headers: {
      apikey: apikey,
      Authorization: `Bearer ${secretKey}`,
    },
  });

  if (error.value) {
    status.value = false;
    message.value = 'Get Filtered Product Failed !!!';
  } else if (data) {
    status.value = true;
    message.value = 'Get Filtered Product successfully';
    products.value = data.value;
    console.log(products.value);
  }
};
</script>

<template>
  <DetailProduct :product="products"/>
</template>
