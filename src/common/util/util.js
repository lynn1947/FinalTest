
const debunce =(func,interval)=>{
    let timer = undefined
    return function(){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(arguments)
        },interval)
    }   
}

export {debunce}