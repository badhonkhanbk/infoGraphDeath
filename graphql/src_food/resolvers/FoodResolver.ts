import { Resolver, Mutation, ID, Query, Arg } from 'type-graphql';

import csv from 'csvtojson';

import InfoGraphic from '../../../models/infoGraphic';
import OverAllModel from '../../../models/Overall';

import AppError from '../../../utils/AppError';

import fs from 'fs';
import FormatedData from '../schemas/FotmatedData';
import ReturnInfoData from '../schemas/ReturnInfoData';
import ClassScheduleModel from '../../../models/class';
import myClass from '../schemas/myClass';

@Resolver()
export default class FoodResolver {
  @Query(() => String)
  async csvConverter() {
    const csvFilePath = './temp/info.csv';
    const jsonArray = await csv().fromFile(csvFilePath);
    fs.writeFileSync('./temp/infoData2.json', JSON.stringify(jsonArray));
    return 'done';
  }

  // @Query(() => String)
  // async modifyData() {
  //   let allData = await InfoGraphic.find().skip(50000);

  //   for (let i = 0; i < allData.length; i++) {
  //     let sampleSizeInNumber;
  //     let dataValueInNumber;
  //     let actualDataValueInNumber;

  //     if (allData[i].Data_value === '') {
  //       sampleSizeInNumber = Number(allData[i].Sample_Size);
  //       dataValueInNumber = 0;
  //       actualDataValueInNumber = 0;
  //     } else if (allData[i].Sample_Size === '0') {
  //       if (allData[i].Data_value === '') {
  //         sampleSizeInNumber = 0;
  //         dataValueInNumber = 0;
  //         actualDataValueInNumber = 0;
  //       } else {
  //         sampleSizeInNumber = 0;
  //         dataValueInNumber = 0;
  //         actualDataValueInNumber = 0;
  //       }
  //     } else {
  //       sampleSizeInNumber = Number(allData[i].Sample_Size);
  //       dataValueInNumber = Number(allData[i].Data_value);
  //       actualDataValueInNumber =
  //         (dataValueInNumber / 100) * sampleSizeInNumber;
  //     }

  //     await InfoGraphic.findByIdAndUpdate(allData[i]._id, {
  //       Actual_Data_Value_Number: actualDataValueInNumber,
  //     });

  //     console.log(i);
  //   }

  //   return 'done';
  // }

  // @Query(() => String)
  // async modifyData2() {
  //   let allData = await InfoGraphic.find();

  //   for (let i = 0; i < allData.length; i++) {
  //     let sampleSizeInNumber;
  //     let dataValueInNumber;
  //     let actualDataValueInNumber;
  //     let Category;
  //     if (allData[i].Data_value === '') {
  //       sampleSizeInNumber = Number(allData[i].Sample_Size);
  //       dataValueInNumber = 0;
  //       actualDataValueInNumber = 0;
  //     } else if (allData[i].Sample_Size === '0') {
  //       if (allData[i].Data_value === '') {
  //         sampleSizeInNumber = 0;
  //         dataValueInNumber = 0;
  //         actualDataValueInNumber = 0;
  //       } else {
  //         sampleSizeInNumber = 0;
  //         dataValueInNumber = 0;
  //         actualDataValueInNumber = 0;
  //       }
  //     } else {
  //       sampleSizeInNumber = Number(allData[i].Sample_Size);
  //       dataValueInNumber = Number(allData[i].Data_value);
  //       actualDataValueInNumber =
  //         (100 / dataValueInNumber) * sampleSizeInNumber;
  //     }

  //     if (allData[i].Break_Out_Category === 'Race/Ethnicity') {
  //       if (
  //         allData[i].Break_Out ===
  //           'Native Hawaiian or other Pacific Islander, non-Hispanic' ||
  //         allData[i].Break_Out ===
  //           'American Indian or Alaskan Native, non-Hispanic' ||
  //         allData[i].Break_Out === 'Multiracial, non-Hispanic' ||
  //         allData[i].Break_Out === 'Other, non-Hispanic'
  //       ) {
  //         Category = 'Other';
  //       } else if (allData[i].Break_Out === 'Hispanic') {
  //         Category = 'Hispanic';
  //       } else if (allData[i].Break_Out === 'White, non-Hispanic') {
  //         Category = 'White';
  //       } else if (allData[i].Break_Out === 'Black, non-Hispanic') {
  //         Category = 'Black';
  //       } else if (allData[i].Break_Out === 'Asian, non-Hispanic') {
  //         Category = 'Asian';
  //       }
  //     } else {
  //       Category = allData[i].Break_Out;
  //     }

  //     await InfoGraphic.findByIdAndUpdate(allData[i]._id, {
  //       Sample_Size_Number: sampleSizeInNumber,
  //       Data_value_Number: dataValueInNumber,
  //       Actual_Data_Value_Number: actualDataValueInNumber,
  //       Category,
  //     });

  //     if (i % 1000 === 0) {
  //       console.log(i);
  //     }
  //   }

  //   return 'done';
  // }

  // @Query(() => String)
  // async modifyDataOverall() {
  //   await OverAllModel.deleteMany({});

  //   let allData: any = await InfoGraphic.find({
  //     Break_Out_Category: 'Overall',
  //   });

  //   console.log(allData.length);

  //   for (let i = 0; i < allData.length; i++) {
  //     let data = {
  //       Year: allData[i].Year,
  //       Locationabbr: allData[i].Locationabbr,
  //       Locationdesc: allData[i].Locationdesc,
  //       Class: allData[i].Class,
  //       Topic: allData[i].Topic,
  //       Break_Out: allData[i].Break_Out,
  //       Break_Out_Category: allData[i].Break_Out_Category,
  //       Category: allData[i].Category,
  //       Sample_Size: allData[i].Sample_Size,
  //       Sample_Size_Number: allData[i].Sample_Size_Number,
  //       Data_value: allData[i].Data_value,
  //       Data_value_Number: allData[i].Data_value_Number,
  //       Actual_Data_Value_Number: allData[i].Actual_Data_Value_Number,
  //       Confidence_limit_Low: allData[i].Confidence_limit_Low,
  //       Confidence_limit_High: allData[i].Confidence_limit_High,
  //       Data_value_unit: allData[i].Data_value_unit,
  //     };
  //     await OverAllModel.create(data);
  //     console.log(i);
  //   }

  //   return 'done';
  // }

  @Query(() => String)
  async storeData() {
    const data: any = JSON.parse(
      fs.readFileSync('./temp/infoData2.json', 'utf-8')
    );

    await InfoGraphic.deleteMany({});


    console.log(data.length)
    console.log(data[0])

    for (let i = 0; i < data.length; i++) {
      await InfoGraphic.create({
        Condition: data[i].Condition,
        ICD_Sub_Chapter_Code: data[i]['ICD Sub-Chapter Code'],
        State: data[i].State,
        State_Code: data[i]['State Code'],
        Year: data[i].Year,
        Year_Code: data[i]['Year Code'],
        Ten_Year_Age_Groups: data[i]['Ten-Year Age Groups'],
        Ten_Year_Age_Groups_Code: data[i]['Ten-Year Age Groups Code'],
        Gender: data[i].Gender,
        Race: data[i].Race,
        Race_Code: data[i]['Race Code'],
        Deaths: data[i].Deaths,
        Population: data[i].Population,
        Crude_Rate: data[i]['Crude Rate'],
        Crude_Rate_Lower_95percent_Confidence_Interval: data[i]['Crude Rate Lower 95% Confidence Interval'],
        Crude_Rate_Upper_95percent_Confidence_Interval: data[i]['Crude Rate Upper 95% Confidence Interval'],
        Percentage_of_Total_Deaths: data[i]['% of Total Deaths'],
      });
      console.log(i);
    }

    return 'done';
  }

  // @Mutation(() => String)
  // async deleteData() {
  //   await InfoGraphic.deleteMany({});
  //   return 'done';
  // }

  // @Query(() => String)
  // async filterData() {
  //   let data = await InfoGraphic.find({
  //     topic: 'Depression',
  //     Year: '2011',
  //   }).select('_id year');

  //   console.log(data.length);

  //   return 'done';
  // }

  // @Query(() => String)
  // async readFile() {
  //   const data = JSON.parse(fs.readFileSync('./temp/infoData.json', 'utf-8'));

  //   let educationAttainedCategory: any[] = [];
  //   let overAllCategory: any[] = [];
  //   let houseHoldIncomeCategory: any[] = [];
  //   let ageGroupCategory: any[] = [];
  //   let raceCategory: any[] = [];
  //   let genderCategory: any[] = [];

  //   // [
  //   //   "Education Attained",
  //   //   "Overall",
  //   //   "Household Income",
  //   //   "Age Group",
  //   //   "Race/Ethnicity",
  //   //   "Gender"
  //   // ]

  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].Break_Out_Category === 'Education Attained') {
  //       if (!educationAttainedCategory.includes(data[i].Break_Out)) {
  //         educationAttainedCategory.push(data[i].Break_Out);
  //       }
  //     } else if (data[i].Break_Out_Category === 'Overall') {
  //       if (!overAllCategory.includes(data[i].Break_Out)) {
  //         overAllCategory.push(data[i].Break_Out);
  //       }
  //     } else if (data[i].Break_Out_Category === 'Household Income') {
  //       if (!houseHoldIncomeCategory.includes(data[i].Break_Out)) {
  //         houseHoldIncomeCategory.push(data[i].Break_Out);
  //       }
  //     } else if (data[i].Break_Out_Category === 'Age Group') {
  //       if (!ageGroupCategory.includes(data[i].Break_Out)) {
  //         ageGroupCategory.push(data[i].Break_Out);
  //       }
  //     } else if (data[i].Break_Out_Category === 'Race/Ethnicity') {
  //       if (!raceCategory.includes(data[i].Break_Out)) {
  //         raceCategory.push(data[i].Break_Out);
  //       }
  //     } else if (data[i].Break_Out_Category === 'Gender') {
  //       if (!genderCategory.includes(data[i].Break_Out)) {
  //         genderCategory.push(data[i].Break_Out);
  //       }
  //     }
  //   }

  //   console.log('ea', educationAttainedCategory);
  //   console.log('OA', overAllCategory);
  //   console.log('HH', houseHoldIncomeCategory);
  //   console.log('AG', ageGroupCategory);
  //   console.log('RE', raceCategory);
  //   console.log('G', genderCategory);

  //   fs.writeFileSync(
  //     './temp/educationAttainedCategory.json',
  //     JSON.stringify(educationAttainedCategory)
  //   );

  //   fs.writeFileSync(
  //     './temp/overAllCategory.json',
  //     JSON.stringify(overAllCategory)
  //   );

  //   fs.writeFileSync(
  //     './temp/houseHoldIncomeCategory.json',
  //     JSON.stringify(houseHoldIncomeCategory)
  //   );

  //   fs.writeFileSync(
  //     './temp/ageGroupCategory.json',
  //     JSON.stringify(ageGroupCategory)
  //   );

  //   fs.writeFileSync('./temp/raceCategory.json', JSON.stringify(raceCategory));

  //   fs.writeFileSync(
  //     './temp/genderCategory.json',
  //     JSON.stringify(genderCategory)
  //   );

  //   // fs.writeFileSync('./temp/years.json', JSON.stringify(years));
  //   // fs.writeFileSync('./temp/locations.json', JSON.stringify(locations));
  //   // fs.writeFileSync('./temp/topics.json', JSON.stringify(topics));
  //   //fs.writeFileSync('./temp/breakOuts.json', JSON.stringify(breakOuts));
  //   //fs.writeFileSync('./temp/breakOutsCategory.json', JSON.stringify(breakOutCategory));
  //   // fs.writeFileSync('./temp/locationDesc.json', JSON.stringify(locationDesc));
  //   return '';
  // }

  @Query(() => ReturnInfoData)
  async showInfoData(
    @Arg('year', { nullable: true }) year: String,
    @Arg('state', { nullable: true }) state: String
  ) {
    let obj: any = {};

    if (year) {
      obj.Year = year;
    } else {
      obj.Year = '2021';
    }

    if (state) {
      obj.Locationabbr = state;
    }

    let data = await OverAllModel.aggregate([
      {
        $match: obj,
      },
      {
        $unwind: '$Topic',
      },
      {
        $group: {
          _id: '$Topic',
          sampleSize: { $sum: '$Sample_Size_Number' },
          value: { $sum: '$Actual_Data_Value_Number' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    let total1 = data.reduce((acc: any, d: any) => {
      acc += d.sampleSize;
      return acc;
    }, 0);

    let forMatedData1 = data.map((d: any) => {
      return {
        _id: d._id,
        sampleSize: d.sampleSize,
        value: d.value,
        percentage: (100 / total1) * d.sampleSize,
      };
    });

    let raceObj = {
      ...obj,
      Break_Out_Category: 'Race/Ethnicity',
    };

    let data2 = await InfoGraphic.aggregate([
      {
        $match: raceObj,
      },
      {
        $unwind: '$Category',
      },
      {
        $group: {
          _id: '$Category',
          sampleSize: { $sum: '$Sample_Size_Number' },
          value: { $sum: '$Actual_Data_Value_Number' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    let total2 = data2.reduce((acc: any, d: any) => {
      acc += d.sampleSize;
      return acc;
    }, 0);

    let forMatedData2 = data2.map((d: any) => {
      return {
        _id: d._id,
        sampleSize: d.sampleSize,
        value: d.value,
        percentage: (100 / total2) * d.sampleSize,
      };
    });

    let ageObj = {
      ...obj,
      Break_Out_Category: 'Age Group',
    };

    let data3 = await InfoGraphic.aggregate([
      {
        $match: ageObj,
      },
      {
        $unwind: '$Break_Out',
      },
      {
        $group: {
          _id: '$Break_Out',
          sampleSize: { $sum: '$Sample_Size_Number' },
          value: { $sum: '$Actual_Data_Value_Number' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    let total3 = data3.reduce((acc: any, d: any) => {
      acc += d.sampleSize;
      return acc;
    }, 0);

    let forMatedData3 = data3.map((d: any) => {
      return {
        _id: d._id,
        sampleSize: d.sampleSize,
        value: d.value,
        percentage: (100 / total3) * d.sampleSize,
      };
    });

    let genderObj = {
      ...obj,
      Break_Out_Category: 'Gender',
    };

    let data4 = await InfoGraphic.aggregate([
      {
        $match: genderObj,
      },
      {
        $unwind: '$Break_Out',
      },
      {
        $group: {
          _id: '$Break_Out',
          sampleSize: { $sum: '$Sample_Size_Number' },
          value: { $sum: '$Actual_Data_Value_Number' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    let total4 = data4.reduce((acc: any, d: any) => {
      acc += d.sampleSize;
      return acc;
    }, 0);

    console.log('total4', total4);

    let forMatedData4 = data4.map((d: any) => {
      return {
        _id: d._id,
        sampleSize: d.sampleSize,
        value: d.value,
        percentage: (100 / total4) * d.sampleSize,
      };
    });

    return {
      diseases: forMatedData1,
      race: forMatedData2,
      age: forMatedData3,
      sex: forMatedData4,
    };
  }

  @Query(() => [FormatedData])
  async yearBasedAggregation(
    @Arg('disease', { nullable: true }) disease: String,
    @Arg('state', { nullable: true }) state: String,
    @Arg('race', { nullable: true }) race: String,
    @Arg('age', { nullable: true }) age: String,
    @Arg('sex', { nullable: true }) sex: String
  ) {
    let obj: any = {};

    let allYearsData: any[] = [];

    if (disease) {
      obj.Topic = disease;
    }

    if (state) {
      obj.Locationabbr = state;
    }

    if (race || age || sex) {
      if (race) {
        obj.Category = race;
      } else if (age) {
        obj.Category = age;
      } else {
        obj.Category = sex;
      }

      // obj.Break_Out = {
      //   $ne: 'Overall',
      // }

      let data = await InfoGraphic.aggregate([
        {
          $match: obj,
        },
        {
          $unwind: '$Year',
        },
        {
          $group: {
            _id: '$Year',
            sampleSize: { $sum: '$Sample_Size_Number' },
            value: { $sum: '$Actual_Data_Value_Number' },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      let total1 = data.reduce((acc: any, d: any) => {
        acc += d.sampleSize;
        return acc;
      }, 0);

      let forMatedData1 = data.map((d: any) => {
        return {
          _id: d._id,
          sampleSize: d.sampleSize,
          value: d.value,
          percentage: (100 / total1) * d.sampleSize,
        };
      });

      return forMatedData1;
    } else {
      let data = await OverAllModel.aggregate([
        {
          $match: obj,
        },
        {
          $unwind: '$Year',
        },
        {
          $group: {
            _id: '$Year',
            sampleSize: { $sum: '$Sample_Size_Number' },
            value: { $sum: '$Actual_Data_Value_Number' },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

      let total1 = data.reduce((acc: any, d: any) => {
        acc += d.sampleSize;
        return acc;
      }, 0);

      let forMatedData1 = data.map((d: any) => {
        return {
          _id: d._id,
          sampleSize: d.sampleSize,
          value: d.value,
          percentage: (100 / total1) * d.sampleSize,
        };
      });

      return forMatedData1;
    }
  }

  @Mutation(() => String)
  async addClasses() {
    let data1 = [
      {
        day: 'Tue',
        code: 'SE225',
        myCode: 'SWE426',
        time: '1:30',
        room: '612',
        name: 'Distributive Computing and Network Security',
        TI: 'NIR',
        sec: 'A',
      },
      {
        day: 'Tue',
        code: 'SE225',
        myCode: 'SWE426',
        time: '2:30',
        room: '712B',
        name: 'Distributive Computing and Network Security',
        TI: 'JNM',
        sec: 'B',
      },
      {
        day: 'Wed',
        code: 'SE225',
        myCode: 'SWE426',
        time: '1:30',
        room: '603',
        name: 'Distributive Computing and Network Security',
        TI: 'NIR',
        sec: 'A',
      },

      {
        day: 'Wed',
        code: 'SE225',
        myCode: 'SWE426',
        time: '12:30',
        room: '1017',
        name: 'Distributive Computing and Network Security',
        TI: 'JNM',
        sec: 'B',
      },
      {
        day: 'Tue',
        code: 'SE226',
        myCode: 'SWE426',
        time: '3:30',
        room: '609',
        name: 'Distributive Computing and Network Security',
        TI: 'JNM',
        sec: 'B',
        lab: true,
      },
      {
        day: 'Tue',
        code: 'SE226',
        myCode: 'SWE426',
        time: '11:30',
        room: '601',
        name: 'Distributive Computing and Network Security',
        TI: 'SA',
        sec: 'A',
        subSec: '1',
        lab: true,
      },
      {
        day: 'Wed',
        code: 'SE226',
        myCode: 'SWE426',
        time: '3:30',
        room: '616',
        name: 'Distributive Computing and Network Security',
        TI: 'SA',
        sec: 'A',
        subSec: '2',
        lab: true,
      },
      {
        day: 'Sat',
        code: 'SE331',
        myCode: 'SWE332',
        time: '8:30',
        room: '610',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'AKS',
        sec: 'A',
        subSec: '2',
      },
      {
        day: 'Sat',
        code: 'SE331',
        myCode: 'SWE332',
        time: '9:30',
        room: '610',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'AKS',
        sec: 'A',
        subSec: '2',
      },
      {
        day: 'Sun',
        code: 'SE331',
        myCode: 'SWE332',
        time: '8:30',
        room: '610',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'MRA',
        sec: 'A',
        subSec: '1',
      },
      {
        day: 'Sun',
        code: 'SE331',
        myCode: 'SWE332',
        time: '9:30',
        room: '610',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'MRA',
        sec: 'A',
        subSec: '1',
      },
      {
        day: 'Tue',
        code: 'SE331',
        myCode: 'SWE332',
        time: '12:30',
        room: '601',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'MRA',
        sec: 'A',
        subSec: '2',
      },
      {
        day: 'Tue',
        code: 'SE331',
        myCode: 'SWE332',
        time: '1:30',
        room: '601',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'MRA',
        sec: 'A',
        subSec: '2',
      },
      {
        day: 'Wed',
        code: 'SE331',
        myCode: 'SWE332',
        time: '9:30',
        room: '610',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'MSA',
        sec: 'A',
        subSec: '1',
      },
      {
        day: 'Wed',
        code: 'SE331',
        myCode: 'SWE332',
        time: '10:30',
        room: '610',
        name: 'Software Engineering Project-II (Web Programming)',
        TI: 'MSA',
        sec: 'A',
        subSec: '1',
      },
      {
        day: 'Sun',
        code: 'GE235',
        myCode: 'ACC124',
        time: '2:30',
        room: '710',
        name: 'Principles of Accounting',
        TI: 'MJM',
        sec: 'A',
      },
      {
        day: 'Sun',
        code: 'GE235',
        myCode: 'ACC124',
        time: '3:30',
        room: '710',
        name: 'Principles of Accounting',
        TI: 'MJM',
        sec: 'A',
      },
      {
        day: 'Sat',
        code: 'SE411',
        myCode: 'SWE212',
        time: '8:30',
        room: '603',
        name: 'Software Project Management',
        TI: 'AA',
        sec: 'A',
      },
      {
        day: 'Sat',
        code: 'SE411',
        myCode: 'SWE212',
        time: '9:30',
        room: '603',
        name: 'Software Project Management',
        TI: 'AA',
        sec: 'A',
      },
      {
        day: 'Sun',
        code: 'SE411',
        myCode: 'SWE212',
        time: '12:30',
        room: '704',
        name: 'Software Project Management',
        TI: 'MKS',
        sec: 'A',
      },
      {
        day: 'Thu',
        code: 'SE411',
        myCode: 'SWE212',
        time: '1:30',
        room: '603',
        name: 'Software Project Management',
        TI: 'MKS',
        sec: 'A',
      },
    ];

    await ClassScheduleModel.insertMany(data1);

    return 'done';
  }

  @Query(() => [myClass])
  async filterClasses(
    @Arg('day', { nullable: true }) day: String,
    @Arg('code', { nullable: true }) code: String,
    @Arg('time', { nullable: true }) time: String,
    @Arg('room', { nullable: true }) room: String,
    @Arg('name', { nullable: true }) name: String,
    @Arg('TI', { nullable: true }) TI: String,
    @Arg('sec', { nullable: true }) sec: String,
    @Arg('subSec', { nullable: true }) subSec: String,
    @Arg('lab', { nullable: true }) lab: Boolean
  ) {
    let obj: any = {};

    if (day) obj.day = day;
    if (code) obj.code = code;
    if (time) obj.time = time;
    if (room) obj.room = room;
    if (name) obj.name = name;
    if (TI) obj.TI = TI;
    if (sec) obj.sec = sec;
    if (subSec) obj.subSec = subSec;
    if (lab) obj.lab = lab;

    let data = await ClassScheduleModel.find(obj).sort({
      time: 1,
    });

    return data;
  }
}
