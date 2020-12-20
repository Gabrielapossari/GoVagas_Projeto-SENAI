// pegar guardar variavel e api
import React, { useState, useEffect } from 'react';
// import React from 'react';
import './style.css';
import '../../../assets/styles/global.css'

import Header from '../../../components/header/index';
import Footer from '../../../components/footer/index';
import Button from '../../../components/button/index';

// import Sidebar from '../../components/sidebar';
// import imgAVA from '../../../assets/images/candidato/AVA.svg'
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
import { parseJwt } from '../../../auth'
import { Link, useHistory } from 'react-router-dom';

// import { Link } from 'react-router-dom';


function Visualizarvaga({ match }: any) {

    const {
        params: { id },
    } = match;
    console.log(id)

    // API
    const [idCandidato, setCandidato] = useState(0);
    const [idVaga, setIdVaga] = useState(0);
    const [vaga, setVaga] = useState<any>()

    const history = useHistory();

    useEffect(() => {
        setCandidato(parseJwt().jti);
        setIdVaga(id)
        visualizarVaga(id)
    }, []);


    const visualizarVaga = (id: number) => {

        return fetch('https://localhost:5001/api/Vaga/' + id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-govagas')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setVaga(data);
                setIdVaga(id);
            })
            .catch(err => console.error(err));
    }

    const salvar = () => {
        const form = {
            idCandidato: idCandidato,
            idVaga: idVaga
        };

        fetch("https://localhost:5001/api/Inscricao", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'content-type': 'application/json',
                // mudar o token
                authorization: 'Bearer ' + localStorage.getItem('token-govagas')
            }
        })
            .then(() => {
                setVaga({ ...vaga, inscricao: [...vaga.inscricao!, form] });
                alert('Inscricao cadastrado');

            })
            .catch(err => console.error(err));
    }

    const Menu = () => {
        const token = localStorage.getItem('tokengovagas');

        if (token === undefined || token === null) {
            return (
                <ul className="menuNav">
                    <ul className="menuNav">
                        <li><Link className="link" to="/">VER VAGAS</Link></li>
                        <li><Link className="link" to="/loginCandidato">LOGIN</Link></li>
                        <li><Link to="" className="Link"><Button name="btn1" value="CADASTRE-SE" /></Link></li>
                    </ul>
                </ul>
            );
        } else {
            if (parseJwt().Role === "3") {
                return (
                    <ul className="menuNav">
                        <li><Link className="link" to="/filme">DASHBOARD</Link></li>
                        <li><Link className="link" to="/vagas">VER VAGAS</Link></li>
                    </ul>
                );
            }
            if (parseJwt().Role === "2") {
                return (
                    <ul className="menuNav">
                        <li><Link className="link" to="/filme">DASHBOARD</Link></li>
                        <li><Link className="link" to="/publicarvaga">PUBLICAR VAGA</Link></li>
                    </ul>
                );
            }
            if (parseJwt().Role === "1") {
                return (
                    <ul className="menuNav">
                        <li><Link className="link" to="/dashadm">DASHBOARD</Link></li>
                        <li><Link className="link" to="/">PERFIL</Link></li>
                    </ul>
                );
            }


        }
    }

    return (
        <div>
            <Header />
            <div className="areaVisualizarVaga">

                <div className="ContentVisualizarVaga">
                    <section className="boxContentVisualizarVaga">

                        {/* <h1>Vagas</h1> */}
                        <div>
                            <div className="retanguloBrancoVisualizar0">
                                <div className="CardVisualizar">
                                    <h6>{vaga?.perfilDev}</h6>

                                    {/* <div className="cardprincipal"><div className="textinf2"> */}

                                    {/* logo */}
                                    {/* <div className="logo">
                                                <img src={imgAVA} alt="Ava" title="Ava" width="auto" height="60px" /></div> */}

                                    {/* </div> </div> */}
                                    <div className="cardHab">
                                        {vaga?.habNecessaria.split(',').map((habilidade: string) => {
                                            return (
                                                <div className="item"><p>{habilidade}</p></div>
                                            )
                                        })}

                                        {/* <div className="item"><p>C#</p></div>
                                                    <div className="item"><p>Java</p></div>
                                                    <div className="item-wide"><p>Java</p></div>
                                                    <div className="item"><p>SQL</p></div>
                                                    <div className="break"></div> */}
                                        {/* <div className="item"><p>PHP</p></div>
                                                    <div className="item"><p>HTML</p></div> */}

                                    </div>

                                </div>
                            </div>




                            {/* PARTE II */}
                            {/* <div className="titulo-empresa">
                            <p>Avanade</p>
                        </div>
                         */}
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
                                                    <p>{!vaga?.trabalhoRemoto && 'Presencial' || vaga?.trabalhoRemoto && 'Home Office (Remoto)'}</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgmoney} alt="Money" title="Money" width="30px" height="30px" />
                                                    <p>{vaga?.valorSalario && 'R$' + vaga.valorSalario
                                                        || !vaga?.valorSalario && ' Valor à Negociar'}</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgtranslation} alt="Translation" title="Translation" width="30px" height="30px" />
                                                    <p>{vaga?.reqVaga}</p>
                                                </div>

                                            </div>


                                            <div className="bre01">

                                                <div className="item02">
                                                    <img src={imgcasestudy} alt="Casestudy" title="Casestudy" width="25px" height="25px" />
                                                    <p>{vaga?.tempoExp} de Experiência</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgnotes} alt="Notes" title="Notes" width="25px" height="25px" />
                                                    <p>{vaga?.tipoContrato && 'Jovem Aprendiz'
                                                        || !vaga?.tipoContrato && 'Estágio'}</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgdiploma} alt="Diploma" title="Diploma" width="25px" height="25px" />
                                                    <p>{vaga?.tituloVaga}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <hr />

                            </div>


                            {/* PARTE III */}

                            <div className="descricao0">
                                <p>Descrição da empresa:</p> <p id="nomeEmpresa">{vaga?.idEmpresaNavigation.nomeEmpresa}</p>
                            </div>
                            <div className="retanguloBrancoVisualizar">
                                <div className="CardVisualizar">
                                    <div className="cardprincipal">
                                        <div className="flexVagaTxt">
                                            <p>{vaga?.idEmpresaNavigation.descricaoEmpresa}</p>
                                            {/* <p>
                                                A Avanade foi fundada como uma joint-venture entre a Microsoft Corporation
                                                e a Accenture LLP. As nossas soluções são construídas com base em uma
                                                incomparável combinação de insight, inovação e conhecimento técnico, apoiados
                                                por ferramentas, metodologias e práticas comprovadas.
                                        </p> */}
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
                                        {/* <div className="textinf5"> */}
                                        <div className="flexVagaTxt">
                                            <p>{vaga?.descAtivFuncoes.split(',').map((habilidade: string) => {
                                                return (
                                                    <div><p>- {habilidade}</p><br /></div>
                                                )
                                            })}</p>

                                            {/* <p>
                                                - Definir a equipe e suas atividades;<br></br>
                                            - Balizar a arquitetura da solução (Front, Back, BD);<br></br>
                                            - Configurar ambientes de desenvolvimento (SandBox);<br></br>
                                            - Fazer automatização build e deploy (CI & CD);<br></br>
                                            - Avaliar o uso de bibliotecas e componentes;<br></br>
                                            - Comunicar-se com a área gerencial da Radix e do cliente;<br></br>
                                            - Ser Auto-gerenciável;<br></br>
                                            - Aplicar treinamentos para a equipe.<br></br>
                                            - Inglês intermediário / Fluente<br></br>
                                            </p> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr />


                            {/* PARTE V */}
                            {/* <div className="retanguloBrancoVisualizar">
                                <div className="CardVisualizar">

                                    <div className="cardprincipal">
                                        <div className="flexVagaTxt">
                                            <p>
                                                - Experiência com base de dados orientada a grafo (CosmosDB com api Gremlin);<br></br>
                                            - Arquitetura de soluções no ambiente Azure;<br></br>
                                            - Experiência com ReactJS;<br></br>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div> */}


                            {/* PARTE VI */}
                            <div className="descricao0">
                                <p>Ofertas Extras</p>
                            </div>
                            <div className="retanguloBrancoVisualizar1">
                                <div className="CardVisualizar">

                                    <div className="cardprincipal">

                                        <div className="textinf2">

                                            {/* logo */}
                                            {/* <div className="logo">
                                            <img src={imgAVA} alt="Ava" title="Ava" width="auto" height="60px" />
                                        </div>*/}

                                            <div className="bre01">

                                                <div className="item02">
                                                    <div className="flexVagaTxt">
                                                        <p>{vaga?.ofertaExtra.split(',').map((habilidade: string) => {
                                                            return (
                                                                <div><p>- {habilidade}</p><br /></div>
                                                            )
                                                        })}</p>
                                                    </div>
                                                    {/* <img src={imgdentalcheckup} alt="officeblock" title="officeblock" width="30px" height="30px" /> */}
                                                    {/* <p>Assistência odontológica</p> */}
                                                </div>

                                                {/* <div className="item02">
                                                    <img src={imgdumbbell} alt="Money" title="Money" width="30px" height="30px" />
                                                    <p>Auxílio academia</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgheart} alt="Translation" title="Translation" width="30px" height="30px" />
                                                    <p>Seguro de vida</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgshoppingcart} alt="Translation" title="Translation" width="30px" height="30px" />
                                                    <p>Vale-alimentação</p>
                                                </div>

                                            </div>


                                            <div className="bre02">

                                                <div className="item02">
                                                    <img src={imgpharmacy} alt="Casestudy" title="Casestudy" width="25px" height="25px" />
                                                    <p>Assistência médica</p>
                                                </div>

                                                 <div className="item02">
                                                    <img src={imgpiggybank} alt="Notes" title="Notes" width="25px" height="25px" />
                                                    <p>Previdência privada</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgrestaurant} alt="Diploma" title="Diploma" width="25px" height="25px" />
                                                    <p>Vale-refeição</p>
                                                </div>

                                                <div className="item02">
                                                    <img src={imgtrain} alt="Diploma" title="Diploma" width="25px" height="25px" />
                                                    <p>Vale-transporte</p>
                                                </div> */}

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </div>




                        <div className="botaoInscricao">
                            {vaga?.inscricao.find(c => c.idCandidato == parseJwt().jti) &&
                                parseJwt().Role == "3" && (
                                    <Button name="btn2" value="Você está Candidatado!" />
                                )}

                            {!vaga?.inscricao.find(c => c.idCandidato == parseJwt().jti) &&
                                parseJwt().Role == "3" && (
                                    <form onSubmit={event => {
                                        event.preventDefault();
                                        salvar();
                                    }}>

                                        <Button onClick={() => salvar} name="btn1" value="Cadastre-se" />
                                    </form>
                                )}

                            {vaga?.inscricao.find(c => c.idEmpresa == parseJwt().jti) &&
                                parseJwt().Role == "2" && (
                                    <Button name="btn2" value="Você está Candidatado!" />
                                )}

                            {parseJwt().Role == "2" && parseJwt().jti == vaga?.idEmpresa && (<Button name="btn2"
                                onClick={() => history.push("/candidaturasvaga/" + id)} value="Visualizar Candidaturas" />)}

                            {parseJwt().Role == "2" && parseJwt().jti != vaga?.idEmpresa && (<Button name="btn2"
                                onClick={() => history.push("/vagas")} value="Voltar" />)}
                        </div>


                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Visualizarvaga;