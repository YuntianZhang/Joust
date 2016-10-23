# Joust
[![Travis](https://img.shields.io/travis/HearthSim/joust/master.svg)](https://travis-ci.org/HearthSim/joust)
[![GitHub release](https://img.shields.io/github/release/HearthSim/joust.svg)](https://github.com/HearthSim/joust/releases)

HearthStone replays in your browser, written in Typescript with React.


## Requirements

- Node.js ~v6.6 (v4.5 should also work, but is not officially supported)
- Compiling: `npm install -g gulp webpack`
- Development: `npm install -g electron-prebuilt gulp webpack`
- [yarn](https://yarnpkg.com/) (optional): `npm install -g yarn`


## Compiling

```
yarn
```

```
gulp compile
```

### Alternatively

```
npm install
```


## Embedding

```html
<div id="container"></div>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react-dom.min.js"></script>
<script type="text/javascript" src="joust.js"></script>
<script type="text/javascript">
	Joust.launcher("container")
		.height(500)
		.width(500)
		.fromUrl("//example.org/brawl.hsreplay");
</script>
```

[Full documentation](https://github.com/HearthSim/joust/wiki/Embedding).

Don't forget to include the stylesheet and the assets.


## Development

Watch TypeScript with webpack:

```
webpack -d --watch
```

Watch HTML/LESS:

```
gulp watch
```


## License

Copyright © HearthSim. All Rights Reserved.

### Third party assets

- The Font Awesome font is licensed under the SIL OFL 1.1.
- The Font Awesome style code is licensed under the MIT license.
- Some Hearthstone textures are copyright © Blizzard Entertainment


## Community

This is a [HearthSim](https://hearthsim.info) project. All development
happens on our IRC channel `#hearthsim` on [Freenode](https://freenode.net).
