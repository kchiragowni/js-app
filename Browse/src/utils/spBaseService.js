/*eslint-disable no-undef*/
import pnp from 'sp-pnp-js';
import $ from 'jquery';

export function getRequestPnp(listTitle, columns) {
    return pnp.sp.web
            .lists.getByTitle(listTitle).items
            .select(columns ? columns : '' )
            .get(undefined, {
                headers: {
                    "accept": "application/json;odata=nometadata",
                    "content-type": "application/json;odata=nometadata"
                }
            })
            .then((items) => {
                return items;
            })
            .catch((error) => {
                throw error;
            });
}

export function getRequest(listTitle) {
    let siteurl = _spPageContextInfo.webAbsoluteUrl;
    //let addParams = "&fhithighlighting=false&fcapitalizefirstletters=false&fprefixmatchallterms=true";
       
    return $.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('"+ listTitle +"')/items?$select=Title,StartDate,EndDate",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: (data) => {
            if(data.d.results > 0){
                return data.d.results;
            }
        },
        error: (error) => {
            alert("Error: "+ JSON.stringify(error));
            throw error;
        }
    });

}