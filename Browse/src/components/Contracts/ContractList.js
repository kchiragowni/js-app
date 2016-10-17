/*eslint-disable no-unused-vars*/
import React, { PropTypes } from 'react';
//import ContractListRow from './ContractListRow';
import { DetailsList, buildColumns, IColumn, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

const ContractList = ({contracts, renderItemColumn, selectedDetails, contractColumns, 
            constrainMode, selectionMode, isHeaderVisible, onRenderRow}) => {
    return ( 
        <DetailsList
                //ref='list'
                setKey="items"
                items={contracts}
                constrainMode={constrainMode}
                selectionMode={selectionMode}
                columns= {contractColumns}
                selection={selectedDetails}
<<<<<<< HEAD:Browse/src/components/ContractList.js
                isHeaderVisible={isHeaderVisible}
=======
>>>>>>> 7f0d523197fb76f653116aadc8bb3647d0334edb:Browse/src/components/Contracts/ContractList.js
                onItemInvoked={(contract) => alert(`Item invoked: ${contract.Title}`)}
                onRenderItemColumn={renderItemColumn}
                onRenderRow={onRenderRow}
                onColumnHeaderContextMenu={(column, ev) => console.log(`column ${ column.key } contextmenu opened.`)}
            />
    );
};

ContractList.propTypes = {
    contracts: PropTypes.array.isRequired,
    renderItemColumn: PropTypes.func,
    selectedDetails: PropTypes.object,
    contractColumns: PropTypes.array,
    selectionMode: PropTypes.number,
    constrainMode: PropTypes.number,
    isHeaderVisible: PropTypes.bool,
    onRenderRow: PropTypes.func
};

export default ContractList;
