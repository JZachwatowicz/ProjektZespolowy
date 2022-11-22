import React from 'react'
import { useState } from 'react';
import { useStateContext } from '../services/ContextProvider';

const Faq = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {currentColor} = useStateContext()
  const Content = () => {

    const faqData = [
      { question: "What is ..?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem eveniet tenetur nemo! Incidunt quam, explicabo eligendi nam, ipsam in magnam dolore dicta minus ea dolorem corrupti velit at doloremque!" },
      { question: "What is ..?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem eveniet tenetur nemo! Incidunt quam, explicabo eligendi nam, ipsam in magnam dolore dicta minus ea dolorem corrupti velit at doloremque!" },
      { question: "What is ..?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem eveniet tenetur nemo! Incidunt quam, explicabo eligendi nam, ipsam in magnam dolore dicta minus ea dolorem corrupti velit at doloremque!" },
      { question: "What is ..?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel rem eveniet tenetur nemo! Incidunt quam, explicabo eligendi nam, ipsam in magnam dolore dicta minus ea dolorem corrupti velit at doloremque!" }
    ];
    const [active, setActive] = useState(0)
    return (
      <div className='z-50 flex-2 absolute top-0 mt-60 overflow-auto rounded-lg shadow-2xl !opacity-100 bg-white dark:bg-secondary-dark-bg'>
        <div className='flex justify-between p-5 '>
          <span className='text-3xl'>Najczęściej zadawane pytania</span>
          <button className='bg-red-500 p-2' onClick={() => setIsOpen(false)}>X</button></div>
        {
          faqData.map((element, index) => {
            return (<div key={index} className={active === false ? "" : null} style={{color: currentColor}}>
              <h2>
                <button type="button" onClick={() => setActive(index)} 
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
                >
                  <span>{element.question}</span>
                  <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </h2>
              <div className={active === index ? "shown" : "hidden"} >
                <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {element.answer}
                  </p>
                </div>
              </div>
            </div>)
          })
        }

        {/* })} */}

      </div>
    );
  };



  return (

    <><button onClick={() => setIsOpen(true)}>Najczęściej zadawane pytania</button>
      {isOpen ?

        <Content />

        : null}
    </>
  )
}

export default Faq
