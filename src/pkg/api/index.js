import axios from "axios";

const apiDomain = "https://hotel-lv.herokuapp.com/api";

const getRequest = async (fn, options = {}, extend = []) => {
  try {
    let _h = new Headers();
    // _h.append('authorization',api_token);
    _h.append("Content-Type", "text/plain;charset=UTF-8");
    delete options.fields;
    delete options.total;
    let queryString = "";
    for (let x in options) {
      if (!x || !options[x]) continue;
      queryString += `&${x}=${encodeURIComponent(options[x])}`;
    }
    const ex = extend.length === 0 ? "" : "/" + extend.join("/");
    var url = `${apiDomain}/${fn}${ex}?${queryString.slice(1)}`;
    let re = await fetch(url, {
      method: "GET",
      headers: _h,
    });
    if (!re.ok) return { success: false, error: "Api error" };
    let _re = await re.json();
    // if(_re.status === 401) return window.location.reload()
    // if(_re.status === 403) return {success: true, result: {data: []}}
    // if(_re.status !== 200) return {success: false, error: _re.message || 'Api ok but smt error'}

    return { success: true, result: _re };
  } catch (e) {
    return { success: false, error: e };
  }
};

const postRequest = async (fn, data) => {
  try {
    let _h = new Headers();
    _h.append(
      "Content-Type",
      "multipart/form-data; boundary=<calculated when request is sent>"
    );
    var url = `${apiDomain}/${fn}`;
    const re = await axios.post(url, data, { headers: _h });
    if (re.status === 200) {
      return { success: true, result: re.data };
    } else {
      return { success: false, error: "Something well wrong!" };
    }
  } catch (e) {
    return { success: false, error: e };
  }
};
const putRequest = async (fn, data, id) => {
  try {
    let _h = new Headers();
    _h.append(
      "Content-Type",
      "multipart/form-data; boundary=<calculated when request is sent>"
    );
    var url = `${apiDomain}/${fn}/${id}`;
    const re = await axios.put(url, data, { headers: _h });
    if (re.status === 200) {
      return { success: true, result: re };
    } else {
      return { success: false, error: "Something well wrong!" };
    }
  } catch (e) {
    return { success: false, error: "Can't update" };
  }
};
const putMethod = async (fn, data, id) => {
  if (!id) {
    return { success: false, error: "Id not found" };
  }
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Content-Type",
      "multipart/form-data; boundary=<calculated when request is sent>"
    );
    let url = `${apiDomain}/${fn}/${id}`;
    const res = await axios.put(url, data, {
      headers: myHeaders,
      validateStatus: (status) => {
        return (status >= 200 && status < 500) || status === 400;
      },
    });
    // console.log(res)
    if (res.status >= 200 && res.status < 300) {
      return { success: true, result: res.data };
    }
    if (res.status >= 400) {
      return { success: false, error: res.data.message };
    }
  } catch (e) {
    return { success: false, error: "" };
  }
};
const postMethod = async (fn, body) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Content-Type",
      "multipart/form-data; boundary=<calculated when request is sent>"
    );
    let url = `${apiDomain}/${fn}`;
    const res = await axios.post(url, body, {
      headers: myHeaders,
      validateStatus: (status) => {
        return (status >= 200 && status < 503) || status === 400;
      },
    });
    console.log(res);
    if (res.status >= 200 && res.status < 300) {
      return { success: true, result: res.data };
    }
    if (res.status >= 400) {
      return { success: false, error: res.data.message };
    }
  } catch (e) {
    return { success: false, error: e };
  }
};
export { getRequest, postRequest, putRequest, putMethod, postMethod };
