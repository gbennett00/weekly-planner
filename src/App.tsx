import "./App.css";
import Commitment from "./components/Commitment";
import ProgressCirce from "./components/ProgressCircle";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex p-7 bg-zinc-200 justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="logo.jpg" alt="Image" width={70} className="rounded-full" />
          <h1 className="font-bold text-4xl">Weekly Planner</h1>
        </div>
        <div className="flex gap-20">
          <h2>profile</h2>
          <h2>settings</h2>
        </div>
      </header>
      <main className="flex flex-grow">
        <div className="flex flex-col px-6 py-2 gap-2 border-r-black">
          <p>Individual</p>
          <p>Disciple</p>
          <p>Fiance</p>
        </div>
        <div className="flex flex-col p-7 gap-3 flex-grow">
          <section>
            <h3 className="font-semibold text-2xl">Long-term Goals</h3>
            <ul className="list-disc list-inside px-3">
              <li>This is one of my goals</li>
              <li>This is my other goal</li>
            </ul>
          </section>
          <section>
            <div className="flex flex-grow justify-between">
              <h3 className="font-semibold text-2xl">Weekly Commitments</h3>
              <div className="flex gap-24">
                <p>Target</p>
                <p>Actual</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Commitment
                description="Exercise for at least 30 minutes but also what happens if I write too much? it should wrapExercise for at least 30 minutes but also what happens if I write too much? it should wrap"
                target={10}
              />
              <Commitment
                description="Run for at least 20 minutes"
                target={1}
              />
              <Commitment description="Go to bed by 1 AM" target={1} />
              <Commitment description="Get up by 8 AM" target={1} />
            </div>
          </section>
        </div>
        <div className="flex flex-col py-4 px-20 gap-3">
          <ProgressCirce name="Individual" percent={0.94}/>
          <ProgressCirce name="Disciple" percent={0.24}/>
          <ProgressCirce name="Financial" percent={0.6}/>
        </div>
      </main>
      <footer className="bg-gray-600 text-white">
        Copyright Garrett Bennett
      </footer>
    </div>
  );
}

export default App;
