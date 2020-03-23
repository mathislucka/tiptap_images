function uploadFile(file) {
    let reader = new FileReader
    return new Promise((accept, fail) => {
      reader.onload = () => accept(reader.result)
      reader.onerror = () => fail(reader.error)
      setTimeout(() => reader.readAsDataURL(file), 1500)
    })
  }

  export { uploadFile }