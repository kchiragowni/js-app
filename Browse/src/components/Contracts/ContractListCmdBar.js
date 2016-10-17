import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

const ContractListCmdBar = ({searchVisible, commandItems, farItems}) => {
    return (
        <CommandBar
            isSearchBoxVisible={searchVisible}
            searchPlaceholderText="Search..." 
            elipisisAriaLabel="More options"
            items={commandItems}
            farItems={farItems} /> 
    );
};



export default ContractListCmdBar;