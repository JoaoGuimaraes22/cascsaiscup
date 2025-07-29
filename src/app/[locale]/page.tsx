import LandingWelcome from './components/Landing/LandingWelcome'
import LandingComments from './components/Landing/LandingComments'
import LandingNews from './components/Landing/LandingNews/LandingNews'
import LandingLocation from './components/Landing/LandingLocation'
import LandingReferences from './components/Landing/LandingReferences'
import LandingOffer from './components/Landing/LandingOffer/LandingOffer'
import LandingRegister from './components/Landing/LandingRegister'
import Sponsors from './components/Global/Sponsors'

export default function DashboardPage() {
  return (
    <div>
      <LandingWelcome />
      <LandingComments />
      <LandingNews />
      <LandingLocation />
      <LandingReferences />
      <LandingOffer />
      <LandingRegister />
    </div>
  )
}
