import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    roll: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const countSchema=new Schema({
  
    id:{type:String,required:true},
    seq:{type:Number,required:true}
})
export const userModel = mongoose.model("users", userSchema);
export const countModel =mongoose.model("counter",countSchema);

