import axios from "axios";
import { apiHost } from "../constant.js";
export const clearStorage = async () => {
  try {
    localStorage.removeItem("USER_ROLE");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("jwtRefreshToken");
  } catch (e) {
    console.error("Failed to clear the storage", e);
  }
};
export const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("jwtRefreshToken");
  localStorage.removeItem("USER_ROLE");
  window.location.href = '/login';
};

// export const refreshTokenAPi = async () => {
//   let refToken = localStorage.getItem("jwtRefreshToken");
//   let tempData = {
//     refreshToken: refToken,
//   };
//   if (refToken) {
//     let res = await postData(`refresh-token`, tempData);
//     if (res.statusCode == 200) {
//       localStorage.setItem("isAuthenticated", res.accessToken);
//       localStorage.setItem("jwtRefreshToken", res.refreshToken);
//       window.location.href = '/';
//     } else {
//       await clearStorage();
//       handleLogout();
//     }
//   }
// };

const RefreshTokenAPiCall = async (url, data) => {

  try {
    let authToken = localStorage.getItem("isAuthenticated");
    const response = await axios.request({
      method: 'post',
      baseURL: apiHost.baseURL,
      url: url,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,

      },
    });

    let tempData = response.data;
    tempData.statusCode = response.status;
    return tempData;
  } catch (error) {
    console.log('Error occurred:', error);

    return {
      statusCode: error.response ? error.response.status : 500,
      message: error.message,
      data: null,
    };
  }
};

export const refreshTokenAPi = async () => {

  let refreshToken = localStorage.getItem("jwtRefreshToken");
  let tempData = {
    refreshToken: refreshToken,
  };
  if (refreshToken) {
    let res = await RefreshTokenAPiCall(`refresh-token`, tempData);
    if (res.statusCode == 200) {
      localStorage.setItem("isAuthenticated", res.accessToken);
      localStorage.setItem("jwtRefreshToken", res.refreshToken);
      window.location.href = '/';
      return true;
    }
     else {
      handleLogout();
      return false;
    }
  }
};


export const getData = async (url, data) => {
  let authToken = localStorage.getItem("isAuthenticated");

  return await axios
    .request({
      method: "get",
      baseURL: apiHost.baseURL,
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
    
      // return response;
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch(async (error) => {
      console.log(" Error occurred: ", error);

      // Check for unauthorized status
      if (error.response && error.response.status === 401) {
        let refreshTokenResult = await refreshTokenAPi();
        if (refreshTokenResult) {
          return  window.location.href = '/';
        } else {
          handleLogout();
        }
      }
      return error;
    });
  // console.log(" response ", response);
  // return response.data;
};


export const postData = async (url, data) => {
  // console.log(" data ", data);
  let authToken = localStorage.getItem("isAuthenticated");
  // let authToken = '';
  // console.log("url-----------", apiHost.baseURL + url);
  return await axios
    .request({
      method: "post",
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      // console.log(" response -------- ", response);
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch(async (error) => {
      let tempData = {};
      if (error.response) {
        if (error.response.status == 422) {
          tempData.statusCode = error.response.status;
          tempData.errors = error.response.data.errors;
        } else if (error.response && error.response.status === 401) {
          let refreshTokenResult = await refreshTokenAPi();
        if (refreshTokenResult) {
          return  window.location.href = '/';
        } else {
          handleLogout();
        }
        } else {
          if (error.response?.data) {
            tempData.data = error.response?.data;
          }
        }
        tempData.statusCode = error.response.status;
      } else if (error.request) {
        tempData.statusCode = 408;
        tempData.message = "Server Timeout";
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        tempData.statusCode = 400;
        tempData.message = "Error setting up the request";
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
      return tempData;
    });
  // console.log(" response ", response);
};

export const postDataWithoutToken = async (url, data) => {
  // console.log(" data123===== ", data);
  console.log("url-----------", apiHost.baseURL + url);

  return await axios
    .request({
      method: "post",
      url: apiHost.baseURL + url,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(" response -------- ", response);
      let tempData = response.data;
      tempData.statusCode = response.status;
      return tempData;
    })
    .catch((error) => {
      let tempData = {};
      if (error.response) {
        if (error.response.status == 422) {
          tempData.statusCode = error.response.status;
          tempData.errors = error.response.data.errors;
        } else {
          if (error.response?.data) {
            tempData.data = error.response?.data;
          }
        }
        tempData.statusCode = error.response.status;
      } else if (error.request) {
        tempData.statusCode = 408;
        tempData.message = "Server Timeout";
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        tempData.statusCode = 400;
        tempData.message = "Error setting up the request";
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
      return tempData;
    });
  // console.log(" response ", response);
};
