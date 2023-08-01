import './IntroText.css';

const IntroText = () => {
  return (
    <div className='intro-text-container'>
      <p className='intro-text'>
        Now you can easily track stocks that rank high on both absolute momentum and relative momentum.
        The app only displays stocks that are above their 150 Day moving average (absolute momentum) and ranks them based on their returns compared to other stocks (relative momentum)
      </p>
    </div>
  )
}

export default IntroText;