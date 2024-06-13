import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {

    const [validationErrors, setValidationErrors] = useState({})

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const product = Object.fromEntries(formData.entries())

        if (!product.name || !product.brand || !product.category || !product.price || !product.description || !product.image.name) {

          alert("Preencha todos os campos!")
          return
        }

        try {
            const response = await fetch("http://localhost:4000/products/", {
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if(response.ok) {
              //Produto criado com sucesso!
              navigate("/admin/products")
            }
            else if (response.status === 400) {
                setValidationErrors(data)
            }
            else {
                alert("Não foi possível cadastrar produto!")
            }
        }
        catch(error) {
              alert("Não foi possível conectar ao servidor!")
        }
    }



    return (
      <div className="container my-4">
          <div className="row">
            <div className="col-md-8 mx-auto rounded border p-4">
              <h2 className="text-center mb-5">Novo Produto</h2>

              <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Nome</label>
                    <div className="col-sm-8">
                        <input className="form-control" name="name" />
                        <span className="text-danger">{validationErrors.name}</span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Marca</label>
                    <div className="col-sm-8">
                        <input className="form-control" name="brand" />
                        <span className="text-danger">{validationErrors.brand}</span>
                    </div>
                  </div>

                   <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Categoria</label>
                    <div className="col-sm-8">
                        <select className="form-control" name="category">
                            <option value='Outros'>Outros</option>
                            <option value='Celulares'>Celulares</option>
                            <option value='Computadores'>Computadores</option>
                            <option value='Acessorios'>Acessórios</option>
                            <option value='impressoras'>Impressoras</option>
                            <option value='Cameras'>Cameras</option>
                        </select>
                        <span className="text-danger">{validationErrors.category}</span>
                    </div>
                  </div>

                  <div className="row mb-3">
                      <label className="col-sm-4 col-form-label">Preço</label>
                      <div className="col-sm-8">
                          <input className="form-control" name="price" type="number" step="0.01" min="1" />
                          <span className="text-danger">{validationErrors.price}</span>
                      </div>
                  </div>

                  <div className="row mb-3">
                      <label className="col-sm-4 col-form-label">Descrição</label>
                      <div className="col-sm-8">
                          <textarea className="form-control" name="description" rows="4" />
                          <span className="text-danger">{validationErrors.description}</span>
                      </div>
                  </div>

                  <div className="row mb-3">
                      <label className="col-sm-4 col-form-label">Imagem</label>
                      <div className="col-sm-8">
                          <input className="form-control" type="file" name="image" />
                          <span className="text-danger">{validationErrors.image}</span>
                      </div>
                  </div>

                  <div className="row">
                      <div className="offset-sm-4 col-sm-4 d-grid">
                          <button type="submit" className="btn btn-primary">Criar</button>
                      </div>
                      <div className="col-sm-4 d-grid">
                          <Link className="btn btn-secondary" to="/admin/products" role="button">Cancelar</Link>
                      </div>
                  </div>
              </form>
            </div>
          </div>
      </div>
    )
}
