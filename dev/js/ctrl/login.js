
class LoginCtrl {
    constructor(Service, $rootScope, $location, user) {
        this.service = Service;
        this.root = $rootScope;
        this.user = user;
        this.$location = $location;
        this.state = {};
        this.init();
    }
    init() {
        let user = this.user;
        if (user.success && user.data) {
            this.$location.path('/');
        } else {
            this.$location.path('/login');
        }
    }
    submit() {
        this.state.submitting = 1;
        this.service.login(this.state.mode).then(res => {
            this.state.submitting = 0;
            res = res.data;
            if (res.success) {
                this.root.$emit('logined', {});
                this.$location.path('/');
            } else {
                this.state.isSubmitErrorText = '用户名或密码错误'
            }
        }, res => {
            this.state.submitting = 0;
            this.state.isSubmitErrorText = '系统异常，登录失败';
        })
    }
}

LoginCtrl.$inject = ['Service', '$rootScope', '$location', 'user'];

export default LoginCtrl;
