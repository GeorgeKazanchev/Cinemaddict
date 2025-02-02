import FooterView from './view/footer-view';

type Props = {
  totalFilmsCount: number;
};

const getFooter = ({ totalFilmsCount }: Props): Element => {
  const footerView = new FooterView({ totalFilmsCount });
  return footerView.element;
};

export default getFooter;
