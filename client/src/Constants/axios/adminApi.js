import axios from "axios";

 const adminApi=axios.create({baseURL:'http://localhost:9000/admin'})

adminApi.interceptors.request.use(
    function(configs) {
        let token=JSON.parse( localStorage.getItem("adminData"))
      
      if (token) {
        configs.headers["Authorization"] = token;
      }
      return configs;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  
export default adminApi;   