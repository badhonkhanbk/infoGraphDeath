import { model, Schema, SchemaTypes } from 'mongoose';
import { Field } from 'type-graphql';

const classSchema = new Schema({
  day: String,
  code: String,
  myCode: String,
  time: String,
  room: String,
  name: String,
  TI: String,
  sec: String,
  subSec: String,
  lab: {
    type: Boolean,
    default: false,
  },
});

const classSchedule = model('class', classSchema);

export default classSchedule;
