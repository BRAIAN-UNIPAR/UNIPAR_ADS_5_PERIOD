import logoTitulo from './assets/Titulo.jpg'
import'./Title.css'

function Titulo(){

    return(
        <header className='hTittle'>

            <div className='boxLogo'>
                <img src= {logoTitulo} />
                <span>| Ferramenta de aprendizagem de calculo</span>
            </div>

            <span className='span1'>25/02/2025</span>

        </header>
    )

}

export default Titulo