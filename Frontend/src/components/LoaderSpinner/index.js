import { Circles as Loader } from "react-loader-spinner";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
`;

const LoaderSpinner = () => (
  <SpinnerWrapper>
    <Loader
      color="#84c225" // BigBasket green
      height={100}
      width={100}
      ariaLabel="loading"
    />
  </SpinnerWrapper>
);

export default LoaderSpinner;
