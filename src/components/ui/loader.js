import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div style={{ textAlign: 'center', margin:"auto", padding: '2rem' }}>
      <ClipLoader color="#6c63ff" size={300} />
    </div>
  );
}
export default Loader;