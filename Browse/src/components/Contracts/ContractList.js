/*eslint-disable no-unused-vars*/
import React, { PropTypes } from 'react';
//import ContractListRow from './ContractListRow';
import { DetailsList, buildColumns, IColumn, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

const ContractList = ({contracts, renderItemColumn, selectedDetails, contractColumns, 
            constrainMode, selectionMode, isHeaderVisible, onRenderRow}) => {

    return (
        <form onSubmit={(e) => { e.preventDefault();}}> 
            <DetailsList
                    //ref="list"
                    setKey="items"
                    items={contracts}
                    constrainMode={constrainMode}
                    selectionMode={selectionMode}
                    columns= {contractColumns}
                    onItemContextMenu = {(item, index, ev) => console.log(`item opened`)}
                    selection={selectedDetails}
                    isHeaderVisible={isHeaderVisible}
                    onItemInvoked={(contract) => alert(`Item invoked: ${contract.Title}`)}
                    onRenderItemColumn={renderItemColumn}
                    onRenderRow={onRenderRow}
                    onColumnHeaderContextMenu={
                            (column, ev) => console.log(`column ${ column.key } contextmenu opened.`)}
                />
        </form>
    );
};

ContractList.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.shape({
        __metadata: PropTypes.object.isRequired,
        Title: PropTypes.string.isRequired,
        StartDate: PropTypes.string.isRequired,
        EndDate: PropTypes.string.isRequired
    })).isRequired,
    renderItemColumn: PropTypes.func,
    selectedDetails: PropTypes.object,
    contractColumns: PropTypes.array.isRequired,
    selectionMode: PropTypes.number,
    constrainMode: PropTypes.number,
    isHeaderVisible: PropTypes.bool,
    onRenderRow: PropTypes.func
};

export default ContractList;
