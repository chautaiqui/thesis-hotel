import axios from "axios";


const apiDomain = 'https://hotel-lv.herokuapp.com/api';

const getRequest = async (fn, options = {}, extend = []) => {
  try {
    let _h = new Headers()
    // _h.append('authorization',api_token);
    _h.append("Content-Type", "text/plain;charset=UTF-8")
    delete options.fields;
    delete options.total;  
    let queryString = '';
    for (let x in options ) {
      if (!x || !options[x]) continue;
      queryString += `&${x}=${encodeURIComponent(options[x])}`;
    }
    const ex = extend.length === 0 ? '' : '/' + extend.join('/');
    var url = `${apiDomain}/${fn}${ex}?${queryString.slice(1)}`;
    let re = await fetch(url, {
        method: 'GET',
        headers: _h
    })
    if(!re.ok) return {success: false, error: 'Api error'}
    let _re = await re.json();
    // if(_re.status === 401) return window.location.reload()
    // if(_re.status === 403) return {success: true, result: {data: []}}
    // if(_re.status !== 200) return {success: false, error: _re.message || 'Api ok but smt error'}
    
    return {success: true, result: _re};
  } catch (e) {
    return { success: false, error: e };
  }
}

// const postRequest = async (fn, body) => {
//   try {
//     console.log(fn, body)
//     let _h = new Headers();
//     _h.append('content-type', 'application/json');
//     let url = `${apiDomain}/${fn}`
//     let _r = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: _h
//     });
//     _r = await _r.json();
//     if (_r.message) return { success: false, error: _r.message };
//     // if (!_r.ok) return { success: false, error: 'Api error' };
//     // if (_r.status !== 200)  return { success: false, error: _r.message || 'Api ok but smt error' };
//     return { success: true, result: _r };
//   } catch(e) {
//     return { success: false, error: e };
//   }
// }
const postRequest = async (fn, data) => {
  try {
    let _h = new Headers();
    _h.append('Content-Type', 'multipart/form-data; boundary=<calculated when request is sent>');
    var url = `${apiDomain}/${fn}`
    const re = await axios.post(url, data, {headers: _h});
    if(re.status === 200){
      return {success: true, result: re.data}
    } else {
      return {success: false, error: 'Something well wrong!'}
    }
  } catch(e) {
    return { success: false, error: e};
  }
}
const putRequest = async(fn, data, id) => {
  try {
    let _h = new Headers()
    _h.append('Content-Type', 'multipart/form-data; boundary=<calculated when request is sent>');
    var url = `${apiDomain}/${fn}/${id}`;
    const re = await axios.put(url, data, {headers: _h});
    if(re.status === 200){
      return {success: true, result: re}
    } else {
      return {success: false, error: 'Something well wrong!'}
    }
  } catch (e) {
    return { success: false, error: "Can't update"};
  }
}

export { getRequest, postRequest, putRequest }