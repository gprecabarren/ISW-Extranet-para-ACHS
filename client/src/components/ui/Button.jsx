export function Button({ onClick, children, color = "indigo" }) {
  const colorClass = (color) => {
    switch(color) {
      case 'red':
        return 'bg-red-500 disabled:bg-red-300';
      case 'green':
        return 'bg-green-500 disabled:bg-green-300';
      case 'blue':
        return 'bg-blue-500 disabled:bg-blue-300';
      default:
        return 'bg-indigo-500 disabled:bg-indigo-300';
    }
  }
  return (
    <button
      className={`px-4 py-1 rounded-md my-2 ${colorClass(color)}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
