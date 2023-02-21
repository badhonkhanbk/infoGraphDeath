import { Field, ID, ObjectType } from 'type-graphql';
import FormatedData from './FotmatedData';
@ObjectType()
export default class ReturnInfoData {
  @Field((type) => [FormatedData])
  diseases: [FormatedData];
  @Field((type) => [FormatedData])
  race: [FormatedData];
  @Field((type) => [FormatedData])
  sex: [FormatedData];
  @Field((type) => [FormatedData])
  age: [FormatedData];
}
