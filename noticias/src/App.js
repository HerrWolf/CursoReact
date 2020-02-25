import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {

  // Definir la categoria y noticias
  const [categoria, guardarCategoria] = useState('');
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {

    const consultarAPI = async () => {

      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=97d7c98727634778a3eb96005b785216`;

      const respuesta = await fetch(url);
      const noticias = await respuesta.json();

      setNoticias(noticias.articles);

    }

    consultarAPI();
    
  }, [categoria])

  return (
    <Fragment>
      <Header 
        titulo="Buscador de Noticias"
      />

      <div className="container white">
        <Formulario 
          guardarCategoria={guardarCategoria}
        />

        <ListadoNoticias 
          noticias={noticias}
        />
      </div>
      </Fragment>
  );
}

export default App;
