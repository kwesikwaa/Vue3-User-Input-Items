<template>
    <div class=" bg-blue-700 text-white w-full h-9 flex justify-between items-center rounded-md mt-2">
        <div class=" ml-2">
            Hi ! click on the EDIT button to demo the website builder    
        </div>
        <button @click="gotoedit" class=" bg-red-600 hover:bg-red-500  px-1 mx-2 my-1">EDIT</button>
    </div>
</template>

<script setup>
    const emits = defineEmits(['emitedit'])

    function gotoedit(){
        emits('emitedit')
    }

</script>