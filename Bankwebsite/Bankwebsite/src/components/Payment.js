import React from 'react'

const Payment = () => {
    const totalPrice=1
    const loadScripts=(src)=>{
        return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src=src;
        
        script.onload= ()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script);
      })
      }

      const PaymentHandler=(res)=>{
        console.log(res)
      }

    

      const options = {
        "key":"rzp_test_NYUPSveWybUfyq", // Enter the Key ID generated from the Dashboard
         "currency":'INR',
        //  "amount":data?.price*100,
         "amount":totalPrice*100,
        "name": "Bank ",
        "image":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AReact-icon.svg&psig=AOvVaw10grTZidQ4y1pFoGxEEynl&ust=1669779682670000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOj_v5e80vsCFQAAAAAdAAAAABAE",
        "description":"payment by jaydeep",
         //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
          PaymentHandler(response)
        },
        "prefill": {
            "name":"jaydeep",
            "email":"jaydeepshelake10@gmail.com",
            "contact":`${91}${9175732873}`
        },
        
      };

      const payOnline=async(e)=>{
        e.preventDefault()
        const res= await loadScripts('https://checkout.razorpay.com/v1/checkout.js');
      if(!res){
        alert('faild to load script')
      }
      
       const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

  return (
    <>
    <div className='razorpay' onClick={payOnline}>
           <img src="https://razorpay.com/blog-content/uploads/2020/10/rzp-glyph-positive.png" alt="" />
           <p>Razorpay</p>
        </div>
    </>
  )
}

export default Payment