<template>
    <div class="bg-black">
        <div class=" w-11/12 md:w-9/12 m-auto text-white">
            <Ticker @emitedit="whichone('edit')"/>
            <WBHeader :headtext="here" class=" mb-2"/>
            <div class=" flex justify-center">
                <button  @click="whichone('gallery')" class="  ">GALLERY</button>
                <button @click="whichone('about')" class="  p-2 ">ABOUT</button>
                <!-- <button @click="whichone('edit')" class="  p-2 ">EDIT</button> -->
            </div>
            <Gallerywidget v-show="gallery" @emitthis="openthisimage" :imagelist="imagelist" />
            <Openimage v-show="!closeimage" @closethisimage="closeimagefxn" :feedsource="feedsource" />
            <Aboutpage v-show="about"/> 
            <Editpage v-if="edit" @donesaving="whichone('gallery')"/>  
            <FooterWidget :footermessage="footmsg"/>
        </div>
    </div>
    
</template>

<script setup>
    import WBHeader from '../components/WBHeader.vue'
    import Gallerywidget from '../components/gallerywidget.vue'
    import FooterWidget from '../components/footerwidget.vue'
    import Aboutpage from '../components/aboutpage.vue'
    import Ticker from '../components/ticker.vue'
    import {useBuilderStore} from '../stores/builder'
    import {ref, onBeforeMount} from 'vue';
    import Editpage from '../components/editpage.vue'
    import {storeToRefs} from 'pinia';
    import Openimage from '../components/openimage.vue'
    import { computed } from '@vue/reactivity'

    const store = useBuilderStore()
    const here = storeToRefs(store).header;
    const footmsg = storeToRefs(store).footermessage;

    let about = ref(false)
    let edit = ref(false)
    let gallery = ref(true)
    let closeimage = ref(true)

    let feedsource = ref('')
    let imagelist = ref([])
    function closeimagefxn(val){
        closeimage.value = val
    }
    
    onBeforeMount(()=>{
        if(localStorage.getItem("saved")){
            store.setupdate()
            imagelist.value = JSON.parse(localStorage.getItem("saved")).images
        }
        else{
            // let imagelis = storeToRefs(store).imagesupload
            // const imagelist = computed(()=>{ 
                console.log('did i')
                imagelist.value = []
            //what i learnt n struggled with was transforming the list...
            // found out that [...list].reverse() works instead or list.reverse()
            // return [...imagelis.value].reverse()})
        }
    })

    
    // let imagelist = storeToRefs(store).getimagelist
    

    function openthisimage(val){
        closeimage.value = false;
        console.log(val)
        feedsource.value = val
    }

    function whichone(which){
        switch (which) {
            case 'about':
                about.value = true
                edit.value= false
                gallery.value = false
                break;
            case 'gallery':
                
                about.value = false
                edit.value = false
                gallery.value = true
                break;
            case 'edit':
                edit.value = true
                about.value = false
                gallery.value = false
                break;
        }
    }
</script>