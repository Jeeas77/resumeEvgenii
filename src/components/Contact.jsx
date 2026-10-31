import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/contact.css';

function Contact(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.contact, {
      method: 'GET',
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="bento">
              {data.intro && (
                <div className="tile contact-intro-tile span-6">
                  <ReactMarkdown>{data.intro}</ReactMarkdown>
                </div>
              )}
              {data.items?.map((item) => {
                const isExternal = item.href?.startsWith('http');
                const content = (
                  <>
                    <span className="contact-label">{item.label}</span>
                    <span className="contact-value">{item.value}</span>
                    {item.note && <span className="contact-note">{item.note}</span>}
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    className="tile tile--interactive contact-card span-2"
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="tile contact-card span-2">
                    {content}
                  </div>
                );
              })}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
