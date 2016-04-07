const TEXT = ['添加成功~', '编辑成功~'];

export default class blacklistCtrl {
    constructor(Service, $rootScope, msTip, msConfirm, msModal) {
        this.state = {};
        this.service = Service;
        this.root = $rootScope;
        this.tip = msTip;
        this.msModal = msModal;
        this.msConfirm = msConfirm;
        this.initData();
    }
    initData() {
        this.root.loading = 1;
        this.service.getblacknodes().then(res => {
            res = res.data;
            this.root.loading = 0;
            if (res.success) {
                this.list = res.data;
            }
        })
    }
    onDel(id) {
        console.log(id);
        this.msConfirm.show({txt: '确认删除该条数据?', callback: () => {
            this.service.deleteblacknode(id).then(res => {
                res = res.data;
                if (res.success) {
                    this.initData();
                    this.tip.show({txt: '删除成功~'});
                }
            })
        }});
    }
    onAddOrEdit(bool, mode) {
        this.state.isEdit = bool;
        this.state.mode = mode || {};
        this.modalIns = this.msModal({
            controller: AddOrEditCtrl,
            controllerAs: 'vm',
            template: require('../../tpl/modal/blacklistAddOrEdit.html')
        });
        this.modalIns.show({modalIns: this.modalIns, callback: this.postData.bind(this), state: this.state});
    }
    postData(mode) {
        return new Promise((resolve, reject) => {
            this.service[this.state.isEdit ? 'editblacknode' : 'addblacknode'](mode).then((res) => {
                res = res.data;
                if (res.success) {
                    this.initData();
                    this.modalIns.hide();
                    this.tip.show({txt: TEXT[this.state.isEdit]});
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        })
    }
}

class AddOrEditCtrl {
    constructor(scope) {
        this.scope = scope;
        this.state = {};
        Object.assign(this.state, this.scope.state);
        console.log(this.state);
    }
    submit() {
        this.state.submitting = 1;
        this.scope.callback(this.state.mode).then((res) => {
            this.state.submitting = 0;
            this.scope.$apply();
        })
        .catch((res) => {
            this.state.isSubmitErrorText = res.data || '网络出现异常啦~';
            this.state.submitting = 0;
            this.scope.$apply();
        });
    }
    hideError() {
        this.state.isSubmitErrorText = '';
    }
    hide() {
        this.scope.modalIns.hide();
    }
}
AddOrEditCtrl.$inject = ['$scope'];
