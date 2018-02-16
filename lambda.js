const chartify = require('./chartify')


const doCallback = (data, callback) =>
    callback(null, {isBase64Encoded: false, headers: {'Content-Type': 'image/svg+xml'},
        statusCode: 200, body:chartify({width: 800, height: 440,
            data:
                typeof data === 'string' && data.match(/^[0-9]+(?:_[0-9]+)+$/) ?
                    data.split('_').reduce((acc, value, index) => index % 2 === 1 ? acc:
                        acc.concat({[value]: data.split('_')[index + 1]}), []) :
                typeof data === 'string' ? JSON.parse(decodeURIComponent(data)) : data})})

const handler = ({pathParameters, queryStringParameters, serie: seriePayload}, context, callback) =>
        pathParameters && pathParameters.serie ?
            doCallback(pathParameters.serie, callback):
            queryStringParameters && queryStringParameters.serie ?
                doCallback(queryStringParameters.serie, callback):
                typeof seriePayload === 'string' ?
                    doCallback(seriePayload, callback):
                    context.succeed(chartify({width: 800, height: 440, data:seriePayload}))
    //.reduce((acc, {key, doc_count}) => acc.concat({[parseInt(key)]:doc_count}), [])

module.exports={handler}

