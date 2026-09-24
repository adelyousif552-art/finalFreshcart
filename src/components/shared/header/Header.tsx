

export default function Header({firsttitle,secondtitle}:{firsttitle:string,secondtitle:string}) {
  return <>
   <header className="max-w-7xl w-full  mx-auto">
    <h1 className="font-bold text-3xl relative  before:h-full before:w-2 before:bg-green-600 before:absolute before:left-0 before:top-0  p-4">{firsttitle} <span className="text-green-500">{secondtitle}</span></h1>
  </header>
  
  </>
}
