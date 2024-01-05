<template>
    <div v-if="props.isProfile" class="p-1.5 ">
        <div class="container relative w-44 bg-gray-800 rounded-md">
            <div class="p-2 flex-col space-y-2 justify-center">
                <div class="container w-full h-44 bg-gray-600">
                    <img v-if="imagesource" class="w-full h-full object-contain object-center" :src="imagesource" alt="up">
                    <div v-else class=" h-full flex items-center justify-center text-white">
                        <p>Should be square and have a min of 150gh</p> 
                    </div>
                </div>
                <div class="flex space-x-2 justify-center">
                    <div>
                        <button :disabled="props.disable" @click="picker.click()" class="rounded-sm bg-red-600 flex-grow text-white px-2">UPLOAD</button>
                        <input v-show="show" @change="picdropped" type="file" ref="picker" accept="image/*">
                    </div>
                    <button :disabled="props.disable" v-show="props.isProfile" @click="emitcropper" class="rounded-sm bg-red-600 flex-grow text-white px-2">CROP</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="p-1.5">
        <div class="container relative w-full bg-gray-800 rounded-md">
            <div class="p-2 flex-col space-y-2 justify-center">
                <div class="container w-full h-44 lg:h-52 bg-gray-600">
                    <img class="w-full h-full object-contain object-center" :src="imagesource" alt="up">
                </div>
                <div class="flex space-x-2 justify-center">
                    <textarea v-model="caption" class="p-1 w-full h-24 bg-gray-700 text-white text-sm" placeholder="Title [Optional]" cols="30" rows="10" style="resize:none"></textarea>
                </div>
            </div>
            <button @click="emitclose" class="absolute text-white top-2.5 right-2.5 bg-gray-800 hover:bg-gray-700 px-2 rounded-full text-center" ><div class=" pb-1">x</div></button>
            
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onBeforeUnmount, onMounted, onUpdated, ref} from 'vue';
    import {useAdminStore} from '../stores/counter'
    import {useBuilderStore} from '../stores/builder';

    interface props{
        imgsr: any;
        isProfile: boolean
        disable?: boolean
        caption?: string
    }

    const store = useAdminStore()
    const store2 = useBuilderStore()
    const props = withDefaults(defineProps<props>(),{disable:false,isProfile: false, imgsr:'', caption:''});
    const emits = defineEmits(["closed",'opencropper','emitcontent'])
    
    let imagesource = ref('')
    let temp = ref('')
    let picker = ref();

    let caption = ref('')

    let tempsave = ref({})

    function emitcaption(){
        emits('emitcontent',tempsave.value)
    }
    
    const show = false;

    onMounted( ()=>{
        
        imagesource.value = props.imgsr
        if(!props.isProfile){
            caption.value = props.caption
        }
    }
    )
    onBeforeUnmount(()=>{
        tempsave.value = {title: caption.value, image: imagesource.value}
        emitcaption()
    })
    onUpdated(()=>{
        if(props.isProfile){
            if(store.croppedimage){
                imagesource.value = store.croppedimage
            }
        }
        else{
            
        }
    })
    

    function emitcropper(){
        if(imagesource.value){
            emits("opencropper",temp.value)
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
            imagesource.value = URL.createObjectURL(x)
            temp.value = URL.createObjectURL(x)
            store.clear()
            // come later for firstevent trigger
            emitcropper()
        } catch (error) {
            
        }

            
    }
</script>