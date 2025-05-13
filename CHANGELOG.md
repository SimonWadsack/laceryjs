# Changelog

All notable changes to this project will be documented in this file.

<br>

## [1.2.4] - 2025-05-13

### Fixed

- `BooleanElement` weird spacing afterwards now actually fixed

## [1.2.3] - 2025-05-13

### Fixed

- `BooleanElement` weird spacing afterwards

## [1.2.2] - 2025-05-12

### Fixed

- `NumberSelectElement`, `TextSelectElement` and `ButtonSelectElement` emitting false warnings

## [1.2.1] - 2025-05-10

### Changed

- `TextureElement` now has a public `updateBlob` that re-fetches from the bound object.

## [1.2.0] - 2025-05-09

### Added

- New `ButtonSelectElement`

## [1.1.7] - 2025-05-07

### Added

- `NumberSelectElement` and `TextSelectElement` now have a `previews` and `previewSize` option to show images in front of the option in the dropdown

## [1.1.6] - 2025-05-03

### Fixes

- `TextureElement` fix for creating too many object URLs

## [1.1.5] - 2025-05-03

### Changes

- `TextureElement` now binds a `Blob` instead of the dataURL directly, this makes handling images easier and saves memory
- To still support dataURL bindings for those who need it, the old `TextureElement` is now `DataURLTextureElement`

## [1.1.4] - 2025-05-02

### Fixes

- Scrolling inside vertical tabs
- Wrong padding inside `LabelElement`

## [1.1.3] - 2025-04-30

## Fixes

- Small callback fix for `TextureElement`

## [1.1.2] - 2025-04-30

## Fixes

- Small name fix for `TextureElement`

## [1.1.1] - 2025-04-30

### Added

- Texture in `TextureElement` is now removable again
- New `hasTexture` function for the `TextureElement`
- New `onTextureAdded` and `onTextureRemoved` callback functions in the options for the `TextureElement`
- Added wiki entry for `TextureElement`

### Fixed

- Wrong icons in the `TextureElement`

## [1.1.0] - 2025-04-25

### Added

- New `ButtonElement`

### Changed

- Icon library for tabs can now be set in the options


## [1.0.4] - 2025-04-22

### Fixed

- Links in README
- Small font family fix

## [1.0.3] - 2025-04-22

### Fixed

- Small build script fix

## [1.0.2] - 2025-04-22

### Added

- Custom README for npm

## [1.0.1] - 2025-04-22

### Fixed

- Small bug with CSS styles

## [1.0.0] - Initial Release - 2025-04-22