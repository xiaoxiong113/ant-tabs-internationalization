/*
 * @description: lint-staged 配置文件
 * @author: huxianghe
 * @lastEditors: huxianghe
 * @Date: 2020-05-12 15:11:48
 * @LastEditTime: 2020-05-12 15:12:30
 */
module.exports = {
  '**/*.less': 'stylelint --syntax less',
  '**/*.{js,jsx,ts,tsx}': 'npm run lint-staged:js',
  '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write'],
};
