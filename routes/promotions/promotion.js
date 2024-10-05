const express = require('express');
const PromotionController = require('../../routes/promotions/promotions.controllers')
const Promotion = express.Router();

Promotion.post('/', PromotionController.addOne);

Promotion.get('/', PromotionController.GetAll);

Promotion.put('/:id', PromotionController.UpdateOne);

Promotion.delete('/:id', PromotionController.DeleteOne);

module.exports = Promotion;
