<template>
  <div class="editor">
    <editor-menu-bar class="menubar" :editor="editor" v-slot="{ commands }">
      <div class="menubar">
        <button
          class="menubar__button"
          @click="toggleUploadPrompt"
        >
          Insert Image
        </button>
        <upload-prompt
        v-if="showUploadPrompt"
        @uploaded="insertFile($event, commands.imageUpload)" />
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
} from 'tiptap-extensions'
import ImageUpload from './../lib/ImageUpload.js'
import UploadPrompt from './UploadPrompt.vue'
import { uploadFile } from './../lib/AsyncUpload.js'


export default {
  name: 'HelloWorld',
  components: {
    EditorContent,
    EditorMenuBar,
    UploadPrompt
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ImageUpload(null, null, uploadFile),
          new Bold(),
          new Code(),
          new Italic(),
        ],
        content: `
          <h2>
            Images
          </h2>
          <p>
            This is a basic example of inserting images with a possibility to upload images asynchronously to a remote server.
            Try pasting an image or insert by clicking the button above.
          </p>
        `,
      }),
      showUploadPrompt: false
    }
  },
  methods: {
    toggleUploadPrompt () {
      this.showUploadPrompt = !this.showUploadPrompt
    },
    insertFile (src, command) {
      command({ src })
      this.toggleUploadPrompt()
    }
  },
}
</script>
<style scoped>
  .editor {
    position: relative;
    border: 1px solid lightgray;
    min-height: 400px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    padding: 8px;
  }

  .menubar {
    border-bottom: 1px solid lightgray;
  }
</style>