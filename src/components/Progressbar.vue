<template>
    <div class="meter">
        <span :style="'max-width: ' + width + '%;'" ref="bar"></span>
    </div>
</template>
<script>
export default {
    name: 'ProgressBar',
    props: {
        width: {
            type: Number,
            required: false,
            default: () => 80
        }
    },
    mounted () {
        this.$refs.bar.classList.add('progress')
    }
}
</script>
<style scoped>
.meter { 
    height: 6px;
    margin-top: 1em;
    width: 100%;
    background: #f3efe6;
    overflow: hidden;
}

.meter span {
    height: 100%;
    display: block;
}

.progress {
    background-color: #41b883;
    animation: progressBar 2s ease-in-out;
    animation-fill-mode: both; 
}

@keyframes progressBar {
  0% { width: 0; }
  100% { width: 100%; }
}
</style>