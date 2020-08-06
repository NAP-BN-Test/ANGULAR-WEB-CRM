let mAdditionalInformation = require('../tables/additional-infomation');
let mTemplate = require('../tables/template');
var mMailListDetail = require('../tables/mail-list-detail');
var mMailList = require('../tables/mail-list');
var mMailCampain = require('../tables/mail-campain');
var database = require('../db');
const Result = require('../constants/result');
var mCheckMail = require('../controllers/check-mail');
var mAmazon = require('../controllers/amazon');
var mailmergerCampaingn = require('../controllers/mailmerge-campaign');

const result = require('../constants/result');

function getDataInformation(db, ID) {
    var result = mAdditionalInformation(db).findOne({
        where: { ID: ID },
    })
    return result
}

function handleReplaceText(text, listKey, obj_information) {
    var result = text;
    listKey.forEach(item => {
        var re = RegExp('<<' + item + '>>', 'g');
        result = result.replace(re, obj_information[item] ? obj_information[item] : '');
    })
    return result;
}
async function handlePushDataToBody(text, infID, db) {
    const re = RegExp('<<(.*?)>>', 'g');
    const keyField = []
    while ((matches = re.exec(text)) !== null) {
        keyField.push(matches[1]);
    }
    let obj_information = await getDataInformation(db, infID);
    var result = handleReplaceText(text, keyField, obj_information.dataValues);
    return result
}

module.exports = {
    sendMailList: (req, res) => {
        let body = req.body;
        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            var mail_list_detail = [];
            var information = [];
            console.log(bodyHtml);
            let detail = await mailmergerCampaingn.getInfoFromMailListDetail(db, body.MailListID);
            let ListDataId = []
            detail.forEach(item => {
                mail_list_detail.push(item.dataValues);
                if (item.dataValues.DataID)
                    ListDataId.push(item.dataValues.DataID);
            })
            information = await mailmergerCampaingn.getAdditionalInfomation(db, ListDataId);
            var bodyHtml;
            information.forEach(async item => {
                bodyHtml = await handlePushDataToBody(body.body, item.ID, db);
                await mAmazon.sendEmail(body.myMail, body.Email, body.subject, bodyHtml);
            })
            res.json(Result.ACTION_SUCCESS);
        })
    },
}