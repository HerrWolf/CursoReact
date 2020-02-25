import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, setConsultar] = useState(false)

    useEffect(() => {

        const { nombre, categoria } = busqueda;

        const obtenerRecetas = async () => {

            if (consultar) {
                
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
    
                const peticionAPI = await axios.get(url);
    
                setRecetas(peticionAPI.data.drinks);

            }

        }
        
        obtenerRecetas()
        
    }, [busqueda])

    return ( 
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider; 