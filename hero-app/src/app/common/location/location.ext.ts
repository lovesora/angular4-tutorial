export function getLocationParams(): {[key: string]: any} {
    let hash = location.search.split('?');
    let params = hash[hash.length - 1].split('&');

    let result = {}
    params.map(v => {
        let _param = v.split('=');

        if (result[_param[0]]) {
            if (Object.prototype.toString.call(result[_param[0]]) === '[object Array]') {
                result[_param[0]] = result[_param[0]].push(_param[1]);
            } else {
                result[_param[0]] = [result[_param[0]], _param[1]];
            }
        } else {
            result[_param[0]] = _param[1];
        }

    })
    return result;
}
