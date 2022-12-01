import { Router } from 'express';
import { sample_items, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { ItemModel } from '../models/item.model';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
    const foodsCount = await ItemModel.countDocuments();
    if(foodsCount> 0){
    res.send("Seed is already done!");
    return;
    }
    await ItemModel.create(sample_items);
    res.send("Seed Is Done!");
    }
))

router.get("/",asyncHandler(
    async (req, res) => {
      const items = await ItemModel.find();
        res.send(items);
    }
  ))
  
  router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const foods = await ItemModel.find({name: {$regex:searchRegex}})
      res.send(foods);
    }
  ))
  
  router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await ItemModel.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await ItemModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))
  

  router.get("/tag/:tagName",asyncHandler(
    async (req, res) => {
      const foods = await ItemModel.find({tags: req.params.tagName})
      res.send(foods);
    }
  ))
  
  router.get("/:itemId", asyncHandler(
    async (req, res) => {
      const food = await ItemModel.findById(req.params.itemId);
      res.send(food);
    }
  ))

export default router;