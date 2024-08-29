export default function SubscribeToNews() {
    return (
      <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md space-x-4">
        <h3 className="text-lg font-semibold">Підписатися на новини</h3>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Пiдписатись
        </button>
      </div>
    );
  }
  