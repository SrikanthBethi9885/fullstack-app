import React from 'react';
import JsonData from './JsonData.json';
import './jsonstyles.css';

const JsonToUI = () => {
    const createElement = (elementData: any) => {
        switch (elementData.type) {
            case 'label':
                return (
                    <label key={elementData.attributes.htmlFor || elementData.attributes.text} htmlFor={elementData.attributes.htmlFor}>
                        {elementData.attributes.text}
                    </label>
                );
            case 'textarea':
                return (
                    <textarea
                        key={elementData.attributes.id}
                        {...elementData.attributes}
                    />
                );
            case 'button':
                return (
                    <button
                        key={elementData.attributes.id}
                        id={elementData.attributes.id}
                    >
                        {elementData.attributes.text}
                    </button>
                );
            case 'input':
                return (
                    <input
                        key={elementData.attributes.id || elementData.attributes.name}
                        {...elementData.attributes}
                    />
                );
            case 'select':
                return (
                    <select key={elementData.attributes.id} id={elementData.attributes.id}>
                        {elementData.options.map((option: any) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                );
            case 'progress':
                return (
                    <progress
                        key={elementData.attributes.id}
                        id={elementData.attributes.id}
                        value={elementData.attributes.value}
                        max={elementData.attributes.max}
                    >
                        {elementData.attributes.value}
                    </progress>
                );
            default:
                return null;
        }
    };

    return (
        <div className="json-to-ui">
            <h3>JSON To UI</h3>
            {JsonData.elements.map(createElement)}
        </div>
    );
};

export default JsonToUI;
