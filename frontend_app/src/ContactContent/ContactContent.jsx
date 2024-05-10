import React from 'react';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles for the CircularProgressbar component

const ContactContent = () => {
    const percentage= 73;
    const percentage1= 53;

    return (
        <div style={{width:250,height:250,display:'flex',gap:'15px'}}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    backgroundColor: '#ec8e1a'
                })}
            />
            <CircularProgressbar
                value={percentage1}
                text={`${percentage1}%`}
            />
        </div>
    );
};

export default ContactContent;
