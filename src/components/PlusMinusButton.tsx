interface Props {
  char: string;
}

const PlusMinusButton = (props: Props) => {
  return (
    <button className="flex items-end justify-center w-6 h-6 rounded-full border-2 border-black text-3xl  ">
      {props.char}
    </button>
  );
};

export default PlusMinusButton;