export function Avatar({ name, size, rounded, src }: any) {
  const ars = [
    { color: "#F44336", letters: ["a", "b"] },
    { color: "#E91E63", letters: ["c", "d"] },
    { color: "#9C27B0", letters: ["e", "f"] },
    { color: "#673AB7", letters: ["g", "h"] },
    { color: "#3F51B5", letters: ["i", "j"] },
    { color: "#2196F3", letters: ["k", "l"] },
    { color: "#03A9F4", letters: ["m", "n"] },
    { color: "#00BCD4", letters: ["o", "p"] },
    { color: "#009688", letters: ["q", "r"] },
    { color: "#4CAF50", letters: ["s", "t"] },
    { color: "#8BC34A", letters: ["u", "v", "z"] },
    { color: "#FF9800", letters: ["w", "x", "y"] },
  ];

  function getColor(e) {
    return ars.find((i) => {
      const dd = i.letters.includes(e);

      return dd;
    }).color;
  }

  return (
    <div>
      {src && (
        <img
          style={{
            width: size || 35,
            height: size || 35,
          }}
          src={src}
          className={`${
            rounded ? "rounded-full" : "rounded-[4px]"
          } bg-gray-400 bg-opacity-10 `}
        />
      )}
      {!src && name && (
        <div
          style={{
            width: size || 35,
            height: size || 35,
            backgroundColor: getColor(
              name.split(" ")[0][0]
                ? name.split(" ")[0][0].toLocaleLowerCase()
                : name.split(" ")[0].toLocaleLowerCase() || "g"
            ),
          }}
          className={`${
            rounded ? "rounded-full" : "rounded-[4px]"
          }  flex justify-center items-center  text-white capitalize text-[14px] font-bold`}
        >
          <span className="mr-[0.5px]">{name.split(" ")[0][0]}</span>
          {name.split(" ").length > 1 && name.split(" ")[1][0]}
        </div>
      )}
    </div>
  );
}
