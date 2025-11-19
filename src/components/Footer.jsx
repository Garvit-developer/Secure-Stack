import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 dark:bg-gray-900 text-white flex flex-col justify-center items-center w-full py-6 mt-8'>
            <div className="logo font-bold text-white text-2xl mb-2">
                <span className='text-green-500'> &lt;</span>
                <span>Secure </span><span className='text-green-500'>Stack/&gt;</span>
            </div>
            <div className='flex justify-center items-center text-sm'>
                Created by Garvit Dani <img className='w-5 mx-1' src="icons/heart.png" alt="love" /> 
            </div>
        </div>
    )
}

export default Footer