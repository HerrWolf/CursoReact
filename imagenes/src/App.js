import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {

    const consultarAPI = async () =>{

      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '15192574-3ba7c5bd66133a109c4e976fc';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({
        behavior:'smooth'
      });

    }

    consultarAPI();
    
  }, [busqueda, paginaActual])

  // Definir la pagina anterior
  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaActual - 1;

      if (nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);

  
  }
  // Definir la pagina Sigiente
  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaActual + 1;

      if (nuevaPaginaActual > totalPaginas) return;

    setPaginaActual(nuevaPaginaActual);

  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {
          (paginaActual === 1) ? null :
            <button
              type="button"
              className="btn btn-info mr-1 mb-5"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
        }
        {
          (paginaActual === totalPaginas) ? null :
            <button
              type="button"
              className="btn btn-info mb-5"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
        }
        
      </div>
    </div>
  );
}

export default App;
