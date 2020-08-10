'use strict';

const Ghasedak = require('ghasedak');
const mongoose = require('mongoose');
const UserHelper = use('app/helpers/user-helper');
/**
 * dep cat controller
 */
function SMSSenderHelper() {}
module.exports = SMSSenderHelper;

/**
 * insert file data  
 */
SMSSenderHelper.sendSms = async function sendSms(allData) {
    let profiles = [];
    const data = allData.user_list;
    const date = allData.date;
    const place = allData.place;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const result = await UserHelper.loadUserDataID(element);

        const profile = {
            name: result[0].profile.first_name,
            family: result[0].profile.last_name,
            cellphone: result[0].cellphone
        }
        profiles.push(profile);
    }

    const ghasedak = new Ghasedak("4e9e879ec79b09ce07d8f7adaff6097db8e5a1fe2b2a4347dd337186066adad2");
    for (let index = 0; index < profiles.length; index++) {
        const element = profiles[index];
        const msg = "جناب " + element.name + ' ' + element.family + ' شما به جلسه در تاریخ و محل ' + date + ' ' + place + 'دعوت شده اید';
        ghasedak.send({
            message: msg,
            receptor: element.cellphone,
            lineNumber: "10008566"
        });
    }
};