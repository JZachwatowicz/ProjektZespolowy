import React from 'react';
import { IoMdMoon } from 'react-icons/io';
import { BsSun } from 'react-icons/bs';

import { BsCheck } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../services/ContextProvider';

const themeColors = [
    {
        name: 'niebieski',
        color: '#1A97F5',
    },
    {
        name: 'zielony',
        color: '#03C9D7',
    },
    {
        name: 'fioletowy',
        color: '#7352FF',
    },
    {
        name: 'czerwony',
        color: '#FF5C8E',
    },
    {
        name: 'granatowy',
        color: '#1E4DB7',
    },
];

const AccessabilitySettings = () => {
    const { setColor, setMode, currentMode, currentColor, setFontSize } = useStateContext();

    return (<div>
        <div className="flex-col border-t-2 border-color p-4 ml-4 dark:text-gray-200">
            <p className="font-semibold">Stylizacja strony</p>

            <div className="mt-4">

                <div className="flex gap-2">
                    <button onClick={setMode} type="button" className="h-7 w-7 text-2xl cursor-pointer">{currentMode === "Light" ? <IoMdMoon /> : <BsSun />}</button>

                    {themeColors.map((item, index) => (
                        <TooltipComponent key={index} content={item.name} position="TopCenter">


                            <button
                                type="button"
                                className="h-7 w-7 rounded-full cursor-pointer"
                                style={{ backgroundColor: item.color }}
                                onClick={() => setColor(item.color)}
                            >
                                <BsCheck className={`m-auto text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                            </button>

                        </TooltipComponent>
                    ))}

                </div>
            </div>
            <div className='flex font-bold justify-center gap-8 mt-2'>
                <button onClick={() => setFontSize(prev => prev + 0.2)}>A+</button>
                <button onClick={() => setFontSize(prev => prev - 0.2)}>A-</button>
            </div>
        </div>
    </div>
    );
};

export default AccessabilitySettings;
