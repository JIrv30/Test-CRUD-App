import React from 'react'

const Form = () => {
  


  function handleSubmit (e) {
    const formEle = document.querySelector('form')
    e.preventDefault()
    console.log('submitted')

    const formData = new FormData(formEle)

    const url = 'https://script.google.com/macros/s/AKfycbxKCgyM2uRE1IXCLDyV4j93Jn8xWKi0AT2cWwSwcYyHgALGPn_4t2sd_ssa-WYkSWvG/exec'
    fetch(url, 
      {
        method:'POST',
        body: formData
      })
  }
  
  return (
    <>
    <form 
    className='form'
    onSubmit={(e)=>handleSubmit(e)}
    >
      <input 
      placeholder='Name' 
      name='name'
      type='text' />

      <input 
      placeholder='Email' 
      name='Email'
      type='email' />

      <input 
      placeholder='Message' 
      name='Message'
      type='text' />

<input 
      className='button'
      type='submit' />
    </form>
    </>
  )
}

export default Form