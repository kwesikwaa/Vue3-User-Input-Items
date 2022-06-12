<template>
    <div class=" flex justify-center w-full">
        <div class="container  min-w-min rounded-md ">
            <div v-if="props.hasHeader" class="container  bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                <h1 class=" p-4 text-2xl">BLACKSTAR ARTISTS</h1>
            </div>
            <div class="container">
                <div>
                    <div v-if="updated" class="container gap-0.5 grid grid-cols-2 md:grid-cols-3">
                        <div v-for="item in props.imagelist" :key="item.image" class="container w-full rounded-md overflow-hidden text-white">
                            <div class=" w-full h-full relative">
                                <img  class="w-full object-fill object-center" :src=item.image :alt="item.title">
                                <div class="absolute bg-black opacity-0 hover:opacity-70 duration-75 p-2 text-center text-white flex items-center justify-center w-full h-full inset-0">{{item.title}} </div>
                            </div>
                            
                        </div>
                    </div>
                    <div v-else class="container gap-0.5 grid grid-cols-2 md:grid-cols-3">
                        <div v-for="xx in 6" class="container w-full rounded-md overflow-hidden text-white">
                            <div class=" w-full h-full relative">
                                <img  class="w-full object-fill object-center" src='../assets/frg.jpg' alt="froggydefault">
                                <div class="absolute bg-black opacity-0 hover:opacity-70 duration-500 text-white text-center p-2 flex items-center justify-center w-full h-full inset-0">This be the caption for this die you know </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="props.hasHeader" class="container pt-3 pb-2 flex space-x-1 justify-center text-white">
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">&lt&lt</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">1</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">2</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">3</button>
                    <button class=" px-2 bg-gray-600 " disabled>...</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">100</button>
                    <button class=" px-2 bg-gray-600 hover:bg-gray-800">>></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useBuilderStore } from '../stores/builder';
    import { storeToRefs } from 'pinia';

    const {updated} = storeToRefs(useBuilderStore())
    let props = defineProps(['imagelist','hasHeader'])


   
    
    let cc = 'lg:grid-cols-4'
</script>