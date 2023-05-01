import axios from "axios";

import React, { useContext, useRef, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { ContextAuth } from "../context/AuthContext";
import Alert from "../components/Alert";

export const AddCategory = () => {
  //instanciamos lasvariables donde almacenaremos los datos del formulario
  const [image, setImage] = useState([]);
  const { token } = useContext(ContextAuth);
  const inpName = useRef();
  const inpDescription = useRef();
  const inpSubcategories = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [res, setRes] = useState({});

  //funcion para subir una nueva categoria
  const upload = async (e) => {
    e.preventDefault();

    //config de la peticion
    const url = "http://localhost:3000/Categories";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": token,
      },
    };

    //data de la peticion que enviaremos
    let formData = new FormData(); //formdata object

    formData.append("name", inpName.current.value); //append the values with key, value pair
    formData.append("description", inpDescription.current.value);
    formData.append("subCategories", inpSubcategories.current.value);
    if (image.length > 0) {
      formData.append("image", image[0]);
    }

    axios
      .post(url, formData, config)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setRes(res.data.ok);
          setShowAlert(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <div id="cardFormProduct">
        <div id="tittleFormProduct">
          <h2>Detalla la nueva categoria</h2>
        </div>

        <form action="">
          <div id="divForm">
            <input
              ref={inpName}
              className="form-control"
              type="text"
              id="nameProduct"
              placeholder="Nombre de la categoría. Ej: Toallas"
            />
          </div>

          <div id="divForm">
            <input
              ref={inpDescription}
              className="form-control"
              type="text"
              placeholder="Aqui puede describir la categoria..."
            />
          </div>

          <div id="divForm">
            <input
              ref={inpSubcategories}
              className="form-control"
              type="text"
              id="nameProduct"
              placeholder="Ej:De baño, etc..."
            />
          </div>

          <div id="divForm">
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
          </div>

          <div id="divbtn">
            <button id="btn" type="submit" onClick={upload}>
              Cargar
            </button>
          </div>
        </form>
        <br />
        <div>
          {showAlert && res === true ? (
            <Alert
              showAlert={showAlert}
              type={"alert alert-success"}
              message={"Se ha registrado correctamente"}
            />
          ) : (
            <Alert
              showAlert={showAlert}
              type={"alert alert-danger"}
              message={"Ha ocurrido un error. Verifique los campos."}
            />
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
