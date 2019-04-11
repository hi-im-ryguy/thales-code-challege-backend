const express = require('express');
const usersOriginal = require('../data/users');
const { check, validationResult } = require('express-validator/check');

module.exports = app => {
  let usersCopy = [ ...usersOriginal ];
  let userCount = usersCopy.length;

  const router = express.Router();
  router.delete('/food/', (req, res) => {
    const idToDelete = req.query.id;
    try {
      validationResult(req).throw();
      userCount -= 1;
      usersCopy = usersCopy.filter(x => {
        return x.id != idToDelete;
      })
      res.send({
        success: true
      })
    } catch (err) {
      res.status(422).send(err.toString());
    }
  });
  router.get('/foods/', (req, res) => {
    const sorted = usersCopy.sort((a, b) => {
      if(a.hero_name < b.hero_name) { return -1; }
      if(a.hero_name > b.hero_name) { return 1; }
      return 0;
    });
    var normalizedArray = [];
    var uniqueNamesIndex = [];
    for (var i = 0; i < sorted.length; i++) {
      if (normalizedArray.some((element) =>
      element.hero_name === sorted[i]['hero_name']
      && element.first_name === sorted[i]['first_name']
      && element.last_name === sorted[i]['last_name'])) {

        var myIndex = uniqueNamesIndex[uniqueNamesIndex.findIndex((element) =>
          element.hero_name === sorted[i]['hero_name']
          && element.first_name === sorted[i]['first_name']
          && element.last_name === sorted[i]['last_name']
        )]['my_index']

        normalizedArray[myIndex]['favorite_foods'].push({
          'id': sorted[i]['id'],
          'food': sorted[i]['favorite_food']
        })
      }
      else {
        normalizedArray.push({
          'hero_name': sorted[i]['hero_name'],
          'first_name': sorted[i]['first_name'],
          'last_name': sorted[i]['last_name'],
          'favorite_foods': [{
            'id': sorted[i]['id'],
            'food': sorted[i]['favorite_food']
          }],
        })
        uniqueNamesIndex.push({
          'my_index': normalizedArray.length - 1,
          'hero_name': sorted[i]['hero_name'],
          'first_name': sorted[i]['first_name'],
          'last_name': sorted[i]['last_name']
        })
      }
    }
    normalizedArray = JSON.stringify(normalizedArray)
    res.send(normalizedArray);
  });
  router.post('/food/', [
    check('hero_name').exists(),
    check('first_name').exists(),
    check('last_name').exists()
  ],(req, res) => {
    try {
      validationResult(req).throw();
      userCount += 1;
      usersCopy.push({
        id: userCount,
        ...req.body
      })
      res.json({
        success: userCount
      })
    } catch (err) {
      res.status(422).send(err.toString());
    }
  });

  app.use('/users', router);
}