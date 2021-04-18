


var express = require("express");
var app = express();

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const cors = require("cors");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vitor:$enac2021@cluster0.vtjoy.mongodb.net/db_produtos?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());


var Produto = require("./models/produtos");

var router = express.Router();


router.use(function (req, res, next) {
    console.log("Acesso à primeira camada da aplicação.");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    app.use(cors());
    next();
});


app.get("/", (req, res) => {
    console.log("Acesso a rota padrão da aplicação.");
    res.send("Acesso a rota padrão da aplicação.");
    res.json({ message: "Acesso a rota padrão da aplicação." })
});


router.route("/produtos")

    
    .get(function (req, res) {
        Produto.find({}, function (error, produtos) {
            if (error) res.send(error);
            res.json(produtos);
        })
    })

    
    .post(function (req, res) {
        var produto = new Produto();
        produto.name = req.body.name;
        produto.serial = req.body.serial;
        produto.local = req.body.local;
        produto.tipo = req.body.tipo

        produto.save(function (error) {
            if (error) res.send(error);
            res.json({ message: "Produto cadastrado com sucesso!" })
        });
    });



router.route("/produtos/:id")

    
    .get(function (req, res) {
        Produto.findById(req.params.id, function (error, produto) {
            if (error) res.send(error);
            res.json(produto);
        })
    })

    
    .delete(function (req, res) {
        Produto.remove(
            {
                _id: req.params.id
            },
            function (error) {
                if (error) res.send(error);
                res.json({ message: "Produto excluído com sucesso!" });
            })
    })

    
    .put(function (req, res) {
        Produto.findById(req.params.id, function (error, produto) {
            if (error) res.send(error);
            produto.name = req.body.name;
            produto.serial = req.body.serial;
            produto.local = req.body.local;
            produto.tipo = req.body.tipo

            produto.save(function (error) {
                if (error) res.send(error);
                res.json({ message: "Produto atualizado com sucesso!" })
            })
        })
    });



app.use("/api", router)


app.listen(8080);
console.log("Iniciando a aplicação...");