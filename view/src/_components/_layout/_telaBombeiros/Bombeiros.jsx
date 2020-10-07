import React, { Component } from 'react'

import './Bombeiros.css'
import Card from './Card'

export default class Bombeiros extends Component {
    render() {
        return(
            <div className="container">
                <div className="itens">
                    <div className="drop">
                        <select name="Teste" id="">
                            <option value="nome1">Search...</option>
                            <option value="nome2">Teste_1</option>
                            <option value="nome3">Teste_2</option>
                            <option value="nome4">Teste_3</option>
                            <option value="nome5">Teste_4</option>
                            <option value="nome6">Teste_5</option>
                        </select>
                    </div>
                    <div className="box">
                        <Card width={640} color={'#FFF'}/>
                        <Card width={200} color={'#FFF'}/>
                        <Card width={300} color={'#FFF'}/>
                        <Card width={300} color={'#FFF'}/>
                        <Card width={200} color={'#FFF'}/>
                    </div>
                </div>
            </div>
        )
    }
}