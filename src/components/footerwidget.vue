<template>
    <div class=" my-5 text-center">
        {{props.footermessage}}
    </div>
</template>

<script setup>
    const props = defineProps({
        footermessage : {type: String, default: '(c) 2022 mysitename goes here'}
    })
</script>