# clean-conf

Tool for cleaning and comparing configuration files.

## Features
* Cleans configuration files from unwanted attributes like ```sys``` and ```id``` and ```awid```. 
* Sorts all configuration files alphabetically.
* Compares all configuration files and prints result into the readable html page form.

## Installation
```npm install```

## Prerequisites
* Perform configuration export from the environment using [configuration/export](https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-94748bedc82549e99e7c7c66434dab6d/book/page?code=93794603) command.

## Usage
```node index.js lhsDir rhsDir reportDir```
* ```lhsDir``` - folder containing json configuration files (left side)
* ```rhsDir``` - folder containing json configuration files (right side)
* ```reportDir``` - folder to which the compariosn result will be stored

