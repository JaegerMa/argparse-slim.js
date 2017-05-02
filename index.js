'use strict';

const ArgumentParser = require('argparse').ArgumentParser;
const fs = require('fs');

function from(source)
{
	if(typeof(source) === 'string')
		return fromJSON.apply(null, Array.from(arguments));
	return fromObject.apply(null, Array.from(arguments));
}
from.sync = function(source)
{
	if(typeof(source) === 'string')
		return fromJSON.sync.apply(null, Array.from(arguments));
	return fromObject.apply(null, Array.from(arguments));
}

function fromJSON(path, options, callback)
{
	if(!callback && typeof(options) === 'function')
	{
		callback = options;
		options = undefined;
	}

	let promise = new Promise((resolve, reject) =>
	{
		fs.readFile(path, options, (err, data) =>
		{
			if(err)
			{
				reject(err);
				return;
			}

			let object = JSON.parse(data);
			let parser = fromObject(object.options, object.args);
			resolve(parser);
		});
	});

	if(callback)
		promise.then(callback);
	else
		return promise;
}

fromJSON.sync = function(path, options)
{
	let data = fs.readFileSync(path, options);
	let object = JSON.parse(data);
	let parser = fromObject(object.options, object.args);
	return parser;
}

function fromObject(options, args)
{
	if(typeof(options) !== 'object' || Array.isArray(options))
		throw new Error('options must be an object');
	if(!Array.isArray(args))
		throw new Error('args must be an array');
	
	let parser = new ArgumentParser(options);
	for(let arg of args)
		parser.addArgument.apply(parser, arg);

	return parser;
}

module.exports =
{
	from,
	fromJSON,
	fromObject
};