# Scroll Progress

A plugin for [Sia](https://github.com/sia-ssg/sia) static site generator.

## Installation

```bash
npm install sia-plugin-scroll-progress
```

## Usage

Add the plugin to your site's `_config.yml`:

```yaml
plugins:
  enabled: true
  config:
    sia-plugin-scroll-progress:
      enabled: true
      height: "4px"
      color: "#007bff"
      position: "top"
      zIndex: 9999
```

### Example with custom styling

```yaml
plugins:
  enabled: true
  config:
    sia-plugin-scroll-progress:
      enabled: true
      height: "6px"
      color: "#ff6b6b"
      position: "top"
      zIndex: 10000
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| enabled | boolean | true | Enable or disable the plugin |
| height | string | "4px" | Height of the progress bar |
| color | string | "#007bff" | Color of the progress bar (CSS color value) |
| position | string | "top" | Position of the progress bar ("top" or "bottom") |
| zIndex | number | 9999 | CSS z-index value for the progress bar |

## Features

- ✅ Scroll progress indicator at the top (or bottom) of the page
- ✅ Smooth animation as you scroll
- ✅ Customizable height, color, and position
- ✅ Automatically updates on scroll and window resize
- ✅ Works with dynamic content
- ✅ Zero dependencies, pure vanilla JavaScript

## Development

```bash
# Clone the repository
git clone <repository-url>
cd sia-plugin-scroll-progress

# Install dependencies
npm install

# Test the plugin
npm test
```

## License

MIT

## Author

Terry Moore II
