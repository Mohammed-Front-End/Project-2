interface IProps {
  imgURL: string;
  alt: string;
  className: string;
}

function Imag({ imgURL, alt, className }: IProps) {
  return <img src={imgURL} alt={alt} className={className} />;
}

export default Imag;