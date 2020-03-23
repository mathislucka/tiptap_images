function handleImages (event, images, prosemirrorView, callbackFn = null) {
    const { selection, schema } = prosemirrorView.state
    const position = event.type === 'drop' 
        ? prosemirrorView.posAtCoords({ left: event.clientX, top: event.clientY }).pos
        : selection.$cursor ? selection.$cursor.pos : selection.$to.pos
    
    images.forEach(async image => {
        if (callbackFn !== null) {
            console.log('drop?', event.type)
            const node = schema.nodes.imageUpload.create({
                src: await callbackFn(image)
            })
            const transaction = prosemirrorView.state.tr.insert(position, node)
            prosemirrorView.dispatch(transaction)
        } else {
            const reader = new FileReader()
            reader.onload = readerEvent => {
                const node = schema.nodes.imageUpload.create({
                    src: readerEvent.target.result
                })
                const transaction = prosemirrorView.state.tr.insert(position, node)
                prosemirrorView.dispatch(transaction)
            }
            reader.readAsDataURL(image)
        }
    })
    
}

export { handleImages }