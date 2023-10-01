import icon from '../imgs/inconLogin.svg';
import trybeIcon from '../imgs/trybeLogin.svg';
import walletIcon from '../imgs/walletLogin.svg';

export default function LogoHeader() {
  return (
    <div>
        <img src={ icon } alt="" />
        <img src={ trybeIcon } alt="" />
        <img src={ walletIcon } alt="" />
      </div>
  )
}
