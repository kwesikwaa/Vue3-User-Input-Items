<template>
    <Headwidget />
   

    <input v-show="false" @change="doit" type="file" ref="pix" :multiple="!izy" accept="image/*">
    <div class="flex space-x-1">
        <button @click="pix.click()" class=" bg-red-600 hover:bg-red-500 rounded-md py-1 px-3 text-white">UPLOAD</button>
        <button @click="tocache" class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-3 text-white">TO CACHE</button>
        <button @click="fromcache" class=" bg-red-600 hover:bg-red-500 rounded-md py-1 px-3 text-white">FROM CACHE</button>
        <button @click="clearcache" class=" bg-red-600 hover:bg-red-500 rounded-md py-1 px-3 text-white">CLEAR CACHE</button>
    </div>          
    <Preview :isProfile="true" @opencropper="opencropa" :imgsr="croppedimage" :disable="togglecropper"/>
    <br>
    <Imagecropper v-if="togglecropper"  :imagetocrop="imagetocrop" @closed="cropaclose" @cropdonenclose="cropdone"/>
    <br>


    <div class="grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-4">
        <transition-group tag="" name="list" >
            <div class="w-full" v-for="pic in imgs" key="pic">
                <Preview  
                :imgsr="pic" :isProfile="izy" 
                @closed="a"          
            />
            </div>
        </transition-group>
    </div>
</template>

<script setup>
    import Preview from "../components/preview.vue"
    import {computed, ref} from 'vue'
    import Uploaddetails from "../components/uploaddetails.vue";
    import Checkboxes from "../components/checkboxes.vue";
    import Postsidedetials from "../components/postsidedetials.vue";
    import Commentwidget from "../components/commentwidget.vue";
    import Gallerywidget from "../components/gallerywidget.vue";
    import Imagecropper from "../components/imagecropper.vue";
    import {useAdminStore}  from '../stores/counter'
    import Headwidget from "../components/headwidget.vue";

    const store = useAdminStore()

    //for dev purpose to toggle the isprofile prop
    //rename vars when everythings comes together
    let izy = false
    let des = false
    let pix = ref(null)
    let hey = ref('')
    let imgs = ref([])
    let tempimgs = ref([])

    let editmode = ref(false)
    let medtemp = ref('')
    // let mediums = ref([])
    let togglecropper = ref(false)
    let imagetocrop = ref('')
    let croppedimage = ref('')


    let username = ref('')
    let password = ref('')
    const testa = async ()=>{
        const x = await fetch('http://localhost:8000/users/me')
        console.log(x.json)
    }
    const formy = async (event)=>{
        const formdata = new FormData(event.target)
        const form = Object.fromEntries(formdata.entries())
        console.log(formdata)
        const url = 'http://localhost:8000/token'
        const fo = await fetch(url,{
            method: 'POST',
            mode: 'no-cors',
            // credentials: 'same-origin',
            
            // contentType: 'application/x-www-form-urlencoded',
            body: form,
        })
        console.log(`did it work ${fo}`)
       
        console.log(fo.statusText)
        console.log(fo)
        
        
    }

    let softwares = ['Houdini','Maya','3DS Max','Keyshot','Modo','GIMP','Adobe Photoshop' ,'Revit','Sketchup','AutoCAD','Figma','Toon Boom','Motionbuilder','Iclone','DazStudio','Clarisse','Topogun','3D Coat','Marmoset Toolbag','Zbrush','Unity','Unreal Engine', 'Cascadeur', 'Marvelous Designer','Cinema4D','Blender','Blackmagic Fusion','Nuke','Substance Painter','Substance Designer','Substance Sampler','Quixel Mixer','Quixel Megascans','After Effects','Adobe Premier','Davinci Resolve','Lightwave']
    let mediums = ['2D Animation','3D Animation','Modeling','VFX', 'Graphics Design','Video Editing','Film','Sketch']

    //pulling from local machine seem to randomise name on every upload
    //making it impossible to load from localstorage
    //use supabase on next try.. sometime later not now

    const editmodeswitch = ()=>{editmode.value = !editmode.value}
    function addtolist(which){
        if(which==='medium'){
            mediums.value = medtemp.value.split(',');
        }
        else if(which==='software'){

        }
        
    }
    function opencropa(payload){
        imagetocrop.value = payload
        togglecropper.value = true;
    }
    function cropaclose(){
        togglecropper.value =false;
    }
    function cropdone(){
        croppedimage.value = store.croppedimage
        togglecropper.value=false
    }

    function tocache(){
        const formdata = new FormData()
        imgs.value.forEach((e)=>{
            console.log(e)
            console.log(typeof e)
            formdata.append('saved',e)
        })
        console.log(formdata.values)
        console.log(formdata.get('saved'))
        localStorage.setItem("uploads",JSON.stringify(formdata))
        
        // testa.value = formdata.get('croppedimage')
    }
    function clearcache(){
        imgs.value = []
        tempimgs.value = []
        localStorage.removeItem("uploads")
    }
    function fromcache(){
        if(localStorage.getItem("uploads")){
            console.log('inside if')
            var y = JSON.parse(localStorage.getItem("uploads"))
            for(var x=0; x<y.length;x++){
                imgs.value.push(URL.createObjectURL(y[i]))
            }
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
        console.log(y)
        tempimgs.value = y
        console.log(tempimgs.value)
        for(var i=0; i<y.length;i++){
            // tempimgs.value.push(y[i])
            imgs.value.push(URL.createObjectURL(y[i]))
            // console.log(imgs.value[i])
        }
    }
</script>

<style scoped>

    .list-enter-active{transition: all 0.3s ease-in-out;}
    /* position absolute needed to work  */
    .list-leave-active{transition: all 0.3s ease-in-out; position: absolute;}
    .list-move{transition: all 0.3s ease;}
    .list-enter-from,.list-leave-to{opacity: 0; transform:translateY(-30px);}
    .list-enter-to,.list-leave-from{opacity: 1; transform:translateY(0px);}

    
</style>