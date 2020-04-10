'use strict';

/**
 * DepartmentCategory controller
 */
function DepartmentCategoryController() {}
module.exports = DepartmentCategoryController;

/**
 * Register a new department-category
 */
DepartmentCategoryController.register = async function register(req, res, next) {
    res.send({
            success: true,
            data: {
                id: 1
            }
        })
        .end(200);
};

/**
 * Delete a department-category
 */
DepartmentCategoryController.destroy = async function destroy(req, res, next) {
    res.send({
            success: true,
            data: {
                id: 2
            }
        })
        .end(200);
};
