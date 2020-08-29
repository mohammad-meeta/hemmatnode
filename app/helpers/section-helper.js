
'use strict';

const mongoose = require('mongoose');

/**
 * Section controller
 */
function SectionHelper() { }
module.exports = SectionHelper;

/**
 * find all dep cat data result 
 */
SectionHelper.loadAllSectionData = function loadAllSectionData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Section = mongoose.model('Section');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Section.find(filterQuery, projection, {
                sort: {
                    'created_at': -1
                },
                skip: skip,
                limit: pageSize
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
SectionHelper.loadAllSectionCountData = function loadAllSectionCountData() {
    const Section = mongoose.model('Section');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Section.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Section data result 
 */
SectionHelper.loadSectionData = function loadSectionData(sectionTitle) {
    const Section = mongoose.model('Section');

    const filterQuery = {
        _id: sectionTitle
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Section.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Section data  
 */
SectionHelper.insertNewSection = function insertNewSection(data) {

    return new Promise((resolve, reject) => {
        const Section = mongoose.model('Section');
        const section = new Section(data)

        section.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update Section data  
 */
SectionHelper.updateSectionData = function updateSectionData(data) {
    return new Promise((resolve, reject) => {
        const Section = mongoose.model('Section');
        Section.findByIdAndUpdate(data._id, data, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete section data  
 */
SectionHelper.deleteSection = function deleteSection(data) {
    return new Promise((resolve, reject) => {
        const Section = mongoose.model('Section');
        Section.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false , new: true})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};