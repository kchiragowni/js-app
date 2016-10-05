/*eslint-disable no-undef*/
import pnp from 'sp-pnp-js';

export function getRequest(listTitle, columns) {
    return pnp.sp.web
            .lists.getByTitle(listTitle).items
            .select(columns ? columns : '' )
            .get(undefined, {
                headers: {
                    'Accept': 'application/json;odata=nometadata'
                }
            })
            .then((items) => {
                return items;
            })
            .catch((error) => {
                throw error;
            });
}

