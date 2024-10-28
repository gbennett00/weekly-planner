import PlusMinusButton from "./PlusMinusButton";

interface Props {
  description: string;
  target: number;
}

const Commitment = (props: Props) => {
  return (
    <div className="flex flex-grow justify-between">
      <ul className="list-disc list-inside px-3">
        <li className="">{props.description}</li>
      </ul>
      <div className="flex gap-24">
        <p className="w-16 text-center">{props.target}</p>
        <div className="flex gap-3">
        <PlusMinusButton char="-"/>
        <p className="font-semibold text-lg">0</p>
        <PlusMinusButton char="+"/>
      </div>
      </div>
    </div>
  );
};

export default Commitment;
