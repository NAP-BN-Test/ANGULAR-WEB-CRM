const Constant = require('../constants/constant');
const Op = require('sequelize').Op;

const Result = require('../constants/result');

var moment = require('moment');

var database = require('../db');
var user = require('../controllers/user');
const modules = require('../constants/modules');

let mMailmergeCampaign = require('../tables/mailmerge-campaign');
let mAdditionalInformation = require('../tables/additional-infomation');
let mTemplate = require('../tables/template');
var mModules = require('../constants/modules');
let mUser = require('../tables/user');
const result = require('../constants/result');

module.exports = {
    getListMailmergeCampaign: (req, res) => {
        let body = req.body;
        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            let Mailmerge = mMailmergeCampaign(db);
            Mailmerge.belongsTo(mUser(db), { foreignKey: 'UserID', sourceKey: 'UserID', as: 'User' });
            Mailmerge.belongsTo(mTemplate(db), { foreignKey: 'Template_ID', sourceKey: 'Template_ID', as: 'Template' });

            Mailmerge.count().then(all => {
                Mailmerge.findAll({
                    include: [
                        { model: mUser(db), required: false, as: 'User' },
                        { model: mTemplate(db), required: false, as: 'Template' }
                    ],
                    order: [['TimeCreate', 'DESC']],
                    offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                    limit: Number(body.itemPerPage)
                }).then(async data => {
                    let array = [];
                    if (data) {
                        data.forEach(item => {
                            array.push({
                                ID: item.ID,
                                Name: item.Name ? item.Name : null,
                                Template_ID: item.Template_ID ? item.Template_ID : null,
                                TemplateName: item.Template ? item.Template.Name : "",
                                Create_Date: mModules.toDatetime(item.Create_Date) ? item.Create_Date : null,
                                Create_User: item.Create_User ? item.Create_User : null,
                                UserName: item.User ? item.User.Name : "",
                                Number_Address: item.Number_Address ? item.Number_Address : null,
                                Description: item.Description ? item.Description : null,
                                UserID: item.UserID ? item.UserID : null,
                                TimeStart: mModules.toDatetime(item.timeStart) ? item.timeStart : null,
                                TimeRemind: mModules.toDatetime(item.timeRemind) ? item.timeRemind : null,
                                TimeCreate: mModules.toDatetime(item.TimeCreate),
                                TimeUpdate: mModules.toDatetime(item.TimeUpdate),
                            });
                        });

                        var result = {
                            status: Constant.STATUS.SUCCESS,
                            message: '',
                            array, all
                        }

                        res.json(result);
                    }
                })
            })
        })
    },
    addMailmergeCampaign: (req, res) => {
        let body = req.body;
        let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            mMailmergeCampaign(db).create({
                Name: body.Name ? body.Name : null,
                Template_ID: body.Template_ID ? body.Template_ID : null,
                Create_Date: body.Create_Date ? body.Create_Date : null,
                Create_User: body.Create_User ? body.Create_User : null,
                Number_Address: body.Number_Address ? body.Number_Address : null,
                UserID: body.UserID ? body.UserID : null,
                TimeStart: moment(body.timeStart).format('YYYY-MM-DD HH:mm:ss.SSS') ? body.timeStart : null,
                TimeRemind: body.timeRemind ? moment(body.timeRemind).format('YYYY-MM-DD HH:mm:ss.SSS') : null,
                TimeCreate: now,
                TimeUpdate: now,
                Description: body.description,
            }).then(data => {
                obj = {
                    ID: data.ID,
                    Name: data.Name ? data.Name : null,
                    Template_ID: data.Template_ID ? data.Template_ID : null,
                    Create_Date: mModules.toDatetime(data.Create_Date) ? data.Create_Date : null,
                    Create_User: data.Create_User ? data.Create_User : null,
                    Number_Address: data.Number_Address ? data.Number_Address : null,
                    Description: data.Description ? data.Description : null,
                    UserID: data.UserID ? data.UserID : null,
                    TimeStart: mModules.toDatetime(data.timeStart) ? data.timeStart : null,
                    TimeRemind: mModules.toDatetime(data.timeRemind) ? data.timeRemind : null,
                    TimeCreate: mModules.toDatetime(data.TimeCreate),
                    TimeUpdate: mModules.toDatetime(data.TimeUpdate),
                }
                var result = {
                    status: Constant.STATUS.SUCCESS,
                    message: Constant.MESSAGE.ACTION_SUCCESS,
                    obj: obj
                }
                res.json(result);
            }, err => {
                var result = {
                    status: Constant.STATUS.FAIL,
                    message: Constant.MESSAGE.BINDING_ERROR,
                    ojb: err.fields
                }
                res.json(result);
            })
        })
    },
    updateMailmergeCampaign: (req, res) => {
        let body = req.body;
        let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {

            try {
                let update = [];
                if (body.Name)
                    update.push({ key: 'Name', value: body.Name });
                if (body.Template_ID)
                    update.push({ key: 'Template_ID', value: body.Template_ID });
                if (body.Create_Date)
                    update.push({ key: 'Create_Date', value: body.Create_Date });
                if (body.Create_User)
                    update.push({ key: 'Create_User', value: body.Create_User });
                if (body.Number_Address)
                    update.push({ key: 'Number_Address', value: body.Number_Address });
                if (body.Description)
                    update.push({ key: 'Description', value: body.Description });
                if (body.UserID)
                    update.push({ key: 'UserID', value: body.UserID });
                if (body.TimeRemind)
                    update.push({ key: 'TimeRemind', value: body.TimeRemind });
                if (body.TimeStart)
                    update.push({ key: 'TimeStart', value: body.TimeStart });

                database.updateTable(update, mMailmergeCampaign(db), body.ID).then(response => {
                    if (response == 1) {
                        res.json(Result.ACTION_SUCCESS);
                    } else {
                        res.json(Result.SYS_ERROR_RESULT);
                    }
                })
            } catch (error) {
                console.log(error);
                res.json(Result.SYS_ERROR_RESULT)

            }
        })
    },
    getDetailMailmergeCampaign: (req, res) => {
        let body = req.body;

        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            let Mailmerge = mMailmergeCampaign(db);
            Mailmerge.belongsTo(mUser(db), { foreignKey: 'UserID', sourceKey: 'UserID', as: 'User_Name' });
            Mailmerge.belongsTo(mTemplate(db), { foreignKey: 'Template_ID', sourceKey: 'Template_ID', as: 'Tempalte_Name' });

            Mailmerge.findOne({
                include: [
                    { model: mUser(db), required: false, as: 'User_Name' },
                    { model: mTemplate(db), required: false, as: 'Tempalte_Name' }
                ],
                where: { ID: body.ID }
            }).then(async data => {
                if (data) {
                    obj = {
                        ID: data.ID,
                        Name: data.Name ? data.Name : null,
                        Template_ID: data.Template_ID ? data.Template_ID : null,
                        Tempalte_Name: data.Tempalte_Name ? data.Tempalte_Name.Name : "",
                        Create_Date: mModules.toDatetime(data.Create_Date) ? data.Create_Date : null,
                        Create_User: data.Create_User ? data.Create_User : null,
                        Number_Address: data.Number_Address ? data.Number_Address : null,
                        Description: data.Description ? data.Description : null,
                        UserID: data.UserID ? data.UserID : null,
                        User_Name: data.User_Name ? data.User_Name.Name : "",
                        TimeStart: mModules.toDatetime(data.timeStart) ? data.timeStart : null,
                        TimeRemind: mModules.toDatetime(data.timeRemind) ? data.timeRemind : null,
                        TimeCreate: mModules.toDatetime(data.TimeCreate),
                        TimeUpdate: mModules.toDatetime(data.TimeUpdate),
                    }
                    var result = {
                        status: Constant.STATUS.SUCCESS,
                        message: '',
                        obj: obj
                    }
                    res.json(result);
                }

                else {
                    var result = {
                        status: Constant.STATUS.FAIL,
                        message: Constant.MESSAGE.DATA_NOT_FOUND,
                    }
                    res.json(result);
                }
            })
        })
    },
    deleteMailmergeCampaign: (req, res) => {
        let body = req.body;
        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {

            if (body.MailmergeCampaignIDs) {
                let listMailmergeCampaign = body.MailmergeCampaignIDs;
                let listMailmergeCampaignID = [];
                listMailmergeCampaign.forEach(item => {
                    listMailmergeCampaignID.push(Number(item + ""));
                });

                mUser(db).findOne({ where: { ID: body.userID } }).then(async user => {
                    if (user.Roles == Constant.USER_ROLE.MANAGER) {
                        await mMailmergeCampaign(db).destroy(
                            {
                                where: {
                                    [Op.or]: {
                                        ID: { [Op.in]: listMailmergeCampaignID }
                                    }
                                }
                            },
                        ).then(() => {
                            res.json(Result.ACTION_SUCCESS);
                        });
                    }
                });
            }
        })
    },

    // --------------------- Template -----------------------------------------------------------
    getListMailmergeTemplate: (req, res) => {
        let body = req.body;
        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            let Template = mTemplate(db);
            Template.belongsTo(mAdditionalInformation(db), { foreignKey: 'dataID', sourceKey: 'dataID', as: 'dataName' });

            Template.count().then(all => {
                Template.findAll({
                    include: [
                        { model: mAdditionalInformation(db), required: false, as: 'dataName' }
                    ],
                    order: [['TimeCreate', 'DESC']],
                    offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                    limit: Number(body.itemPerPage)
                }).then(data => {
                    let array = [];
                    if (data) {
                        data.forEach(item => {
                            array.push({
                                ID: item.ID,
                                Name: item.Name,
                                body: item.body ? item.body : null,
                                dataID: item.dataID ? item.dataID : null,
                                dataName: item.dataName ? item.dataName.OurRef : "",
                                TimeStart: mModules.toDatetime(item.timeStart) ? item.timeStart : null,
                                TimeRemind: mModules.toDatetime(item.timeRemind) ? item.timeRemind : null,
                                TimeCreate: mModules.toDatetime(item.TimeCreate),
                                TimeUpdate: mModules.toDatetime(item.TimeUpdate),
                                Description: item.description ? item.description : null
                            });
                        });

                        var result = {
                            status: Constant.STATUS.SUCCESS,
                            message: '',
                            array, all
                        }

                        res.json(result);
                    }
                })
            })
        })
    },
    addMailmergeTemplate: (req, res) => {
        let body = req.body;
        let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            mTemplate(db).create({
                Name: body.Name,
                body: body.body ? body.body : null,
                dataID: body.dataID ? body.dataID : null,
                TimeStart: moment(body.timeStart).format('YYYY-MM-DD HH:mm:ss.SSS') ? body.timeStart : null,
                TimeRemind: body.timeRemind ? moment(body.timeRemind).format('YYYY-MM-DD HH:mm:ss.SSS') : null,
                TimeCreate: now,
                TimeUpdate: now,
                Description: body.description
            }).then(data => {
                obj = {
                    ID: data.ID,
                    Name: data.Name,
                    body: data.body ? data.body : null,
                    dataID: data.dataID ? data.dataID : null,
                    TimeStart: mModules.toDatetime(data.timeStart) ? data.timeStart : null,
                    TimeRemind: mModules.toDatetime(data.timeRemind) ? data.timeRemind : null,
                    TimeCreate: mModules.toDatetime(data.TimeCreate),
                    TimeUpdate: mModules.toDatetime(data.TimeUpdate),
                    Description: data.description ? data.description : null
                }
                var result = {
                    status: Constant.STATUS.SUCCESS,
                    message: Constant.MESSAGE.ACTION_SUCCESS,
                    obj: obj
                }
                res.json(result);
            }, err => {
                var result = {
                    status: Constant.STATUS.FAIL,
                    message: Constant.MESSAGE.BINDING_ERROR,
                    ojb: err.fields
                }
                res.json(result);
            })
        })
    },
    updateMailmergeTemplate: (req, res) => {
        let body = req.body;

        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {

            try {
                let update = [];
                if (body.body)
                    update.push({ key: 'body', value: body.body });
                if (body.Name)
                    update.push({ key: 'Name', value: body.Name });
                if (body.dataID)
                    update.push({ key: 'dataID', value: body.dataID });
                if (body.Description)
                    update.push({ key: 'Description', value: body.Description });
                if (body.UserID)
                    update.push({ key: 'UserID', value: body.UserID });
                if (body.TimeRemind)
                    update.push({ key: 'TimeRemind', value: body.TimeRemind });
                if (body.TimeStart)
                    update.push({ key: 'TimeStart', value: body.TimeStart });

                database.updateTable(update, mTemplate(db), body.ID).then(response => {
                    if (response == 1) {
                        res.json(Result.ACTION_SUCCESS);
                    } else {
                        res.json(Result.SYS_ERROR_RESULT);
                    }
                })
            } catch (error) {
                console.log(error);
                res.json(Result.SYS_ERROR_RESULT)

            }
        })
    },
    getDetailMailmergeTemplate: (req, res) => {
        let body = req.body;

        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            let Template = mTemplate(db);
            Template.belongsTo(mAdditionalInformation(db), { foreignKey: 'dataID', sourceKey: 'dataID', as: 'dataName' });

            Template.findOne({
                include: [
                    { model: mAdditionalInformation(db), required: false, as: 'dataName' }
                ],
                where: { ID: body.ID },
            }).then(data => {
                if (data) {
                    obj = {
                        ID: data.ID,
                        Name: data.Name,
                        body: data.body ? data.body : null,
                        dataID: data.dataID ? data.dataID : null,
                        dataName: data.dataName ? data.dataName.OurRef : "",
                        TimeStart: mModules.toDatetime(data.timeStart) ? data.timeStart : null,
                        TimeRemind: mModules.toDatetime(data.timeRemind) ? data.timeRemind : null,
                        TimeCreate: mModules.toDatetime(data.TimeCreate),
                        TimeUpdate: mModules.toDatetime(data.TimeUpdate),
                        Description: data.description ? data.description : null
                    }
                    var result = {
                        status: Constant.STATUS.SUCCESS,
                        message: '',
                        obj: obj
                    }
                    res.json(result);
                }
                else {
                    var result = {
                        status: Constant.STATUS.FAIL,
                        message: Constant.MESSAGE.DATA_NOT_FOUND,
                    }
                    res.json(result);
                }
            })
        })
    },
    deleteMailmergeTemplate: (req, res) => {
        let body = req.body;
        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {

            if (body.MailmergeTemplateIDs) {
                let listMailmergeTemplate = body.MailmergeTemplateIDs;
                let listMailmergeTemplateID = [];
                listMailmergeTemplate.forEach(item => {
                    listMailmergeTemplateID.push(Number(item + ""));
                });

                mTemplate(db).findOne({ where: { ID: body.userID } }).then(async user => {
                    // if (user.Roles == Constant.USER_ROLE.MANAGER) {
                    let update = [];
                    update.Template_ID = null;
                    await mMailmergeCampaign(db).update(update,
                        {
                            where: {
                                [Op.or]: {
                                    Template_ID: { [Op.in]: listMailmergeTemplateID }
                                }
                            }
                        });
                    await mTemplate(db).destroy(
                        {
                            where: {
                                [Op.or]: {
                                    ID: { [Op.in]: listMailmergeTemplateID }
                                }
                            }
                        },
                    ).then(() => {
                        res.json(Result.ACTION_SUCCESS);
                    });
                    // }
                });
            }
        })
    },
    getAllMailmergeTemplate: (req, res) => {//take this list for dropdown
        let body = req.body;

        database.checkServerInvalid(body.ip, body.dbName, body.secretKey).then(async db => {
            mTemplate(db).findAll().then(data => {
                var array = [];

                data.forEach(elm => {
                    array.push({
                        id: elm['ID'],
                        name: elm['Name'],
                    })
                });
                var result = {
                    status: Constant.STATUS.SUCCESS,
                    message: '',
                    array: array
                }
                res.json(result)
            })

        })
    },
}