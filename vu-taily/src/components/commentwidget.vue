<template>
    <div class="p-1 pt-4">
        <div class="container bg-gray-800 min-w-min rounded-md ">
            <div class="comment-head container py-1 flex justify-between bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                <div class="usercard flex space-x-2">
                    <div class="avatar w-10 h-10 bg-red-500 rounded-full absolute -left-5 -top-3 flex justify-center items-center">
                        <div class="avatar w-8 h-8 bg-yellow-50 rounded-full absolute "></div>
                    </div>
                    <div class="cred pl-5 flex">
                        <div class="a flex justify-center items-center space-x-1">
                            <div class="name text-white">Araba Adedzewa</div>
                            <div class="kindofartist bg-yellow-600 w-4 h-4 rounded-full"></div>
                        </div>
                        <div class="role text-white">date commented</div>
                    </div>
                </div>
                <div v-show="!isReplying" class="comment-actions flex justify-end space-x-2 px-4">
                    <button class="text-white bg-red-700 px-2">EDIT</button>
                    <button class="text-white bg-red-700 px-2">DELETE</button>
                    <button @click="reply" class="text-white bg-red-700 px-2">REPLY</button>
                </div>
            </div>
            <div class="comment-body container p-4">
                <div class="container border border-gray-600 p-2 rounded-sm text-white">
                    CoMMENT BODY asdlkflk;sajflsadjflsadjflsdjafklsajd;flsdf saflsdajflksdajflksadjf;lsajf;l sal fjsldfkj salsdjflsf jl salfjsalfjsalfsa lf salflsajflsk fj
                </div>
            </div>
            
        </div>
        <!-- //REPLY  -->
        <div v-if="isReplying" class="reply-container py-1 pl-4">
            <div class="container bg-gray-800 min-w-min rounded-md ">
                <div class="container p-4">
                    <div class="container border border-gray-600 rounded-sm text-white">
                        <textarea class="bg-gray-900 p-2 w-full max-h-36 text-white rounded-sm" name="" id="" cols="30" rows="10" style="resize: none;" ></textarea>
                    </div>
                </div>
                <div class="reply-actions flex justify-end space-x-2 px-4 pb-4">
                    <button class="text-white bg-red-700 px-2">EDIT</button>
                    <button class="text-white bg-red-700 px-2">DELETE</button>
                    <button @click="reply" class="text-white bg-red-700 px-2">REPLY</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
    let isReplying = ref(true)

    const reply = ()=>{
        //do more here
        //during reply copy main comment and children to local storagfe
        //save to both localstorage and db
        //immediately repopulate children from localstorage without refresh
        //dispose when??? after repopulation or on unmounted??
        isReplying.value = !isReplying.value;
        }
</script>