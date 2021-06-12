import playwright from 'playwright';
import { findNextSunday, logSuccessMessage } from './utils';

// Aparentemente as inscrições abrem sexta feira por volta do meio dia
export async function ippCrawler() {
  console.log('Carregando página...');

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  const nextSundayDate = findNextSunday(); // Example: '30/05'

  await page.goto('https://www.ippinheiros.org.br/cultos/', {
    waitUntil: 'networkidle',
  });

  const isSubscriptionOpen = await page.evaluate((nextSundayDate) => {
    const h4_titles = Array.from(document.querySelectorAll('h4'));
    const sundayWorshipTitleFound = h4_titles.find((h4) => {
      const textContent = h4.innerText.toLowerCase();
      return textContent.includes('noturno') && textContent.includes('domingo');
    });
    return sundayWorshipTitleFound?.innerText.includes(nextSundayDate);
  }, nextSundayDate);

  if (!isSubscriptionOpen) {
    console.log('Inscrições não encontrada.', new Date().toJSON());
    return browser.close();
  }

  logSuccessMessage('Inscrições abertas!!!');

  return browser.close();
}
