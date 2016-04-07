let prefix = '';
if (__DEV__) {
    prefix = ['http://', __DEV_IP_ADDRESS__ === 'undefined' ? '0.0.0.0' : __DEV_IP_ADDRESS__ , ':5000'].join('')
}
export default {
    getconsul: `${prefix}/consul/getconsuldata?_r=${+new Date}`,
    getconfig: `${prefix}/consul/getconfig?_r=${+new Date}`,
    deleteconfig: id => `${prefix}/consul/deleteconfig/${id}`,
    addconfig: `${prefix}/consul/addconfig`,
    editconfig: `${prefix}/consul/editconfig`,
    getparentconfig: `${prefix}/consul/getparentconfig`,
    getservicesname: `${prefix}/consul/getservicesname`,
    synData: `${prefix}/consul/synData`,

    getcurrentuser: `${prefix}/login/getcurrentuser`,
    logout: `${prefix}/login/logout`,

    addblacknode: `${prefix}/consul/addblacknode`,
    deleteblacknode: id => `${prefix}/consul/deleteblacknode/${id}`,
    editblacknode: `${prefix}/consul/editblacknode`,
    getblacknodes: `${prefix}/consul/getblacknodes`,

    getmavenmoduledtos: `${prefix}/git/getmavenmoduledtos`,
    login: `${prefix}/login/login.do`
};
