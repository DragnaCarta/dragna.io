import { Component } from 'react';
import Link from 'next/link';

type FooterLinkSection = {
  section: string;
  children: FooterLinks[];
};

type FooterLinks = {
  name: string;
  url: string;
  isExternal?: boolean;
};

function Footer() {
  const items: FooterLinkSection[] = [
    {
      section: 'Projects',
      children: [
        {
          name: 'CoS Reloaded',
          url: 'https://www.patreon.com/posts/84429238',
          isExternal: true,
        },
        {
          name: 'Challenge Rated',
          url: 'https://challengerated.com',
        },
      ],
    },
    {
      section: 'Resources',
      children: [
        // {
        //   name: "About",
        //   url: "/about",
        // },
        {
          name: 'Blog',
          url: 'https://www.patreon.com/DragnaCarta/posts',
          isExternal: true,
        },
      ],
    },
    {
      section: 'Community',
      children: [
        {
          name: 'Patreon',
          url: 'https://www.patreon.com/DragnaCarta',
          isExternal: true,
        },
        // {
        //   name: "Discord",
        //   url: "https://discord.gg/curseofstrahd",
        //   isExternal: true,
        // },
        // {
        //   name: "Reddit",
        //   url: "https://www.reddit.com/r/CurseOfStrahd",
        //   isExternal: true,
        // }
      ],
    },
  ];

  return (
    <div className="flex flex-col py-14 bg-base-100">
      <div className="footer-columns">
        {items.map((item) => {
          return (
            <div key={item.section} className="footer-column">
              <p className="footer-section">{item.section}</p>
              <ul className="footer-list mt-4">
                {item.children.map((child) => {
                  return (
                    <li key={child.name} className="footer-item">
                      {child.isExternal ? (
                        <a
                          href={child.url}
                          className="footer-link"
                          target="_blank"
                        >
                          {child.name}
                        </a>
                      ) : (
                        <Link className="footer-link" href={child.url}>
                          {child.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="credits">
        Made with <span className="love">♥</span> by{' '}
        <a className="green" href="https://github.com/dannyrb" target="blank">
          @dannyrb
        </a>
      </p>
    </div>
  );
}

export default Footer;
