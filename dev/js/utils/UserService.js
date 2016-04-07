class UserService {
    constructor(Service, $rootScope) {
        this.service = Service;
        this.root = $rootScope;
    }
    getUser() {
        return new Promise((resolve, reject) => {
            this.service.getcurrentuser().then(res => {
                res = res.data;
                if (res.success && res.data) {
                    this.root.logined = 1;
                    resolve(res);
                } else {
                    this.root.logined = 0;
                    reject(res);
                }
            }, res => reject(res) );
        });
    }
}

UserService.$inject = ['Service', '$rootScope'];

export default UserService;
