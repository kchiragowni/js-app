/* eslint-disable import/default */
/*eslint-disable no-unused-vars*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ContractsContainer from './ContractsContainer';

const App = () => {
    return(  
        <div className="ms-Grid">
            <ContractsContainer />
        </div>
    );
};

export default App;