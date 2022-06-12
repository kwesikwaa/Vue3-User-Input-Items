<template>
    <div>
        <pre>
            {{about}}
        </pre>
    </div>
</template>

<script setup>
    import { useBuilderStore } from '../stores/builder';
    import { storeToRefs } from 'pinia';

    const about = storeToRefs(useBuilderStore()).about
    


</script>