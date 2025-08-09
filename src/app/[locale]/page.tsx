import LandingWelcome from './components/Landing/LandingWelcome'
import LandingNews from './components/Landing/LandingNews/LandingNews'
import LandingLocation from './components/Landing/LandingLocation'
import LandingReferences from './components/Landing/LandingReferences'
import LandingRegister from './components/Landing/LandingRegister'
import Sponsors from './components/Global/Sponsors'

export default function DashboardPage() {
  return (
    <div>
      <LandingWelcome />
      <LandingNews />
      <LandingReferences />
      <LandingLocation />
      <LandingRegister />
    </div>
  )
}
