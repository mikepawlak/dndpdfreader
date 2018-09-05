# Dungeons and Dragons PDF Reader

> This is a command line tool built with NodeJS and [Commander](https://github.com/tj/commander.js/) to consume Dungeons and Dragons character sheet pdfs and generate and serve html-based statblocks for easier consumption.  

## I want to run this on my machine 

This project requires NodeJS and NPM, install instructions for both can be found [here](https://nodejs.org/en/).

``` bash
# clone this repository
git clone https://github.com/mikepawlak/dndpdfreader && cd dndpdfreader

# install dependencies
npm install

```

You can then run dndpdfreader commands from the command line - 

``` bash
./bin/statblock -h

##############
Usage: statblock [options] <command> [...]


  Commands:

    view-block [path]          create statblock from specified pdf and render to console
    text-block [pdfpath] [tx]  create a textfile statblock
    browser-block [pdfpath]    render a statblock to the browser

  Takes in 5e character sheet pdfs and generates stat blocks.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Running Tests

You can test the package with a simple npm test command. 
``` bash
npm run test
```

You can generate a statblock with the provided test pdf with the following command 
```bash
./bin/statblock text-block test/test_char.pdf
```
