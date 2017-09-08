# Import Formatter

A VSCode plugin which automatically sort the leading import and require statements.




## Features

**Sort ES6 import statements**

*Before*

```js
import styles from '../index.less';
import { b as bb } from '../../b';
import c from '../../c';
import a from 'a';
import React from 'react';
```

*After*

```js
// ESLint proof
// Built-ins and modules from third parties
import a from 'a';
import React from 'react';

// Modules from the current project.
import { b as bb } from '../../b';
import c from '../../c';

// Stylesheets or other assets
import styles from '../index.less';
```



**The require() function from CommonJS is also supported.**

*Before*

```js
var c = require('../../c');
var a = require('a');
var { b: bb } = require('../../b');
var React = require('react');
```

*After*

```js
var a = require('a');
var React = require('react');

var { b: bb } = require('../../b');
var c = require('../../c');
```

> Both **var** and **const**  are supported in CommonJS mode.



## Command

![](https://github.com/MagicCube/vscode-import-formatter/blob/master/doc/images/command-palette.png?raw=true)

Type `Sort imports/requires` in VSCode [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).



## Context Menu

![](https://github.com/MagicCube/vscode-import-formatter/blob/master/doc/images/context-menu.png?raw=true)

Click `Sort imports/requires` in the context menu in JavaScript editor.



## Default Keybindings

* Windows: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd>
* Mac OS X: <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>S</kbd>



## Known Issues

The comments between import/require statements will be removed.



## Release Notes

### 0.1.0

Initial release.
