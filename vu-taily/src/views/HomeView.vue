<template>
    <input v-show="false" @change="doit" type="file" ref="pix" :multiple="!izy" accept="image/*">
    <label for="prifle">Profile??</label>
     loaded items : {{imgs.length}}
    <div class="flex space-x-1">
        <button @click="pix.click()" class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">UPLOAD</button>
        <button class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">PUBLISH</button>
        <button class=" bg-red-600 hover:bg-red-500 rounded-md p-2 px-6 text-white">SAVE TO DRAFT</button>
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
    
    //for dev purpose to toggle the isprofile prop
    //rename vars when everythings comes together
    let izy = false
    let pix = ref(null)
    let hey = ref('')
    let imgs = ref([])

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