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
                isHeaderVisible={isHeaderVisible}
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
