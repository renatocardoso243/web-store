import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {

  //Statemant -- Read objects from de db of json-server.
  const [products, setProducts] = useState([])

  function getProducts() {
    fetch("http://localhost:4000/products?_sort=id&_order=desc")
    .then(response => {
        if (response.ok) {
            return response.json()
        }

        throw new Error()
    })
    .then(data => {
          setProducts(data)
    })
    .catch(error => {
        alert("Não foi possível obter informações")
    })
  }

  useEffect(getProducts, [])

  function deleteProduct(id) {
      fetch("http://localhost:4000/products/" + id, {
          method: "DELETE"
      })
      .then(response => {
          if (!response.ok) {
              throw new Error()
          }

          getProducts()
      })
      .catch(error => {
          alert("Não foi possível deletar produto!")
      })
  }

  return(
      <div className="container my-4">
          <h2 className="text-center mb-4">Produtos</h2>

          <div className="row mb-3">
              <div className="col">
                    <Link className="btn btn-primary me-1" to="/admin/products/create" role="button">Novo Produto</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getProducts}>Recarregar</button>
              </div>
              <div className="col">

              </div>
          </div>


          <table className="table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Marca</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th>Imagem</th>
                      <th>Data de Criação</th>
                      <th>Ação</th>
                  </tr>
              </thead>
              <tbody>
                {
                    products.map((product, index) => {
                      return (
                          <tr key={index}>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>{product.brand}</td>
                              <td>{product.category}</td>
                              <td>{product.price} R$</td>
                              <td><img src={"http://localhost:4000/images/" + product.imageFilename} width="100" alt="imagem do produto"/></td>
                              <td>{product.createdAt.slice(0, 10)}</td>
                              <td style={{ width: "10px", whiteSpace: "nowrap"}}>
                                  <Link className="btn btn-primary btn-sm me-1" to={"/admin/products/edit/" + product.id}>Editar</Link>
                                  <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Apagar</button>
                              </td>
                          </tr>
                      )
                    })
                }
              </tbody>
          </table>
      </div>
  )
}
