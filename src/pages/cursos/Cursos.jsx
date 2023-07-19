import React, { useEffect, useState, useRef } from "react";
import { HeroCursos } from "./heroCursos/HeroCursos"
import { CardCursos } from "./cardCursos/CardCursos"
import "./Cursos.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import MOCK_DATA from '../../Data/mockCursos.json'

export const pedirDatos = (bool) => {
    return new Promise((resolve, reject) => {
        // cuerpo de la promesa
        setTimeout(()=>{
            resolve(MOCK_DATA)
        }, 500)
    })
}

export const Cursos = () => {
    const [datosCursos, setDatosCursos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
        try {
            const datos = await pedirDatos();
            setDatosCursos(datos);
        } catch (error) {
            console.error("Error al obtener los datos de los cursos:", error);
        }
        };

        obtenerDatos();
    }, []);

    const cursosRef = useRef(null);

    useEffect(() => {
        console.log('Refs', cursosRef.current);
    }, []);

    const handleScrollTo = () => {
        let ref = cursosRef;
        if (ref && ref.current) {
            console.log(ref)
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return(
        <div className="containerCursos">
            <HeroCursos handleScrollTo={handleScrollTo}/>
            <div className="NivelText">
            Nivel Inicial
            </div>
            <Box sx={{ flexGrow: 1 }} className="containerDivCursos">
                <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="left"
                alignItems="center"
                >
                {
                    datosCursos.map((curso) => (
                        <Grid key={curso.nombre}>
                            <CardCursos curso={curso} key={curso.nombre}/>
                        </Grid>
                    ))
                }
                </Grid>
            </Box>
            <div className="NivelText">
            Nivel Profesional
            </div>
            <Box sx={{ flexGrow: 1 }} className="containerDivCursos">
                <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="left"
                alignItems="center"
                >
                {
                    datosCursos.map((curso) => (
                        <Grid key={curso.nombre}>
                            <CardCursos curso={curso} key={curso.nombre}/>
                        </Grid>
                    ))
                }
                </Grid>
            </Box>          
        </div>
    );
}