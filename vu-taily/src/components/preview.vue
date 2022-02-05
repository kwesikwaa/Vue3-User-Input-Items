<template>
    <div class="container relative w-44 bg-gray-800 rounded-md">
        <div class="p-2 flex-col space-y-2 justify-center">
            <div class="container w-40 h-40 bg-gray-600">
                <img class="w-full h-full object-contain" :src="props.imgsr" alt="up">
            </div>
            <div class="flex space-x-2 justify-center">
                <button v-if="props.isProfile" @click="picker.click()" class="rounded-sm bg-red-600 flex-grow text-white px-2">UPLOAD</button>
                <textarea v-else class="w-full h-14 bg-gray-700 text-white text-sm" placeholder="Caption" cols="30" rows="10" style="resize:none"></textarea>
                <button v-show="props.isProfile" @click="" class="rounded-sm bg-red-600 flex-grow text-white px-2">CROP</button>
            </div>
        </div>
        <button @click="emi" class="absolute text-white bg-red-600 top-1.5 right-1.5 hover:bg-red-500 px-2 rounded-full text-center" >x</button>
        <!-- <input v-show="show" @change="emis" type="file" ref="picker" accept="image/*"> -->
    </div>
    
</template>

<script setup lang="ts">
    import {ref } from 'vue';
    // Two final pieces to make this 100%
    // implement the crop feature
    // fix the profile mode upload button
    interface props{
        imgsr: string;
        isProfile: boolean
    }

    const props = withDefaults(defineProps<props>(),{isProfile: false, imgsr:''});
    const emits = defineEmits(["closed"])
    
    // let imgsource = ref("");
    let picker = ref(null);
    const show = false;

    function emi(){emits("closed",props.imgsr)}
    function picklocal(e){
            var x = e.target.files[0]
            props.imgsr = URL.createObjectURL(x)

    }

    // function previewfxn(e){
    //     var y = e.target.files[0]
    //     console.log(y)
    //     try and
    //     // imgsource.value = URL.createObjectURL(y)
    //     props.imgsr = URL.createObjectURL(y)
    // }
</script>