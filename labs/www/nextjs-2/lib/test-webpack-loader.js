// import { getOptions } from 'loader-utils';
// import validateOptions from 'schema-utils';

// const schema = {
//     type: 'object',
//     properties: {
//         test: {
//             type: 'string'
//         }
//     }
// };

// export default function (source) {
//     // const options = getOptions(this);

//     // validateOptions(schema, options, 'Example Loader');

// 	// Apply some transformations to the source...
// 	console.log("TODO:Loader for", source);

//     // return `export default ${ JSON.stringify(source) }`;
//     return source;
// }

module.exports = function (source) {
    // const options = getOptions(this);

    // validateOptions(schema, options, 'Example Loader');

	// Apply some transformations to the source...
	// console.log("TODO:Loader for", source);

    // return `export default ${ JSON.stringify(source) }`;
    return source;
}
