import Navbar from './components/Navbar'
import HeroExperience from './experience/HeroExperience'
import Projects from './components/Projects'
import About from './components/About'
import Process from './components/Process'
import Journey from './components/Journey'
import Contact from './components/Contact'
import AmbientBackground from './components/AmbientBackground'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <AmbientBackground />
      <Navbar />
      <main id="main-content">
        <HeroExperience />
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
