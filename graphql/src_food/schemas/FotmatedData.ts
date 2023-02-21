import { Field, ID, ObjectType } from 'type-graphql';
@ObjectType()
export default class FormatedData {
  @Field()
  _id: String;
  @Field()
  sampleSize: Number;
  @Field()
  value: Number;
  @Field()
  percentage: Number;
  @Field({ nullable: true })
  prevalence: Number;
}
