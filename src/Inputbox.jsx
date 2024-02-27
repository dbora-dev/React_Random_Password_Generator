import { useState, useCallback, useEffect, useRef } from "react";
export default function Inputbox() {
  const [counter, setCounter] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef hook :
  const passwordRef = useRef(null);

  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIZKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@$%&#";

    for (let i = 1; i <= counter; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [counter, numberAllowed, charAllowed, setPassword]);

  useEffect(
    () => passWordGenerator(),
    [counter, numberAllowed, charAllowed, passWordGenerator]
  );

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();

    // passwordRef.current?.setSelectionRange(0,4);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      {/* 1.  Input text field for password and copy botton */}

      <div className=" bg-slate-800 text-white  p-40 w-screen">
        <h1 className="font-extralight text-3xl text-center">
          Random Password - Generator
        </h1>

        <div>
          <input
            type="text"
            value={password}
            placeholder="generate password"
            className="align-middle  justify-center text-center ml-14 mt-6 mb-6 py-1 w-3/4 text-slate-950"
            readOnly
            ref={passwordRef}
          />
          <button
            className=" bg-rose-700 px-4 py-1 align-middle  justify-center text-center font-semibold rounded-r-md hover:bg-red-900"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        {/* 2. Slider, word checkbox, number checkbox etc. */}

        <div className="flex justify-center">
          {/* slider */}
          <input
            type="range"
            min={6}
            max={50}
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
            className=" ml-3"
          />
          <label className="ml-4">Length ({counter})</label>

          {/* Word checkbox */}
          <input
            type="checkbox"
            className=" ml-3 mr-1"
            defaultChecked={numberAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label>Words</label>

          {/* Numbers checkbox */}
          <input
            type="checkbox"
            className=" ml-3 mr-1"
            defaultChecked={charAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
      </div>

      <div className=" bg-rose-800 text-white p-40">
        <h2 className="text-2xl mt-4 text-center">Footer</h2>
        <p className="text-center text-sm">
          Copyright&#169; by Dipankar Bora, 2024
        </p>
      </div>
    </>
  );
}
