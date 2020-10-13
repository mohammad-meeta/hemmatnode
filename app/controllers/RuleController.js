'use strict';

const PugView = use('app/helpers/pug-view');
const RuleHelper = use('app/helpers/rule-helper');

/**
 * Home controller
 */
function RuleController() { }
module.exports = RuleController;

/**
 * Index route
 */
RuleController.paginateRule = async function paginateRule(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    RuleHelper.loadAllRuleData(dataPaginate)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};