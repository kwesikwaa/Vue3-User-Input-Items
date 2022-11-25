<template>
    <button @click="save"  class="w-full bg-blue-600 hover:bg-blue-500 rounded-md py-2 text-white my-2">SAVE</button>
    <Uploaddetails @spittest="titleimit" widgetTitle="Website Title" placeholder="title of website goes here" :input="sitetitle"/>
    <Uploaddetails @spittest="aboutimit" :isTitle="false" widgetTitle="About Details" placeholder="Input what goes on the about page here" :input="aboutdetails"/>
    <Uploaddetails @spittest="footerimit" widgetTitle="Bottom Footer Message" placeholder="eg (c) 2022 mysitename " :input="footertins"/>

    <input v-show="false" @change="doit" type="file" ref="pix" multiple=true accept="image/*">
    <button @click="pix.click()" class=" w-full h-14 bg-red-600 hover:bg-red-500 rounded-md py-1 px-3 text-white">UPLOAD IMAGES</button>

    <!-- TRYING OUT THE AUTO-ANIMATE LIBRARY -->
    <div class="grid grid-cols-2 gap-0.5 md:grid-cols-3" ref="parent">
        <!-- <transition-group tag="" name="list" > -->
            <div class="w-full" v-for="pic in imgs" key="pic.image">
                <Preview  
                :imgsr="pic.image" :isProfile="isprofile" 
                @closed="a"    
                :caption="pic.title"
                @emitcontent="captionreceive"      
            />
            </div>
        <!-- </transition-group> -->
    </div>
    <button @click="save" class="w-full bg-blue-600 hover:bg-blue-500 rounded-md py-2 text-white my-2">SAVE</button>

</template>

<script setup>
    import Uploaddetails from './uploaddetails.vue';
    import Preview from './preview.vue';
    import {onBeforeMount, ref} from 'vue'
    import { useBuilderStore } from '../stores/builder';
    import { storeToRefs } from 'pinia';
    import {useAutoAnimate} from '@formkit/auto-animate/vue'
    
    const [parent] = useAutoAnimate()

    const store = useBuilderStore()

    let isprofile = ref(false)

    let pix = ref(null)    

    let sitetitle = ref('')
    let aboutdetails = ref('')
    let footertins = ref('')

    const emits = defineEmits(['donesaving'])

    
    function titleimit(val){
        sitetitle.value = val
    }
    function aboutimit(val){
        aboutdetails.value = val
    }
    function footerimit(val){
        footertins.value = val
    }
    
    // let imgs = storeToRefs(store).imagesupload
    const imgs = ref([])

    let tempimagesbasket = ref([])
    
    function captionreceive(val){
        tempimagesbasket.value.push(val)
    }

    onBeforeMount(()=>{
        sitetitle.value = store.header
        aboutdetails.value = store.about
        footertins.value = store.footermessage
        imgs.value = JSON.parse(localStorage.getItem('saved').images)
        console.log('yh we do am')
        // console.log(imgs.value)
    })

    function save(){
        if(sitetitle.value.trim().length > 0 && footertins.value.trim().length > 0 && aboutdetails.value.trim().length > 0){ 
            store.save(sitetitle.value,aboutdetails.value,footertins.value,imgs.value)
            emits('donesaving')
        }
        else{
            console.log('none')
        }
        
    }

    function a(b){
        console.log('in a')
        console.log(`before filter ${imgs.value.length}`)
        imgs.value = imgs.value.filter(img=> img.image!==b)
        tempimagesbasket.value = tempimagesbasket.value.filter(cap=> cap !==b)
        console.log(tempimagesbasket.value)
        console.log(`after filter ${imgs.value.length}`)
        // for(var i=0; i< imgs.value.length; i++){
        //     console.log('in loop')
        //     if(imgs.value[i].image==b){
        //         console.log('before sxlice')
        //         imgs.value.splice(i,1)
        //         console.log('after slice')
        //         break
        //     }
        // }  
        
    }

    function doit(e){
        const y = e.target.files
        for(let i=0; i<y.length;i++){
            const reader = new FileReader()
            // reader.readAsText(y[i])
            reader.readAsDataURL(y[i])
            reader.onload = (e) => {
                imgs.value.push({title:'',image: reader.result})
            }
        }
    }
</script>

<style>
    .list-enter-active{transition: all 0.3s ease-in-out;}
    /* position absolute needed to work  */
    .list-leave-active{transition: all 0.3s ease-in-out; position: absolute;}
    .list-move{transition: all 0.3s ease;}
    .list-enter-from,.list-leave-to{opacity: 0; transform:translateY(-30px);}
    .list-enter-to,.list-leave-from{opacity: 1; transform:translateY(0px);}
</style>