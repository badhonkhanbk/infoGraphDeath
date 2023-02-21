import { Field, ID, ObjectType } from 'type-graphql';
import FormatedData from './FotmatedData';
@ObjectType()
export default class CompareData {
  @Field()
  year: String;
  @Field((type) => [FormatedData])
  fotmatedData: [FormatedData];
}
