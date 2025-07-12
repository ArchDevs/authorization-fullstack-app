import ComparisonSection from "@/components/home/comparison-section"
import FeaturesSection from "@/components/home/features-section"
import HeroSection from "@/components/home/hero-section"

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
    </div>
  )
}
