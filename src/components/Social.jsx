import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fall through to the legacy path (e.g. clipboard permission denied).
    }
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (err) {
    copied = false;
  }
  document.body.removeChild(area);
  return copied;
}

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2000);
  };

  const handleEmailClick = async (event, href) => {
    event.preventDefault();
    const email = href.replace(/^mailto:/i, '').split('?')[0];
    const copied = await copyText(email);
    showToast(copied ? `Скопировано: ${email}` : 'Не удалось скопировать');
  };

  return (
    <div className="social">
      {data ? data.social.map((social) => {
        const isEmail = social.network === 'email';
        return (
          <SocialIcon
            key={social.network}
            style={styles.iconStyle}
            url={social.href}
            network={social.network}
            bgColor={theme.socialIconBgColor}
            fgColor={theme.background}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener'}
            onClick={isEmail ? (event) => handleEmailClick(event, social.href) : undefined}
          />
        );
      }) : null}
      <span
        className={`social-toast${toast ? ' social-toast--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </span>
    </div>
  );
}

export default Social;
