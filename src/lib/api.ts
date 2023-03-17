import axios from "axios";

export class Api {
  constructor() {}

  getRequest(path: string) {
    return axios
      .get(path)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  postRequest(path: string, param: object) {
    return axios
      .post(path, param)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
