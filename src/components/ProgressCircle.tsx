interface Props {
  name: string;
  percent: number;
}

const ProgressCirce = (props: Props) => {  
  const circumference = 377;

  const color = props.percent > 0.75 ? 'text-green-500' : props.percent > 0.45 ? 'text-yellow-400' : 'text-red-500';

  return (

    <div className="relative flex items-center justify-center h-40 w-40">
      <svg className="absolute h-full w-full transform -rotate-90">
        <defs>
          <linearGradient id="grayToWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'gray', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <circle
          stroke="url(#grayToWhite)"
          strokeWidth="8"
          fill="transparent"
          r="60"
          cx="80"
          cy="80"
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * props.percent)}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="60"
          cx="80"
          cy="80"
        />
      </svg>
      <span className="text-xl font-semibold">{props.name}</span>
  </div>
  );
}

export default ProgressCirce;