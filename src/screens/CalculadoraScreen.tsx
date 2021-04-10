import React from 'react'
import { Text, View } from 'react-native'
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';
import { useCalculadora } from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {

    const { 
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
    } = useCalculadora()


    return (
        <View style={ styles.container }>
            {
                ( numeroAnterior !== '0' ) && (<Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>)
            }
            <Text   style={ styles.resultado } 
                    numberOfLines={ 1 } 
                    adjustsFontSizeToFit={ true }
                    >{ numero }</Text>

            {/* // Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto='C' color='#00A7E1' action={ limpiar } />
                <BotonCalc texto='+/-' color='#00A7E1' action={ positivoNegativo } />
                <BotonCalc texto='del' color='#00A7E1' action={ btnDelete } />
                <BotonCalc texto='/' color='#003459'  action={ btnDividir } />
            </View>
            {/* // Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto='7' action={ armarNumero } />
                <BotonCalc texto='8' action={ armarNumero } />
                <BotonCalc texto='9' action={ armarNumero } />
                <BotonCalc texto='X' color='#003459' action={ btnMultiplicar } />
            </View>
            {/* // Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto='4'  action={ armarNumero } />
                <BotonCalc texto='5'  action={ armarNumero } />
                <BotonCalc texto='6'  action={ armarNumero } />
                <BotonCalc texto='-' color='#003459'  action={ btnRestar } />
            </View>
            {/* // Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto='1' action={ armarNumero } />
                <BotonCalc texto='2' action={ armarNumero } />
                <BotonCalc texto='3' action={ armarNumero } />
                <BotonCalc texto='+' color='#003459' action={ btnSumar } />
            </View>
            {/* // Fila de Botones */}
            <View style={ styles.fila }>
                <BotonCalc texto='0' action={ armarNumero } />
                <BotonCalc texto='.' action={ armarNumero } />
                <BotonCalc texto='=' ancho color='#003459' action={ calcular } />
            </View>
        </View>
    )
}
