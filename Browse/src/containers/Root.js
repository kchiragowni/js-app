if(process.env.NODE_ENV === 'production') {
    module.export = require('./Root.prod');
} else {
    module.export = require('./Root.dev');
}
