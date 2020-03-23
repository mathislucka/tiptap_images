<template>
    <div class="wrapper">
        <h3>Upload image</h3>
        <input
            type="file"
            @change="handleFiles">
        <progressbar v-if="isUploading" />
    </div>
</template>
<script>
import { uploadFile } from './../lib/AsyncUpload.js'
import Progressbar from './Progressbar.vue'
export default {
name: 'UploadPrompt',
components: {
    Progressbar
},
data () {
    return {
        isUploading: false
    }
},
methods: {
    handleFiles (e) {
        this.isUploading = true
        const file = e.target.files[0]
        uploadFile(file).then(src => {
            this.$emit('uploaded', src)
            this.isUploading = false
        })
    }
}

}
</script>
<style scoped>
    .wrapper {
        position: absolute;
        width: 50%;
        height: 50%;
        z-index: 99;
        top: 25%;
        left: 25%;
        border: 1px solid lightgray;
        background-color: #f7fafc;
        padding: 8px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
</style>