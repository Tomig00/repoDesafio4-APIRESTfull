const fs = require("fs")
const { resolve } = require("path/posix")

const express = require('express')
const { get } = require("http")
const { test } = require("media-typer")
const app = express()

const PORT = 8080

const conectedserver = app.listen(PORT, () => {
    console.log(`iniciado en el puerto ${conectedserver.address().port}`)
})

conectedserver.on('error', (error) => console.log(`hubo un error ${error}`))

class Contenedor{

    save(){
        let arregloOld = []
        let idMayor = 0

        if (fs.readFileSync("./productos.txt", "utf-8") !== ""){
            arregloOld = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"))
        }

        for (let i = 0; i < arregloOld.length; i++)
        {
            if (arregloOld[i].id > idMayor)
            {
                idMayor = arregloOld[i].id
            }else break
        }
        producto.id = idMayor + 1
        arregloOld.push(producto)

        let productoJSON = JSON.stringify(arregloOld)
        fs.writeFile('./productos.txt', productoJSON, error =>{
            if (error){
                console.log(error)
            }else{
                console.log("Producto agregado correctamente.")
            }
        })
        return producto.id
    }

    getById(id){
        let arregloOld = []
        let encontro = 0
        let encontrado


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        encontrado = arregloOld[i]
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    encontrado = null
                                    resolve(encontrado)
                                }else if (encontro === 1)
                                {
                                    resolve(encontrado)
                                }
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    getAll()
    {
        let arregloOld = []

        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                resolve(arregloOld)
                            }
                        })
                    }, 1000
                );
            }
        );
        return promesa
         
    }

    changeById(id, producto)
    {
        let arregloOld = []
        let encontro = 0
        let encontrado


        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        encontrado = arregloOld[i]

                                        arregloOld.splice(i, 1)
                                        producto.id = id
                                        arregloOld.push(producto)

                                    }
                                }
                                let productoJSON = JSON.stringify(arregloOld)
                                fs.writeFile('./productos.txt', productoJSON, error =>{
                                    if (error){
                                        console.log(error)
                                    }else{
                                        console.log("Producto actualizado correctamente.")
                                    }
                                })
                                resolve(arregloOld)
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }

    deleteById(id)
    {
        let arregloOld = []
        let encontro = 0
        let objeto

        let promesa = new Promise
        (
            function(resolve, reject)
            {
                setTimeout
                (
                    function()
                    {
                        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
                            if (error)
                            {
                                reject(error)
                            }

                            if (contenido !== "")
                            {
                                if (!id || typeof id !== `number`)
                                {
                                    resolve("El Id ingresado no es un numero") 
                                }
                                arregloOld = JSON.parse(contenido)
                                for (let i = 0; i < arregloOld.length; i++)
                                {
                                    if (arregloOld[i].id === id)
                                    {
                                        objeto = i
                                        arregloOld.splice(objeto, 1);
                                        encontro = 1
                                    }
                                }
                                if (encontro === 0)
                                {
                                    resolve("No existe objeto con el Id ingresado.")
                                }
                                fs.writeFile("./productos.txt",JSON.stringify(arregloOld), error => {
                                    if (error){
                                        reject(error)
                                    }else {
                                        resolve(`Se borro objeto con id: ${id}`)
                                    }
                                })  
                            }
                        })
                    }
                );
            }
        );
        return promesa
    }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


let producto = new Object();


class productosApi {

    getProductos() {
        app.get('/api/productos', (req, res) => {
            const test = new Contenedor()
            test.getAll().then(function(result) {
                res.end(`<h1 style = 'color:blue;'> ARRAY DE PRODUCTOS</h1>${JSON.stringify(result)}`)
            });
        })
    }

    getProductoConId(){
        app.get('/api/productos/:num', (req, res) => {   
            const num = req.params.num
            if (isNaN(num))
            {
                res.json({ error : 'el parametro no es un numero' })
            }else{
                id = parseInt(num)
            const test = new Contenedor()
        
            test.getById(id).then(function(result) {
                if (result === null)
                {
                    res.json({ error : 'producto no encontrado' })
                }else
                {
                    res.end(`<h1 style = 'color:blue;'> ARRAY DE PRODUCTOS</h1>${JSON.stringify(result)}`)
                }
            });
            } 
        })
    }

    postAgregarProd(){
        app.post('/api/productos',(req, res) => {
    
            let test = new Contenedor();
            producto.title = req.body.title
            producto.price = req.body.price
            producto.thumbnail = req.body.thumbnail
        
            let id = test.save(producto)
            res.json({productoAgregadoConId: `${id}`})
        });
    }

    putChangeById(){
        app.put('/api/productos/:id', (req, res) =>{
            const num = req.params.id
            let id = parseInt(num)
            let test = new Contenedor();
            producto.title = req.body.title
            producto.price = req.body.price
            producto.thumbnail = req.body.thumbnail
            
            test.changeById(id, producto).then(function(result) {
                res.json({result})
            });  
        })
    }

    deleteById(){
        app.delete('/api/productos/:id', (req, res) =>{
            const num = req.params.id
            let id = parseInt(num)
            let test = new Contenedor();
            test.deleteById(id).then(function(result) {
                res.end(`<h1 style = 'color:blue;'> PRODUCTO ELIMINADO</h1>${JSON.stringify(result)}`)
            })
        })
    }
  }


let productoApi = new productosApi()
productoApi.getProductos()
productoApi.getProductoConId()
productoApi.postAgregarProd()
productoApi.putChangeById()
productoApi.deleteById()