#!/usr/bin/env node

"use strict";
/* 
  * Never LET PERFECT GET IN THE WAY OF GOOD
  * MAKE it WORK
  * PRODUCT IS EVERYTHING
  *Author* :  goes by Islam El'ewady (nile^io)
  *Date*   :  July, 2019
  Description: this program generates source maps for Node-RED nodes. it generates source maps for every line in the original source file
               mapped to the output file. This is needed in order to debug client side javascript code for custom nodes.
               Please read Node-RED docs to understand the role of the HTML and JS files of nodes.

MIT License

Copyright (c) 2019 Islam El'ewady

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 
/* 

** it must be run from the same location as package.json. **

It creates a source map file for every class registered in package.json. 
It can be used for both the html and also the js file (if you like ) of the custom Node-RED node. 
the map files must stay in the same location for source maps to be recognised by your debugging tools. 
Note that Node-RED generates the output by the runtime automatically and it uses EVAL functions.


The program updates original source files to include or update the following two lines if they do not already exist in the 'html' source file
  # sourceURL= this will be set to the relative_path_to_custom_node_file.html
  # sourceMappingURL= this will be set to custom_node_file_name.html.class_name.map

in order to debug your original source files , you need to configure the debugger correctly with sourceMaps enabled. 
in VSCode , set sourceMaps: true in your debug launch configurations launch.json, and also configure pathMappings correctly.
you can use this program to generate source maps and integrate it with your npm scripts if you like . 
adding nodemon you will have a fully automated build of source maps with every save of your source files.

Note: The program uses package.json to retrieve the node classes and file locations of Node-RED nodes.

Parameters:
--sourceRoot or -s : specify the sourceRoot value to use. sourceRoot is a directory appended to every source file name. Defaults to "/src/"
--output or -o : By default the tool generates source maps for html file only. you can choose one or both by providing this value as comma separated. Defaults to "html,js"
--no-comments : By default the tool will update the original source files to include the required comments. Disable this by passing this argument.

example usage:
you must run from the same location as package.json

Basic Usage
  >node gensourcemaps --sourceRoot /src/    : generate source maps for html files (default) and set the sourceRoot in the map to /src/ updating the comments in original html files as necessary (default setting).

Other Example Usage:

  >node gensourcemaps -s "" or just node gensourcemaps -s : generate source maps for html files (default) and do not set sourceRoot property. Read below about the use of sourceRoot.
  >node gensourcemaps -s /mysourcefiles/ -o html  : generate source maps for html files only and set the sourceRoot property to /mysourcefiles/
  >node gensourcemaps -o html,js    : generate source maps for both html and js files and set the sourceRoot to /src/ (default). Update the source files with comments (default)
  >node gensourcemaps --output html --no-comments : generate source maps for html files only and do not update the comments in original html files. 

you can configure npm scripts such as
"maps" : "./gensourcemaps.js -r /src/"  (make sure the file is executable chmod +x gensourcemaps.js before running this command)

recommend to install the script globally and so you can run it from anywhere.
npm -i -g nodered-generate-sourcemaps

 */

/*
 * INFO : source maps dont "seem" to work without setting a sourceRoot value. Not fully confirmed/tested. Need further tests.
 * However, sourceRoot is an optional property in the specs of sourceMaps.
 * This program sets sourceRoot to empty string and correctly set the source file names.
 * pass this as a param using `-r /sourcerootdirectory/`
 * if you intend to have empty string , pass an empty string to `--sourceRoot ""` and sourceRoot will not be set (experimental).
 * if you dont pass any value or pass an unknown argument , the default value will be used, that is ("/src/")
 */
/*
 * INFO : ascii artwork was found at gitgist and I liked it , copied here. Had no license. credits goes to the original author :)
 */
console.log(
  `________________________________________________________________
   source maps generation tool for Node-RED nodes by Islam El'ewady
----------------------------------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
);
const fs = require("fs"),
  sourceMap = require("source-map"),
  os = require("os"),
  path = require("path");
// After using this script make sure you do not update the source maps comments manually. The script will take care of that.
// If you do the line numbers change and will break the source maps :(
//
/* LIMITATION of this utility: if a single file contains multiple nodes, this script will udpate only the first one. So one file should contain a single node as a general guideline. 

 *  THE **DEFAULTS**
 *  sourceRoot = '/src/' : set the sourceRoot property in the generated map to '/src/' folder.
 *  updateComments = true  : update original source files with the required comments.
 *  outputTypes = ["html"]      : generate source maps for html files only. the program can be used to generate maps for both html and js files.
 */
// TODO: consider changing the default to be empty string and so disables sourceRoot. Needs more tests about using empty sourceRoot value.
const defsourceRoot = "/src/";
const defoutputTypes = ["html"];
// * default to update original source files to add required //# sourceURL= & //# sourceMappingURL=  .
// * pass  --no-comments to disable the check and update.
// * You then need to update those comments manually in source files by adding the comments for the maps to be recognised by debugger.
const defupdateComments = true;

const args = process.argv.slice(2);

let sourceRoot = defsourceRoot;
let outputTypes = defoutputTypes;
let updateComments = defupdateComments;
let sourcerootprovided = false;
/*
 * Read passed arguments.
 * Parameters are
 * -r sourceRoot (defaults to /src/)
 * -o outputTypes(comma separatated) (defaults to "html")
 * --no-comments : disables update of original source files to add required source maps comments. (without this the program updates source files with comments)
 */
for (let index = 0; index < args.length; index++) {
  const arg = args[index];
  if (arg.toLowerCase() === "--sourceroot" || arg.toLowerCase() === "-r") {
    sourcerootprovided = true;
    sourceRoot = args[index + 1] ? args[index + 1] : ""; // passing -r only with no value or an empty string , sets sourceRoot to empty string ""
  }
  if (arg.toLowerCase() === "--output" || arg.toLowerCase() === "-o") {
    if (args[index + 1] && (args[index + 1].toLowerCase().includes("html") || args[index + 1].toLowerCase().includes("js")))
      outputTypes = args[index + 1].split(",");
    else console.log(`Warning: output types can either be one of html, js or both . recieved value is "${args[index + 1]}" .`);
  }
  if (arg.toLowerCase() === "--no-comments") {
    updateComments = false;
  }
}

// inform the user of what we will be doing
if (sourcerootprovided)
  console.log(
    `Generating source maps for node "${outputTypes.join()}" using sourceRoot value "${sourceRoot}" and ${
      updateComments === true ? "update of source maps comments in source files if necessary." : "will make no changes to source files."
    }`
  );
else
  console.log(
    `Note: sourceRoot not specified. Generating source maps for node "${outputTypes.join()}" using sourceRoot value "${defsourceRoot}" and ${
      updateComments === true ? "update of source maps comments in source files if necessary." : "will make no changes to source files."
    }`
  );

/**
 * *Program entry
 *
 */
try {
  //* return list of custom nodes from package.json and perform the operations for each one **
  const packagejson = JSON.parse(fs.readFileSync("package.json").toString());

  const nodeFileNames = packagejson["node-red"].nodes;
  if (!nodeFileNames) throw Error("node-red.nodes entry does not exist in package.json.");

  //* do this for every filename in the package.json
  Object.values(nodeFileNames).forEach((nodefileName) => {
    // in package.json node files are always .js files according to specs
    const sourcefilepath = path.parse(nodefileName);
    if (path.isAbsolute(nodefileName)) throw Error("absolute source file path is unsupported.");

    // const fileName =  nodefileName.slice(0, -3);

    for (let index = 0; index < outputTypes.length; index++) {
      const sourcefileType = outputTypes[index].toLowerCase();
      const relsourcefileName = `${path.sep}${sourcefilepath.dir}${path.sep}${sourcefilepath.name}.${sourcefileType}`;

      let updatedsourceFile = false;
      let updatedsourceContents = "";
      try {
        const completefileName = "." + relsourcefileName;
        const sourcefileContents = fs.readFileSync(completefileName).toString();
        //create a source map for our sourcefileName & sourceRoot

        /*         const completemapfileName =
          "." +
          path.sep +
          sourcefilepath.dir +
          path.sep +
          ".sourcemaps" +
          path.sep +
          sourcefilepath.name +
          "." +
          sourcefileType +
          ".map"; */
        let completemapfileName = "." + relsourcefileName + ".map";
        let sourceMap = createMap(relsourcefileName, sourceRoot);
        const sources = (() => {
          let arrResults = [];
          if (sourcefileType === "js") {
            const sourceCode = sourcefileContents;
            let modSourceCode = "";
            if (updateComments)
              if (shouldUpdateComments(sourcefileType, sourceCode, relsourcefileName, completemapfileName.substring(1))) {
                modSourceCode = updateCommentsInPlace(sourceCode, sourceCode.length, false, relsourcefileName, completemapfileName.substring(1));
                updatedsourceContents = modSourceCode;
                updatedsourceFile = true;
              }
            arrResults.push({
              sourcecode: modSourceCode.length > 0 ? modSourceCode : sourceCode,
              sourcename: relsourcefileName,
              sourceStartLine: 1,
              outputStartLine: 1,
            });
          }
          if (sourcefileType === "html") {
            //** strictly search for the exact string (spacing or chars are allowed everywhere and case insensitive)
            const regex = /(<script type="text\/javascript"\s*>)(.|\n)*?(RED.nodes.registerType\(.)(.*)('|")/gim;
            updatedsourceContents = sourcefileContents;

            let updateLength = 0;
            let m;
            const matches = updatedsourceContents.match(regex);
            if (matches.length == 0) {
              console.log(`could not locate embedded text/javascript script in html source file . skipping file ..`);
              return;
            }

            // while ((m = regex.exec(sourcefileContents)) !== null) {
            m = regex.exec(sourcefileContents);
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
              regex.lastIndex++;
            }
            let modSourceCode = "";
            // const sourcename = `${path.sep}${sourcefilepath.dir}${path.sep}${m[4].replace(/\s/g, "_")}.html`;
            const sourcename = relsourcefileName;
            const scriptstartIndx = m.index;
            const sourcecodeStartIndx = m.index + m[1].length + 1;
            const sourcecodeEndIndx = sourcefileContents.indexOf("</script>", scriptstartIndx);
            const sourceCode = sourcefileContents.substring(sourcecodeStartIndx, sourcecodeEndIndx);
            const modcodeStartIndx = sourcecodeStartIndx + updateLength;
            let sourceStartLine = lineNumberByIndex(modcodeStartIndx, updatedsourceContents);
            if (updateComments)
              if (shouldUpdateComments(sourcefileType, sourceCode, sourcename, completemapfileName.substring(1))) {
                modSourceCode = updateCommentsInPlace(sourceCode, sourcecodeEndIndx, true, sourcename, completemapfileName.substring(1));
                updatedsourceContents =
                  updatedsourceContents.slice(0, modcodeStartIndx) +
                  modSourceCode +
                  updatedsourceContents.slice(updatedsourceContents.indexOf("</script>", modcodeStartIndx));
                updatedsourceFile = true;

                sourceStartLine = lineNumberByIndex(modcodeStartIndx, updatedsourceContents);
                updateLength = updateLength + (modSourceCode.length - sourceCode.length);
              }

            arrResults.push({
              sourcecode: modSourceCode.length > 0 ? modSourceCode : sourceCode,
              sourcename: sourcename,
              sourceStartLine: sourceStartLine,
              //** line 1 is always blank in the output file generated by nodered runtime for embedded javascript, therefore starting from line 2**
              outputStartLine: 2,
            });
            //}
            // no need to update original source files
          }

          return arrResults;
        })(sourcefileType, sourcefileContents);
        /*               const scriptendIndx = sourcefileContents.lastIndexOf(
                              "</script>",
                              scriptstartIndx
                            ); */

        sources.forEach((source) => {
          /**
           ** 2. get a source map as string for the provided javascript for every line
           ** assuming that output file is identical to the original line by line, that is output file is NOT minified/Uglified
           */

          if (source.sourcecode.length > 0) {
            sourceMap = addMapping(sourceMap, source.sourcecode, source.sourcename, source.sourceStartLine, source.outputStartLine, sourceRoot);
          }
        });

        //** 4. create the source maps file */
        // we create the source maps file last but ideally we should have done it before.
        // reason is that some html files contain multiple scripts and so the map is not known until all is complete
        // another way would be to keep the updated file as a buffer and update at the end but I can't be bothered making more changes to this now..
        (() => {
          try {
            // fs.mkdirSync(`${sourcefilepath.dir}${path.sep}.sourcemaps`, {
            //   recursive: true
            // });
            fs.writeFileSync(completemapfileName, sourceMap);
            console.log(`source maps file created at ${completemapfileName}`);
          } catch (err) {
            console.log(`could not create ${completemapfileName} file. skipping.. ${err}`);
          }
        })();
        //** 4. update the source file with comments if needed*/
        (() => {
          if (updatedsourceFile)
            try {
              fs.writeFileSync(
                completefileName,
                updatedsourceContents,
                {
                  flag: "r+",
                },
                (err) => {
                  if (err) throw err;
                }
              );
              console.log(`source file ${completefileName} updated ..`);
            } catch (err) {
              console.log(`could not update source file ${completefileName}. Error: ${err}`);
            }
        })();
      } catch (err) {
        console.log(`Error: could not read source file .${relsourcefileName}.. ${err}`);
      }
    }
  });
} catch (err) {
  console.log(
    `could not read package.json file. Ensure a valid package.json exists in the same directory and a node-red entry is defined. ${err} . aborting..`
  );
  process.exit(1);
}

function shouldUpdateComments(type, code, sourcefileName, completemapfileName) {
  const matchsourceURL = /(\/\/#\ssourceURL\s*=\s*)(.*)/.exec(code);
  const matchMappingURL = /(\/\/#\ssourceMappingURL\s*=\s*)(.*)/.exec(code);

  let needsUpdate = false;

  /**
   * * we want to check in html file only for sourceURL. it appears that sourceURL is not required for js file if the debugger is
   * * configured correctly. For js files , the VS code debugger (for example), automatically finds the source files and load the scripts.
   */

  if (type === "html") {
    if (matchsourceURL !== null && matchsourceURL.index) {
      if (matchsourceURL[2] !== sourcefileName) needsUpdate = true;
    } else needsUpdate = true;
  }
  if (!needsUpdate) {
    if (matchMappingURL !== null && matchMappingURL.index) {
      if (matchMappingURL[2] !== completemapfileName) needsUpdate = true;
    } else needsUpdate = true;
  }
  return needsUpdate;
}

function updateCommentsInPlace(code, appendPosition, addsourceURL, sourcefileName, completemapfileName) {
  // * we need to update source file. open and write new content with the modified comments lines
  const matchsourceURLindx = code.indexOf("//# sourceURL");
  const matchMappingURLindx = code.indexOf("//# sourceMappingURL");

  const cutPos = (() => {
    if (matchsourceURLindx > 0 && matchMappingURLindx > 0) return Math.min(matchsourceURLindx, matchMappingURLindx);
    if (matchsourceURLindx > 0 || matchMappingURLindx > 0) return matchsourceURLindx > 0 ? matchsourceURLindx : matchMappingURLindx;
    // * none of the attributes exist then we cut at the appendPosition
    return appendPosition;
  })();
  // * we add both sourceURL and sourceMappingURL to sourcecode, and add only sourceMappingURL to js
  if (cutPos) {
    const sourceURL = "//# sourceURL=" + sourcefileName;
    const sourceMappingURL = "//# sourceMappingURL=" + completemapfileName;
    const updatedCode =
      code.slice(0, cutPos) + (addsourceURL == true ? sourceURL + os.EOL + sourceMappingURL + os.EOL : sourceMappingURL + os.EOL) + code.slice(appendPosition);
    return updatedCode;
  } else return code;
}

function addMapping(map, sourcecode, originalfileName, originalsourceLine, outputLine, sourceRoot) {
  //returns modified map after adding mapping
  //map must be created first
  //use createMap to create a map
  let sourcefileName = originalfileName;
  if (sourceRoot.length > 0) sourcefileName = originalfileName.slice(sourceRoot.length);
  let line = outputLine;
  let sourceLine = originalsourceLine;
  // map.setSourceContent(sourcefileName, sourcecode);
  try {
    //** now we iterate through the js source line by line and add mappings for all found tokens**
    sourcecode.match(/^[^\r\n]*(?:\r\n?|\n?)/gm).forEach(function (token) {
      // TODO: ensure that we dont add a mapping to the line containing comments. Those are not debuggable lines of code.
      // have a check here that the token does not equal
      // (\/\/#\ssourceURL\s*=\s*)(.*)/ OR /(\/\/#\ssourceMappingURL\s*=\s*)(.*)/
      if (!/^\s*$/.test(token)) {
        map.addMapping({
          generated: {
            line: line,
            column: 0,
          },
          source: sourcefileName,
          original: {
            line: sourceLine,
            column: 0,
          },
          name: token,
        });
      }
      ++line;
      ++sourceLine;
    });

    return map;
  } catch (err) {
    console.log(`Could not create source maps for ${originalfileName} . Error ${err}`);
  }
}

function createMap(outputfileName, sourceRoot) {
  try {
    let map = new sourceMap.SourceMapGenerator({
      file: outputfileName,
      sourceRoot: sourceRoot,
    });
    return map;
  } catch (error) {
    console.log(`Could not create source maps for ${originalfileName}`);
  }
}

function lineNumberByIndex(index, string) {
  // RegExp
  let line = 0,
    match;
  const re = /(^)[\S\s]/gm;
  while ((match = re.exec(string))) {
    if (match.index > index) break;
    line++;
  }
  return line;
}
