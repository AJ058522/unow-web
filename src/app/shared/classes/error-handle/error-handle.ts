export class ErrorHandle {

    errors(errors: any): Array<string> {

        let errorsArray = [];

        if (typeof errors === 'object') {

            const keys = Object.keys(errors);

            if (keys.length > 0) {
                for (let index = 0; index < keys.length; index++) {
                    if (errors.hasOwnProperty(keys[index])) {
                        errorsArray.push(`${errors[keys[index]]}`);
                    }
                }
            }

        } else if (typeof errors === 'string') {
            errorsArray.push(errors);
        }
        return errorsArray;
    }

}
