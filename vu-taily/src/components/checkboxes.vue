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
    <span v-for="ss in chosen">
    <transition name="yo">
        <span class=" px-2"> {{ss}} </span>
    </transition>
    </span>
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
    .yo-enter-active, .yo-leave-active{transition: all 5s ease;}
    .yo-enter-from{transform: translateY(-30px);}
    .yo-leave-to{transform: translateY(30px);}
</style>