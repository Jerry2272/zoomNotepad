
function Home() {
  return (
    <div className="h-[100vh] text-white bg-slate-950 flex flex-col gap-y-16 justify-center items-center">
      <h2 className="text-6xl font-[600] relative z-[1] text-center">Get Started with zoomNote</h2>
      <input type="text" className="zoomInput shadow block w-full input bg-slate-700 py-3 px-5" disabled />
      <div className="flex gap-y-4 lg:flex-row flex-col">
        <a href="/login" className="bg-slate-700 px-8 py-4 w-auto text-center">Already have an account?</a>
        <a href="/signup" className="bg-slate-700 px-8 py-4 w-auto text-center">Sign Up</a>
      </div>
    </div>
  );
}

export default Home;
