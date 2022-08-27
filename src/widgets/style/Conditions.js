import React from 'react';

const Conditions = (props) => {
   return (
       <div>
            <p><strong>{props.responseObj.location.name}</strong></p>
            <p>Es isch {Math.round(props.responseObj.current.temp_c)} Grad dusse.</p>
        </div>
   )
}

export default Conditions;