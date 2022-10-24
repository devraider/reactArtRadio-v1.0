import './style.css'
import { useState } from 'react';

const Tabs = ({
    tabData
}) => {
    console.log(tabData)
    const [touched, setTouched] =  useState(false);
    const [active, setActive] =  useState('');
    return (
        <div className='tab-container'>
            {/* tab header */}
            <div className='tab-header flex'>
            {
                tabData && Object.keys(tabData).map((tab, index) => (
                <a key={index} className={`${
                    touched 
                        ? active === tab ? 'active': '' 
                    : tabData[tab].label_active ? 'active' : ''}
                    `}
                    href={`${tabData[tab].label_anchor}`}
                    onClick={() => {
                        setTouched(true);
                        setActive(tab);
                    }}
                    >
                    {tabData[tab].label_name}
                </a>
                ))
            }
            </div>

            {/* tab content */}
            <div className='tab-contents'>

                {
                   tabData && Object.keys(tabData).map((tab, index) => (
                    <div key={index} className='tab-contents' id={`${tabData[tab].label_anchor}`}>
                    <div className='content-wrapper flex justify-sb m-20'>

                        {
                            tabData[tab].source_screen.map((item, _index) => (
                                <div className='content-item'>
                                    <img />
                                    <div>
                                        {item.source_name}
                                    </div>
                                </div> 
                            )) 
                        }
                    </div>
                </div>


                   )) 
                }
                <div className='tab-content' id='impusRadio'>
                Impuls Radio
                </div>
            </div>
        </div>
    );
}
export default Tabs;