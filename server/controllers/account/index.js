const { account } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const { trip_id } = req.query;
        const data = await account.findAll({ where: { trip_id } });
        let data_slack_id = "";
        data.forEach((ele) => {
          data_slack_id += `${ele.dataValues.id}, `;
        });
        await slack.slack("Account Get 200", `id : ${data_slack_id}`);
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Account Get 501");
      res.status(501).send("Acoount Get");
    }
  },

  post: async (req, res) => {
    try {
      console.log("1");
      const { trip_id, category, item_name, price, spent_person, gps, memo, write_date } = req.body;
      if (!category || !item_name || !price || !spent_person || !write_date) {
        await slack.slack("Account Post 422");
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }
      console.log(2);
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const payload = {
          trip_id,
          category,
          item_name,
          price,
          spent_person,
          gps,
          memo,
          write_date,
        };
        console.log(3);
        console.log(req.body);
        console.log(payload);
        const result = await account.create(payload);
        console.log(4);
        await slack.slack("Account Post 201", `id : ${result.id}`);
        console.log(5);
        res.status(201).send({ data: { id: result.id }, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Account Post 501");
      res.status(501).send("Account Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.account_id;
        const accountInfo = await account.findOne({
          where: { id: id },
        });
        if (accountInfo) {
          await account.destroy({
            where: { id: id },
          });
          await slack.slack("Account Delete 200", `id : ${id}`);
          res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
        } else {
          await slack.slack("Account Delete 404", `id : ${id}`);
          res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "account already delete",
          });
        }
      }
    } catch (err) {
      await slack.slack("Account Delete 501");
      res.status(501).send("Account Delete");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.account_id;
        const {
          new_category,
          new_item_name,
          new_price,
          new_spent_person,
          new_memo,
          new_write_date,
        } = req.body;
        const accountInfo = await account.findOne({
          where: { id: id },
        });
        const { category, item_name, price, spent_person, memo, write_date } = accountInfo;
        if (accountInfo) {
          if (
            category === new_category &&
            item_name === new_item_name &&
            price === new_price &&
            spent_person === new_spent_person &&
            memo === new_memo &&
            write_date === new_write_date
          ) {
            // 바뀐게 없음
            await slack.slack("Account Patch 412", `id : ${id}`);
            res.status(412).send({
              data: { id: id },
              accessToken: validity.accessToken,
              message: "No Change",
            });
          } else {
            await account.update(
              {
                category: new_category,
                item_name: new_item_name,
                price: new_price,
                spent_person: new_spent_person,
                memo: new_memo,
                write_date: new_write_date,
              },
              { where: { id: id } }
            );
            await slack.slack("Account Patch 200", `id : ${id}`);
            res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
          }
        } else {
          //가계부 정보 없음
          await slack.slack("Account Patch 404", `id : ${id}`);
          res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "No Account Info",
          });
        }
      }
    } catch (err) {
      await slack.slack("Account Patch 501");
      res.status(501).send("Account Patch");
    }
  },
};
