import React from 'react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdOutlineAlternateEmail} from 'react-icons/md'
const Contact = () => {
    return (
        <div className="flex flex-wrap justify-center min-h-screen content-center">

            <div className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none">Kontakt</h1>

                <div className="flex flex-wrap items-center justify-evenly">
                    <div className="basis-auto block w-full lg:flex lg:p-8 md:h-72 lg:h-96">
                        <iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4200.693978908106!2d22.583099810541924!3d51.24214344390037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc9aabc246fb280b4!2zNTHCsDE0JzI4LjciTiAyMsKwMzUnMDkuNSJF!5e0!3m2!1spl!2sus!4v1670161734782!5m2!1spl!2sus" className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div className="grow-0 shrink-0 basis-auto w-full xl:w-8/12 ">
                        <div className="flex flex-wrap pt-12 lg:pt-0">
                            <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 text-white" viewBox="0 0 384 512">
                                                <path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" /></svg></div>
                                    </div>
                                    <div className="grow ml-6">
                                        <p className="font-bold mb-1">Adres</p>
                                        <p className="dark:text-gray-400">ul. Łęczyńska 2</p>
                                        <p className="dark:text-gray-400">20-342 Lublin</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                                        <BsFillTelephoneFill className='text-white'/>
                                        </div>
                                    </div>
                                    <div className="grow ml-6">
                                        <p className="font-bold mb-1">Telefon</p>
                                        <p className="dark:text-gray-400">81 538-42-87</p>
                                        <p className="dark:text-gray-400">124-466-780</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                                <div className="flex align-start">
                                    <div className="shrink-0">
                                        <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                                        <MdOutlineAlternateEmail className='text-white' />
                                        </div>
                                    </div>
                                    <div className="grow ml-6">
                                        <p className="font-bold mb-1">Email</p>
                                        <p className="dark:text-gray-400">mail@mail.com</p>
                                        <p className="dark:text-gray-400">+1 234-567-89</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                                <div className="flex align-start">
                                    <div className="shrink-0">
                                        <div className="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headset" className="w-5 text-white"
                                                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grow ml-6">
                                        <p className="font-bold mb-1">Wsparcie techniczne</p>
                                        <p className="dark:text-gray-400">wsparcie@example.com</p>
                                        <p className="dark:text-gray-400">+1 234-567-89</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
