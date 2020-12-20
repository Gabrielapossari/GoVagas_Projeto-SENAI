import React, { useEffect, useState } from 'react';
import './style.css';
import '../../../assets/styles/global.css'

import Header from '../../../components/header/index';
import Footer from '../../../components/footer/index';
import Button from '../../../components/button/index';

import imgmoney from '../../../assets/images/candidato/money.svg'
import imgtranslation from '../../../assets/images/candidato/translation.svg'
import imgcasestudy from '../../../assets/images/candidato/case-study.svg'
import imgnotes from '../../../assets/images/candidato/notes.svg'
import imgdiploma from '../../../assets/images/candidato/diploma.svg'
import imglocation from '../../../assets/images/candidato/location.svg'
import imgAVA from '../../../assets/images/candidato/AVA.svg'
// Benefícios
import imgdentalcheckup from '../../../assets/images/candidato/dental-checkup.svg'
import imgdumbbell from '../../../assets/images/candidato/dumbbell.svg'
import imgheart from '../../../assets/images/candidato/heart.svg'
import imgpharmacy from '../../../assets/images/candidato/pharmacy.svg'
import imgpiggybank from '../../../assets/images/candidato/piggy-bank.svg'
import imgrestaurant from '../../../assets/images/candidato/restaurant.svg'
import imgshoppingcart from '../../../assets/images/candidato/shopping-cart.svg'
import imgtrain from '../../../assets/images/candidato/train.svg'
import { Link, useHistory } from 'react-router-dom';
import { parseJwt } from '../../../auth';

function PubliVagaTres() {

    let history = useHistory();

    const [idEmpresa, setIdEmrpesa] = useState((parseJwt().jti))
    const [empresa, setEmpresa] = useState<any>()

    useEffect(() => {
        dadosEmpresa(idEmpresa)
    }, []);

    const dadosEmpresa = (id: number) => {

        return fetch('https://localhost:5001/api/Empresa/' + id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-govagas')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setEmpresa(data);
            })
            .catch(err => console.error(err));
    }

    const Cadastrar3 = () => {
        // let ctx = useHistory();

        const form3 = {
            //etapa1
            TipoContrato: localStorage.getItem('Tipo de Contrato'),
            ExpertiseVaga: localStorage.getItem('Expertise Vaga'),
            TrabalhoRemoto: localStorage.getItem('Trabalhar Remoto'),
            OutraCidade: localStorage.getItem('Outra Cidade'),
            ValorSalario: localStorage.getItem('Valor Salário'),
            OfertaExtra: localStorage.getItem('Oferta Extra'),
            //etapa2
            TituloVaga: localStorage.getItem('Titulo da Vaga'),
            PerfilDev: localStorage.getItem('Perfil do desenvolvedor'),
            DiasContrato: localStorage.getItem('Dias de contrato'),
            NivelExp: localStorage.getItem('Nivel de experiência'),
            HabNecessaria: localStorage.getItem('HabNec'),
            LocalVaga: localStorage.getItem('Local da Vaga'),
            ReqVaga: localStorage.getItem('Requerimento da vaga'),
            TempoExp: localStorage.getItem('Tempo de Experiência'),
            DescAtivFuncoes: localStorage.getItem('Descrição das atividades e funções'),
            idEmpresa: idEmpresa
        }
        // ctx.push('/Tela De Sucessos')
        console.log(form3)

        fetch('https://localhost:5001/api/Vaga',
            {
                method: 'POST',
                body: JSON.stringify(form3),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(() => {
                alert('Vaga cadastrada');
                history.push('/dashEmpresa');
            })

            .catch(err => console.error(err));

    }

    return (
        <div>
            <Header />
            <div className="areaVisualizarVaga">

                <div className="ContentVisualizarVaga">
                    <section className="boxContentVisualizarVaga">
                        <form onSubmit={event => {
                            event.preventDefault();
                            Cadastrar3();
                        }}>
                            {/* <h1>Vagas</h1> */}
                            <div>
                                <div className="retanguloBrancoVisualizar0">
                                    <div className="CardVisualizar">
                                        <h6>{localStorage.getItem('Perfil do desenvolvedor')}</h6>
                                        <div className="cardHab">
                                            {localStorage.getItem('HabNec')?.split(',').map((habilidade: string) => {
                                                return (
                                                    <div className="item"><p>{habilidade}</p></div>
                                                )
                                            })}

                                        </div>

                                    </div>
                                </div>
                                {/* PARTE II */}
                                <div className="retanguloBrancoVisualizar">
                                    <hr />
                                    <div className="CardVisualizar0">

                                        <div className="cardprincipal">

                                            <div className="textinf2">

                                                {/* logo */}
                                                <div className="logo">
                                                    <img src={imgAVA} alt="Ava" title="Ava" width="auto" height="60px" />
                                                </div>

                                                <div className="bre01">

                                                    <div className="item02">
                                                        <img src={imglocation} alt="officeblock" title="officeblock" width="30px" height="30px" />
                                                        <p>{localStorage.getItem('Outra Cidade') === 'true' ? 'Home Office (Remoto)' : 'Presencial'}</p>
                                                    </div>

                                                    <div className="item02">
                                                        <img src={imgmoney} alt="Money" title="Money" width="30px" height="30px" />
                                                        <p>{localStorage.getItem('Valor Salário') && 'R$' + localStorage.getItem('Valor Salário')
                                                            || !localStorage.getItem('Valor Salário') && ' Valor à Negociar'}</p>
                                                    </div>

                                                    <div className="item02">
                                                        <img src={imgtranslation} alt="Translation" title="Translation" width="30px" height="30px" />
                                                        <p>{localStorage.getItem('Requerimento da vaga')}</p>
                                                    </div>
                                                </div>

                                                <div className="bre01">

                                                    <div className="item02">
                                                        <img src={imgcasestudy} alt="Casestudy" title="Casestudy" width="25px" height="25px" />
                                                        <p>{localStorage.getItem('Tempo de Experiência')} de Experiência</p>
                                                    </div>

                                                    <div className="item02">
                                                        <img src={imgnotes} alt="Notes" title="Notes" width="25px" height="25px" />
                                                        <p>{localStorage.getItem('Tipo de Contrato') && 'Jovem Aprendiz'
                                                            || !localStorage.getItem('Tipo de Contrato') && 'Estágio'}</p>
                                                    </div>

                                                    <div className="item02">
                                                        <img src={imgdiploma} alt="Diploma" title="Diploma" width="25px" height="25px" />
                                                        <p>{localStorage.getItem('Titulo da Vaga')}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <hr />

                                </div>


                                {/* PARTE III */}
                                <div className="descricao0">
                                    <p>Descrição da empresa:</p> <p id="nomeEmpresa">{empresa?.nomeEmpresa}</p>
                                </div>
                                <div className="retanguloBrancoVisualizar">
                                    <div className="CardVisualizar">
                                        <div className="cardprincipal">
                                            <div className="flexVagaTxt">
                                                <p>{empresa?.descricaoEmpresa}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr />


                                {/* PARTE IV */}
                                <div className="descricao0">
                                    <p>Atividades da vaga</p>
                                </div>
                                <div className="retanguloBrancoVisualizar">
                                    <div className="CardVisualizar">

                                        <div className="cardprincipal">
                                            <div className="flexVagaTxt">
                                                <p id="Desc">
                                                    {localStorage.getItem('Descrição das atividades e funções')?.split(',').map((habilidade: string) => {
                                                        return (
                                                            <div><p>- {habilidade}</p><br /></div>
                                                        )
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr />


                                {/* PARTE V */}
                                <div className="descricao0">
                                    <p>Ofertas Extras</p>
                                </div>
                                <div className="retanguloBrancoVisualizar1">
                                    <div className="CardVisualizar">

                                        <div className="cardprincipal">

                                            <div className="textinf2">

                                                <div className="bre01">

                                                    <div className="item02">
                                                        <div className="flexVagaTxt">
                                                            {localStorage.getItem('Oferta Extra')?.split(',').map((habilidade: string) => {
                                                                return (
                                                                    <div><p>- {habilidade}</p><br /></div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="btn-proximo">
                                <Link to="/PublicarVaga2"> <Button name="btn2" value="Voltar" /> </Link>
                                <Button name="btn1" value="publicar vaga" />
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default PubliVagaTres;