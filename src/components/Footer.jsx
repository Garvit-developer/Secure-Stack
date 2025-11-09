import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 dark:bg-gray-900 text-white flex flex-col justify-center items-center w-full py-6 mt-8'>
            <div className="logo font-bold text-white text-2xl mb-2">
                <span className='text-green-500'> &lt;</span>
                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center text-sm'>
                Created with <img className='w-5 mx-1' src="icons/heart.png" alt="love" /> by Garvit Dani
            </div>
        </div>
    )
}

export default Footer