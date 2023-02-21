import { Field, ID, ObjectType } from 'type-graphql';
@ObjectType()
export default class myClass {
  @Field()
  day: String;
  @Field()
  code: String;
  @Field()
  myCode: String;
  @Field()
  time: String;
  @Field()
  room: String;
  @Field()
  name: String;
  @Field()
  TI: String;
  @Field()
  sec: String;
  @Field({ nullable: true })
  subSec: String;
  @Field({ nullable: true })
  lab: Boolean;
}
