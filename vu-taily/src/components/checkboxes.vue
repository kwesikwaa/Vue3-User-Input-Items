<template>
    <div class="w-screen px-1.5">
        <div class="py-1  w-full">
            <div class="w-full bg-gray-800 min-w-min rounded-md">
                <div class="w-full  bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                    <h1 class=" p-4">{{props.widgetTitle}}</h1>
                </div>
                <div class="w-full p-4">
                    <div class="w-full p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 bg-gray-900 border border-gray-600 rounded-sm text-white">
                        <div v-for="nm in props.choicesdata" class="text-white text-sm pt-1.5">
                            <input class="bg-gray-900 p-2 hover:bg-red-500" v-model="chosen" :value="nm" type="checkbox">
                            <label class=" px-2 " :for="nm">{{nm}}</label>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- SELECTED OPTIONS DOWN HERE -->
        <div class=" w-full px-4">
            <div>
                <transition-group tag="p" name="list" >
                    <!-- does work with transform until you make it inline-block -->
                    <span class=" px-2.5 pb-0.5 my-0.5 mx-0.5 inline-block bg-gray-800 rounded-lg text-white " v-for="ss in chosen" :key="ss">{{ss}}</span>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';

    let chosen = ref([])

    // function picked(x){chosen.value.push(x)}

    const props = defineProps({
        widgetTitle:{type: String, default: 'WIDGET TITLE'},
        choicesdata:{type: String['']}
    })

</script>
<style scoped>
    .list-enter-active{transition: all 0.3s ease-in-out;}
    /* position absolute needed to work  */
    .list-leave-active{transition: all 0.3s ease-in-out; position: absolute;}
    .list-move{transition: all 0.3s ease;}
    .list-enter-from,.list-leave-to{opacity: 0; transform:translateY(-30px);}
    .list-enter-to,.list-leave-from{opacity: 1; transform:translateY(0px);}

    
</style>