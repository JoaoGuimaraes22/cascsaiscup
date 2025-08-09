import LandingWelcome from './components/Landing/LandingWelcome'
import LandingLocation from './components/Landing/LandingLocation'
import LandingRegister from './components/Landing/LandingRegister'
import LandingUpdates from './components/Landing/LandingUpdates'

export default function DashboardPage() {
  return (
    <div>
      <LandingWelcome />
      <LandingUpdates />
      <LandingLocation />
      <LandingRegister />
    </div>
  )
}
