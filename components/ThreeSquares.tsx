export default function ThreeSquares() {
    return (
      <div className="flex justify-around p-6">
        {/* first square */}
        <div className="bg-red-500 w-64 h-64 flex items-center justify-center rounded-lg shadow-md">
          <h3 className="text-white text-2xl font-bold">Заголовок 1</h3>
        </div>
  
        {/* second square */}
        <div className="bg-green-500 w-64 h-64 flex items-center justify-center rounded-lg shadow-md">
          <h3 className="text-white text-2xl font-bold">Заголовок 2</h3>
        </div>
  
        {/*  third square */}
        <div className="bg-blue-500 w-64 h-64 flex items-center justify-center rounded-lg shadow-md">
          <h3 className="text-white text-2xl font-bold">Заголовок 3</h3>
        </div>
      </div>
    );
  }
  