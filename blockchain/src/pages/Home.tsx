import { Footer } from '../common/Footer'
import { MetamaskConnect } from '../common/MetamaskConnect'
import { Navbar } from '../common/Navbar'

export const Home = () => {
  return (
    <div className="container">
    <Navbar/>
    <div className="main">
        <div className="subDiv">
            <MetamaskConnect/>
        </div>
    </div>
   <Footer/>
</div>
  )
}
