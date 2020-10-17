import React from 'react';
import telegram from '../../icons/telegram.png';
import vk from '../../icons/vk.png';
import whatsapp from '../../icons/whatsapp.png';
import mail from '../../icons/mail-send.png';
import gitHub from '../../icons/github.png';
import phone from '../../icons/smartphone.png';
import styles from './Contacts.module.css';

const Contacts = () => {
  return(
    <div>
      <p>Контакты для связи:</p>
      <a href="https://tele.gs/Aug512"
        target="blank"
        className={styles.socialLink}>
          <img src={telegram}
          className={styles.icon}
          alt="Telegram_logo" />
          Telegram
      </a>
      <a href="https://wa.me/79650157820"
        target="blank"
        className={styles.socialLink}>
          <img src={whatsapp}
          className={styles.icon}
          alt="WhatsApp_logo" />
          WhatsApp
      </a>
      <a href="https://vk.com/write36437279"
        target="blank"
        className={styles.socialLink}>
          <img src={vk}
          className={styles.icon}
          alt="VK_logo" />
          VK
      </a>
      <a href="https://github.com/Aug512"
        target="blank"
        className={styles.socialLink}>
          <img src={gitHub}
          className={styles.icon}
          alt="GitHub_logo" />
          GitHub
      </a>
      <a href="mailto:dmitriy.esko@gmail.com"
        target="blank"
        className={styles.socialLink}>
          <img src={mail}
          className={styles.icon}
          alt="Email_logo" />
          <span>dmitriy.esko@gmail.com </span>
      </a>
      <a href="tel:+79650157820" className={styles.socialLink}>
        <img src={phone}
        className={styles.icon}
        alt="Phone_logo" />
        +7 (965) 015-7820
      </a>
      <div className={styles.copyright}>Icons made by&nbsp;
        <a href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          target="blank"
          className={styles.copyrightLink}>
            Freepik
        </a> from&nbsp;
        <a href="https://www.flaticon.com/"
          title="Flaticon"
          target="blank"
          className={styles.copyrightLink}>
            www.flaticon.com
        </a>
      </div>
    </div>
  )
}

export default Contacts;
