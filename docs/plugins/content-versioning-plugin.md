# Content Versioning

The content versioning plugin is an external, third-party plugin which we depend on for versioning our content. It is developed by [Notum](notum.cz), and the source code of this plugin is located [here](https://github.com/notum-cz/strapi-plugin-content-versioning). There's somewhat of a community there as of the rime of writing this (2023-03-15), and the main authors are helpful in case some bug is encountered.

## Important takeaway

This plugin alters the database structure a bit in order to enable the content versioning. Strapi's base identification system consists of an incremental id for each existing content type. E.g, the first Block would be /blocks/1, the third Lecture would be /lecture/3 etc...

This plugin makes it so that when you add a new version of an entry, it gets a new id. So in case you would start of with ONE block (BlockX) and save two versions of it, you would end up with three id:s; 1, 2 and 3, but the default Strapi UI would still only show the published version (id 3 for example).
In order to have something that's constant for BlockX eventhough we have different versions (and id:s), this plugin adds a field called `vuid`. In the example above, BlockX would still have id 1, 2 and 3, but all three id:s would have the same `vuid` (which is a UUID). We use the `vuid` to keep as a content id in our routing, for example: www.curriculum.climatecompatiblegrowth.com/blocks/<vuid>. Note: the vuid is also the same for different locales.
