/*eslint-disable no-unused-vars*/
import React, { PropTypes } from 'react';
//import ContractListRow from './ContractListRow';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

const ContractList = ({contracts, renderItemColumn, selectedDetails}) => {
    return ( 
        <MarqueeSelection selection={selectedDetails}>
            <DetailsList
                items={contracts}
                setKey='set'
                selection={selectedDetails}
                onItemInvoked={(contract) => alert(`Item invoked: ${contract.Title}`)}
                onRenderItemColumn={renderItemColumn}
            />
        </MarqueeSelection>
    );
};

ContractList.propTypes = {
    contracts: PropTypes.array.isRequired,
    renderItemColumn: PropTypes.func,
    selectedDetails: PropTypes.object
};

export default ContractList;
