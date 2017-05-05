# argparse-slim
  Slim interface for argparse package

```shell
npm install --save argparse-slim
```

## Usage

```js
const argparseSlim = require('argparse-slim');

var parser = argparseSlim.from(/* OPTIONS */,
[
	[ /* addArgument params */ ],
	[ /* addArgument params */ ],
	[ /* addArgument params */ ]
]);

var parser = await argparseSlim.from('./options.json');

argparseSlim.from('./options.json', (argparser) =>
{
	parser = argparser;
});

var parser = argparseSlim.from.sync('./options.json');

//options.json content:
/*
{
	"options": OPTIONS,
	"args":
	[
		[ addArgument params ],
		[ addArgument params ],
		[ addArgument params ]
	]
}
*/
```

### Syntax of OPTIONS
See argparse docu:
[https://www.npmjs.com/package/argparse#argumentparser-objects](https://www.npmjs.com/package/argparse#argumentparser-objects)

### Syntax of addArguments params
See argparse docu:
[https://www.npmjs.com/package/argparse#addargument-method](https://www.npmjs.com/package/argparse#addargument-method)

## Examples

```js
const argparseSlim = require('argparse-slim');

var parser = argparseSlim.from(
	{
		version: '1.0.0',
		addHelp: true,
		description: 'Slim interface for argparse'
	},
	[
		[
			'-f', '--foo',
			{
				help: 'Foo'
			}
		],
		[
			'-b', '--bar',
			{
				help: 'Bar'
			}
		]
	]
);

var parser = await argparseSlim.from('./options.json');

var parser = argparseSlim.from.sync('./options.json');


var parsed = parser.parseArgs();

/* options.json
{
	"options":
	{
		"version": '1.0.0',
		"addHelp": true,
		"description": 'Slim interface for argparse'
	}
	"args":
	[
		[
			'-f', '--foo',
			{
				"help": 'Foo'
			}
		],
		[
			'-b', '--bar',
			{
				"help": 'Bar'
			}
		]
	]
}

var parsed = parser.parseArgs();

```

## API

### `from(options, args)`

#### arguments

- `options (object)`
- `args (array)`

#### returns

- `ArgumentParser (object)`

### `from(optionsFile, [options], [callback])`

#### arguments

- `optionsFile (string)`
- `options (object)`  
options for fs.readFile
- `callback (function)`

#### returns

- `Promise (object)`  
**Only if no callback is given**

### `from.sync(optionsFile, [options])`

#### arguments

- `optionsFile (string)`
- `options (object)`  
options for fs.readFile

#### returns

- `ArgumentParser (object)`