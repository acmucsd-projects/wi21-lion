import React, { useState, useRef, useEffect } from 'react';
import './Article.css';

// import { ReactComponent as CarrotSVG } from './icons/carrot.svg';

/**
 * React component for each item in the path banner  
 * @param {*} props 
 */
function PathItem(props) {

    const { name } = props;

    const [open, setOpen] = useState(false);

    const dropdownWrapper = useRef(null);
    useOutsideDropdownAlerter(dropdownWrapper);

    // const carrot = <CarrotSVG />;

    /**
     * Function to handle clicks outside the section dropdown menu 
     * @param {*} ref 
     */
    function useOutsideDropdownAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <li className="path-item" onClick={() => setOpen(!open)} style={{ backgroundColor: (open && props.children ? '#C4C4C4' : 'white') }}>
            {name}
            <div className="path-item-after" style={{ borderLeftColor: (open && props.children ? '#C4C4C4' : 'white') }} />
            <div ref={dropdownWrapper} className="">
                {open && props.children}
            </div>
        </li>
    );
}

export default PathItem