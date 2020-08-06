/*
 * @description: 
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-14 10:14:44
 * @LastEditTime: 2020-05-14 10:17:31
 */
const requireContext = () => {
  if (typeof require.context === 'undefined') {
    const fs = require('fs');
    const path = require('path');
  
    require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.(ts|js)$/) => {
      const files = {};
  
      function readDirectory(directory) {
        fs.readdirSync(directory).forEach((file) => {
          const fullPath = path.resolve(directory, file);
  
          if (fs.statSync(fullPath).isDirectory()) {
            if (scanSubDirectories) readDirectory(fullPath);
  
            return;
          }
  
          if (!regularExpression.test(fullPath)) return;
  
          files[fullPath] = true;
        });
      }
  
      readDirectory(path.resolve(__dirname, base));
  
      function Module(file) {
        return require(file);
      }
  
      Module.keys = () => Object.keys(files);
  
      return Module;
    }
    return require
  }
}

export default requireContext
