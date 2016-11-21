import * as types from '../constants/actionTypes';
import contractApi from '../api/mockContractApi';
import * as services from '../utils/spBaseService';

export function loadContractsSuccess(contracts){
    //console.log('contracts success: ' + JSON.stringify(contracts));
    return { type: types.LOAD_CONTRACTS_SUCCESS, contracts};
}

export function loadContracts() {
    return function(dispatch) {
        return contractApi.getAllContracts()
            .then(contracts => {
                dispatch(loadContractsSuccess(contracts));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function loadRemoteContracts(){ 
    let columns = ['Title','StartDate', 'EndDate']; 
    return function (dispatch) {
        return services.getRequestPnp('Contracts', columns)
            .then((contracts) => {
                dispatch(loadContractsSuccess(contracts));
            })
            .catch((error) => {
                throw error;
            });
    };
}
