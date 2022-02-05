<template>
    <div class="p-1">
        <div class="container bg-gray-800 min-w-min rounded-md ">
            <div class="container  bg-gray-700 text-white rounded-t-md border-l-4 border-red-500">
                <h1 class=" p-4">{{props.widgetTitle}}</h1>
            </div>
            <div class="container p-4">
                <div class="container border border-gray-600 rounded-sm text-white">
                    <input v-if="props.isTitle" class="bg-gray-900 p-2 w-full text-white rounded-sm" type="text" :placeholder="props.placeholder">
                    <textarea v-else class="bg-gray-900 p-2 w-full min-h-50 text-white rounded-sm" name="" id="" cols="30" rows="10" style="resize: vertical;" :placeholder="props.placeholder"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    interface props{
        widgetTitle?: string,
        placeholder?: string
        isTitle?: boolean
    }

    const props = withDefaults(defineProps<props>(),{widgetTitle:'WIDGET TITLE', placeholder:'Enter Placeholder here', isTitle: true})

</script>