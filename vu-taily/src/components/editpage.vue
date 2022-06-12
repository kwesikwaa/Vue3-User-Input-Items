<template>
    <button @click="save"  class="w-full bg-blue-600 hover:bg-blue-500 rounded-md py-2 text-white my-2">SAVE</button>
    <Uploaddetails @spittest="titleimit" widgetTitle="Website Title" placeholder="title of website goes here" :input="sitetitle"/>
    <Uploaddetails @spittest="aboutimit" :isTitle="false" widgetTitle="About Details" placeholder="Input what goes on the about page here" :input="aboutdetails"/>
    <Uploaddetails @spittest="footerimit" widgetTitle="Bottom Footer Message" placeholder="eg (c) 2022 mysitename " :input="footertins"/>

    <input v-show="false" @change="doit" type="file" ref="pix" multiple=true accept="image/*">
    <button @click="pix.click()" class=" w-full h-14 bg-red-600 hover:bg-red-500 rounded-md py-1 px-3 text-white">UPLOAD IMAGES</button>

    <div class="grid grid-cols-2 gap-0.5 md:grid-cols-3">
        <transition-group tag="" name="list" >
            <div class="w-full" v-for="pic in imgs" key="pic">
                <Preview  
                :imgsr="pic.image" :isProfile="isprofile" 
                @closed="a"    
                :caption="pic.title"
                @emitcontent="captionreceive"      
            />
            </div>
        </transition-group>
    </div>
    <button @click="save" class="w-full bg-blue-600 hover:bg-blue-500 rounded-md py-2 text-white my-2">SAVE</button>

</template>

<script setup>
    import Uploaddetails from './uploaddetails.vue';
    import Preview from './preview.vue';
    import {onBeforeMount, onMounted, ref} from 'vue'
    import { useBuilderStore } from '../stores/builder';
    import { storeToRefs } from 'pinia';
    
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
    
    let imgs = storeToRefs(store).imagesupload
    let tempimagesbasket = ref([])
    
    function captionreceive(val){
        tempimagesbasket.value.push(val)
    }

    onBeforeMount(()=>{
        sitetitle.value = store.header
        aboutdetails.value = store.about
        footertins.value = store.footermessage
    })

    function save(){
        console.log(sitetitle.value)
        // console.log(sitetitle.value.replace(/\s+/g,''))

        console.log(sitetitle.value.trim().length)
        if(sitetitle.value.trim().length > 0 && footertins.value.trim().length > 0 && aboutdetails.value.trim().length > 0){ 
            store.save(sitetitle.value,aboutdetails.value,footertins.value,tempimagesbasket.value)
            emits('donesaving')
        }
        else{
            console.log('none')
        }
        
    }

    function savetolocalstorage(){
        
    }
    function loadfromlocalstorage(){}

    function a(b){
        for(var i=0; i< imgs.value.length; i++){
            if(imgs.value[i]==b){
                imgs.value.splice(i,1)
                break
            }
        }  
        
    }
    function doit(e){
        var y = e.target.files
        for(var i=0; i<y.length;i++){
            imgs.value.push({title:'',image:URL.createObjectURL(y[i])})
           
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