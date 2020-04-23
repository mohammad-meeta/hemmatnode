'use strict';

const PugView = use('app/helpers/pug-view');
const RuleHelper = use('app/helpers/rule-helper');

/**
 * Home controller
 */
function RuleController() {}
module.exports = RuleController;

/**
 * Index route
 */
RuleController.index = async function index(req, res, next) {
    RuleHelper.loadAllRuleData()
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