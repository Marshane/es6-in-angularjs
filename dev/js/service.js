import api from './api.js';
import module from './module.js';

let Service = ($http) => {
    return {
        getconsul: () => $http({method: 'get', url: api.getconsul}),
        getconfig: () => $http({method: 'get', url: api.getconfig}),
        deleteconfig: id => $http({method: 'get', url: api.deleteconfig(id)}),
        addconfig: (obj) => $http({method: 'post', url: api.addconfig, data: obj}),
        editconfig: (obj) => $http({method: 'post', url: api.editconfig, data: obj}),
        getparentconfig: () => $http({method: 'get', url: api.getparentconfig}),
        getservicesname: () => $http({method: 'get', url: api.getservicesname}),
        synData: () => $http({method: 'get', url: api.synData}),

        getcurrentuser: () => $http.get(api.getcurrentuser),
        logout: () => $http.get(api.logout),

        addblacknode: (data) => $http.post(api.addblacknode, data),
        deleteblacknode: (id) => $http.get(api.deleteblacknode(id)),
        editblacknode: (data) => $http.post(api.editblacknode, data),
        getblacknodes: () => $http.get(api.getblacknodes),

        getmavenmoduledtos: () => $http.get(api.getmavenmoduledtos),
        login: (data) => $http.post(api.login, data)
    }
};

Service.$inject = ['$http'];

module.factory('Service', Service);
