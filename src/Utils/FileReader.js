const to_blob = (src) =>{
    return new Promise(resolve =>{
        fetch(src).then(r => r.blob().then(blob =>{
            const fs = new FileReader();
            fs.onload = () => {resolve(fs.result)}
            fs.readAsDataURL(blob);
        }))
    })
}

export {to_blob}