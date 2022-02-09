
export class Params {
    page: string;
    per_page: string;
    sort_by: string;
    sort_by_desc: string;
    role_id: string;
    status: string;
    franchise_id: string;
    id: string;
    franchisee: string;
    user_id: string;
}

export class ParamsString {

    setParamsString(params: Object): string {

        let paramsString: string = '';
        const keys = Object.keys(params);

        if(keys.length > 0){

            paramsString += '?'

            for (let index = 0; index < keys.length; index++) {
                
                let str: string = '';
                if(index > 0){
                    str += '&';
                }

                if(params.hasOwnProperty(keys[index])){
                    str += `${keys[index]}=${params[keys[index]]}`;
                }
                
                paramsString += str;
            }

        }
        return paramsString;
    }
    
}
