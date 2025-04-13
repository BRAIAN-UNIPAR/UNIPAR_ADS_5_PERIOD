import Kid from './assets/second.jpg'
import './Branco.css'

function Branco() {
    return (
        <header className='hBranco'>
            <div className='boxImg'>
                <img src={Kid} alt="Imagem" />
                <h2 id='h2Msg'>
                    Para ser muito bom amanhã é preciso <br />  começar a praticar hoje                
                </h2>
            </div>  

            <div className="info">
                <span id='sp1'>Prof. Cleiton</span>
                <span id='sp2'>27 Fev 25</span>
                <span id='sp3'>19:40</span>                
            </div>

            <div className='info2'>
                <p id='p1'>São nos primeiros anos escolares que as crianças aprendem os fundamentos da <br />
                         matemática, inclusive as quatro operações - soma, subtração, multiplicação e <br />                 
                         divisão. Qualquer dificuldade que a criança tenha nessa fase se refletirá por toda <br /> 
                         a sua vida escolar :(</p>

                <p id='p2'>Aqui você e seu filho irão encontrar exercícios relacionados ao conteúdo ensinado <br />
                           nós primeiros anos escolares e buscara aperfeiçoar seu conhecimento nas <br />
                           operações básicas;</p> 
                           
                


            </div>
      
                
        </header>
    )
}

export default Branco
