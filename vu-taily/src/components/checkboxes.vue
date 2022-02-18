<template>
    <div class="p-1">
        <div class="container bg-gray-800 min-w-min rounded-md">
            <div class="container  bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                <h1 class=" p-4">{{props.widgetTitle}}</h1>
            </div>
            <div class="container p-4">
                <div class="container p-2 grid grid-cols-3 bg-gray-900 border border-gray-600 rounded-sm text-white">
                    <div v-for="nm in props.choicesdata" class="text-white text-sm pt-1.5">
                        <input class="bg-gray-900 p-2 hover:bg-red-500" v-model="chosen" :value="nm" type="checkbox">
                        <label class=" px-2 " :for="nm">{{nm}}</label>
                        <!-- <span class=" px-2">{{nm}}</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    
    <transition-group tag="p" name="list" >
        <!-- does work with transform until you make it inline-block -->
        <span class=" px-2 inline-block bg-green-400 rounded-lg text-black pb-1 mx-1" v-for="ss in chosen" :key="ss">{{ss}}</span>
    </transition-group>
    
    <br>
</template>
<script setup lang="ts">
    import { ref } from 'vue';

    interface props{
        widgetTitle?: string,
        choicesdata?: string[]
    }
    
    let chosen = ref([])

    // function picked(x){chosen.value.push(x)}

    const props = withDefaults(defineProps<props>(),{widgetTitle:'WIDGET TITLE',choicesdata:null})

</script>
<style scoped>
    .list-enter-active{transition: all 0.3s ease-in-out;}
    /* position absolute needed to work  */
    .list-leave-active{transition: all 0.3s ease-in-out; position: absolute;}
    .list-move{transition: all 0.3s ease;}
    .list-enter-from,.list-leave-to{opacity: 0; transform:translateY(-30px);}
    .list-enter-to,.list-leave-from{opacity: 1; transform:translateY(0px);}

    
</style>