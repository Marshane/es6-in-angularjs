import innerTable from '../../tpl/maven-inner-table.html';
import innerTable2 from '../../tpl/maven-inner-table2.html';

export default class Maven {
    constructor(Service, $rootScope) {
        this.service = Service;
        this.root = $rootScope;
        this.data = [];
        this.initData();
        this.colDefs = [
            {
                field: 'dependencys',
                className: 'wrapTd',
                cellTemplate: innerTable
            },
            {
                field: 'project',
                className: 'wrapTd',
                cellTemplate: innerTable2
            }
        ]
    }
    initData() {
        this.root.loading = 1;
        this.service.getmavenmoduledtos().then(res => {
            res = res.data;
            this.root.loading = 0;
            if (res.success) {
                console.log(res.data);
                this.data = res.data;
            }
        })
    }
}
