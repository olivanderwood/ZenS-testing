
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';

const app = express()
const port =  3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/api/joke', (req, res) => {
    let listJokeId = req.query.listJokeId
    listJokeId = listJokeId == '' ? [] : listJokeId.split('')
    let newListJokeId = listJokeId.map(i => Number(i))
    let item = {id: null, content: null}
    let count = 0
    if(newListJokeId.length == data.length) {
        return res.send({data: 'empty'})
    }
    while(newListJokeId.includes(item.id) || count <= 10){
        item = data[Math.floor(Math.random()*data.length)];
        count++
    }
    if(count === 11){
        return res.send({data: 'no more joke'})
    }
    if(item.id !== null){
        return res.send({data: item})
    }else{
        return res.send({data: 'no more joke'})
    }
})


app.put('/api/votejoke', (req, res) => {
    let id = req.body.body.id
    let isFun = req.body.body.isFun
    let item = data.find(i => i.id === id)
    if(isFun){
        item.isFun += 1
    }else{
        item.isNotFun += 1
    }

    data.splice(data.indexOf(data.find(i => i.id === id)), 1)
    data.push(item)
    return res.send({success: true})
})

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)



let data = [
        {
            "id": 1,
            "content": "joke1",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 2,
            "content": "joke2",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 3,
            "content": "joke3",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 4,
            "content": "joke4",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 5,
            "content": "joke5",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 6,
            "content": "joke6",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 7,
            "content": "joke7",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 8,
            "content": "joke8",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 9,
            "content": "joke9",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 10,
            "content": "joke10",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 11,
            "content": "joke11",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 12,
            "content": "joke12",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 13,
            "content": "joke13",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 14,
            "content": "joke14",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 15,
            "content": "joke15",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 16,
            "content": "joke16",
            "isFun": 0,
            "isNotFun": 0
        },
        {
            "id": 17,
            "content": "joke17",
            "isFun": 0,
            "isNotFun": 0
        }
    ]