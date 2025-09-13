

const Ticket = ({ name, email, username, avatar }) => {


    const serialNumber = Math.floor(99999*Math.random())


  

  // console.log(generateRandomNumber())

  return (
    <div className="flex flex-col gap-5 mb-50 items-center lg:mt-28">
      <div className="logo flex items-center justify-center pt-4 lg:pt-3">
        <img src="images/logo-full.svg" alt="Logo" className='w-35 h-auto md:w-37 lg:w-39' />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 px-10">
        <h1 className="text-[hsl(0,0%,100%)] text-2xl font-semibold  text-center md:text-3xl lg:text-[2.5rem] lg:max-w-[60%]">Congrats, <span className="bg-gradient-to-r from-[hsl(7,86%,67%)] to-[hsl(0,0%,100%)] bg-clip-text text-transparent">{name}!</span> Your ticket is ready.</h1>
        <p className="text-[hsl(252,6%,83%)] text-center text-[17px] md:text-[15px] lg:text-[17px] lg:max-w-[40%]">We'ev emailed your ticket to <span className="text-[hsl(7,86%,67%)]">{email}</span> and we will send updates in the run up to the event.</p>
      </div>


  <div className="ticket-card max-w-[400px] max-h-[175px] border-2 border-amber-500 border-x-amber-50 border-r-amber-600 flex bg-[hsl(240,32%,32%)] text-white relative rounded-md mt-12 mix-blend-lighten lg:w-[480px] md:w-[450px]">
  {/* Left side */}
  <div className="inner-container flex flex-col gap-8 overflow-hidden p-3 flex-1">
    <div className="flex items-center gap-3">
      <img src="/images/logo-mark.svg" alt="logo-symbol" className="h-7" />
      <div className="pt-3">
        <h1 className="text-2xl font-bold">Coding Conf</h1>
        <p className="font-light text-[12px]">Jan 31, 2026 / Asaba, Nig.</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <img src={avatar} alt="User-photo" className="h-11 w-11 rounded-md object-cover" />
      <div>
        <h1>{name}</h1>
        <div className="flex gap-2">
          <img src="/images/icon-github.svg" alt="github-logo" />
          <p>{username}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Right stub with punch effect */}
  <div
    className="
      stub flex flex-col items-center justify-center pl-4 
      border-l-2 border-dotted border-gray-400 w-[60px] relative
      before:content-[''] before:absolute before:-left-3 before:top-[-12px]
      before:w-6 before:h-6 before:rounded-[10px] before:bg-[#0f172a]
      after:content-[''] after:absolute after:-left-3 after:-bottom-3
      after:w-6 after:h-5 after:rounded-[10px] after:bg-[#0f172a]
    "
  >
    <p className="rotate-90 text-gray-300 tracking-widest text-sm">#{serialNumber}</p>
  </div>
</div>



    </div>
  );
};

export default Ticket