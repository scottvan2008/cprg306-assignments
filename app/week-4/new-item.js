
"use client";

export default function AdvCounter({currentCount, incrementCounterFunction, decrementCounterFunction}){

    let btn1Disabled = false;
    if (currentCount <= 1) {
        btn1Disabled = true;
    }

    let btn2Disabled = false;
    if (currentCount >= 20) {
        btn2Disabled = true;
    }

    

    return(


        <div className=" bg-blue-50 p-5 flex items-center justify-center my-5 mx-3">
        <p className="text-lg mr-10 w-10"> {currentCount} </p>

        <button className="bg-blue-500 text-white rounded py-1 px-5 m-2 
        hover:bg-blue-800 active:bg-yellow-600 disabled:bg-gray-400"
        onClick={ decrementCounterFunction } disabled={btn1Disabled}>-</button>

        <button className="bg-blue-500 text-white rounded py-1 px-5 m-2 
        hover:bg-blue-800 active:bg-yellow-600 disabled:bg-gray-400" 
        onClick={ incrementCounterFunction } disabled={btn2Disabled}>+</button>
        </div>

    );
}

