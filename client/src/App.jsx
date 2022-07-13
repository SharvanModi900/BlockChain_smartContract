
import './App.css'
import { NavBar,Footer,Transaction,Welcome,Services,Loader } from './components'

const App =() => {
  

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
      <NavBar />
      <Welcome />
      </div>
     
      <Services />
      <Transaction />
      <Footer />

    </div>
  )
}

export default App
