![Logo-Dark-Mode](https://raw.githubusercontent.com/SimonWadsack/laceryjs/refs/heads/main/docs/lacery_logo.png)

<h3 align='center'>A UI library to quickly build data-driven interfaces based on Shoelace.</h3>

<br>

[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Source-blue?logo=github)](https://github.com/SimonWadsack/laceryjs)
![License](https://img.shields.io/npm/l/lacery)
[![Docs](https://img.shields.io/badge/docs-available-brightgreen)](https://github.com/SimonWadsack/laceryjs/wiki)

## Features

- One-line UI element creation
- Bind any field of any object
- Typescript support


## Installation

### Dependencies

lacery.js requires [Shoelace](https://shoelace.style/) to work. Install Shoelace by following the [Shoelace installation guide](https://shoelace.style/getting-started/installation).

### NPM or CDN

After installing all dependencies into your project, you can either install lacery.js with npm or include it directly using the CDN:

You can install lacery.js via npm:

```bash
npm install lacery
```

Or include it directly in your HTML:

```html
<script src="https://cdn.example.com/lacery.min.js"></script>
```

## Usage

Here's a quick example to see lacery.js in action:

```typescript
import { Lace, NumberElement } from 'lacery';

// Create a container element
const container = document.createElement('div');
document.body.appendChild(container);

// Create a new Lace
const lace = new Lace(container);

// Create a new object that holds our variable
const VARS = { example: 0.5 };

// Add a simple number element and bind the object
lace.add(new NumberElement("Label", VARS, "example"));
```

## Documentation

Find the detailed documentation in the [Wiki](https://github.com/SimonWadsack/laceryjs/wiki).


## Inspiration

This project was inspired by [imgui](https://github.com/ocornut/imgui),  [lil-gui](https://github.com/georgealways/lil-gui) and [Tweakpane](https://tweakpane.github.io/docs/).

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](https://github.com/SimonWadsack/laceryjs/blob/main/LICENSE) file for details.