import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Process from './components/Process'
import Journey from './components/Journey'
import Contact from './components/Contact'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Process />
        <Journey />
        <Contact />
      </main>
    </>
  )
}

export default App
