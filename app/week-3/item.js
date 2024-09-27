
export default function Item({ item }) {

  let{name, quantity, category} = item;

    return (
      <div>
        <h3 className="mt-3 pl-3 text-2xl">{name}</h3>
        <p className="pl-3 " >Buy {quantity} in {category} </p>
      </div>
    );
  }