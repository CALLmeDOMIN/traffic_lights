import { useIntersection } from "@/hooks/useIntersection";
import IntersectionCanvas from "@/components/pixi/IntersectionCanvas";
import Nav from "@/components/Nav";

function App() {
  const {
    intersection,
    stepCount,
    movingVehicles,
    animatingVehicles,
    handleNextStep,
    handleAddVehicle,
    handleClear,
    handleFileUpload,
    handleAnimationComplete,
  } = useIntersection();

  return (
    <div className="dark flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-background text-foreground">
      <div className="overflow-hidden rounded-xl">
        <IntersectionCanvas
          intersection={intersection}
          movingVehicles={movingVehicles}
          animatingVehicles={animatingVehicles}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
      <Nav
        className="absolute bottom-5"
        stepCount={stepCount}
        onNextStep={handleNextStep}
        onAddVehicle={handleAddVehicle}
        onClear={handleClear}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}

export default App;
