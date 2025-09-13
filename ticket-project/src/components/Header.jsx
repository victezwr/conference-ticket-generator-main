import React from 'react'

const Header = () => {
  return (
    <div>
      <div className="logo flex items-center justify-center pt-4 lg:pt-3">
        <img src="images/logo-full.svg" alt="Logo" className='w-35 h-auto md:w-37 lg:w-39' />
      </div>
      <div className='flex flex-col items-center gap-2 mt-9 px-5 md:mt-10 lg:mt-8 relative z-10 mix-blend-lighten mb-5'>
        <h1 className='text-[hsl(0,0%,100%)] text-2xl font-semibold  text-center md:text-3xl lg:text-[2.5rem] lg:max-w-[60%]'>Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p className='text-[hsl(252,6%,83%)] text-center text-[17px] md:text-[15px] lg:text-[17px]'>Secure your spot at next year's biggest coding conference.</p>
      </div>
    </div>
  )
}

export default Header