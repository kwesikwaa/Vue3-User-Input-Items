<template>
    <div class=" relative  m-auto w-full mb-14 md:w-11/12 h-40 mygoldcol">
        <div class="w-full h-full overflow-hidden bg-blue-600">
            <!-- <img class="w-full h-full object-fill object-center" src="~/assets/imgs/surey.jpg" alt=""> -->
        </div>
        <div class="flex justify-center">
            <div class=" absolute overflow-hidden border-4 avat w-28 h-28 rounded-full bg-white ">
                <img class="w-full object-fill object-center" src="../assets/frg.jpg" alt="">
            </div>
            
        </div>
        
    </div>
    <div class=" flex flex-col items-center text-gray-800 text-sm mb-2 leading-4">
            <p>{{props.artistname}}</p>
            <p>blackstar&#11088artist</p>
            <p>Technical Artist</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        artistname: {type: String, default:'araba'},
        isguest:{type: Boolean, default:true}
    })
</script>

<style>
    .avat{
        top: 0;
        /* right: 48%; */
    }
</style>