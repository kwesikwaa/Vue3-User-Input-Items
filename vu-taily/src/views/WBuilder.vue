<template>
    <div class=" w-11/12 md:w-9/12 m-auto">
        <Ticker @emitedit="whichone('edit')"/>
        <WBHeader :headtext="here" class=" mb-2"/>
        <div class=" flex justify-center">
            <button  @click="whichone('gallery')" class="  text-black">GALLERY</button>
            <button @click="whichone('about')" class="  p-2 text-black">ABOUT</button>
            <button @click="whichone('edit')" class="  p-2 text-black">EDIT</button>
        </div>
        <Gallerywidget v-show="gallery" :imagelist="imagelist" />
        <Aboutpage v-show="about"/> 
        <Editpage v-if="edit" @donesaving="whichone('gallery')"/>  
        <FooterWidget :footermessage="footmsg"/>
    </div>
    
</template>

<script setup>
    import WBHeader from '../components/WBHeader.vue'
    import Gallerywidget from '../components/gallerywidget.vue'
    import FooterWidget from '../components/footerwidget.vue'
    import Aboutpage from '../components/aboutpage.vue'
    import Ticker from '../components/ticker.vue'
    import { useBuilderStore } from '../stores/builder'
    import { ref } from 'vue';
    import Editpage from '../components/editpage.vue'
    import { storeToRefs } from 'pinia';

    

    const store = useBuilderStore()
    const here = storeToRefs(store).header;
    const footmsg = storeToRefs(store).footermessage;

    let about = ref(false);
    let edit = ref(false)
    let gallery = ref(true)

    let imagelist = storeToRefs(store).imagesupload

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