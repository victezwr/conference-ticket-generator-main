import { useState } from 'react';
import './App.css'
import Header from './components/Header'
import Form from './components/Upload';

const App = () => {

  const [submitted, setSubmitted] = useState(false);


  return (
    <div
      className="
        bg-[url('/images/bg-mobile.png')] 
        sm:bg-[url('/images/bg-tablet.png')] 
        lg:bg-[url('/images/bg-desktop.png')] 
        h-screen bg-cover bg-center overflow-hidden
        min-w-[320px]
        flex flex-col justify-center items-center
      "
    >
      {/* Decorative Patterns */}
      <img
        src="/images/pattern-lines.svg"
        alt="pattern lines"
        className="absolute inset-0 w-full h-full object-cover px-5"
      />
      <img
        src="/images/pattern-circle.svg"
        alt="pattern circles"
        className="absolute -top-17 -left-12 w-30 h-40 lg:top-1/2 lg:right-105 lg:left-auto
   lg:w-50"
      />
      <img
        src="/images/pattern-squiggly-line-top.svg"
        alt="pattern squiggly line top"
        className="absolute -top-7 right-0  lg:top-10 lg:right-0 w-25 md:top-5 md:right-0 h-37 md:w-90 md:h-50 lg:w-110 lg:h-60 pointer-events-none select-none"
      />

       {!submitted && <Header />}
        <Form submitted={submitted} setSubmitted={setSubmitted} />
     <img
       src="/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
       alt="pattern squiggly line bottom"
       className="absolute bottom-0 left-0 w-43 h-30 pointer-events-none select-none lg:bottom-0 lg:left-0 lg:w-200 lg:h-135 lg:blur-l"
     />
    </div>
  );
};


export default App;