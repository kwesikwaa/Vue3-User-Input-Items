<template>
    <div class="p-1">
        <div class="container bg-gray-800 min-w-min rounded-md">
            <div v-if="hasHeader" class="container  bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                <h1 class=" p-4">BLACKSTAR ARTISTS</h1>
            </div>
            <div class="container p-4">
                <div class="container p-2 gap-1 grid grid-cols-3 bg-gray-900 border border-gray-600">
                    <div v-for="item in props.ximages" :key="item" class="container w-full rounded-sm overflow-hidden text-white">
                        <img class="w-full object-fill object-center" :src='item' alt="frog">
                    </div>
                </div>
                <div v-if="hasHeader" class="container pt-3 flex space-x-2 justify-center text-white">
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">Previous</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">1</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">2</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">3</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">4</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">5</button>
                    <button class=" px-2 bg-gray-600 ">....</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">100</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const hasHeader = true;
    const items = ref([1,2,3,4,5,3])

    let props = defineProps(['ximages'])

</script>