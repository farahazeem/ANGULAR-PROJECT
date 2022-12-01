import { Schema, model } from 'mongoose';

/** This interface in the backend will be the same as we
 //* defined in the frontend/item.ts class only remove ! and ?
 //*/
export interface Item {
    id:string;
    name:string;
    price:number;
    tags:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
 }

 export const ItemSchema = new Schema<Item>(
   {
      name: {type: String, required:true},
      price: {type: Number, required:true},
      tags: {type: [String]},
      favorite: {type: Boolean, default:false},
      stars: {type: Number, required:true},
      imageUrl: {type: String, required:true},
      origins: {type: [String], required:true}
  },{
      toJSON:{
          virtuals: true
      },
      toObject:{
          virtuals: true
      },
      timestamps:true
  }
 );

 export const ItemModel = model<Item>('item', ItemSchema);
 