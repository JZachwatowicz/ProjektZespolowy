import React from 'react'
import image from '../../assets/about_us_img.jpg'

const About = () => {
    return (

        <div className="flex flex-wrap justify-center min-h-screen content-center mt-7">
            <div className="w-full md:max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-6 md:p-8 dark:bg-secondary-dark-bg dark:border-gray-700">

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none">Kim jesteśmy?</h1>
                <p className="mb-3 font-light  ">Naszą Fundację założyliśmy w 2013 roku. Przez blisko 7 lat działalności byliśmy partnerem wielu projektów unijnych, których głównymi beneficjentami są osoby niesamodzielne, bezrobotne, bierne zawodowo oraz dzieci w wieku żłobkowym.
                    Wspieramy tych, którzy ze względu na swoją sytuację życiową znajdują się w grupie zagrożonej ubóstwem lub wykluczeniem społecznym. Jeśli zarządzasz firmą, instytucją, spółdzielnią lub obszarem w swojej gminie, który odpowiada za działalność socjalną – jesteśmy Twoim potencjalnym partnerem. Razem możemy zdziałać wiele dobrego dla ludzi, którzy potrzebują naszej pomocy i opieki.</p>
                <div className='flex justify-center items-center m-4 '><img src={image} className="max-w-xl h-auto rounded-lg shadow-xl dark:shadow-gray-800" alt="Zdjęcie grupy ludzi" /></div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <p className="mb-3 font-light">
                        W naszej poradni działamy w sposób kompleksowy, więc nie zapominamy również o pomocy osobom będącym opiekunami osób niepełnosprawnych. Dzięki temu rozwiązaniu korzystają zarówno opiekunowie jak i same osoby niepełnosprawne. Oznacza to, że możemy realnie wpłynąć na zmianę sposobu życia wszystkich zainteresowanych.        </p>
                    <p className="mb-3 font-light">
                        Jedną z największych przeszkód w aktywizacji zawodowej osób niepełnosprawnych o różnym stopniu niepełnosprawności jest ich izolacja, wynikająca z samotnego spędzania czasu w czterech ścianach, głównie w towarzystwie członków rodziny.    </p>
                </div>
                <p className="mb-3 font-light">
                    Chcesz znać szczegóły? Skontaktuj się z nami już dziś. Pamiętaj, że na BEZPŁATNE zajęcia decyduje kolejność zgłoszeń.    </p>
            </div>
        </div>
    )
}

export default About
