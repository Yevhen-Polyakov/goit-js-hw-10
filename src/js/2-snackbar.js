import iziToast from  "izitoast";
import  "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

form.addEventListener("submit",handelSubmit)

function handelSubmit(e){
    e.preventDefault()
    
    
    const delay = Number(e.target.elements.delay.value)
    const state = e.target.elements.state.value
    
    const promiseTime = new Promise((resolve, reject)=>{
        setTimeout(() => {
            if(state === "fulfilled"){
                resolve(delay)
            }else {
                reject(delay)
            }
            }, delay)
        
    })

    promiseTime
        .then((delay)=>{
            iziToast.success({
                position: "topLeft",
                message: `✅ Fulfilled promise in ${delay} ms`
            })
        })
        .catch((delay)=> {
            iziToast.error({
                position: "topLeft",
                message: `❌ Rejected promise in ${delay} ms`
            })
        })
        form.reset()
}