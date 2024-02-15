const to_blob = (src:string):Promise<string> =>{
    return new Promise(resolve =>{
        fetch(src).then(r => r.blob().then(blob =>{
            const fs = new FileReader();
            fs.onload = () => {resolve(fs.result as string)}
            fs.readAsDataURL(blob);
        }))
    });
}

export {to_blob};