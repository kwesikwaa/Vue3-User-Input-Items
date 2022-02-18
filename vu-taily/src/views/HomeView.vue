<template>
    <Postsidedetials/>
    <Commentwidget/>
    <Uploaddetails widgetTitle="ArtWork Title" placeholder="Title"/>
    <Uploaddetails widgetTitle="Description" placeholder="Long Description" :isTitle='des'/>
    <Checkboxes widgetTitle="Mediums" :choicesdata="mediums"/>
    <Checkboxes widgetTitle="Softwares" :choicesdata="softwares"/>
    <input v-show="false" @change="doit" type="file" ref="pix" :multiple="!izy" accept="image/*">
    <label for="prifle">Profile??</label>
     loaded items : {{imgs.length}}
    <div class="flex space-x-1">
        <button @click="pix.click()" class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">UPLOAD</button>
        <button @click="tocache" class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">TO CACHE</button>
        <button @click="fromcache" class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">FROM CACHE</button>
        <button @click="clearcache" class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">CLEAR CACHE</button>
    </div>
    <!-- <Preview :imgsr="hey" :isProfile="izy"/> -->
    <br>
    <div class="grid grid-cols-3 gap-3">
        <Preview v-for="pic in imgs" 
            :imgsr="pic" :isProfile="izy" 
            @closed="a"          
        />
        
    </div>
</template>

<script setup>
    import Preview from "../components/preview.vue"
    import {computed, ref} from 'vue'
    import Uploaddetails from "../components/uploaddetails.vue";
    import Checkboxes from "../components/checkboxes.vue";
    import Postsidedetials from "../components/postsidedetials.vue";
    import Commentwidget from "../components/commentwidget.vue";
    
    //for dev purpose to toggle the isprofile prop
    //rename vars when everythings comes together
    let izy = false
    let des = false
    let pix = ref(null)
    let hey = ref('')
    let imgs = ref([])
    let softwares = ['Houdini','Maya','3DS Max','Keyshot','Modo','GIMP','Adobe Photoshop' ,'Revit','Sketchup','AutoCAD','Figma','Toon Boom','Motionbuilder','Iclone','DazStudio','Clarisse','Topogun','3D Coat','Marmoset Toolbag','Zbrush','Unity','Unreal Engine', 'Cascadeur', 'Marvelous Designer','Cinema4D','Blender','Blackmagic Fusion','Nuke','Substance Painter','Substance Designer','Substance Sampler','Quixel Mixer','Quixel Megascans','After Effects','Adobe Premier','Davinci Resolve','Lightwave']
    let mediums = ['2D Animation','3D Animation','Modeling','VFX', 'Graphics Design','Video Editing','Film','Sketch']

    //pulling from local machine seem to randomise name on every upload
    //making it impossible to load from localstorage
    //use supabase on next try.. sometime later not now
    function tocache(){
        console.log('saving')
        localStorage.setItem("uploads",JSON.stringify(imgs.value))
        console.log('done saving')
    }
    function clearcache(){
        imgs.value = []
        localStorage.removeItem("uploads")
    }
    function fromcache(){
        if(localStorage.getItem("uploads")){
            console.log('inside if')
            imgs.value = JSON.parse(localStorage.getItem("uploads"))
            console.log(imgs.value)
        }
    }
    function a(b){
        if(!izy){
            for(var i=0; i< imgs.value.length; i++){
                if(imgs.value[i]==b){
                    imgs.value.splice(i,1)
                    break
                }
            }  
        }
        else{imgs.value[0] = ''}
    }
   

    function doit(e){
        var y = e.target.files
        for(var i=0; i<y.length;i++){
            imgs.value.push(URL.createObjectURL(y[i]))
            // console.log(imgs.value[i])
        }
    }
</script>