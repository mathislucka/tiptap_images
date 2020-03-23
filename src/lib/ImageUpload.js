import {Node, Plugin} from 'tiptap'
import {nodeInputRule} from 'tiptap-commands'
import { handleImages } from './ImageHandler'

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export default class ImageUpload extends Node {

    constructor(name, parent, uploadFunc = null) {
        super(name, parent);
        this.uploadFunc = uploadFunc;
    }

    get name() {
        return 'imageUpload'
    }

    get schema() {
        return {
            inline: true,
            attrs: {
                src: {},
                alt: {
                    default: null,
                },
                title: {
                    default: null,
                },
            },
            group: 'inline',
            draggable: true,
            parseDOM: [
                {
                    tag: 'img[src]',
                    getAttrs: dom => ({
                        src: dom.getAttribute('src'),
                        title: dom.getAttribute('title'),
                        alt: dom.getAttribute('alt'),
                    }),
                },
            ],
            toDOM: node => ['img', node.attrs],
        }
    }

    commands({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state;
            const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction)
        }
    }

    inputRules({ type }) {
        return [
            nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
                const [, alt, src, title] = match;
                return {
                    src,
                    alt,
                    title,
                }
            }),
        ]
    }

    get plugins() {
        const upload = this.uploadFunc;
        return [
            new Plugin({
                props: {
                  handleDOMEvents: {
                    paste (view, event) {
                      let items = (event.clipboardData  || event.originalEvent.clipboardData).items;
                      items = Array
                        .from(items)
                        .filter(item => (/image/i).test(item.type))
                        .map(item => item.getAsFile());

                      if (items.length === 0) return

                      event.preventDefault()
                      handleImages(event, items, view, upload)
                      return false;
                    },
                    /**
                     * TODO: figure out the desired drag and drop behaviour
                     * and implement this so that it works for dragging files both within the browser and from local file system.
                     */
                    // drop (view, event) {
                    //   let files = event.dataTransfer && event.dataTransfer.files
                    //   let items = event.dataTransfer && event.dataTransfer.items

                    //   if (!files || !items) {
                    //     return false
                    //   }

                    //   console.log(items)
                    //   items = Array
                    //     .from(items)
                    //     .filter(item => (/image/i).test(item.type))
                    //     //.map(item => item.getAsFile())
                      
                    //   files = Array
                    //     .from(files)
                    //     .filter(file => (/image/i).test(file.type))

                    //   const images = [ ...items, ...files ]  
                    //   if (images.length === 0) {
                    //     return false
                    //   }
                    //   event.preventDefault();
                    //   handleImages(event, images, view, upload)
                    //   return false
                    // }
                  },
                }
            })
          ]
    }
}