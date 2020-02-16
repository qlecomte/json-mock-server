const path = require('path')
const express = require('express')
const morgan = require('morgan')

const argv = require('yargs').argv
const app = express()

const datafile = argv.data
const json = require(path.resolve(datafile))

app.use(morgan('dev'))

app.use(function (req, res) {
    const splitUrl = req.originalUrl.split('/')
    splitUrl.shift()

    let body = json
    for (const urlPart of splitUrl) {
        if (Array.isArray(body)){
            body = body.find(function (item) {
                return item.id == urlPart
            })
        } else {
            body = body[urlPart]
        }

        if (body == null) {
            res.sendStatus(404)
            return
        }
    }

    res.send(body)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})