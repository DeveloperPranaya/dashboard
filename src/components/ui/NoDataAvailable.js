import filterImage from "../../assets/images/contractstack/emptyFile.png";

const NoDataAvailable = () => {
  return (
    <div style={styles.container}>
      <img
        src={filterImage}
        alt="No Data"
        style={styles.image}
      />
      <p style={styles.text}>Data not available for this widget.</p>
      <p style={styles.subtext}>Please check your filters, permissions, or try again later.</p>
    </div>
  );
};

const styles = {
  container: {
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // padding: '20px',
    textAlign: 'center',
  },
  image: {
    width: '100px',
    height:'100px',
    marginBottom: '20px',
  },
  text: {
    color: '#757272ff',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '28px',
     textAlign: 'center',
  },
  subtext:{
    color: '#999292ff',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
     textAlign: 'center',
     width:'337px'
  }
};

export default NoDataAvailable;
