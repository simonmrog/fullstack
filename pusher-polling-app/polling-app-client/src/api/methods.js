import API from "./api";

const methods = {
  get: function (resource) {
    return API.get(resource);
  },
  post: function(resource, payload) {
    return API.post(resource, payload); 
  }
}

export default methods;
