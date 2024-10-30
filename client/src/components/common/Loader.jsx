import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Loader = () => {
  const value = 0.66;
  return (
    <div   className='w-[200px] h-[200px] '>
      <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />
    </div>
  );
}
// style={{ width: 200, height: 200, display:"flex",justifyContent:"center",alignItems:"center",margin:"5pc" }}

export default Loader