<template>
    <div class="container relative w-44 bg-gray-800 rounded-md">
        <div class="p-2 flex-col space-y-2 justify-center">
            <div class="container w-40 h-40 bg-gray-600">
                <img class="w-full h-full object-contain" :src="imagesource" alt="up">
            </div>
            <div class="flex space-x-2 justify-center">
                <div v-if="props.isProfile">
                    <button :disabled="props.disable" @click="picker.click()" class="rounded-sm bg-red-600 flex-grow text-white px-2">UPLOAD</button>
                    <input v-show="show" @change="picdropped" type="file" ref="picker" accept="image/*">
                </div>
                <textarea v-else class="w-full h-14 bg-gray-700 text-white text-sm" placeholder="Caption" cols="30" rows="10" style="resize:none"></textarea>
                <button :disabled="props.disable" v-show="props.isProfile" @click="emitcropper" class="rounded-sm bg-red-600 flex-grow text-white px-2">CROP</button>
            </div>
        </div>
        <button v-if="!props.isProfile" @click="emitclose" class="absolute text-white bg-red-600 top-1.5 right-1.5 hover:bg-red-500 px-2 rounded-full text-center" ><div class=" pb-1">x</div></button>
        
    </div>
    
</template>

<script setup lang="ts">
    import {onMounted, onUpdated, ref, watch} from 'vue';
    import {useAdminStore} from '../stores/counter'

    interface props{
        imgsr: any;
        isProfile: boolean
        disable?: boolean
    }

    const store = useAdminStore()
    const props = withDefaults(defineProps<props>(),{disable:false,isProfile: false, imgsr:''});
    const emits = defineEmits(["closed",'opencropper'])
    
    let imagesource = ref('')
    let temp = ref('')
    let picker = ref(null);
    
    const show = false;


    onMounted( ()=>{
        if(props.isProfile){
            imagesource.value = temp.value
        }
        else{imagesource.value = props.imgsr}
    }
    )
    onUpdated(()=>{
        if(props.isProfile){
            if(store.croppedimage){
                imagesource.value = store.croppedimage
            }
        }
    })
    

    function emitcropper(){
        if(imagesource.value){
            emits("opencropper",temp.value)
            console.log('opened croper')
        }
    }
    
    function emitclose(){
        if(props.isProfile){
            imagesource.value =''
        }
        else{
            emits("closed",props.imgsr)
        }
    }
    function picdropped(e){
        try {
            var x = e.target.files[0]
            console.log(x)
            imagesource.value = URL.createObjectURL(x)
            temp.value = URL.createObjectURL(x)
            store.clear()
            console.log(`ast ${temp.value}`)
        } catch (error) {
            
        }

            
    }
</script>