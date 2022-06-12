<template>
    <div class="py-1 px-1.5  w-screen md:w-2/3 md:m-auto">
        <div class="w-full bg-gray-800 min-w-min rounded-md ">
            <div class="w-full  bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                <h1 class=" p-4">{{props.widgetTitle}}</h1>
            </div>
            <div class="w-full p-4">
                <div class="w-full border border-gray-600 rounded-sm text-white">
                    <input v-model="input" @input="outit" v-if="props.isTitle" class="bg-gray-900 p-2 w-full text-white rounded-sm" type="text" :placeholder="props.placeholder">
                    <textarea v-model="input" @input="outit" v-else class="bg-gray-900 p-2 w-full min-h-50 text-white rounded-sm" name="" id="" cols="30" rows="10" style="resize: vertical;" :placeholder="props.placeholder"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {onMounted, ref} from 'vue'
    
    interface props{
        widgetTitle?: string,
        placeholder?: string
        isTitle?: boolean
        input?: string
    }
    
    let input = ref('')
    //in this case props.input works but in a scenario like login system  input.value should be used instead
    
    const emits = defineEmits(['spittest'])
    const props = withDefaults(defineProps<props>(),{widgetTitle:'WIDGET TITLE', placeholder:'Enter Placeholder here', isTitle: true, input:''})

    function outit(){
        emits('spittest',input.value)
    }

    onMounted(()=>{
        input.value = props.input
    })
    
</script>