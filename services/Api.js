import AsyncStorage from "@react-native-async-storage/async-storage";

var BASE_API_URL = "http://192.168.1.146:8000/api/";

const loginErrorMessage = "username/password incorrect";
const applicationErrorMessage = "Application ran wrong";

export const apiLogin = async (data) => {
  const endpoint = BASE_API_URL + "api-token-auth/";
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const jsonData = JSON.stringify(data);

  return fetch(endpoint, {
    method: method,
    headers: headers,
    body: jsonData,
  })
    .then((response) => {
      // http status 200 = success
      if (response.status != 200) {
        return { error: loginErrorMessage };
      }
      return response.json(); // parses response to JSON format
    })
    .then((jsonResponse) => {
      return jsonResponse;
    })
    .catch((err) => {
      console.log("Login failure:\n" + err);
      return { error: applicationErrorMessage };
    });
};

export const apiRegister = async (data) => {
  const endpoint = BASE_API_URL + "user-register/";
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const jsonData = JSON.stringify(data);
  return fetch(endpoint, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers: headers,
    body: jsonData, // body data type must match "Content-Type" header
  })
    .then((response) => {
      if (response.status == 201) {
        return { created: true };
      }
      return { created: false };
    })
    .catch((err) => {
      console.log("Register failure:\n" + err);
      return { error: applicationErrorMessage };
    });
};

export const getProducts = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const endpoint = BASE_API_URL + "products/";
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Token ${userToken}`,
  };

  return fetch(endpoint, {
    method: method,
    headers: headers,
  })
    .then((response) => {
      if (response.status != 200) {
        return { error: "Cannot fetch any products" };
      }
      return response.json();
    })
    .then((jsonResponse) => {
      return jsonResponse;
    });
};

export const getProduct = async (id) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const endpoint = BASE_API_URL + `product/${id}/`;
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Token ${userToken}`,
  };

  return fetch(endpoint, {
    method: method,
    headers: headers,
  })
    .then((response) => {
      if (response.status != 200) {
        return { error: "Get product data failure" };
      }
      return response.json();
    })
    .then((jsonResponse) => {
      return jsonResponse;
    });
};

export const makePayment = async (orderData) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const endpoint = BASE_API_URL + `payment/`;
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Token ${userToken}`,
  };
  const jsonData = JSON.stringify(orderData);

  return fetch(endpoint, {
    method: method,
    headers: headers,
    body: jsonData,
  })
    .then((response) => {
      if (response.status != 200) {
        return { error: "Errors occurred when making payment" };
      }
      return response.json();
    })
    .then((jsonResponse) => {
      return jsonResponse;
    });
};

export const cancelPayment = async (payment_token) => {
  const endpoint = BASE_API_URL + `cancel/?token=${payment_token}/`;
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return fetch(endpoint, {
    method: method,
    headers: headers,
  }).then((response) => console.log("Order cancelled in server"));
};

/**
 * HK	PERSONAL	isem3027@buyer1.com	PaypalBuyer
 * HK	PERSONAL	isem3027@buyer2.com	PaypalBuyer
 * US	PERSONAL	isem3027@buyer3.com	PaypalBuyer
 * HK	BUSINESS	isem3027@seller.com	PaypalSeller
 */
