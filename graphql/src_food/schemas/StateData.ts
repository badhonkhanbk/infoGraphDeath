import { Field, ID, ObjectType } from 'type-graphql';
import FormatedData from './FotmatedData';
@ObjectType()
export default class StateData {
  @Field()
  state: String;
  @Field((type) => FormatedData)
  fotmatedData: FormatedData;
}
