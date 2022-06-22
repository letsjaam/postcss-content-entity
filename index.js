const entities = require('html-entities');

const isHtmlEntity = /&[aA-z]+;/g;

const getHtmlEntityCssCode = (entity) => {
    let char = entities.decode(entity);
    if (char === entity) return entity;
    return '\\' + char.charCodeAt(0).toString(16);
};

module.exports = () => {
    return {
        postcssPlugin: 'postcss-content-entity',
        Declaration: {
            content: (decl) => {
                decl.value = decl.value.replace(isHtmlEntity, (entity) => {
                    return getHtmlEntityCssCode(entity);
                });
            }
        }
    };
};

module.exports.postcss = true;
