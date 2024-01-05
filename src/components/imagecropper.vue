<template>
    <div class="  relative w-screen h-screen flex justify-center ">
        <div class="absolute -top-full w-80 bg-gray-800 rounded-md opacity-100">
            <div class=" p-2 flex-col space-y-2 justify-center">
                <div class="w-full h-80 bg-gray-600">
                    <img class="w-full h-full object-contain" ref="imagetocrop" :src="props.imagetocrop" alt="up">
                </div>
                <div class="flex space-x-2 justify-center">
                    <button @click="emitdonecropin" class=" py-1.5 rounded-sm bg-red-600 flex-grow text-white px-2">CROP</button>
                </div>
            </div>
            <button @click="emi" class="absolute text-white top-2.5 right-2.5 bg-gray-800 hover:bg-gray-600 px-2 rounded-full text-center" ><div class=" pb-1">x</div></button>
        </div>
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
        
        cropper = new Cropper(imagetocrop.value,{
            center:true,
            scalable: false,
            aspectRatio: 1,
            minCropBoxWidth: 150,
            minCropBoxHeight: 150,
            
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
                        //to be sent to the seerver
                        testa.value = formdata.get('croppedimage')
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
        store.savobject(testa.value)
        emits("cropdonenclose")}

    
    function picklocal(e){
            var x = e.target.files[0]
            props.imagetocrop = URL.createObjectURL(x)

    }
</script>

<style>
   /* .here{
       z-index: 2;
   } */
</style>