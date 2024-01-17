# Strapi Blurred Image Format

## Overview

The Strapi Blurred Image Format plugin enhances your Strapi CMS media management experience by automatically generating base64 blurred formats for your image uploads. Elevate the visual appeal and user experience of your application/web pages by replacing bland grey boxes with aesthetically pleasing blurred image states. This versatile plugin supports various image formats, making it a valuable addition to your Strapi setup.

## Sample Response

Upon installing the plugin in your Strapi installation, the API response objects of images take the following structure:

```json
{
  "id": 153,
  "attributes": {
    // other attributes...
    "formats": {
      // other image formats such as small, medium, and large...
      "blurred": {
        "name": "lorem-ipsum.jpeg",
        "hash": "lorem-ipsum_8f733286e3",
        "ext": ".jpg",
        "mime": "image/jpeg",
        "path": null,
        "width": 16,
        "height": 12,
        "size": 0.59,
        "url": "data:image/jpeg;base64, /9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABAAAAADoAQAAQAAAAwAAAAAAAAA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgADAAQAwEiAAIRAQMRAf/EABcAAAMBAAAAAAAAAAAAAAAAAAEDBAX/xAAjEAABBAEDBAAAAAAAAAAAAREhMUH/2gAMAwEAAhEDEQA/ANWw5E3Wd6WtRCXHDEaS422RE6ykBWB1HP3+aJ5I3O1uGmhOPQizMfQhQDIJU2VpSFAg9sgnt8Y1bY7ErXd12FiZU4OvyHFrQlxIScnuPHOPekxuPatm/gyhNsVrjvtrQlbqSMhQOPHOPeqEU2rAn//Z"
      }
    }
  }
}
```

## Requirements

To maximize the benefits of the Strapi Blurred Image Format plugin, ensure that your Strapi version is v4 or higher.

## Installation

To install the plugin, use the following npm command:

```bash
npm install @isneezy/strapi-blurred-image-format
```

> Remember to restart your Strapi server after installation.

# Features

- **Automatic Blurred Format Generation:** Effortlessly generate blurred formats for supported files upon upload.
- **Easy Integration:** Seamlessly integrate the `@isneezy/strapi-blurred-image-format` plugin into your existing Strapi CMS setup, ensuring a smooth and hassle-free experience.
- **Migration on Startup:** The plugin automatically generates missing blurred image formats during startup, ensuring that your media library remains up-to-date with the latest enhancements. This migration feature adds convenience and efficiency to your media management tasks.

## Supported Formats

Refer to the [sharp](https://sharp.pixelplumbing.com/) library documentation for a list of supported formats.

## Contributions

We invite you to actively participate in improving the Strapi Blurred Image Format plugin by contributing to its growth and versatility. Your input is valuable in making this plugin even more robust and user-friendly. Feel free to submit bug reports, feature requests, or even contribute directly to the codebase. Together, let's make the Strapi Blurred Image Format plugin the best it can be!
