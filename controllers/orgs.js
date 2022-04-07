const orgsModel = require('../model/orgs');

exports.list = (req, res) => {
    const context = {
        title: "Organisation",
        data: orgsModel.list()
    };
    res.render("orgs/list", context);
};

exports.view = (req, res) => {
    const context = {
        title: "Organisation",
        data: orgsModel.get(req.params.id)
    };
    res.render("orgs/view", context);
};