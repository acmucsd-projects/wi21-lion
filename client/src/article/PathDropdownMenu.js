import React from 'react';
import './Article.css';


function PathDropdownItem(props) {

    const { element, type, selectionCallback, selectedItem } = props;
    return (
        <div
            className={element[type] === selectedItem ? "section-item selected-dropdown-item" : "section-item"}
            onClick={() => selectionCallback(element)} >
            {props.children}
        </div>
    );

}

function PathDropdownMenu(props) {

    const { list, type, updateSelection, selectedItem } = props;

    return (
        <div className="section-dropdown">
            {list.map((element) => (
                <PathDropdownItem
                    element={element}
                    type={type}
                    selectionCallback={updateSelection}
                    selectedItem={selectedItem}>
                    {element[type]}
                </PathDropdownItem>
            ))}

        </div>
    )
}

export default PathDropdownMenu
