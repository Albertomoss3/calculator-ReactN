import { useRef, useState } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    const [ numero, saveNumero] = useState('0');
    const [ numeroAnterior, saveNumeroAnterior] = useState('0');
    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        saveNumero('0');
        saveNumeroAnterior('0');
    }
    const armarNumero = ( numeroTexto: string ) => {
        //No aceptar doble punto
        if ( numero.includes('.') && numeroTexto === '.') return;

        if ( numero.startsWith('0') || numero.startsWith('-0')) {

            // Punto decimal
            if ( numeroTexto === '.' ) {
                saveNumero( numero + numeroTexto);

                // Evaluacion si es otro cero y hay un punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {
                saveNumero( numero + numeroTexto );

                // Evaluacion si  es diferente de cero y no tiene un punto
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {
                saveNumero( numeroTexto );

                // Evitar el 0.000000
            } else if( numeroTexto === '0' && !numero.includes('.') ){
                saveNumero( numero );
            } else {
                saveNumero( numero + numeroTexto );
            }
            
        } else {
            saveNumero( numero + numeroTexto );
        }
    }
    const positivoNegativo = () => {
        if ( numero.includes('-') ) {
            saveNumero( numero.replace( '-', '' ) );
        } else {
            saveNumero( '-' + numero );
        }
    }

    const btnDelete = () => {
        let negativo = '';
        let numeroTemp = numero;
        if ( numero.includes('-') ) {
            negativo = '-';
            numeroTemp = numero.substr(1);
        }
        if ( numeroTemp.length > 1 ) {
            saveNumero( negativo + numeroTemp.slice( 0, -1 ) );
        } else {
            saveNumero('0');
        }
    }

    const cambiarNumPorAnterior = () => {
        if ( numero.endsWith('.') ) {
            saveNumeroAnterior( numero.slice(0, -1) );
        } else {
            saveNumeroAnterior( numero );
        }
        saveNumero('0')
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }
    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }
    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }
    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const calcular = () => {
        
        const numero1 = Number(numero);
        const numero2 = Number(numeroAnterior);

        switch ( ultimaOperacion.current ) {
            case Operadores.sumar:
                saveNumero( `${ numero1 + numero2 }` );
            break;
            case Operadores.restar:
                saveNumero( `${ numero2 - numero1 }` );
            break;
            case Operadores.multiplicar:
                saveNumero( `${ numero1 * numero2 }` );
            break;
            case Operadores.dividir:
                saveNumero( `${ numero2 / numero1 }` );
            break;
        }
        saveNumeroAnterior( '0' );
    }

    return {
        numero,
        numeroAnterior,
        limpiar,
        positivoNegativo,
        btnDelete,
        btnDividir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular
    }
}
