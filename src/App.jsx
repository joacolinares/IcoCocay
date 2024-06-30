import Pasos from "../components/Pasos";

function App() {
  return (
    <body className="overflow-hidden">
      <div className="w-screen relative min-h-screen h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
        <Pasos />
        <div className="w-screen h-full bg-black absolute top-0 left-0 -z-[10]">
          <div className="bg-black h-full w-full absolute opacity-60" />
          <video
            id="background-video"
            loop
            autoPlay
            className="w-full h-full object-cover"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </body>
  );
}

export default App;
