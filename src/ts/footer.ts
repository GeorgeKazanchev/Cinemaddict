import { getElementFromTemplate } from './util';

type Props = {
  totalFilmsCount: number;
};

const getFooter = ({ totalFilmsCount }: Props): Element => {
  const content = `
    <footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>${totalFilmsCount} ${totalFilmsCount === 1 ? 'movie' : 'movies'} inside</p>
      </section>
    </footer>`;

  const element = getElementFromTemplate(content);

  return element;
};

export default getFooter;
