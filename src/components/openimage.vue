<template>
    <div @click.self="closeimage" class="  fixed bg-black bg-opacity-75 inset-0 flex justify-center items-center ">
        <div class=" text-white p-2 rounded-md bg-black ">
            <div v-if="updated">
                <div>
                    <img :src="props.feedsource.image" :alt="props.image">
                </div>
                <div class=" mt-2">
                    {{props.feedsource.title}}
                </div>
            </div>
            <div v-else>
                <div>
                    <img src='../assets/frg.jpg' alt="default alt">
                </div>
                <div class=" mt-2">
                    All captions will go here
                </div>
            </div>            
        </div>
    </div>
</template>

<script setup>
    import { useBuilderStore } from '../stores/builder';
    
    import { storeToRefs } from 'pinia';

    const {updated} = storeToRefs(useBuilderStore())

    const emits = defineEmits(['closethisimage'])
    const props = defineProps(['feedsource'])

    function closeimage(){
        emits('closethisimage',true)
    }

</script>