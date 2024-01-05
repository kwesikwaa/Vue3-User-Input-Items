<template>
    <div class=" m-auto">
        <div class="my-8">
            <div class=" text-6xl">
                {{props.headtext}}
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        headtext: {type: String},
    })

</script>