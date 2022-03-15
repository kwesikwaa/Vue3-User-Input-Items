<template>
    <div class=" container relative w-96 bg-gray-800 rounded-md">
        <div class=" p-2 flex-col space-y-2 justify-center">
            <div class="container w-full h-96 bg-gray-600">
                <img class="w-full h-full object-contain" ref="imagetocrop" :src="props.imagetocrop" alt="up">
            </div>
            <div class="flex space-x-2 justify-center">
                <button @click="emitdonecropin" class=" py-1.5 rounded-sm bg-red-600 flex-grow text-white px-2">CROP</button>
            </div>
        </div>
        <button @click="emi" class="absolute text-white bg-red-600 top-1.5 right-1.5 hover:bg-red-500 px-2 rounded-full text-center" ><div class=" pb-1">x</div></button>
    </div>
    
</template>

<script setup lang="ts">
    import {ref, onMounted, onUnmounted, onBeforeMount} from 'vue';
    import { useAdminStore } from '../stores/counter';
    import Cropper from 'cropperjs';
  
    const store = useAdminStore()
    interface props{
        imagetocrop: string;
    }

    const props = withDefaults(defineProps<props>(),{imagetocrop:''});
    const emits = defineEmits(["closed","croppedimage","cropdonenclose"])
    
    let cropper;
    let imagetocrop = ref(null)
    let croppedimage = ref(null)
    let testa = ref(null)

    onMounted(()=>{
        console.log(imagetocrop.value)
        cropper = new Cropper(imagetocrop.value,{
            aspectRatio: 1,
            minCropBoxWidth: 200,
            minCropBoxHeight: 200,
            zoomable: false,
            background: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            crop:()=>{
                //determins save size
                const canvas = cropper.getCroppedCanvas({width:300,height:300,imageSmoothingQuality: 'high',})
                
                canvas.toBlob((blob)=>{
                        const formdata = new FormData()
                        formdata.append('croppedimage',blob,'avatar.jpeg')
                        croppedimage.value = URL.createObjectURL(blob)
                        testa = formdata.get('croppedimage')
                    },
                    )
                // croppedimage.value = canvas.toDataURL("image/jpeg")
            }
        })
    })

    onUnmounted(()=>{
        cropper.destroy();
        }
    )

    function emi(){emits("closed")}
    function emitdonecropin(){
        store.savecroppedimage(croppedimage.value);
        store.savobject(testa)
        console.log(`tell type first ${typeof(store.objectfile)}`)
        console.log(`this be store value ${store.croppedimage}`)
        console.log(`this be storeobject value ${store.objectfile}`)
        console.log(`tell type after assignment ${typeof(store.objectfile)}`)
        console.log(typeof(croppedimage.value))
        console.log(testa)
        console.log(testa.name)
        console.log(store.objectfile.name)
        console.log(typeof(testa))
        emits("cropdonenclose")}

    
    function picklocal(e){
            var x = e.target.files[0]
            props.imagetocrop = URL.createObjectURL(x)

    }
</script>