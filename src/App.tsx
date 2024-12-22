import Nav from "./components/Nav";

function App() {
  return (
    <div className="bg-background text-foreground dark flex h-screen w-screen flex-col items-center justify-center space-y-4">
      <Nav className="absolute bottom-5 right-5" />
    </div>
  );
}

export default App;
