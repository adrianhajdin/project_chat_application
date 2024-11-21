// const { gql } = require("graphql-request");

// {
//   alias: {
//     belongsTo: {
//       id;
//     }
//   }
// }
// filter=one.one.one,two.one,three
// const formatQueryDetails = (filters) => {
//   let queryDetails = {};

//   // ["alias.belongsTo.id", "two.one", "three"]
//   const filtersSepratted = filters.split(",");
//   console.log(filtersSepratted);
//   for (const filter of filtersSepratted) {
//     // ["alias", "belongsTo", "id"]
//     const singleFilterSepratted = filter.split(".");
//     console.log(singleFilterSepratted);
//     for (const x of singleFilterSepratted) {
//       queryDetails[x] = { ...queryDetails };
//       console.log(queryDetails);
//     }
//   }

//   console.log(queryDetails);
// };
// `belongsTo {
//     id
//     email
//   }`;
const aliasFilter1 =
  "belongsTo.id,belongsTo.email,belongsTo.alias.id,belongsTo.alias.createdAt,belongsTo.alias.isPrimary.";
const aliasFilter2 = "belongsTo{ id email alias { id createdAt isPrimary } }";

const splitted = filter.split(",");

// const keys = "details1.details2.details3.details4.details5";
// const firsName = "David";
// var tempObject = {};
// var container = tempObject;
// keys.split(".").map((k, i, values) => {
//   if (i == values.length - 1) {
//     container[k] = null;
//   } else {
//     container[k] = {};
//   }
//   container = container[k];

//   //   container = container[k] = i == values.length - 1 ? firsName : {};
// });
// console.log(JSON.stringify(tempObject, null, " "));
