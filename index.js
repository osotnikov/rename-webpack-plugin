module.exports = class Rename {
  constructor(options) {
    this.options = { ...options };
  }

  apply(compiler) {
    compiler.hooks.emit.tap('Rename.emit', compilation => {
      const { assets } = compilation;
      const { originNameReg, targetName } = this.options;
      const originFiles = Object.keys(assets).filter(fileName =>
        new RegExp(originNameReg).test(fileName)
      );

      originFiles.forEach(fileName => {
        let assetsCopy = Object.assign([], assets);
        assetsCopy[fileName.replace(originNameReg, targetName)] = assetsCopy[fileName];
        delete assetsCopy[fileName];
      });
    });
  }
};
